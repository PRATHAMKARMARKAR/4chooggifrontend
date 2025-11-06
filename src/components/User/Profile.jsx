import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DashboardNav from "../DashboardNav";

const Button = ({ children, onClick, className = "", disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, disabled = false, className = "" }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 ${className}`}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border shadow-sm p-8 bg-white ${className}`}>
    {children}
  </div>
);

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // API URLs
  const GET_PROFILE_URL = "http://localhost:3000/api/users/getUserProfile";
  const ADD_DETAILS_URL = "http://localhost:3000/api/users/addDetailsRegister";

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        const res = await axios.get(GET_PROFILE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data);
        setFormData({
          name: res.data.data.name || "",
          email: res.data.data.email || "",
          github: res.data.data.github || "",
          linkedin: res.data.data.linkedin || "",
          portfolio: res.data.data.portfolio || "",
        });

        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Save updated profile
  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("authToken");

      // ✅ Full payload as required
      const payload = {
        id: "690c3f9d13af134d065943ce",
        resumeURL:
          "https://storage.googleapis.com/hackcbs_4choggi/resumes/690b987b40cd45540c8cf208/1762382215943-690b987b40cd45540c8cf208",
        title: "Backend-Developer",
        yoe: "0-5yrs",
        skills: ["go", "js"],
        autoApply: true,
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
      };

      const res = await axios.post(ADD_DETAILS_URL, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(res.data);
      setFormData(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-gray-700">
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardNav role="candidate" />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              disabled={saving}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <Card>
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-600 to-indigo-400 flex items-center justify-center text-4xl font-bold text-white shadow-md">
                {profile?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {profile?.name || "User Name"}
                </h2>
                <p className="text-gray-500">{profile?.email || "user@example.com"}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {[
                { label: "Full Name", key: "name" },
                { label: "Email", key: "email" },
                {
                  label: "GitHub Profile",
                  key: "github",
                  placeholder: "https://github.com/username",
                },
                {
                  label: "LinkedIn Profile",
                  key: "linkedin",
                  placeholder: "https://linkedin.com/in/username",
                },
                {
                  label: "Portfolio Website",
                  key: "portfolio",
                  placeholder: "https://yourportfolio.com",
                },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {label}
                  </label>
                  <Input
                    disabled={!isEditing}
                    placeholder={placeholder}
                    value={formData[key] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>

            {/* Save Button */}
            {isEditing && (
              <Button
                onClick={handleSave}
                className="w-full mt-6"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

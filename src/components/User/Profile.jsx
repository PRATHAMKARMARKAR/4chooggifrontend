import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import DashboardNav from "../DashboardNav/DashboardNav";
import DashboardNav from "../DashboardNav";

const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
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

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setProfile(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Static Sidebar */}
      <DashboardNav role="candidate" />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <Card>
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-400 flex items-center justify-center text-4xl font-bold text-white shadow-md">
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
                { label: "GitHub Profile", key: "github", placeholder: "https://github.com/username" },
                { label: "LinkedIn Profile", key: "linkedin", placeholder: "https://linkedin.com/in/username" },
                { label: "Portfolio Website", key: "portfolio", placeholder: "https://yourportfolio.com" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    {label}
                  </label>
                  <Input
                    disabled={!isEditing}
                    placeholder={placeholder}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  />
                </div>
              ))}
            </div>

            {/* Save Button */}
            {isEditing && (
              <Button onClick={handleSave} className="w-full mt-6">
                Save Changes
              </Button>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

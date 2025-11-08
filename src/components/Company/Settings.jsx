import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import CompanyLayout from "./CompanyLayout";

const Button = ({ children, onClick, className = "", disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none ${
        disabled
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      } ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ value, onChange, placeholder, disabled, className = "" }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50 ${className}`}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl border bg-white shadow-sm ${className}`}>{children}</div>
);

export default function SettingsJob() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    email: "",
    website: "",
    location: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId"); // get logged-in employer ID

  // ✅ Fetch employer data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/employers/getEmployerProfile",);

        const data = res.data.data;
        setCompanyInfo({
          name: data.companyName || "",
          email: data.companyEmail || "",
          website: data.companyWebsite || "",
          location: data.companyLocation || "",
        });
      } catch (err) {
        console.error("❌ Failed to load employer profile:", err);
        alert("Failed to load company profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  const handleSave = async () => {
    try {
      const res = await axios.put("http://localhost:3000/api/employers/updateProfile", {
        id: userId,
        companyName: companyInfo.name,
        companyEmail: companyInfo.email,
        companyWebsite: companyInfo.website,
        companyLocation: companyInfo.location,
      });

      console.log("✅ Saved Company Info:", res.data);
      setIsEditing(false);
      alert("✅ Company info updated successfully!");
    } catch (err) {
      console.error("❌ Error saving company info:", err);
      alert("Failed to update company info. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f8faff] to-[#eef1ff]">
      {/* Sidebar */}
      <CompanyLayout role="EMPLOYER" />

      {/* Main Content */}
      <div className="flex-1 px-10 py-10 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full text-lg text-gray-600">
            Loading company profile...
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Company Settings</h1>
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </div>

            {/* Settings Card */}
            <Card className="p-8 border-gray-200 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Company Information
              </h2>

              <div className="space-y-5">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Company Name
                  </label>
                  <Input
                    disabled={!isEditing}
                    value={companyInfo.name}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, name: e.target.value })
                    }
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email
                  </label>
                  <Input
                    disabled={!isEditing}
                    value={companyInfo.email}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, email: e.target.value })
                    }
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Website
                  </label>
                  <Input
                    disabled={!isEditing}
                    value={companyInfo.website}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, website: e.target.value })
                    }
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Location
                  </label>
                  <Input
                    disabled={!isEditing}
                    value={companyInfo.location}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, location: e.target.value })
                    }
                  />
                </div>

                {/* Save Button */}
                {isEditing && (
                  <Button
                    onClick={handleSave}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

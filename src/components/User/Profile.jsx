import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>

          <Card>
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-600 to-indigo-400 flex items-center justify-center text-4xl font-bold text-white">
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
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Full Name
                </label>
                <Input
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Email
                </label>
                <Input
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  GitHub Profile
                </label>
                <Input
                  disabled={!isEditing}
                  placeholder="https://github.com/username"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  LinkedIn Profile
                </label>
                <Input
                  disabled={!isEditing}
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Portfolio Website
                </label>
                <Input
                  disabled={!isEditing}
                  placeholder="https://yourportfolio.com"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                />
              </div>
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

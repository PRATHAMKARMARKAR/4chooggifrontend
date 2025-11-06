import React, { useState } from "react";
import { motion } from "framer-motion";
// import DashboardNav from "../DashboardNav/DashboardNav"; // ✅ Import Sidebar
import DashboardNav from "../DashboardNav";

const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const base =
    variant === "destructive"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : variant === "outline"
      ? "border border-gray-400 text-gray-700 hover:bg-gray-50"
      : "bg-indigo-600 hover:bg-indigo-700 text-white";
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition ${base} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl shadow-sm p-6 bg-white border ${className}`}>
    {children}
  </div>
);

const Settings = () => {
  const [autoApply, setAutoApply] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = () => {
    localStorage.removeItem("user");
    alert("Account deleted! Redirecting to home page.");
    window.location.href = "/";
  };

  const SettingCard = ({ title, description, children }) => (
    <Card className="flex items-center justify-between gap-6 mb-6">
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      {children}
    </Card>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Static Sidebar */}
      <DashboardNav role="candidate" />

      {/* ✅ Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Settings</h1>

          {/* Auto Apply Settings */}
          <SettingCard
            title="Auto Apply"
            description="Automatically apply to matching jobs"
          >
            <button
              onClick={() => setAutoApply(!autoApply)}
              className={`w-14 h-8 rounded-full transition-colors ${
                autoApply ? "bg-indigo-600" : "bg-gray-300"
              } p-1 flex items-center`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  autoApply ? "translate-x-6" : ""
                }`}
              />
            </button>
          </SettingCard>

          {/* Email Notifications */}
          <SettingCard
            title="Email Notifications"
            description="Get notified about new job matches"
          >
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-14 h-8 rounded-full transition-colors ${
                emailNotifications ? "bg-indigo-600" : "bg-gray-300"
              } p-1 flex items-center`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  emailNotifications ? "translate-x-6" : ""
                }`}
              />
            </button>
          </SettingCard>

          {/* Theme Setting */}
          <SettingCard title="Theme" description="Choose your preferred theme">
            <select className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Dark</option>
              <option>Light</option>
            </select>
          </SettingCard>

          {/* Danger Zone */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              Danger Zone
            </h2>

            {!showDeleteConfirm ? (
              <Button
                onClick={() => setShowDeleteConfirm(true)}
                variant="destructive"
                className="w-full"
              >
                Delete Account
              </Button>
            ) : (
              <Card className="border-red-300 bg-red-50 space-y-4">
                <p className="text-gray-800">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteAccount}
                    variant="destructive"
                    className="flex-1"
                  >
                    Delete Account
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;

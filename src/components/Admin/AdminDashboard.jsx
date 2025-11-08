import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, LogOut } from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState({
    name: "Divyansh Admin",
    email: "admin@autoapply.com",
    role: "ADMIN",
  });
  const [employers, setEmployers] = useState([]);
  const token = localStorage.getItem("authToken");

  // ✅ Fetch unverified employers
  const fetchEmployers = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching employers from API...", token);

      const { data } = await axios.get(
        "http://localhost:3000/api/admin/getUnverifiedEmployerList",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ API Response:", data);

      // ✅ Set list properly from backend format
      setEmployers(data.data || []);
    } catch (error) {
      console.error(
        "❌ Error fetching employers:",
        error.response?.status,
        error.response?.data || error.message
      );
      alert(
        `Failed to load employer list. ${
          error.response?.status === 404
            ? "Route not found (check backend URL)."
            : error.response?.data?.message || ""
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  // ✅ Handle Accept / Reject Employer
  const handleDecision = async (id, decision) => {
    try {
      let url, method, payload;

      if (decision === "accepted") {
        url = "http://localhost:3000/api/admin/acceptEmployer";
        method = "patch";
        payload = { employerId: id };
      } else {
        url = "http://localhost:3000/api/admin/rejectEmployer";
        method = "delete";
        payload = { data: { employerId: id } }; // axios delete must use data object
      }

      console.log("📡 Sending decision:", { method, url, payload });

      await axios({
        method,
        url,
        ...payload,
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Instantly remove employer from UI
      setEmployers((prev) => prev.filter((emp) => emp._id !== id));

      alert(
        `Employer ${
          decision === "accepted" ? "approved ✅" : "rejected ❌"
        } successfully!`
      );
    } catch (error) {
      console.error(
        "❌ Error updating employer status:",
        error.response?.status,
        error.response?.data || error.message
      );
      alert("Failed to update employer status.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out successfully!");
    window.location.href = "/adminlogin";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f8faff] to-[#eef1ff]">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 border-r border-gray-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 text-center border-b border-gray-100">
            <h1 className="text-2xl font-extrabold text-[#0a0a52]">
              AutoApply Admin
            </h1>
          </div>
          <nav className="flex flex-col mt-6 space-y-2 px-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`text-left px-4 py-2 rounded-md font-medium transition ${
                activeTab === "dashboard"
                  ? "bg-[#0a0a52] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`text-left px-4 py-2 rounded-md font-medium transition ${
                activeTab === "settings"
                  ? "bg-[#0a0a52] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-2 text-red-600 font-medium py-2 hover:bg-red-50 rounded-md transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {activeTab === "dashboard" && (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
                Welcome,{" "}
                <span className="text-indigo-600">{admin.name || "Admin"}</span>
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Review and manage employer approval requests 👇
              </p>
            </motion.div>

            {/* Employer Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white/80 border border-gray-100 rounded-2xl shadow-sm p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Pending Employer Approvals
              </h2>

              {loading ? (
                <p className="text-gray-500 text-center py-6 animate-pulse">
                  Loading employers...
                </p>
              ) : employers.length === 0 ? (
                <p className="text-gray-500 text-center py-6">
                  🎉 No pending requests right now.
                </p>
              ) : (
                <div className="space-y-4">
                  {employers.map((emp, index) => (
                    <motion.div
                      key={emp._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between bg-white/70 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {emp.name || "Unnamed Employer"}
                        </h3>
                        <p className="text-gray-500 text-sm">{emp.email}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        {!emp.isVerified ? (
                          <>
                            <button
                              onClick={() =>
                                handleDecision(emp._id, "accepted")
                              }
                              className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                            >
                              <CheckCircle size={20} /> Accept
                            </button>
                            <button
                              onClick={() =>
                                handleDecision(emp._id, "rejected")
                              }
                              className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium"
                            >
                              <XCircle size={20} /> Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle size={18} /> Accepted
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}

        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/80 border border-gray-100 rounded-2xl shadow-sm p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Admin Settings
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Name</p>
                <p className="text-lg font-medium text-gray-800">{admin.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-lg font-medium text-gray-800">{admin.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="text-lg font-medium text-gray-800">{admin.role}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

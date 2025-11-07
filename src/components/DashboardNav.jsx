import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Briefcase,
  User,
  Bookmark,
  Settings,
  LayoutDashboard,
} from "lucide-react";

export default function DashboardNav({ role = "candidate" }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Navigation items
  const items = [
    { label: "Dashboard", href: "/CandidateDashboard", icon: LayoutDashboard },
    { label: "Profile", href: "/Profile", icon: Briefcase },
    { label: "Jobs Matches", href: "/Matches", icon: Bookmark },
    { label: "Settings", href: "/Settings", icon: Settings },
  ];

  // ✅ Logout function
  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");

    try {
      // 🧩 Call your backend logout API
      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.warn("Logout API failed, proceeding with local logout:", err.message);
    } finally {
      // Clear stored data
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("onboarding");

      // Redirect to login
      navigate("/login");
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-white/80 to-indigo-50/60 backdrop-blur-xl border-r border-gray-200 px-6 py-8 flex flex-col justify-between shadow-sm">
      {/* Logo + Title */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-400 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
            A
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-gray-900 tracking-tight">
              AutoApply.AI
            </h1>
            <p className="text-xs text-gray-500 capitalize">{role} panel</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-700 border-l-4 border-indigo-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-indigo-700"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="text-xs text-gray-500 border-t pt-4">
        <p>Logged in as:</p>
        <p className="font-semibold capitalize text-gray-800">{role}</p>
        <button
          onClick={handleLogout}
          className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium transition"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

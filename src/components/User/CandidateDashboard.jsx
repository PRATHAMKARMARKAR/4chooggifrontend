import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import DashboardNav from "../DashboardNav"

const StatCard = ({ label, value, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="bg-white/70 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p className="text-4xl font-bold text-indigo-600">{value}</p>
    </div>
  </motion.div>
)

export default function CandidateDashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const navItems = [
    { label: "Dashboard", href: "/candidate/dashboard" },
    { label: "My Applications", href: "/candidate/applications" },
    { label: "Saved Jobs", href: "/candidate/saved" },
    { label: "Profile", href: "/candidate/profile" },
    { label: "Settings", href: "/candidate/settings" },
  ]

  const stats = [
    { label: "Profile Completion", value: "60%" },
    { label: "Jobs Matched", value: "24" },
    { label: "Applications Sent", value: "8" },
  ]

  return (
    <div className="flex min-h-screen bg-linear-to-br from-[#f8faff] to-[#eef1ff]">
      {/* Sidebar */}
      <DashboardNav items={navItems} role="candidate" />

      {/* Main Dashboard Content */}
      <div className="flex-1 flex flex-col px-10 py-10 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Welcome back, <span className="text-indigo-600">{user?.name || "User"}</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Here’s a quick snapshot of your career journey so far 🚀
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} label={stat.label} value={stat.value} delay={index * 0.1} />
          ))}
        </div>

        {/* Upcoming Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-white/80 border border-gray-100 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Recommended Jobs for You
            </h2>
            <p className="text-gray-500">
              Stay tuned — your AI job matcher is analyzing the best opportunities for you.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

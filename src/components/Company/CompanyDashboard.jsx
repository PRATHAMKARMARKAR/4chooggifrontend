import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import DashboardNav from "../DashboardNav"
import CompanyLayout from "./CompanyLayout"
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

export default function CompanyDashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))
  }, [])

  // Sidebar nav items
  const navItems = [
    { label: "Dashboard", href: "/company" },
    { label: "Post Job", href: "/company/post-job" },
    { label: "Applicants", href: "/company/applicants" },
    { label: "Settings", href: "/company/settings" },
  ]

  const stats = [
    { label: "Active Job Posts", value: "3" },
    { label: "Total Applicants", value: "24" },
    { label: "Shortlisted", value: "8" },
    { label: "Hired", value: "2" },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f8faff] to-[#eef1ff]">
      {/* Sidebar */}
      {/* <DashboardNav items={navItems} role="company" /> */}
       <CompanyLayout role="EMPLOYER" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-10 py-10 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
            Welcome, <span className="text-indigo-600">{user?.name || "Recruiter"}</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Here’s your hiring overview and performance insights 👩‍💼
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} label={stat.label} value={stat.value} delay={index * 0.1} />
          ))}
        </div>

        {/* Post Job CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14"
        >
          <div className="bg-white/80 border border-gray-100 rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Ready to post a new job?
            </h2>
            <p className="text-gray-500 mb-6">
              Reach top talent instantly using AutoApply.AI’s recruiter dashboard.
            </p>
            <a
              href="/company/post-job"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition"
            >
              Post a Job
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

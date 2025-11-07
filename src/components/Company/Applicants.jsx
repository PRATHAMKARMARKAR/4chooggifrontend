import React, { useState } from "react"
import { motion } from "framer-motion"
import DashboardNav from "../DashboardNav"
import CompanyLayout from "./CompanyLayout"
// Reusable Button Component
const Button = ({ children, onClick, variant = "default", size = "md", className = "" }) => {
  const base =
    "rounded-md font-medium transition duration-200 focus:outline-none flex items-center justify-center"
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-sm md:text-base",
  }
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  }

  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

// Reusable Card Component
const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl border bg-white shadow-sm ${className}`}>{children}</div>
)

// Mock Data
const mockApplicants = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "Senior Engineer",
    appliedFor: "Senior Backend Engineer",
    matchScore: 95,
    status: "shortlisted",
    appliedDate: "2025-11-04",
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Full Stack Developer",
    appliedFor: "Senior Backend Engineer",
    matchScore: 88,
    status: "new",
    appliedDate: "2025-11-04",
  },
  {
    id: "3",
    name: "Carol White",
    role: "DevOps Engineer",
    appliedFor: "Senior Backend Engineer",
    matchScore: 82,
    status: "new",
    appliedDate: "2025-11-03",
  },
  {
    id: "4",
    name: "David Lee",
    role: "Backend Engineer",
    appliedFor: "Senior Backend Engineer",
    matchScore: 91,
    status: "shortlisted",
    appliedDate: "2025-11-03",
  },
]

export default function Applicants() {
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredApplicants =
    filterStatus === "all"
      ? mockApplicants
      : mockApplicants.filter((a) => a.status === filterStatus)

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-600 border-blue-400"
      case "shortlisted":
        return "bg-purple-100 text-purple-600 border-purple-400"
      case "hired":
        return "bg-green-100 text-green-600 border-green-400"
      case "rejected":
        return "bg-red-100 text-red-600 border-red-400"
      default:
        return "bg-gray-100 text-gray-600 border-gray-400"
    }
  }

  const getMatchScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    return "text-yellow-600"
  }

  const navItems = [
    { label: "Dashboard", href: "/company" },
    { label: "Post Job", href: "/company/post-job" },
    { label: "Applicants", href: "/company/applicants" },
    { label: "Settings", href: "/company/settings" },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f8faff] to-[#eef1ff]">
      {/* Sidebar */}
     <CompanyLayout role="EMPLOYER" />

      {/* Main Content */}
      <div className="flex-1 px-10 py-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Applicants</h1>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mb-10 flex-wrap">
            {["all", "new", "shortlisted", "hired", "rejected"].map((status) => (
              <Button
                key={status}
                onClick={() => setFilterStatus(status)}
                variant={filterStatus === status ? "default" : "outline"}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>

          {/* Applicants List */}
          <div className="grid gap-6">
            {filteredApplicants.map((applicant, i) => (
              <motion.div
                key={applicant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className="p-6 hover:border-indigo-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {applicant.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{applicant.name}</h3>
                        <p className="text-sm text-gray-500">{applicant.role}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-xl font-bold ${getMatchScoreColor(
                          applicant.matchScore
                        )}`}
                      >
                        {applicant.matchScore}%
                      </div>
                      <p className="text-sm text-gray-500">Match Score</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Applied for:{" "}
                    <span className="font-medium text-gray-800">{applicant.appliedFor}</span>
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        applicant.status
                      )}`}
                    >
                      {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Resume
                      </Button>
                      <Button size="sm">Update Status</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

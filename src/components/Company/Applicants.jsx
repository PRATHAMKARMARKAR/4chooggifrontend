import React, { useState } from "react"
import { motion } from "framer-motion"

// Simple Button component
const Button = ({ children, onClick, variant = "default", size = "md", className = "" }) => {
  const baseStyle =
    "rounded-md font-medium transition-colors duration-200 focus:outline-none"
  const sizeStyle = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
  }
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${sizeStyle[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

// Simple Card component
const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border shadow-sm ${className}`}>{children}</div>
)

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

const Applicants = () => {
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Applicants</h1>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {["all", "new", "shortlisted", "hired", "rejected"].map((status) => (
            <Button
              key={status}
              onClick={() => setFilterStatus(status)}
              variant={filterStatus === status ? "default" : "outline"}
              className={
                filterStatus === status ? "bg-blue-600 hover:bg-blue-700" : ""
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Applicants List */}
        <div className="space-y-4">
          {filteredApplicants.map((applicant, i) => (
            <motion.div
              key={applicant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className="bg-white border-gray-200 p-6 hover:border-blue-400 transition-colors">
                <div className="flex items-start justify-between gap-6 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
                        {applicant.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{applicant.name}</h3>
                        <p className="text-sm text-gray-500">{applicant.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${getMatchScoreColor(
                        applicant.matchScore
                      )}`}
                    >
                      {applicant.matchScore}%
                    </div>
                    <p className="text-sm text-gray-500">Match Score</p>
                  </div>
                </div>

                <p className="text-gray-500 mb-4">
                  Applied for: {applicant.appliedFor}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      applicant.status
                    )}`}
                  >
                    {applicant.status.charAt(0).toUpperCase() +
                      applicant.status.slice(1)}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Resume
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Update Status
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Applicants

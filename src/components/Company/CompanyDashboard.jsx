// src/components/company/CompanyDashboard.jsx
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Card = ({ children }) => (
  <div className="bg-white border rounded-xl p-6 shadow-sm">{children}</div>
)

export default function CompanyDashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const stats = [
    { label: "Active Jobs", value: "3" },
    { label: "Total Applicants", value: "24" },
    { label: "Shortlisted", value: "8" },
    { label: "Hired", value: "2" },
  ]

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card>
                <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to post a job?</h2>
            <p className="text-gray-500 mb-6">Find the perfect candidate for your team</p>
            <a href="/company/post-job" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
              Post a Job
            </a>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

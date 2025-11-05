// src/components/user/CandidateDashboard.jsx
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Card = ({ children }) => (
  <div className="bg-white border rounded-xl p-6 shadow-sm">{children}</div>
)

export default function CandidateDashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const stats = [
    { label: "Profile Complete", value: "60%" },
    { label: "Jobs Matched", value: "24" },
    { label: "Applications Sent", value: "8" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name || "User"}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card>
              <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

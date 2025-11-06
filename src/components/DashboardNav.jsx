// src/components/DashboardNav.jsx
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

export default function DashboardNav({ items = [], role = "company" }) {
  const { pathname } = useLocation()

  return (
    <aside className="w-64 min-h-screen bg-white border-r px-6 py-8 flex flex-col justify-between">
      {/* Logo + Title */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo.svg" alt="AutoApply" className="w-10 h-10" />
          <div>
            <h1 className="font-bold text-lg text-gray-900">AutoApply.AI</h1>
            <p className="text-xs text-gray-500 capitalize">{role} panel</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.href}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            )
          })}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="text-xs text-gray-500 border-t pt-4">
        <p>Logged in as:</p>
        <p className="font-semibold capitalize text-gray-800">{role}</p>
      </div>
    </aside>
  )
}

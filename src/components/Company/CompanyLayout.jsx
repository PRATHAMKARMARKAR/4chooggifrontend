// src/components/company/CompanyLayout.jsx
import React from "react"
import { Outlet } from "react-router-dom"
import DashboardNav from "../DashboardNav"

const navItems = [
  { label: "Dashboard", href: "/company" },
  { label: "Post Job", href: "/company/post-job" },
  { label: "Applicants", href: "/company/applicants" },
  { label: "Settings", href: "/company/settings" },
]

export default function CompanyLayout() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DashboardNav items={navItems} role="company" />
      <main className="flex-1 p-8">
        <Outlet /> {/* nested pages yaha render honge */}
      </main>
    </div>
  )
}

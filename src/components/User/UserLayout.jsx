// src/components/user/UserLayout.jsx
import React from "react"
import { Outlet } from "react-router-dom"
import DashboardNav from "../DashboardNav" // same component you made earlier

const navItems = [
  { label: "Dashboard", href: "/user" },
  { label: "Profile", href: "/user/profile" },
  { label: "Job Matches", href: "/user/matches" },
  { label: "Settings", href: "/user/settings" },
]

export default function UserLayout() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <DashboardNav items={navItems} role="user" />
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> {/* nested pages render here */}
      </main>
    </div>
  )
}

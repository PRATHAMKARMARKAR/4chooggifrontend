import React, { useState } from "react"
import { motion } from "framer-motion"

// Simple reusable UI components
const Button = ({ children, onClick, className = "", disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none ${
        disabled
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      } ${className}`}
    >
      {children}
    </button>
  )
}

const Input = ({ value, onChange, placeholder, disabled, className = "" }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 ${className}`}
  />
)

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border shadow-sm bg-white ${className}`}>{children}</div>
)

const SettingsJob = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "TechCorp Inc.",
    email: "hr@techcorp.com",
    website: "https://techcorp.com",
    location: "San Francisco, CA",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    console.log("Saved Company Info:", companyInfo)
    setIsEditing(false)
    alert("Company info updated successfully!")
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Company Settings</h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>

        {/* Card */}
        <Card className="p-8 border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Company Information</h2>

          <div className="space-y-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <Input
                disabled={!isEditing}
                value={companyInfo.name}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                disabled={!isEditing}
                value={companyInfo.email}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, email: e.target.value })
                }
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <Input
                disabled={!isEditing}
                value={companyInfo.website}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, website: e.target.value })
                }
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                disabled={!isEditing}
                value={companyInfo.location}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, location: e.target.value })
                }
              />
            </div>

            {/* Save Button */}
            {isEditing && (
              <Button
                onClick={handleSave}
                className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
              >
                Save Changes
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default SettingsJob

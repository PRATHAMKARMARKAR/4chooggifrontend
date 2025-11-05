import React, { useState } from "react"
import { motion } from "framer-motion"

// Simple reusable UI components
const Button = ({ children, onClick, type = "button", variant = "default", className = "" }) => {
  const base =
    variant === "destructive"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : variant === "outline"
      ? "border border-gray-400 text-gray-700 hover:bg-gray-50"
      : "bg-indigo-600 hover:bg-indigo-700 text-white"
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition ${base} ${className}`}
    >
      {children}
    </button>
  )
}

const Input = ({ value, onChange, placeholder, className = "", ...props }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    {...props}
    className={`px-4 py-2 rounded-lg border border-gray-300 w-full ${className}`}
  />
)

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl shadow-sm bg-white border p-6 ${className}`}>{children}</div>
)

const PostJob = () => {
  const [jobs, setJobs] = useState([
    {
      id: "1",
      title: "Senior Backend Engineer",
      experience: "5-10 years",
      skills: ["Python", "PostgreSQL", "AWS"],
      location: "San Francisco, CA",
      description: "Build scalable backend systems...",
      postedDate: "2025-11-03",
      applicants: 12,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    experience: "",
    skills: [],
    location: "",
    description: "",
  })
  const [skillInput, setSkillInput] = useState("")

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput] })
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newJob = {
      id: String(jobs.length + 1),
      ...formData,
      postedDate: new Date().toISOString().split("T")[0],
      applicants: 0,
    }
    setJobs([newJob, ...jobs])
    setFormData({ title: "", experience: "", skills: [], location: "", description: "" })
    setShowForm(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Posted Jobs</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Post New Job"}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <Input
                    required
                    placeholder="e.g., Senior React Developer"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Experience Level</label>
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    >
                      <option value="">Select...</option>
                      <option value="0-2 years">0-2 years</option>
                      <option value="2-5 years">2-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      required
                      placeholder="e.g., San Francisco, CA"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium mb-2">Required Skills</label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Add a skill..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                      className="flex-1"
                    />
                    <Button onClick={handleAddSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-indigo-100 border border-indigo-400 text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(i)}
                          className="hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">Job Description</label>
                  <textarea
                    required
                    placeholder="Describe the role, responsibilities, and expectations..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 resize-none"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Post Job
                </Button>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Posted Jobs */}
        <div className="grid gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className="hover:border-indigo-400 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <p className="text-gray-500">{job.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{job.applicants}</div>
                    <p className="text-sm text-gray-500">applicants</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-gray-100 text-sm border border-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    View Applicants
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Edit
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default PostJob

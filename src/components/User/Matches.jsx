import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

// ✅ Reusable Button component
const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseStyle =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// ✅ Simple Card wrapper
const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border shadow-sm ${className}`}>{children}</div>
);

// ✅ Mock job data
const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp",
    matchScore: 92,
    skills: ["React", "TypeScript", "Node.js"],
    location: "San Francisco, CA",
    salary: "$150k - $180k",
    description: "We are looking for an experienced React developer...",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    matchScore: 85,
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    location: "Remote",
    salary: "$120k - $150k",
    description: "Join our growing team as a Full Stack Engineer...",
  },
  {
    id: "3",
    title: "Frontend Engineer",
    company: "DesignStudio",
    matchScore: 78,
    skills: ["React", "CSS", "JavaScript"],
    location: "New York, NY",
    salary: "$110k - $140k",
    description: "We are building beautiful web experiences...",
  },
  {
    id: "4",
    title: "Principal Engineer",
    company: "BigTech",
    matchScore: 88,
    skills: ["System Design", "React", "TypeScript", "Leadership"],
    location: "Remote",
    salary: "$200k - $250k",
    description: "Lead our engineering team to the next level...",
  },
];

const Matches = () => {
  const [sortBy, setSortBy] = useState("score");
  const [applied, setApplied] = useState(new Set());

  // ✅ Sort logic
  const sortedJobs = useMemo(() => {
    const sorted = [...mockJobs];
    switch (sortBy) {
      case "company":
        return sorted.sort((a, b) => a.company.localeCompare(b.company));
      case "salary":
        const getMin = (s) => {
          if (!s) return 0;
          return Number.parseInt(s.split("-")[0].replace(/\D/g, "")) * 1000;
        };
        return sorted.sort((a, b) => getMin(b.salary) - getMin(a.salary));
      default:
        return sorted.sort((a, b) => b.matchScore - a.matchScore);
    }
  }, [sortBy]);

  // ✅ Apply button handler
  const handleApply = (jobId) => {
    const newApplied = new Set(applied);
    newApplied.add(jobId);
    setApplied(newApplied);
  };

  // ✅ Reject button handler
  const handleReject = (jobId) => {
    console.log("Rejected job:", jobId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Job Matches</h1>
          <div className="flex gap-2">
            {["score", "company", "salary"].map((option) => (
              <Button
                key={option}
                onClick={() => setSortBy(option)}
                variant={sortBy === option ? "default" : "outline"}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid gap-6">
          {sortedJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className="bg-white border-gray-200 p-6 hover:border-blue-400 transition-colors">
                <div className="flex items-start justify-between gap-6 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.matchScore >= 90
                            ? "bg-green-100 text-green-600"
                            : job.matchScore >= 80
                            ? "bg-blue-100 text-blue-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {job.matchScore}% match
                      </div>
                    </div>
                    <p className="text-gray-600 mb-1">{job.company}</p>
                    <p className="text-sm text-gray-500 mb-4">{job.location}</p>
                  </div>

                  {job.salary && (
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">
                        {job.salary}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-gray-800 mb-4">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-gray-100 text-sm border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {applied.has(job.id) ? (
                    <div className="flex-1 py-2 px-4 rounded-lg bg-green-100 text-green-600 text-center font-medium">
                      Applied
                    </div>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleApply(job.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Apply
                      </Button>
                      <Button
                        onClick={() => handleReject(job.id)}
                        variant="outline"
                        className="flex-1"
                      >
                        Not Interested
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Matches;

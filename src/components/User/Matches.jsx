import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import DashboardNav from "../DashboardNav";

// ✅ Reusable Button
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
  <div className={`rounded-lg border shadow-sm bg-white border-gray-200 ${className}`}>
    {children}
  </div>
);

const Matches = () => {
  const [sortBy, setSortBy] = useState("score");
  const [applied, setApplied] = useState(new Set());
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch jobs from backend API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // 🔹 Replace with your actual backend endpoint
        const res = await axios.get("https://your-backend-api.com/api/jobs");
        setJobs(res.data); // assuming response is an array of job objects
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // ✅ Sort jobs dynamically
  const sortedJobs = useMemo(() => {
    const sorted = [...jobs];
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
        return sorted.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }
  }, [sortBy, jobs]);

  // ✅ Handlers
  const handleApply = (jobId) => {
    const newApplied = new Set(applied);
    newApplied.add(jobId);
    setApplied(newApplied);
  };

  const handleReject = (jobId) => {
    console.log("Rejected job:", jobId);
  };

  // ✅ Loading and Error States
  if (loading) {
    return (
      <div className="flex min-h-screen">
        <DashboardNav />
        <main className="flex-1 flex items-center justify-center text-gray-500">
          Loading job listings...
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <DashboardNav />
        <main className="flex-1 flex items-center justify-center text-red-500">
          {error}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardNav role="candidate" />

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 sticky top-0 bg-gray-50 py-4 z-10">
            <h1 className="text-4xl font-bold text-gray-900">Job Matches</h1>
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
            {sortedJobs.length === 0 ? (
              <p className="text-gray-600">No job matches found.</p>
            ) : (
              sortedJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Card className="p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between gap-6 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {job.title}
                          </h3>
                          {job.matchScore && (
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
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">{job.company}</p>
                        <p className="text-sm text-gray-500 mb-4">
                          {job.location}
                        </p>
                      </div>

                      {job.salary && (
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">
                            {job.salary}
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4">
                      {job.description || "No description available."}
                    </p>

                    {job.skills && job.skills.length > 0 && (
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
                    )}

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
              ))
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Matches;

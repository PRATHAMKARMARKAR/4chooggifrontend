import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DashboardNav from "../DashboardNav";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border shadow-sm p-8 bg-white ${className}`}>
    {children}
  </div>
);

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        const res = await axios.get(
          "http://localhost:3000/api/users/getUserProfile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ✅ Always set full user object
        setProfile(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-gray-700">
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  // Destructure safely
  const { name, email, resumeURL, skills, jobPreferences, links } = profile || {};
  const { title, yoe } = jobPreferences || {};
  const { github, linkedin, portfolio } = links || {};

  // ✅ UI
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardNav role="candidate" />

      <div className="flex-1 overflow-y-auto p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Profile</h1>
          </div>

          <Card>
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-400 flex items-center justify-center text-4xl font-bold text-white shadow-md">
                {name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {name || "User Name"}
                </h2>
                <p className="text-gray-500">{email || "user@example.com"}</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">GitHub</p>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {github || "Not provided"}
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {linkedin || "Not provided"}
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-500">Portfolio</p>
                <a
                  href={portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {portfolio || "Not provided"}
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="text-gray-900">{title || "Not specified"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Years of Experience</p>
                <p className="text-gray-900">{yoe || "Not specified"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Skills</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills?.length ? (
                    skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 border border-blue-300 rounded-full text-sm"
                      >
                        {s}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-600">No skills added</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Resume</p>
                {resumeURL ? (
                  <a
                    href={resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    View Resume
                  </a>
                ) : (
                  <p className="text-gray-600">No resume uploaded</p>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

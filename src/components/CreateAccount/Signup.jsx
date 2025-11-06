import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Job Seeker");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SIGNUP_URL = "http://localhost:3000/api/users/register"; // <-- your signup API

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const finalRole = role === "Job Seeker" ? "USER" : "EMPLOYER";

      const res = await axios.post(SIGNUP_URL, {
        name: formData.fullname,
        email: formData.email,
        password: formData.password,
        role: finalRole,
      });
      console.log(res.data.data._id);
      
      // Assuming backend returns { id, token, ... }
      const userId = res.data.id || res.data.data._id;
      const token = res.data.token;

      // ✅ Save data to localStorage
      if (userId) localStorage.setItem("userId", userId);
      if (token) localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", finalRole); // ✅ Store role too

      alert("Account created successfully!");

      // Navigate based on role
      if (finalRole === "USER") {
        navigate("/onboarding"); // job seeker goes to onboarding
      } else {
        navigate("/company/dashboard"); // recruiter goes to company dashboard
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8f8]">
      <div className="text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#0a0a52] mb-2">AutoApply</h1>
        <p className="text-gray-500 mb-6">Create your account</p>

        {/* Signup Form */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-8 py-8 w-[380px] mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* I am a... */}
            <div className="text-left">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                I am a...
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole("Job Seeker")}
                  className={`w-1/2 border rounded-md py-2 text-sm font-medium ${
                    role === "Job Seeker"
                      ? "border-[#0a0a52] bg-[#f4f4ff] text-[#0a0a52]"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setRole("Company / Recruiter")}
                  className={`w-1/2 border rounded-md py-2 text-sm font-medium ${
                    role === "Company / Recruiter"
                      ? "border-[#0a0a52] bg-[#f4f4ff] text-[#0a0a52]"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  Company / Recruiter
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="text-left">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                placeholder="John Doe"
                required
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a52] focus:border-[#0a0a52] transition"
              />
            </div>

            {/* Email */}
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a52] focus:border-[#0a0a52] transition"
              />
            </div>

            {/* Password */}
            <div className="text-left">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a52] focus:border-[#0a0a52] transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-left">{error}</p>
            )}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a0a52] text-white py-2 rounded-md font-medium hover:bg-[#090941] transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Already have account */}
          <p className="text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#0a0a52] font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

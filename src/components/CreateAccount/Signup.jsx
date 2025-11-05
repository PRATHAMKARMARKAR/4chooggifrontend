import React, { useState } from "react";

const Signup = () => {
  const [role, setRole] = useState("Job Seeker");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8f8]">
      <div className="text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#0a0a52] mb-2">AutoApply</h1>
        <p className="text-gray-500 mb-6">Create your account</p>

        {/* Signup Form */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-8 py-8 w-[380px] mx-auto">
          <form className="space-y-5">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a52] focus:border-[#0a0a52] transition"
              />
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full bg-[#0a0a52] text-white py-2 rounded-md font-medium hover:bg-[#090941] transition"
            >
              Create Account
            </button>
          </form>

          {/* Already have account */}
          <p className="text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#0a0a52] font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

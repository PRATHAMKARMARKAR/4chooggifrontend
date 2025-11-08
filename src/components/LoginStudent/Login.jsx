import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Default login type
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Select API endpoint dynamically based on role
      let apiURL = "";
      if (role === "USER") {
        apiURL = "http://localhost:3000/api/users/login";
      } else if (role === "EMPLOYER") {
        apiURL = "http://localhost:3000/api/employers/login";
      } else if (role === "ADMIN") {
        apiURL = "http://localhost:3000/api/admin/login";
      }

      const response = await axios.post(apiURL, { email, password });

      console.log("Login response:", response.data);

      const { token, role: userRole } = response.data.data;

      // ✅ Store data in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", userRole);

      // ✅ Navigate according to role
      if (userRole === "USER") {
        navigate("/CandidateDashboard");
      } else if (userRole === "EMPLOYER") {
        navigate("/CompanyDashboard");
      } else if (userRole === "ADMIN") {
        navigate("/AdminDashboard");
      } else {
        setError("Invalid role detected.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8f8]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#0a0a52] mb-2">AutoApply</h1>
        <p className="text-gray-500 mb-6">Sign in to your account</p>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-8 py-8 w-[380px] mx-auto">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selection Dropdown */}
            <div className="text-left">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Login as
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a52] focus:border-[#0a0a52] transition"
              >
                <option value="USER">User</option>
                <option value="EMPLOYER">Employer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Email Input */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a52] focus:border-[#0a0a52] transition"
              />
            </div>

            {/* Password Input */}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a52] focus:border-[#0a0a52] transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-left">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0a0a52] text-white py-2 rounded-md font-medium hover:bg-[#090941] transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-[#0a0a52] font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

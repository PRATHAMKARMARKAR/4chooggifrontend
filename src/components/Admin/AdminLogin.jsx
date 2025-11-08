import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/admin/login", {
        email,
        password,
      });

      const { token, role } = response.data.data;
      console.log(token);
      console.log(role);
      
      
      

      // Save token and role if needed
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      // Navigate to Admin Dashboard
      if (role === "ADMIN") {
        navigate("/AdminDashboard");
      } else {
        setError("Unauthorized access. Only admins can log in.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8f8]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#0a0a52] mb-2">AutoApply Admin</h1>
        <p className="text-gray-500 mb-6">Sign in to the admin panel</p>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-8 py-8 w-[380px] mx-auto">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a0a52] focus:border-[#0a0a52] transition"
              />
            </div>

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

            {error && (
              <p className="text-red-500 text-sm text-left">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#0a0a52] text-white py-2 rounded-md font-medium hover:bg-[#090941] transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-6">
            Back to{" "}
            <a href="/" className="text-[#0a0a52] font-medium hover:underline">
              Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

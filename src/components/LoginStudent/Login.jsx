import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff8f8]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#0a0a52] mb-2">AutoApply</h1>
        <p className="text-gray-500 mb-6">Sign in to your account</p>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-8 py-8 w-[380px] mx-auto">
          <form className="space-y-5">
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

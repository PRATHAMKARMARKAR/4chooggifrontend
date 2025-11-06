import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2">
        {/* Logo / Brand Name */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold text-primary cursor-pointer"
        >
          AutoApply
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-primary/80 hover:text-primary transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#2233ff] to-[#2b9bff] shadow-soft-lg hover:opacity-90 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

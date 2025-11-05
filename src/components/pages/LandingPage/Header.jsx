import React from "react";

const Header = () => {
  return (
    <header className="py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-2">
        <div className="text-2xl font-extrabold text-primary">AutoApply</div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-primary/80">Sign In</button>
          <button className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#2233ff] to-[#2b9bff] shadow-soft-lg">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

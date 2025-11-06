import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleScroll = () => {
    const nextSection = document.getElementById("how-it-works");
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="pt-10 pb-20 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block px-4 py-2 border rounded-full text-sm mb-6 bg-white/60 card">
          ✨ AI-Powered Job Matching
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight text-primary">
          Your career,<br />now automated.
        </h1>

        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
          Stop searching. Start getting hired. AI that applies to jobs for you while you sleep.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-[#1f3bff] to-[#2b9bff] shadow-soft-lg"
          >
            Get Started as Candidate
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-lg text-primary border border-primary/20 bg-white/50"
          >
            Post a Job
          </button>
        </div>

        <div
          onClick={handleScroll}
          className="mt-12 text-sm text-muted cursor-pointer hover:text-primary transition-colors duration-300 flex flex-col items-center gap-1"
        >
          <span>↓ Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

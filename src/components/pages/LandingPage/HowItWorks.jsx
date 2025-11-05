import React from "react";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-white to-[#f9f9ff] text-center"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          How it works
        </h2>
        <p className="text-muted mb-12">
          Three simple steps to land your dream job
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="text-xl font-semibold mb-2">01. Upload Resume</h3>
            <p className="text-muted text-sm leading-relaxed">
              Share your resume, experience, and job preferences in one simple
              step.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-xl font-semibold mb-2">02. AI Matches</h3>
            <p className="text-muted text-sm leading-relaxed">
              Our advanced AI analyzes thousands of jobs to find your perfect
              matches.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="text-3xl mb-3">✈️</div>
            <h3 className="text-xl font-semibold mb-2">03. Auto Apply</h3>
            <p className="text-muted text-sm leading-relaxed">
              Automatically apply to aligned opportunities and track your
              progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

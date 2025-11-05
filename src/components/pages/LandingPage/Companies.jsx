import React from "react";

const Feature = ({ title, desc, emoji }) => (
  <div className="card p-5">
    <div className="flex items-start gap-3">
      <div className="text-xl">{emoji}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-muted mt-1">{desc}</p>
      </div>
    </div>
  </div>
);

const Companies = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-primary">For Companies</h2>
        <p className="text-muted mt-2">
          Simplify your hiring with AI-powered candidate matching and filtering
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Feature emoji="🎯" title="AI Screening" desc="Let AI pre-screen candidates based on job requirements" />
        <Feature emoji="🧭" title="Smart Matching" desc="Find candidates that align with your team culture" />
        <Feature emoji="⏱️" title="Time Saving" desc="Reduce hiring time from months to weeks" />
        <Feature emoji="📈" title="Better Hires" desc="Data-driven insights lead to better hiring decisions" />
      </div>
    </section>
  );
};

export default Companies;

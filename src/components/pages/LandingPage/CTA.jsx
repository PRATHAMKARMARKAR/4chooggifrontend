import React from "react";

const CTA = () => {
  return (
    <section className="py-16 mt-8 rounded-lg bg-gradient-to-r from-[#e6ebff] to-[#f4f6ff]">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-extrabold text-primary">
          Ready to transform your career?
        </h3>
        <p className="text-muted mt-3">
          Join thousands of job seekers who have found their perfect role with AutoApply.
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-[#1f3bff] to-[#2b9bff] shadow-soft-lg">
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;

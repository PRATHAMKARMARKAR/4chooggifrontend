import React from "react";

const TestiCard = ({ quote, name, role, emoji }) => (
  <div className="card p-6">
    <div className="text-2xl mb-3">{emoji}</div>
    <blockquote className="italic text-muted">"{quote}"</blockquote>
    <div className="mt-4">
      <div className="font-semibold text-primary">{name}</div>
      <div className="text-sm text-muted">{role}</div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-primary">Loved by job seekers</h2>
        <p className="text-muted mt-2">Join thousands who've found success</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <TestiCard quote="I got hired 3 months faster with AutoApply. The AI matching was spot on." name="Sarah Chen" role="Software Engineer" emoji="👩‍💻" />
        <TestiCard quote="Finally, a platform that understands my career. Saved me countless hours." name="Marcus Rodriguez" role="Product Manager" emoji="👨‍💼" />
        <TestiCard quote="The auto-apply feature is a game changer. I'm now at my dream company." name="Emily Watson" role="Data Scientist" emoji="👩‍🔬" />
      </div>
    </section>
  );
};

export default Testimonials;

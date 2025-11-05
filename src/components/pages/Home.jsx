import React from "react";
import Header from "./LandingPage/Header";
import Hero from "./LandingPage/Hero";
import HowItWorks from "./LandingPage/HowItWorks";
import Companies from "./LandingPage/Companies";
import Testimonials from "./LandingPage/Testimonials";
import CTA from "./LandingPage/CTA";
import Footer from "./LandingPage/Footer";
export default function App() {
  return (
    <div className="min-h-screen text-primary bg-[radial-gradient(60%_60%_at_85%_15%,rgba(57,49,107,0.06),transparent),radial-gradient(50%_50%_at_10%_90%,rgba(88,96,255,0.03),transparent),#fffafc]">
      <Header />
      <main className="max-w-7xl mx-auto px-6">
        <Hero />
        <HowItWorks />
        <Companies />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

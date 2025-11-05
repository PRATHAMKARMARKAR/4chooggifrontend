import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 border-t pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6">
        <div>
          <div className="font-bold text-primary">AutoApply</div>
          <div className="text-muted mt-2">Your career, automated.</div>
        </div>

        <div>
          <div className="font-semibold">Product</div>
          <ul className="mt-2 text-muted space-y-1">
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-2 text-muted space-y-1">
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-2 text-muted space-y-1">
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center text-muted mt-8">
        © 2025 AutoApply.AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CustomCursor } from "./ui/CustomCursor";
import { MagneticButton } from "./ui/MagneticButton";

export const SiteLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.backgroundColor = "#020617";
    document.body.style.color = "#F8FAFC";

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      const currentTheme = localStorage.getItem("theme") || "light";
      if (currentTheme !== "dark") {
        document.documentElement.classList.remove("dark");
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] selection:bg-[#2563EB]/30 overflow-x-hidden font-sans">
      
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-white/5 bg-[#020617]/50 backdrop-blur-xl z-50 flex items-center">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#14B8A6] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Dentivis
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]">
            <Link to="/platform" className="hover:text-white transition-colors">Platform</Link>
            <Link to="/features" className="hover:text-white transition-colors">Features</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-white hover:text-[#14B8A6] transition-colors">Log In</Link>
            <MagneticButton variant="primary" onClick={() => navigate('/signup')} className="px-5 py-2.5 text-sm h-auto">
              Get Started
            </MagneticButton>
          </div>
        </div>
      </nav>

      <main className="w-full">
        <Outlet />
      </main>

      <footer className="bg-[#020617] border-t border-white/5 py-12 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <Link to="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#14B8A6] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Dentivis
              </Link>
              <p className="text-[#94A3B8] max-w-sm font-light">
                Reimagining orthodontics through powerful artificial intelligence and cinematic WebGL rendering.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#F8FAFC] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><Link to="/platform" className="hover:text-white transition-colors">Platform</Link></li>
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#F8FAFC] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-sm flex flex-col md:flex-row items-center justify-between text-[#94A3B8]">
            <p>&copy; {new Date().getFullYear()} Dentivis. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

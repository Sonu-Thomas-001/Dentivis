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

      <footer className="relative bg-[#020617] border-t border-white/5 pt-24 pb-12 overflow-hidden mt-20">
        {/* Deep Field Glow / Ambient Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/10 blur-[150px] rounded-[100%] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16 mb-24">
            
            {/* Brand & Mission */}
            <div className="w-full lg:w-1/3">
              <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-3 mb-6 relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#14B8A6] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-500">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Dentivis
              </Link>
              <p className="text-[#64748B] text-lg font-light leading-relaxed mb-8 max-w-sm">
                Reimagining orthodontics through powerful artificial intelligence and cinematic WebGL rendering.
              </p>
              
              {/* Socials */}
              <div className="flex gap-4">
                {['X', 'IN', 'IG'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#64748B] bg-white/5 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                    <span className="text-xs font-mono font-medium">{social}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Nav Columns */}
            <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-12 text-sm justify-end xl:pl-20">
              
              <div className="flex flex-col">
                <h4 className="font-mono text-xs text-white/40 mb-8 uppercase tracking-widest">Platform</h4>
                <ul className="space-y-4 flex flex-col items-start">
                  {['AI Analysis', 'CBCT Engine', 'Staging', 'Pricing'].map((item) => (
                    <li key={item}>
                      <Link to={item === 'Pricing' ? '/pricing' : '/features'} className="text-[#94A3B8] hover:text-[#14B8A6] transition-colors flex items-center gap-3 group overflow-hidden">
                        <span className="w-0 h-[1px] bg-[#14B8A6] transition-all duration-300 group-hover:w-3" /> 
                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <h4 className="font-mono text-xs text-white/40 mb-8 uppercase tracking-widest">Company</h4>
                <ul className="space-y-4 flex flex-col items-start">
                  {[
                    { label: 'Vision', path: '/about' },
                    { label: 'Contact', path: '/contact' },
                    { label: 'Journal', path: '/blog' },
                    { label: 'Case Studies', path: '/cases' }
                  ].map((item) => (
                    <li key={item.label}>
                      <Link to={item.path} className="text-[#94A3B8] hover:text-white transition-colors flex items-center gap-3 group overflow-hidden">
                        <span className="w-0 h-[1px] bg-white/50 transition-all duration-300 group-hover:w-3" /> 
                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col col-span-2 md:col-span-1 mt-8 md:mt-0">
                <h4 className="font-mono text-xs text-white/40 mb-8 uppercase tracking-widest">Legal</h4>
                <ul className="space-y-4 flex flex-col items-start">
                  {['Terms of Service', 'Privacy Policy', 'HIPAA Compliance'].map((item) => (
                    <li key={item}>
                      <Link to="#" className="text-[#94A3B8] hover:text-white transition-colors flex items-center gap-3 group overflow-hidden">
                        <span className="w-0 h-[1px] bg-white/50 transition-all duration-300 group-hover:w-3" /> 
                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Epic Footer Typography */}
          <div className="w-full flex items-center justify-center py-16 relative overflow-hidden pointer-events-none">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-[12vw] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white/20 to-white/0 select-none leading-none mr-[-1vw]"
            >
              DENTIVIS
            </motion.h1>
            
            {/* Shine crossing the text */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] w-32 blur-md"
              animate={{ left: ['-20%', '120%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[#64748B] text-xs font-mono uppercase tracking-widest gap-4">
            <p>System Online &copy; {new Date().getFullYear()}</p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-3 text-white/40">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </div>
                All Systems Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

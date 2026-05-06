import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Users, Activity, Sparkles, ChevronRight, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white relative font-sans">
      {/* Dynamic Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-[-20%] w-[800px] h-[800px] bg-gradient-to-bl from-[#2563EB]/20 to-transparent blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-tr from-[#14B8A6]/20 to-transparent blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </motion.div>

      <div className="pt-40 px-6 relative z-10 pb-40">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="max-w-3xl mb-32">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
               <Sparkles className="w-4 h-4 text-[#14B8A6]" />
               <span className="text-xs font-medium text-[#94A3B8] tracking-wider uppercase">Our Story</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-[1.1]">
               Reversing the paradigm of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">clinical software.</span>
             </h1>
             <p className="text-xl md:text-2xl text-[#94A3B8] font-light leading-relaxed">
               For too long, the industry has relied on disjointed, slow, and manual tools. Dentivis is the answer: a unified, AI-native platform designed for the future of dentistry.
             </p>
          </motion.div>

          {/* Pillars */}
          <div className="grid md:grid-cols-2 gap-8 mb-40">
             <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="group p-10 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-xl relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-16 h-16 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center mb-8 relative shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[#2563EB]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Users className="w-8 h-8 text-[#2563EB] relative z-10" />
                </div>
                <h3 className="text-3xl font-semibold mb-4 tracking-tight">Founded by Experts</h3>
                <p className="text-[#94A3B8] text-lg leading-relaxed font-light">Built collaboratively by a coalition of elite, forward-thinking orthodontists and top-tier machine learning engineers from leading tech companies.</p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               whileInView={{ opacity: 1, y: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="group p-10 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-xl relative overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-16 h-16 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center mb-8 relative shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[#14B8A6]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Activity className="w-8 h-8 text-[#14B8A6] relative z-10" />
                </div>
                <h3 className="text-3xl font-semibold mb-4 tracking-tight">Clinical Precision</h3>
                <p className="text-[#94A3B8] text-lg leading-relaxed font-light">Our AI never replaces the doctor; it empowers human expertise with superhuman analytical speed, sub-millimeter precision, and bias-free calculations.</p>
             </motion.div>
          </div>
          
          {/* Timeline / Evolution */}
          <div className="relative">
            <h2 className="text-4xl font-bold mb-16 tracking-tighter text-center">The Evolution</h2>
            
            <div className="absolute top-24 bottom-0 left-8 md:left-1/2 w-[1px] bg-gradient-to-b from-[#2563EB] via-[#14B8A6] to-transparent hidden md:block"></div>
            
            <div className="space-y-24">
               {[
                 { year: "2023", title: "The Inception", desc: "Started as a research project aiming to apply advanced neural networks to raw CBCT scans without manual segmentation." },
                 { year: "2024", title: "First Neural Model", desc: "Achieved 99.4% accuracy in identifying individual teeth, roots, and bone density from messy, unoptimized clinical data." },
                 { year: "2025", title: "Platform Launch", desc: "Released the unified WebGL platform, allowing seamless 3D rendering and planning directly in the browser." },
               ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                     <div className="w-full md:w-1/2 flex flex-col justify-center px-12">
                        <div className="text-6xl font-black text-white/5 mb-4">{item.year}</div>
                        <h4 className="text-3xl font-bold mb-4">{item.title}</h4>
                        <p className="text-[#94A3B8] text-lg leading-relaxed font-light">{item.desc}</p>
                     </div>
                     <div className="w-full md:w-1/2 flex justify-center relative">
                        <div className="w-8 h-8 rounded-full bg-[#020617] border-4 border-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.5)] z-10 md:absolute md:left-1/2 md:-translate-x-1/2"></div>
                        <div className="w-full h-[200px] rounded-3xl bg-[#0F172A]/50 border border-white/5 mt-8 md:mt-0 opacity-50"></div>
                     </div>
                  </motion.div>
               ))}
            </div>
          </div>
          
          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-40 p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-[#2563EB]/20 via-[#0F172A] to-[#14B8A6]/20 border border-white/10 text-center relative overflow-hidden"
          >
             <Brain className="w-24 h-24 text-white/10 absolute top-[-20px] right-[-20px] rotate-12" />
             <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Ready to see the future?</h2>
             <p className="text-xl text-[#94A3B8] font-light mb-10 max-w-2xl mx-auto">Experience the platform that is defining the next generation of orthodontic care.</p>
             <Link to="/platform" className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform group">
                Explore Platform <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
             </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

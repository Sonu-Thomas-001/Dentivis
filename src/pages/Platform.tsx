import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Database, Network, Box, Lock, Cpu, Server, Activity, ArrowRight, ShieldCheck, Layers, GitMerge } from "lucide-react";
import { Link } from "react-router-dom";
import { TiltCard } from "../components/ui/TiltCard";

export const Platform = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rotateLines = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white relative font-sans overflow-hidden">
      
      {/* Immersive Tech Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
         <div className="absolute top-0 right-0 w-full h-[1000px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2563EB]/30 via-[#020617] to-transparent mix-blend-screen duration-1000"></div>
         <div className="absolute bottom-0 left-0 w-full h-[1000px] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#14B8A6]/20 via-[#020617] to-transparent mix-blend-screen"></div>
         
         {/* Abstract neural lines */}
         <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
               <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
               <circle cx="0" cy="0" r="2" fill="white" />
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-40 pb-40">
        
        {/* Header Segment */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="text-center max-w-4xl mx-auto mb-40 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl relative z-10">
             <Server className="w-4 h-4 text-[#2563EB]" />
             <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">System Architecture</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1] relative z-10">
             The neural <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">infrastructure.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#94A3B8] font-light leading-relaxed relative z-10 max-w-3xl mx-auto">
            Built on a proprietary tech stack combining WebGL, localized LLMs, and distributed GPU compute to deliver 60FPS clinical 3D rendering directly in the browser.
          </p>
        </motion.div>

        {/* Core Architecture Nodes Using TiltCard */}
        <div className="relative mb-40">
           {/* Animated connection lines */}
           <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent hidden lg:block -translate-y-1/2 blur-[1px]"></div>
           
           <div className="grid lg:grid-cols-3 gap-8">
             {[
                { icon: <Cpu className="w-12 h-12 text-[#2563EB]" />, bgIcon: <Cpu className="w-32 h-32 text-white/5" />, title: "Inference Engine", subtitle: "Edge & Cloud ML", desc: "Our models utilize hybrid inference, performing heavy segmentation on our server farm while handling real-time prediction updates locally via WebAssembly.", color: "#2563EB" },
                { icon: <Layers className="w-12 h-12 text-[#14B8A6]" />, bgIcon: <Layers className="w-32 h-32 text-white/5" />, title: "WebGPU Renderer", subtitle: "Zero Installation", desc: "Experience desktop-class graphics in Chrome. We leverage the latest WebGPU APIs for massive parallel processing of millions of volumetric vertices.", color: "#14B8A6" },
                { icon: <GitMerge className="w-12 h-12 text-[#6366F1]" />, bgIcon: <GitMerge className="w-32 h-32 text-white/5" />, title: "Data Symphony", subtitle: "DICOM Fusion", desc: "A robust pipeline capable of fusing raw CBCT (DICOM) and surface scans (STL/PLY) into a mathematically unified volumetric representation instantly.", color: "#6366F1" }
             ].map((node, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className="h-full"
                >
                  <TiltCard tiltStrength={6} glowColor={`rgba(255,255,255,0.05)`} className="h-full p-12 rounded-[3.5rem] bg-[#0F172A]/60 border border-white/5 backdrop-blur-3xl relative group overflow-hidden flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                    
                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                       {node.bgIcon}
                    </div>
                    
                    <div className="mb-10 relative z-10">
                      <div className="w-24 h-24 rounded-[2rem] bg-[#020617] border border-white/10 flex items-center justify-center relative shadow-[0_0_30px_rgba(37,99,235,0.1)] group-hover:scale-110 transition-transform duration-500">
                        {node.icon}
                        <div className="absolute inset-0 bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" style={{ backgroundColor: `${node.color}20` }}></div>
                      </div>
                    </div>
                    
                    <div className="flex-grow z-10 relative">
                      <div className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: node.color }}>{node.subtitle}</div>
                      <h3 className="text-3xl font-black mb-4 tracking-tight">{node.title}</h3>
                      <p className="text-[#94A3B8] font-light leading-relaxed text-lg">{node.desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
             ))}
           </div>
        </div>

        {/* Security & Compliance Section - Cinematic update */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="p-12 md:p-24 rounded-[4rem] bg-[#020617] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-16 shadow-[0_0_100px_rgba(20,184,166,0.05)]"
        >
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
           <div className="absolute right-0 top-0 w-[800px] h-full bg-gradient-to-l from-[#14B8A6]/10 to-transparent pointer-events-none blur-[100px]"></div>
           <div className="absolute left-[-100px] bottom-[-100px] w-64 h-64 bg-[#2563EB]/10 rounded-full blur-[100px]"></div>
           
           <div className="w-full md:w-1/3 flex justify-center relative z-10">
             <div className="relative">
                <div className="w-40 h-40 rounded-full border border-white/10 flex items-center justify-center relative z-10 bg-[#0F172A]/50 backdrop-blur-md shadow-[0_0_50px_rgba(20,184,166,0.2)]">
                   <Lock className="w-16 h-16 text-[#14B8A6]" />
                </div>
                <motion.div 
                   animate={{ rotate: 360 }} 
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-30%] rounded-full border border-dashed border-[#14B8A6]/30"
                ></motion.div>
                <motion.div 
                   animate={{ rotate: -360 }} 
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-60%] rounded-full border border-[#2563EB]/20 border-b-transparent"
                ></motion.div>
             </div>
           </div>
           
           <div className="w-full md:w-2/3 relative z-10 mt-16 md:mt-0">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
                <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">Military-Grade Defense</span>
             </div>
             <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">Zero-Trust Clinical Security</h2>
             <p className="text-2xl text-[#94A3B8] font-light leading-relaxed mb-12">
               Your patient data is heavily encrypted both at rest and in transit. We are fully HIPAA, GDPR, and SOC2 Type II compliant right out of the box. No manual configuration required.
             </p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['HIPAA', 'SOC2 Type II', 'GDPR', 'E2E Encryption'].map((badge, i) => (
                  <div key={i} className="h-20 rounded-2xl bg-white/5 border border-white/10 text-center text-sm font-bold text-white flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors shadow-inner">
                    <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />
                    {badge}
                  </div>
                ))}
             </div>
           </div>
        </motion.div>

        {/* Future CTA */}
        <div className="mt-40 text-center relative z-10">
           <Link to="/features" className="group inline-flex items-center gap-6 text-3xl md:text-5xl font-black hover:text-[#14B8A6] transition-colors tracking-tighter">
              Explore the Feature Matrix 
              <span className="w-16 h-16 rounded-[2rem] bg-white text-[#020617] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#14B8A6] transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <ArrowRight className="w-8 h-8" />
              </span>
           </Link>
        </div>

      </div>
    </div>
  );
};

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Database, Network, Box, Lock, Cpu, Server, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const Platform = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rotateLines = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white relative font-sans overflow-hidden">
      
      {/* Immersive Tech Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none opacity-40">
         <div className="absolute top-0 right-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#2563EB]/20 via-[#020617] to-transparent"></div>
         <div className="absolute bottom-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#14B8A6]/20 via-[#020617] to-transparent"></div>
         
         <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-40 pb-40">
        
        {/* Header Segment */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center max-w-4xl mx-auto mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
             <Server className="w-4 h-4 text-[#2563EB]" />
             <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">System Architecture</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
             The neural <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">infrastructure.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#94A3B8] font-light leading-relaxed">
            Built on a proprietary tech stack combining WebGL, localized LLMs, and distributed GPU compute to deliver 60FPS clinical 3D rendering.
          </p>
        </motion.div>

        {/* Core Architecture Nodes */}
        <div className="relative mb-40">
           {/* Animated connection lines */}
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent hidden lg:block -translate-y-1/2"></div>
           
           <div className="grid lg:grid-cols-3 gap-8">
             {[
                { icon: <Cpu className="w-8 h-8 text-[#2563EB]" />, title: "Inference Engine", subtitle: "Edge & Cloud ML", desc: "Our models utilize hybrid inference, performing heavy segmentation on our server farm while handling real-time prediction updates locally via WebAssembly." },
                { icon: <Box className="w-8 h-8 text-[#14B8A6]" />, title: "WebGPU Renderer", subtitle: "Zero Installation", desc: "Experience desktop-class graphics. We leverage the latest WebGPU APIs for massive parallel processing of millions of vertices." },
                { icon: <Network className="w-8 h-8 text-[#6366F1]" />, title: "Data Symphony", subtitle: "DICOM Fusion", desc: "A robust pipeline capable of fusing raw CBCT (DICOM) and surface scans (STL/PLY) into a unified volumetric representation instantly." }
             ].map((node, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="p-10 rounded-[2.5rem] bg-[#0F172A]/80 border border-white/5 backdrop-blur-2xl relative group hover:border-white/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="mb-8 relative">
                    <div className="w-16 h-16 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center relative z-10">
                      {node.icon}
                    </div>
                    {/* Glow effect behind icon */}
                    <div className="absolute top-1/2 left-8 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                  </div>
                  
                  <div className="text-sm font-mono text-[#14B8A6] mb-2">{node.subtitle}</div>
                  <h3 className="text-2xl font-bold mb-4">{node.title}</h3>
                  <p className="text-[#94A3B8] font-light leading-relaxed">{node.desc}</p>
                </motion.div>
             ))}
           </div>
        </div>

        {/* Security & Compliance Section */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="p-12 md:p-20 rounded-[3rem] bg-[#020617] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center gap-12"
        >
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
           <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#14B8A6]/10 to-transparent pointer-events-none"></div>
           
           <div className="w-full md:w-1/3 flex justify-center">
             <div className="relative">
                <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center relative z-10 bg-[#0F172A]/50 backdrop-blur-md">
                   <Lock className="w-12 h-12 text-[#14B8A6]" />
                </div>
                <motion.div 
                   animate={{ rotate: 360 }} 
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-20%] rounded-full border border-dashed border-[#14B8A6]/30"
                ></motion.div>
                <motion.div 
                   animate={{ rotate: -360 }} 
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-40%] rounded-full border border-[#2563EB]/20"
                ></motion.div>
             </div>
           </div>
           
           <div className="w-full md:w-2/3">
             <h2 className="text-4xl font-bold mb-6 tracking-tight">Zero-Trust Clinical Security</h2>
             <p className="text-xl text-[#94A3B8] font-light leading-relaxed mb-8">
               Your patient data is heavily encrypted both at rest and in transit. We are fully HIPAA, GDPR, and SOC2 Type II compliant right out of the box. No manual configuration required.
             </p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['HIPAA', 'SOC2 Type II', 'GDPR', 'E2E Encryption'].map((badge, i) => (
                  <div key={i} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-center text-sm font-medium text-white flex flex-col items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
                    {badge}
                  </div>
                ))}
             </div>
           </div>
        </motion.div>

        {/* Future CTA */}
        <div className="mt-40 text-center">
           <Link to="/features" className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-bold hover:text-[#14B8A6] transition-colors">
              Explore the Feature Matrix 
              <span className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#14B8A6] group-hover:text-[#020617] transition-all">
                <ArrowRight className="w-6 h-6" />
              </span>
           </Link>
        </div>

      </div>
    </div>
  );
};

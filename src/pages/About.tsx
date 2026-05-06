import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Users, Activity, Sparkles, ChevronRight, Brain, Milestone, GitBranch, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { TiltCard } from "../components/ui/TiltCard";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white relative font-sans">
      {/* Dynamic Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        {/* Core lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />
        <div className="absolute top-0 right-[-20%] w-[1000px] h-[1000px] bg-gradient-to-bl from-[#2563EB]/10 via-transparent to-transparent blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute top-[40%] left-[-20%] w-[800px] h-[800px] bg-gradient-to-tr from-[#14B8A6]/10 via-transparent to-transparent blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </motion.div>

      <div className="pt-40 px-6 relative z-10 pb-40">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 1, ease: "easeOut" }} 
             className="max-w-4xl mx-auto text-center mb-40 relative"
          >
             <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#2563EB]/10 blur-[100px] rounded-full pointer-events-none -z-10" />
             
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
               <Sparkles className="w-4 h-4 text-[#14B8A6]" />
               <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">The Dentivis Protocol</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
               Reversing the paradigm of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">clinical software.</span>
             </h1>
             <p className="text-xl md:text-3xl text-[#94A3B8] font-light leading-relaxed max-w-3xl mx-auto">
               For too long, the industry has relied on disjointed, slow, and manual tools. Dentivis is the answer: a unified, AI-native platform designed for the future of dentistry.
             </p>
          </motion.div>

          {/* Pillars Using TiltCards */}
          <div className="grid md:grid-cols-2 gap-8 mb-40">
             <motion.div 
               initial={{ opacity: 0, x: -50 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
             >
                <TiltCard tiltStrength={5} glowColor="rgba(37,99,235,0.2)" className="h-full p-12 rounded-[3.5rem] bg-[#0F172A]/40 border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
                     <Users className="w-40 h-40 text-[#2563EB]" />
                  </div>
                  
                  <div className="w-20 h-20 rounded-[2rem] bg-[#020617] border border-white/10 flex items-center justify-center mb-10 relative shadow-[0_0_30px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#2563EB]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Users className="w-10 h-10 text-[#2563EB] relative z-10" />
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tight relative z-10">Founded by Experts</h3>
                  <p className="text-[#94A3B8] text-xl leading-relaxed font-light relative z-10">Built collaboratively by a coalition of elite, forward-thinking orthodontists and top-tier machine learning engineers from leading tech companies.</p>
                </TiltCard>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 50 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                <TiltCard tiltStrength={5} glowColor="rgba(20,184,166,0.2)" className="h-full p-12 rounded-[3.5rem] bg-[#0F172A]/40 border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
                     <Activity className="w-40 h-40 text-[#14B8A6]" />
                  </div>

                  <div className="w-20 h-20 rounded-[2rem] bg-[#020617] border border-white/10 flex items-center justify-center mb-10 relative shadow-[0_0_30px_rgba(20,184,166,0.2)] group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#14B8A6]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Activity className="w-10 h-10 text-[#14B8A6] relative z-10" />
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tight relative z-10">Clinical Precision</h3>
                  <p className="text-[#94A3B8] text-xl leading-relaxed font-light relative z-10">Our AI never replaces the doctor; it empowers human expertise with superhuman analytical speed, sub-millimeter precision, and bias-free calculations.</p>
                </TiltCard>
             </motion.div>
          </div>
          
          {/* Timeline / Evolution - Cinematic redesign */}
          <div className="relative mb-40">
            <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">The Evolution</h2>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
               <div className="absolute top-0 bottom-0 left-[2rem] md:left-1/2 w-[2px] bg-gradient-to-b from-[#2563EB] via-[#14B8A6] to-transparent bg-[length:100%_200%] animate-gradient"></div>
               
               <div className="space-y-32">
                  {[
                    { year: "2023", title: "The Inception", desc: "Started as a research project aiming to apply advanced neural networks to raw CBCT scans without manual segmentation.", icon: Milestone },
                    { year: "2024", title: "First Neural Model", desc: "Achieved 99.4% accuracy in identifying individual teeth, roots, and bone density from messy, unoptimized clinical data.", icon: Brain },
                    { year: "2025", title: "Platform Launch", desc: "Released the unified WebGL platform, allowing seamless 3D rendering and planning directly in the browser.", icon: Target },
                  ].map((item, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0, y: 50 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       transition={{ duration: 0.8 }}
                       className={`flex flex-col md:flex-row items-center gap-12 relative ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                     >
                        <div className={`w-full md:w-1/2 flex flex-col justify-center ${i % 2 === 0 ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'} pl-20 md:pl-0`}>
                           <div className="text-sm font-mono text-[#14B8A6] tracking-widest uppercase mb-4 flex items-center gap-2 justify-start md:justify-end">
                             {i % 2 !== 0 && <span className="hidden md:inline">Phase</span>} {item.year} {i % 2 === 0 && <span className="hidden md:inline">Phase</span>}
                           </div>
                           <h4 className="text-4xl font-black mb-4">{item.title}</h4>
                           <p className="text-[#94A3B8] text-xl leading-relaxed font-light">{item.desc}</p>
                        </div>

                        {/* Central Node */}
                        <div className="absolute left-[2rem] md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-[2rem] bg-[#020617] border-2 border-[#2563EB] shadow-[0_0_30px_rgba(37,99,235,0.4)] z-10 flex items-center justify-center group transform transition-transform duration-500 hover:scale-125">
                           <item.icon className="w-6 h-6 text-[#14B8A6] group-hover:animate-pulse" />
                           <div className="absolute inset-0 bg-[#2563EB]/20 blur-xl rounded-full opacity-50 font-mono"></div>
                        </div>

                        <div className="w-full md:w-1/2 hidden md:flex justify-center px-12">
                           <div className="w-full h-[250px] rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 relative overflow-hidden group">
                              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                              <div className={`absolute top-1/2 ${i % 2 === 0 ? 'left-0' : 'right-0'} -translate-y-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent opacity-50`}></div>
                              
                              {/* Abstract visual inside timeline card */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                 <motion.div 
                                    className="w-24 h-24 border border-white/10 rounded-full"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity, delay: i }}
                                 />
                                 <item.icon className="w-12 h-12 text-white/20 absolute" />
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
          </div>
          
          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-[#2563EB]/20 via-[#0F172A] to-[#14B8A6]/20 border border-white/10 text-center relative overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.1)] group"
          >
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
             <motion.div 
                className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[2px]"
                animate={{ left: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
             />
             <Brain className="w-40 h-40 text-white/5 absolute top-[-40px] right-[-40px] rotate-12 group-hover:rotate-45 group-hover:scale-125 transition-all duration-[2s]" />
             
             <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Ready to see the future?</h2>
                <p className="text-2xl text-[#94A3B8] font-light mb-12 max-w-2xl mx-auto">Experience the platform that is defining the next generation of orthodontic care.</p>
                <Link to="/platform" className="inline-flex items-center justify-center h-16 w-64 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all group/btn border border-white">
                   Explore Platform <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

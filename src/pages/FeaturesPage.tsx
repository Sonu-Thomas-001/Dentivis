import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, Brain, CheckCircle, View, Crosshair, Network, Cloud } from "lucide-react";

export const FeaturesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white relative overflow-hidden font-sans pb-40">
      
      {/* Background Ambience */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-l from-[#2563EB]/20 to-transparent blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute top-[60%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-r from-[#14B8A6]/20 to-transparent blur-[150px] rounded-full mix-blend-screen opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </motion.div>

      <div className="pt-40 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="text-center mb-32"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
               <Sparkles className="w-4 h-4 text-[#14B8A6]" />
               <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">Feature Matrix</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
              Everything you need. <br/> <span className="text-white/20">Nothing you don't.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#94A3B8] font-light max-w-3xl mx-auto leading-relaxed">
              A comprehensive suite of tools specifically engineered for modern orthodontic practices to diagnose, plan, and execute with absolute clarity.
            </p>
          </motion.div>
          
          <div className="space-y-40">
             {/* Feature 1: Neural Segmentation */}
             <div className="flex flex-col md:flex-row gap-16 items-center">
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1 }}
                 className="w-full md:w-1/2 p-12 rounded-[3rem] bg-gradient-to-br from-[#2563EB]/10 via-[#0F172A] to-transparent border border-white/10 h-[500px] flex items-center justify-center relative overflow-hidden group shadow-2xl"
               >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover opacity-10 mix-blend-screen group-hover:scale-105 transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent"></div>
                  
                  <div className="relative z-10 w-40 h-40 rounded-full border border-[#2563EB]/30 flex items-center justify-center">
                     <Brain className="w-16 h-16 text-[#2563EB]" />
                     <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20%] rounded-full border-t border-r border-[#2563EB]/50"></motion.div>
                     <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-40%] rounded-full border-b border-l border-[#14B8A6]/50"></motion.div>
                  </div>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1 }}
                 className="w-full md:w-1/2"
               >
                  <div className="text-sm font-mono text-[#2563EB] mb-4 tracking-widest uppercase">Machine Vision</div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Neural Segmentation</h2>
                  <p className="text-[#94A3B8] text-xl mb-10 leading-relaxed font-light">
                    Our core model instantly identifies crowns, roots, and bone structures from raw CBCT data with unprecedented accuracy, allowing you to bypass hours of manual tracing.
                  </p>
                  <ul className="space-y-6">
                    {[
                      { title: 'Sub-millimeter crown isolation', desc: 'Isolates each tooth with pixel-perfect boundaries regardless of crowding.' },
                      { title: 'Root & bone collision detection', desc: 'Predicts exact root torque limits against cortical plates.' },
                      { title: 'Automatic landmark placement', desc: 'Places 120+ cephalometric landmarks instantly.' }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="mt-1"><CheckCircle className="w-6 h-6 text-[#2563EB]" /></div>
                        <div>
                          <span className="text-lg text-white font-medium block mb-1">{item.title}</span>
                          <span className="text-[#94A3B8] text-sm">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
               </motion.div>
             </div>

             {/* Feature 2: Predictive Biomechanics */}
             <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
               <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1 }}
                 className="w-full md:w-1/2 p-12 rounded-[3rem] bg-gradient-to-bl from-[#14B8A6]/10 via-[#0F172A] to-transparent border border-white/10 h-[500px] flex items-center justify-center relative overflow-hidden group shadow-2xl"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative z-10 w-full h-full border border-[#14B8A6]/20 rounded-2xl bg-[#020617]/50 backdrop-blur-sm p-6 flex flex-col justify-end">
                     <div className="absolute top-6 left-6 flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-[#14B8A6] animate-pulse"></div>
                       <span className="text-xs font-mono text-[#14B8A6]">SIMULATION ACTIVE</span>
                     </div>
                     <div className="w-full h-1/2 bg-gradient-to-t from-[#14B8A6]/20 to-transparent rounded-lg border-b-2 border-[#14B8A6] relative">
                       {/* Abstract Force Vectors */}
                       <div className="absolute bottom-4 left-[20%] w-0.5 h-12 bg-white/50 rotate-12"></div>
                       <div className="absolute bottom-4 left-[50%] w-0.5 h-20 bg-[#14B8A6] -rotate-12"></div>
                       <div className="absolute bottom-4 right-[20%] w-0.5 h-16 bg-white/50 rotate-45"></div>
                     </div>
                  </div>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1 }}
                 className="w-full md:w-1/2"
               >
                  <div className="text-sm font-mono text-[#14B8A6] mb-4 tracking-widest uppercase">Physics Engine</div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Predictive Biomechanics</h2>
                  <p className="text-[#94A3B8] text-xl mb-10 leading-relaxed font-light">
                    Every aligner stage is simulated using finite element analysis (FEA). We don't just animate movement; we calculate the actual forces applied to the PDL.
                  </p>
                  <ul className="space-y-6">
                    {[
                      { title: 'Force-driven staging', desc: 'Prevents impossible movements like unpredictable extrusions.' },
                      { title: 'Attachment optimization', desc: 'AI suggests attachment shapes based on required force vectors.' },
                      { title: 'Root resorption warnings', desc: 'Alerts if planned movement exceeds safe physiological limits.' }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="mt-1"><Crosshair className="w-6 h-6 text-[#14B8A6]" /></div>
                        <div>
                          <span className="text-lg text-white font-medium block mb-1">{item.title}</span>
                          <span className="text-[#94A3B8] text-sm">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
               </motion.div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Activity, Sparkles, Database, Network, Lock, Layers } from "lucide-react";
import { CinematicBackground } from "../components/layout/CinematicBackground";
import { GradientText } from "../components/ui/GradientText";
import { cinematicReveal } from "../components/animations/Timeline";

export const Landing = () => {
  return (
    <div className="w-full relative bg-transparent font-sans text-white overflow-hidden pb-40">
      <CinematicBackground />

      <main className="relative z-10 w-full flex flex-col">
        <HeroSection />
        <TrustedBy />
        <WorkflowScroller />
        <IntelligenceSection />
        <FeatureBento />
        <FinalCTA />
      </main>
    </div>
  );
};

// --- Sections ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleText = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pb-[10vh] px-6 overflow-hidden">
      
      <motion.div 
        style={{ y: yText, opacity: opacityText, scale: scaleText }}
        className="w-full max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 pointer-events-none"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0F172A]/80 border border-white/10 backdrop-blur-xl mb-12 shadow-[0_0_40px_rgba(37,99,235,0.2)] relative overflow-hidden group pointer-events-auto"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/0 via-[#14B8A6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-[200%] -translate-x-full group-hover:translate-x-0 ease-linear"></div>
           <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
           <span className="text-sm font-semibold tracking-widest uppercase text-[#E2E8F0]">Dentivis OS 2.0 Live</span>
        </motion.div>
        
        <motion.h1 
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
           className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 relative drop-shadow-2xl"
        >
           <span className="text-white">Reimagining Orthodontics</span><br/>
           <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#2563EB] via-[#14B8A6] to-white">Through Intelligence.</span>
        </motion.h1>
        
        <motion.p 
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
           className="text-xl md:text-2xl text-[#94A3B8] max-w-3xl mb-12 font-medium leading-relaxed drop-shadow-md"
        >
           Dentivis merges AI, simulation, and precision into a new era of orthodontic planning.
        </motion.p>
        
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto pointer-events-auto"
        >
           <Link to="/platform" className="w-full sm:w-auto relative group flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative px-10 py-5 bg-white text-[#020617] font-bold text-lg rounded-full flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300">
                Explore Platform <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
           </Link>
           <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-[#0F172A]/80 backdrop-blur-md border border-white/10 text-white font-bold text-lg rounded-full flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#14B8A6] transition-colors">Request Live Demo</span>
           </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

const TrustedBy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) cinematicReveal(containerRef.current);
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 py-12 border-y border-white/5 bg-[#0F172A]/40 backdrop-blur-sm overflow-hidden mix-blend-screen">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
         <span className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest shrink-0">Trusted by modern labs</span>
         <div className="flex-1 w-full flex justify-between items-center opacity-40 grayscale gap-8 overflow-x-auto no-scrollbar">
            {["AlignTech", "ClearCorrect", "OrthoLab", "SmileDirect", "DentalCorp", "Straumann"].map((name, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold font-heading shrink-0 hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                {name}
              </span>
            ))}
         </div>
      </div>
    </section>
  );
};

const WorkflowScroller = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    if (containerRef.current) cinematicReveal(containerRef.current);
  }, []);

  return (
    <section ref={containerRef} className="py-40 relative z-10">
       <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             
             {/* Text Content */}
             <div className="space-y-16">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-8">
                     <Layers className="w-4 h-4 text-[#14B8A6]" />
                     <span className="text-xs font-bold text-[#14B8A6] tracking-widest uppercase">Deep Integration</span>
                   </div>
                   <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tighter mb-8">
                     The entire diagnostic pipeline, <br/> <GradientText>unified.</GradientText>
                   </h2>
                   <p className="text-xl text-[#94A3B8] font-light leading-relaxed">
                     No more switching between viewer software, segmentation tools, and aligner staging platforms. We built a single, continuous workflow.
                   </p>
                </div>
                
                <div className="space-y-10">
                   {[
                     { num: "01", title: "Ingestion", desc: "Drag and drop DICOM volumes. The neural engine cleans scatter and artifacts automatically." },
                     { num: "02", title: "Segmentation", desc: "Instant bounding boxes and voxel-perfect masks for crowns, roots, and bone structures." },
                     { num: "03", title: "Biomechanics", desc: "Finite element analysis suggests force-optimal staging and attachment placement." }
                   ].map((step, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true, margin: "-100px" }}
                       transition={{ duration: 0.8, delay: i * 0.2 }}
                       className="flex gap-6 group cursor-default"
                     >
                        <div className="text-3xl font-black text-transparent bg-clip-text bg-white/20 group-hover:bg-gradient-to-br group-hover:from-[#2563EB] group-hover:to-[#14B8A6] transition-colors">{step.num}</div>
                        <div>
                          <h4 className="text-2xl font-bold mb-2">{step.title}</h4>
                          <p className="text-[#94A3B8] text-lg leading-relaxed">{step.desc}</p>
                        </div>
                     </motion.div>
                   ))}
                </div>
             </div>
             
             {/* Visual Sticky Concept */}
             <div className="relative h-[800px] w-full rounded-[3rem] overflow-hidden bg-[#0F172A] border border-white/10 shadow-2xl p-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/10 to-transparent z-0"></div>
                <div className="w-full h-full rounded-3xl bg-[#020617] border border-white/5 relative overflow-hidden flex flex-col">
                   <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center px-6 gap-4">
                     <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
                     <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
                     <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
                     <span className="text-xs font-mono text-white/50 ml-auto flex items-center gap-2"><Lock className="w-3 h-3"/> END-TO-END ENCRYPTED</span>
                   </div>
                   
                   <div className="flex-1 relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-20"></div>
                   
                   {/* Abstract UI Elements */}
                   <motion.div style={{ y: yImage }} className="absolute inset-x-6 top-24 bottom-6 flex flex-col gap-6">
                      <div className="h-48 w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 flex items-center justify-between">
                         <div className="w-32 h-32 rounded-full border border-[#2563EB]/40 flex items-center justify-center relative">
                            <Activity className="w-8 h-8 text-[#2563EB] opacity-50" />
                            <div className="absolute inset-[-10%] rounded-full border-t border-[#14B8A6] animate-spin"></div>
                         </div>
                         <div className="w-1/2 space-y-4">
                            <div className="h-4 w-full bg-white/10 rounded-full"></div>
                            <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
                            <div className="h-4 w-5/6 bg-[#2563EB]/30 rounded-full"></div>
                         </div>
                      </div>
                      
                      <div className="h-64 w-full rounded-2xl bg-gradient-to-bl from-[#14B8A6]/10 to-transparent border border-white/10 backdrop-blur-md p-6 flex gap-6">
                         <div className="w-1/3 h-full rounded-xl bg-[#020617]/50 border border-[#14B8A6]/20"></div>
                         <div className="w-1/3 h-full rounded-xl bg-[#020617]/50 border border-[#14B8A6]/20"></div>
                         <div className="w-1/3 h-full rounded-xl bg-[#020617]/50 border border-[#14B8A6]/20"></div>
                      </div>
                   </motion.div>
                </div>
             </div>

          </div>
       </div>
    </section>
  );
};

const IntelligenceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) cinematicReveal(containerRef.current);
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative z-10 w-full px-6">
      <div className="max-w-7xl mx-auto rounded-[4rem] bg-gradient-to-b from-[#0F172A] to-[#020617] p-12 md:p-24 border border-white/5 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6366F1]/20 to-transparent mix-blend-screen pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#14B8A6]/20 to-transparent mix-blend-screen pointer-events-none"></div>
         
         <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 shadow-black drop-shadow-xl text-white">Engineered for absolute clinical accuracy.</h2>
            <p className="text-xl text-[#94A3B8] font-light leading-relaxed mb-16">Unlike consumer-grade AI, Dentivis is trained exclusively on hundreds of thousands of peer-reviewed clinical cases, CBCT volumes, and longitudinal outcome data.</p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
               {[
                 { val: "99.8%", label: "Segmentation Accuracy", desc: "Measured against ground-truth manual tracing by board-certified practitioners." },
                 { val: "< 2s", label: "Render Latency", desc: "Instant WebGPU visualization of 100MB+ DICOM files in browser without stutter." },
                 { val: "100%", label: "HIPAA Compliant", desc: "Zero-trust architecture ensures PHI data never becomes part of the training set." }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-3xl bg-[#020617]/50 border border-white/5 backdrop-blur-xl hover:border-[#14B8A6]/30 transition-colors">
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2">{stat.val}</div>
                    <div className="text-sm font-bold text-[#14B8A6] uppercase tracking-wider mb-4">{stat.label}</div>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{stat.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
};

const FeatureBento = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) cinematicReveal(containerRef.current);
  }, []);

  return (
    <section ref={containerRef} className="py-40 relative z-10">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
             <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">A modular architecture.</h2>
             <p className="text-xl text-[#94A3B8] font-light max-w-2xl mx-auto">Everything you need to orchestrate a modern lab, built into a cohesive suite of interconnected modules.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
             
             {/* Large Card */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="md:col-span-2 row-span-2 rounded-[3rem] bg-[#0F172A]/80 border border-white/5 p-10 relative overflow-hidden group hover:border-white/10 transition-colors"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                   <div>
                     <Brain className="w-10 h-10 text-[#2563EB] mb-6" />
                     <h3 className="text-3xl font-bold mb-4">Neural Engine v2</h3>
                     <p className="text-[#94A3B8] text-lg max-w-md">Our edge-native ML model identifies anatomical structures faster than the blink of an eye. Predicts collisions before they happen.</p>
                   </div>
                   
                   {/* Abstract visualization */}
                   <div className="w-full h-48 rounded-2xl bg-[#020617] border border-white/5 mt-8 overflow-hidden relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                      <div className="absolute h-full w-0.5 bg-[#2563EB] left-1/3 top-0 animate-pulse shadow-[0_0_20px_#2563EB]"></div>
                      <div className="absolute h-0.5 w-full bg-[#14B8A6] top-1/2 left-0 shadow-[0_0_20px_#14B8A6]"></div>
                   </div>
                </div>
             </motion.div>
             
             {/* Square Card 1 */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="rounded-[3rem] bg-[#0F172A]/80 border border-white/5 p-8 relative overflow-hidden group hover:border-[#14B8A6]/30 transition-colors"
             >
                <Database className="w-8 h-8 text-[#14B8A6] mb-6" />
                <h3 className="text-2xl font-bold mb-3">DICOM Fusion</h3>
                <p className="text-[#94A3B8]">Seamlessly merge raw volume data with high-res surface scans instantly.</p>
             </motion.div>
             
             {/* Square Card 2 */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="rounded-[3rem] bg-[#0F172A]/80 border border-white/5 p-8 relative overflow-hidden group hover:border-[#6366F1]/30 transition-colors"
             >
                <Network className="w-8 h-8 text-[#6366F1] mb-6" />
                <h3 className="text-2xl font-bold mb-3">Cloud Sync</h3>
                <p className="text-[#94A3B8]">Real-time collaborative editing between lab techs and prescribing doctors.</p>
             </motion.div>
             
          </div>
       </div>
    </section>
  );
};

const FinalCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) cinematicReveal(containerRef.current);
  }, []);

  return (
    <section ref={containerRef} className="py-40 relative z-10 w-full px-6 flex justify-center">
       <div className="max-w-5xl w-full text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1] mb-12">
               Ready to upgrade your <GradientText>practice?</GradientText>
             </h2>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/signup" className="group relative px-12 py-6 bg-white text-black rounded-full font-bold text-xl overflow-hidden hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#94A3B8]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                     Create Free Account <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
                <Link to="/contact" className="px-12 py-6 rounded-full font-bold text-xl text-white border border-white/10 hover:bg-white/5 transition-colors">
                  Contact Sales
                </Link>
             </div>
          </motion.div>
       </div>
    </section>
  );
};

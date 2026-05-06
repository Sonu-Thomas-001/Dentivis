import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check, Sparkles, Zap, Shield, Crown } from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";

export const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white relative overflow-hidden font-sans pb-40">
      
      {/* Dynamic Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2563EB]/20 via-[#020617] to-transparent mix-blend-screen transition-opacity duration-1000"></div>
        <div className="absolute top-[40%] left-[-20%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#14B8A6]/10 via-[#020617] to-transparent mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </motion.div>

      <div className="pt-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: 'easeOut' }} 
            className="text-center mb-32 relative"
          >
            {/* Cinematic background light over title */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/10 blur-[120px] rounded-[100%] pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl relative z-10">
               <Sparkles className="w-4 h-4 text-[#2563EB]" />
               <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">Pricing Models</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1] relative z-10">
              Compute power, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">democratized.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#94A3B8] font-light max-w-3xl mx-auto leading-relaxed relative z-10">
              No hidden fees. No unpredictable usage costs. Access our neural infrastructure at a scale that fits your clinical workflow.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
             {/* Tier 1 */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="h-full"
             >
               <TiltCard tiltStrength={5} glowColor="rgba(255,255,255,0.05)" className="h-full p-10 rounded-[3rem] bg-[#0F172A]/40 backdrop-blur-3xl border border-white/5 flex flex-col relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                    <Shield className="w-24 h-24 text-white/20" />
                 </div>
                 
                 <div className="relative z-10 flex-grow flex flex-col">
                   <h3 className="text-2xl font-black mb-2 tracking-tight">Starter</h3>
                   <p className="text-[#94A3B8] text-sm mb-8 font-light leading-relaxed h-10">Essential intelligence for independent practitioners taking their first digital steps.</p>
                   
                   <div className="flex items-baseline gap-2 mb-8 pb-8 relative group-hover:px-2 transition-all duration-300">
                     <span className="text-6xl font-black tracking-tighter text-white/90 group-hover:text-white transition-colors duration-300">$199</span>
                     <span className="text-[#94A3B8] font-medium font-mono text-sm uppercase tracking-widest">/ Month</span>
                   </div>
                   
                   <ul className="space-y-5 mb-10 flex-grow">
                     {['50 Cases / Month', 'Basic AI Segmentation', 'Standard Export (STL)', '72hr Email Support'].map((feat, i) => (
                       <li key={i} className="flex items-start gap-4">
                         <span className="mt-1 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                           <Check className="w-3 h-3 text-[#14B8A6]" />
                         </span>
                         <span className="text-[#94A3B8] group-hover:text-white transition-colors duration-300">{feat}</span>
                       </li>
                     ))}
                   </ul>
                   
                   <button className="w-full py-4 mt-auto rounded-full border border-white/10 bg-[#020617]/50 hover:bg-white text-white hover:text-black transition-all font-bold group/btn relative overflow-hidden">
                     <span className="relative z-10 font-mono tracking-widest text-xs uppercase">Initialize Starter</span>
                     <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                   </button>
                 </div>
               </TiltCard>
             </motion.div>
             
             {/* Tier 2 (Highlighted) */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="h-full z-10"
             >
               <TiltCard tiltStrength={8} glowColor="rgba(37,99,235,0.2)" className="h-full p-12 rounded-[3.5rem] bg-gradient-to-b from-[#2563EB]/10 via-[#0F172A]/80 to-[#0F172A]/40 backdrop-blur-3xl border border-[#2563EB]/40 flex flex-col relative shadow-[0_0_80px_rgba(37,99,235,0.15)] group overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                 
                 <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none">
                    <Zap className="w-32 h-32 text-[#2563EB]" />
                 </div>

                 <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2 z-20">
                   <div className="px-6 py-2 bg-[#020617] border border-[#2563EB]/50 rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                      <div className="w-2 h-2 rounded-full bg-[#14B8A6] shadow-[0_0_10px_rgba(20,184,166,0.8)] animate-pulse" />
                      <span className="text-[10px] font-mono text-white tracking-widest uppercase">Maximum Compute</span>
                   </div>
                 </div>
                 
                 <div className="relative z-10 flex-grow flex flex-col mt-4">
                   <h3 className="text-3xl font-black mb-2 tracking-tight">Clinic Pro</h3>
                   <p className="text-[#2563EB] text-sm mb-8 font-medium h-10">Unrestricted access. The ultimate platform for a fully digital, high-volume practice.</p>
                   
                   <div className="flex items-baseline gap-2 mb-8 relative pb-8 border-b border-[#2563EB]/20">
                     <span className="text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]">$499</span>
                     <span className="text-[#94A3B8] font-medium font-mono text-sm uppercase tracking-widest">/ Month</span>
                   </div>
                   
                   <ul className="space-y-6 mb-12 flex-grow">
                     {['Unlimited Cases', 'Advanced Neural Engine', 'CBCT + Intraoral Fusion', 'Predictive Biomechanics', '24/7 Priority Support'].map((feat, i) => (
                       <li key={i} className="flex items-start gap-4">
                         <span className="mt-1 w-5 h-5 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                           <Check className="w-3 h-3 text-[#3B82F6]" />
                         </span>
                         <span className="text-white font-medium">{feat}</span>
                       </li>
                     ))}
                   </ul>
                   
                   <button className="w-full h-16 mt-auto rounded-full bg-white hover:bg-gray-100 text-[#020617] transition-all font-black tracking-widest uppercase text-sm shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] flex items-center justify-center group-hover:scale-[1.02] active:scale-[0.98]">
                     Deploy Node
                   </button>
                 </div>
               </TiltCard>
             </motion.div>

             {/* Tier 3 */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="h-full"
             >
               <TiltCard tiltStrength={5} glowColor="rgba(20,184,166,0.15)" className="h-full p-10 rounded-[3rem] bg-[#0F172A]/40 backdrop-blur-3xl border border-white/5 flex flex-col relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                    <Crown className="w-24 h-24 text-white/20" />
                 </div>

                 <div className="relative z-10 flex-grow flex flex-col">
                   <h3 className="text-2xl font-black mb-2 tracking-tight">Enterprise</h3>
                   <p className="text-[#94A3B8] text-sm mb-8 font-light leading-relaxed h-10">Bespoke integration for DSOs and massive surgical networks.</p>
                   
                   <div className="flex items-baseline gap-2 mb-8 pb-8">
                     <span className="text-5xl font-black tracking-tighter text-white/90 group-hover:text-white transition-colors duration-300">Custom</span>
                   </div>
                   
                   <ul className="space-y-5 mb-10 flex-grow">
                     {['Multi-location Management', 'Custom AI Model Training', 'REST API Access', 'Dedicated Account Executive'].map((feat, i) => (
                       <li key={i} className="flex items-start gap-4">
                         <span className="mt-1 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                           <Check className="w-3 h-3 text-[#14B8A6]" />
                         </span>
                         <span className="text-[#94A3B8] group-hover:text-white transition-colors duration-300">{feat}</span>
                       </li>
                     ))}
                   </ul>
                   
                   <button className="w-full py-4 mt-auto rounded-full border border-white/10 bg-[#020617]/50 hover:bg-[#14B8A6] hover:border-[#14B8A6] text-white transition-all font-bold group/btn relative overflow-hidden">
                      <span className="relative z-10 font-mono tracking-widest text-xs uppercase">Contact Sales</span>
                      <div className="absolute inset-0 bg-[#14B8A6] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                   </button>
                 </div>
               </TiltCard>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

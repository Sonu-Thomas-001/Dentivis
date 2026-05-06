import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check, Sparkles } from "lucide-react";

export const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white relative overflow-hidden font-sans pb-40">
      
      {/* Dynamic Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2563EB]/20 via-[#020617] to-transparent mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </motion.div>

      <div className="pt-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="text-center mb-32"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
               <Sparkles className="w-4 h-4 text-[#2563EB]" />
               <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">Pricing Plans</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
              Simple, transparent <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">computing power.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#94A3B8] font-light max-w-3xl mx-auto leading-relaxed">
              No hidden fees. No unpredictable usage costs. Choose the tier that matches your clinical volume.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
             {/* Tier 1 */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="p-10 rounded-[3rem] bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 hover:bg-[#0F172A]/60 hover:border-white/10 transition-all shadow-xl group relative overflow-hidden"
             >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="text-2xl font-bold mb-2">Starter</h3>
               <p className="text-[#94A3B8] text-sm mb-8 h-10">For independent practitioners starting their digital journey.</p>
               <div className="flex items-baseline gap-2 mb-8 border-b border-white/5 pb-8">
                 <span className="text-6xl font-black tracking-tighter">$199</span>
                 <span className="text-[#94A3B8] font-medium">/mo</span>
               </div>
               <ul className="space-y-5 mb-10">
                 {['50 Cases / Month', 'Basic AI Segmentation', 'Standard Export (STL)', '72hr Email Support'].map((feat, i) => (
                   <li key={i} className="flex items-start gap-4">
                     <span className="mt-1 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3 text-[#14B8A6]" />
                     </span>
                     <span className="text-[#F8FAFC]">{feat}</span>
                   </li>
                 ))}
               </ul>
               <button className="w-full py-4 rounded-full border border-white/10 hover:bg-white text-white hover:text-black transition-all font-medium">Get Started</button>
             </motion.div>
             
             {/* Tier 2 (Highlighted) */}
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="p-12 rounded-[3.5rem] bg-gradient-to-b from-[#2563EB]/10 via-[#0F172A]/80 to-[#0F172A]/40 backdrop-blur-2xl border border-[#2563EB]/40 relative shadow-[0_0_50px_rgba(37,99,235,0.15)] group overflow-hidden z-10"
             >
               <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               
               <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                 <div className="px-6 py-2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] rounded-full text-xs font-bold tracking-widest uppercase shadow-lg border border-white/20 text-white">Most Popular</div>
               </div>
               
               <h3 className="text-3xl font-bold mb-2">Clinic Pro</h3>
               <p className="text-[#2563EB] text-sm mb-8 font-medium h-10">Everything needed for a fully digital, high-volume practice.</p>
               <div className="flex items-baseline gap-2 mb-8 border-b border-[#2563EB]/20 pb-8 relative">
                 <div className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent blur-[2px]"></div>
                 <span className="text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(37,99,235,0.5)]">$499</span>
                 <span className="text-[#94A3B8] font-medium">/mo</span>
               </div>
               <ul className="space-y-6 mb-12">
                 {['Unlimited Cases', 'Advanced Neural Engine', 'CBCT + Intraoral Fusion', 'Predictive Biomechanics', '24/7 Priority Support'].map((feat, i) => (
                   <li key={i} className="flex items-start gap-4">
                     <span className="mt-1 w-5 h-5 rounded-full bg-[#2563EB]/20 flex items-center justify-center shrink-0 border border-[#2563EB]/30 shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                       <Check className="w-3 h-3 text-[#3B82F6]" />
                     </span>
                     <span className="text-white font-medium">{feat}</span>
                   </li>
                 ))}
               </ul>
               <button className="w-full h-14 rounded-full bg-white hover:bg-gray-100 text-[#020617] transition-all font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center justify-center group-hover:scale-105">
                 Start Free 14-Day Trial
               </button>
             </motion.div>

             {/* Tier 3 */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="p-10 rounded-[3rem] bg-[#0F172A]/40 backdrop-blur-xl border border-white/5 hover:bg-[#0F172A]/60 hover:border-white/10 transition-all shadow-xl group relative overflow-hidden"
             >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#14B8A6]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
               <p className="text-[#94A3B8] text-sm mb-8 h-10">For DSOs and large surgical networks requiring custom integration.</p>
               <div className="flex items-baseline gap-2 mb-8 border-b border-white/5 pb-8">
                 <span className="text-6xl font-black tracking-tighter">Custom</span>
               </div>
               <ul className="space-y-5 mb-10">
                 {['Multi-location Management', 'Custom AI Model Training', 'REST API Access', 'Dedicated Account Executive'].map((feat, i) => (
                   <li key={i} className="flex items-start gap-4">
                     <span className="mt-1 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                       <Check className="w-3 h-3 text-[#94A3B8]" />
                     </span>
                     <span className="text-[#F8FAFC]">{feat}</span>
                   </li>
                 ))}
               </ul>
               <button className="w-full py-4 rounded-full border border-white/10 hover:bg-[#14B8A6] hover:border-[#14B8A6] text-white transition-all font-medium">Contact Sales</button>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

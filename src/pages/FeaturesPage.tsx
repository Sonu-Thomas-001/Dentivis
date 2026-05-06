import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { 
  Eye, Database, GitCommit, Target, Brain, Cloud, Activity, 
  Layers, ScanFace, Combine, Waypoints
} from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";

/* -------------------------------------------------------------------------- */
/*                                VISUAL MODULES                              */
/* -------------------------------------------------------------------------- */

const FaceVisual = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
     {/* Grid background */}
     <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF61A_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF61A_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
     
     <div className="relative z-20 w-72 h-96 border-2 border-[#8B5CF6]/30 bg-[#020617]/80 backdrop-blur-md rounded-[3rem] overflow-hidden flex flex-col items-center justify-center shadow-[0_0_100px_rgba(139,92,246,0.15)] group-hover:-translate-y-4 group-hover:scale-105 transition-all duration-700 ease-out">
        {/* Scanning beam */}
        <motion.div 
          className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-[#8B5CF6]/30 to-transparent blur-md"
          animate={{ top: ['-20%', '120%', '-20%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Face tracking structure */}
        <div className="relative w-40 h-48 border border-[#8B5CF6]/20 rounded-t-[5rem] rounded-b-[4rem] p-4">
           {/* Eyes */}
           <div className="absolute top-1/3 left-1/4 w-4 h-2 border-t-2 border-[#8B5CF6] rounded-t-full opacity-50" />
           <div className="absolute top-1/3 right-1/4 w-4 h-2 border-t-2 border-[#8B5CF6] rounded-t-full opacity-50" />
           
           {/* Tracking dots */}
           {[...Array(12)].map((_, i) => (
             <motion.div 
               key={i} 
               className="absolute w-1 h-1 bg-[#8B5CF6] rounded-full shadow-[0_0_5px_#8B5CF6]"
               style={{
                 left: `${20 + Math.random() * 60}%`,
                 top: `${20 + Math.random() * 60}%`
               }}
               animate={{ opacity: [0.2, 1, 0.2] }}
               transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
             />
           ))}

           {/* Metrics floating around */}
           <motion.div className="absolute -left-12 top-10 bg-[#8B5CF6]/10 px-2 py-1 text-[10px] text-[#8B5CF6] font-mono rounded border border-[#8B5CF6]/30 backdrop-blur-sm" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>SYM: 98.4%</motion.div>
           <motion.div className="absolute -right-16 bottom-10 bg-[#8B5CF6]/10 px-2 py-1 text-[10px] text-[#8B5CF6] font-mono rounded border border-[#8B5CF6]/30 backdrop-blur-sm" animate={{ y: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>PROP: 1.618</motion.div>
        </div>
     </div>
  </div>
);

const CBCTVisual = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center">
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/10 blur-[100px] rounded-full pointer-events-none" />
     
     <div className="relative z-20 group" style={{ perspective: '1000px' }}>
        <motion.div 
           className="w-64 h-64 border border-[#3B82F6]/20 rounded-3xl"
           style={{ transformStyle: 'preserve-3d' }}
           animate={{ rotateX: [10, -10, 10], rotateY: [-20, 20, -20] }}
           transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
           {/* Layered slices simulating CBCT */}
           {[0, 1, 2, 3, 4].map((i) => (
             <div 
               key={i} 
               className="absolute inset-0 border border-[#3B82F6]/30 rounded-3xl bg-[#020617]/60 backdrop-blur-md shadow-[inset_0_0_30px_rgba(59,130,246,0.1)] transition-transform duration-700 ease-out group-hover:!scale-110"
               style={{ transform: `translateZ(${i * 25 - 50}px) scale(${1 - i * 0.05})`, opacity: 1 - i * 0.15 }}
             >
                <div className="absolute inset-0 flex items-center justify-center">
                   {/* Abstract bone/root shape */}
                   <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 text-[#3B82F6]" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M 30 30 Q 50 10 70 30 Q 80 60 50 80 Q 20 60 30 30 Z" className="opacity-50" />
                      <circle cx="50" cy="45" r="12" className="opacity-80" strokeDasharray="2 2" />
                   </svg>
                </div>
             </div>
           ))}
        </motion.div>
     </div>
  </div>
);

const StagingVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center p-12">
      <div className="w-full flex justify-between items-center relative z-10">
         {/* Line connecting */}
         <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent group-hover:scale-y-150 transition-transform duration-500" />
         
         {[...Array(5)].map((_, i) => (
            <motion.div 
               key={i}
               className="relative z-10 flex flex-col items-center gap-4"
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 + 0.3 }}
            >
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${i === 3 ? 'border-[#10B981] bg-[#10B981]/20 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-125' : 'border-[#10B981]/30 bg-[#020617] opacity-60 hover:opacity-100'}`}>
                  <span className={`font-mono text-sm ${i === 3 ? 'text-white' : 'text-[#10B981]'}`}>{i + 1}</span>
               </div>
               
               <div className="text-[#10B981]/60 font-mono text-[10px] tracking-widest absolute -bottom-8 whitespace-nowrap">
                 STAGE 0{i + 1}
               </div>

               {/* Active indicator for current stage */}
               {i === 3 && (
                 <motion.div 
                   className="absolute -top-12 px-3 py-1 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 font-mono text-xs rounded shadow-[0_0_15px_rgba(16,185,129,0.2)] whitespace-nowrap"
                   animate={{ y: [0, -5, 0] }}
                   transition={{ duration: 2, repeat: Infinity }}
                 >
                   ACTIVE
                 </motion.div>
               )}
            </motion.div>
         ))}
      </div>
  </div>
);

const ForceVisual = () => (
   <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#F43F5E15_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative w-72 h-72 border border-[#F43F5E]/10 rounded-full flex items-center justify-center">
         <motion.div 
           className="absolute inset-0 border border-dashed border-[#F43F5E]/30 rounded-full"
           animate={{ rotate: 360 }}
           transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
         />
         
         <div className="w-56 h-56 rounded-full flex items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
            {/* abstract tooth */}
            <div className="w-24 h-32 bg-[#020617] rounded-[2rem] border-2 border-[#F43F5E]/40 relative z-10 shadow-[inset_0_0_20px_rgba(244,63,94,0.2)]">
               
               {/* Grid overlay on tooth */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#F43F5E1A_1px,transparent_1px),linear-gradient(to_bottom,#F43F5E1A_1px,transparent_1px)] bg-[size:10px_10px] rounded-[2rem] opacity-50" />

               {/* Force Vectors */}
               <motion.div className="absolute -left-12 top-1/4 flex items-center z-20" animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <div className="w-12 h-0.5 bg-white/80 line-glow" />
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white/80 border-b-[4px] border-b-transparent" />
               </motion.div>

               <motion.div className="absolute -right-12 bottom-1/4 flex items-center z-20" animate={{ x: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-r-[8px] border-r-[#F43F5E] border-b-[4px] border-b-transparent drop-shadow-[0_0_5px_#F43F5E]" />
                  <div className="w-12 h-0.5 bg-[#F43F5E] shadow-[0_0_5px_#F43F5E]" />
               </motion.div>
               
               {/* Stress heatmap spot */}
               <motion.div 
                  className="absolute bottom-6 right-2 w-10 h-10 rounded-full blur-[10px] bg-[#F43F5E]"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
               />
            </div>
         </div>
      </div>
   </div>
);

const PredictiveVisual = () => (
   <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#EAB308]/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex gap-8 md:gap-12 items-center group-hover:scale-105 transition-transform duration-700">
         
         {/* Initial state */}
         <div className="flex flex-col items-center gap-6 opacity-40">
           <div className="text-[10px] font-mono text-[#EAB308] border border-[#EAB308]/30 px-3 py-1 rounded bg-[#EAB308]/5">DAY 01</div>
           <div className="w-20 h-28 border-2 border-white/30 rounded-[1.5rem] flex items-center justify-center" style={{ transform: 'rotate(-12deg)' }}>
             <svg viewBox="0 0 50 50" className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M 25 10 L 25 40 M 10 25 L 40 25" />
             </svg>
           </div>
         </div>

         {/* Arrow / Connection */}
         <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#EAB308] to-transparent relative">
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-[#EAB308] to-transparent blur-[1px]"
              animate={{ left: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-[#EAB308] border-b-[4px] border-b-transparent" />
         </div>

         {/* Final state */}
         <div className="flex flex-col items-center gap-6">
           <div className="text-[10px] font-mono text-[#020617] bg-[#EAB308] px-3 py-1 rounded font-bold shadow-[0_0_15px_rgba(234,179,8,0.4)]">MONTH 08</div>
           <div className="w-24 h-32 border-2 border-[#EAB308] rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.2),inset_0_0_20px_rgba(234,179,8,0.1)] bg-[#EAB308]/5 relative overflow-hidden">
             
             {/* Glow sweeping across the predicted tooth */}
             <motion.div 
                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                animate={{ left: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
             />
             
             <svg viewBox="0 0 50 50" className="w-12 h-12 text-[#EAB308]" fill="none" stroke="currentColor" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px rgba(234,179,8,0.5))' }}>
                <path d="M 25 10 L 25 40 M 10 25 L 40 25" />
             </svg>
           </div>
         </div>

      </div>
   </div>
);

const CloudVisual = () => (
   <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-80 h-80">
         {/* Main cloud node */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#020617] border border-[#0EA5E9]/50 rounded-2xl flex items-center justify-center z-20 shadow-[0_0_40px_rgba(14,165,233,0.3),inset_0_0_20px_rgba(14,165,233,0.2)] group-hover:scale-110 transition-transform duration-500">
            <Cloud className="w-10 h-10 text-[#0EA5E9]" />
            <motion.div 
               className="absolute inset-0 border border-[#0EA5E9] rounded-2xl"
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
            />
         </div>

         {/* Orbiting nodes */}
         <motion.div 
           className="absolute inset-0 z-10"
           animate={{ rotate: 360 }}
           transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
         >
            {[0, 120, 240].map((deg, i) => (
               <div key={i} className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#020617] border border-[#0EA5E9]/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.2)]" style={{ transform: `rotate(${deg}deg) translateY(-120px) rotate(-${deg}deg)` }}>
                  {i === 0 ? <Database className="w-5 h-5 text-[#0EA5E9]/70" /> : i === 1 ? <Activity className="w-5 h-5 text-[#0EA5E9]/70" /> : <Waypoints className="w-5 h-5 text-[#0EA5E9]/70" />}
               </div>
            ))}
         </motion.div>

         {/* Connection track */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] border border-dashed border-[#0EA5E9]/20 rounded-full z-0 opacity-50" />
      </div>
   </div>
);


/* -------------------------------------------------------------------------- */
/*                            FEATURE COMPONENT                               */
/* -------------------------------------------------------------------------- */

const CinematicFeature = ({ feature, index }: { feature: any, index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  const isEven = index % 2 === 0;

  return (
    <div ref={containerRef} className="relative min-h-screen border-b border-white/5 flex items-center justify-center py-32 overflow-hidden">
       {/* Background Depth Effects */}
       <motion.div 
         className="absolute inset-0 z-0 pointer-events-none opacity-20"
         style={{ y: yParallax }}
       >
          <div 
             className={`absolute ${isEven ? 'left-[-10%]' : 'right-[-10%]'} top-[20%] w-[600px] h-[600px] rounded-full blur-[150px] mix-blend-screen opacity-50`} 
             style={{ background: `radial-gradient(circle, ${feature.color}, transparent 70%)` }} 
          />
       </motion.div>

       <div className={`max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}>
          
          {/* Visual Module */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -10 : 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
             <TiltCard 
                tiltStrength={8} 
                glowColor={`${feature.color}33`} 
                className="h-[500px] md:h-[600px] w-full group relative flex flex-col rounded-[3rem] overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 0.9))`,
                  borderColor: `${feature.color}33`
                } as any} // Cast to any to bypass strict TiltCard types if needed, wait TiltCard uses tailwind classes, let's keep inline style simple
             >
                 {/* Visual Background Noise */}
                 <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity duration-700 group-hover:opacity-40 pointer-events-none" />
                 
                 {feature.visual}

             </TiltCard>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 pl-0 lg:pl-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
             <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }} 
                 whileInView={{ opacity: 1, scale: 1 }} 
                 transition={{ duration: 0.5, delay: 0.3 }}
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-xl"
                 style={{ backgroundColor: `${feature.color}15`, borderColor: `${feature.color}30`, color: feature.color }}
             >
                <feature.icon className="w-4 h-4" />
                <span className="text-xs font-mono tracking-widest uppercase">{feature.badge}</span>
             </motion.div>

             <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-white leading-[1.1]">{feature.title}</h2>
             
             <p className="text-[#94A3B8] text-xl mb-12 leading-relaxed font-light">
               {feature.description}
             </p>
             
             <div className="space-y-8 relative">
                {/* Vertical connecting line for list */}
                <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-white/10" />

                {feature.items.map((item: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex gap-6 group/item relative z-10"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-500 bg-[#0F172A]" 
                           style={{ borderColor: `${feature.color}50` }}>
                         <div className="w-2 h-2 rounded-full transition-transform duration-300 group-hover/item:scale-150" style={{ backgroundColor: feature.color }} />
                      </div>
                    </div>
                    <div>
                      <span className="text-xl text-white font-semibold block mb-2 transition-colors duration-300 group-hover/item:text-[color:var(--hover-color)]" style={{ '--hover-color': feature.color } as any}>{item.title}</span>
                      <span className="text-[#94A3B8] text-base leading-relaxed">{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
             </div>
          </motion.div>
       </div>
    </div>
  );
};


/* -------------------------------------------------------------------------- */
/*                                MAIN PAGE                                   */
/* -------------------------------------------------------------------------- */

const featuresData = [
  {
    id: "ai-facial",
    title: "AI Facial Analysis",
    badge: "Biometric Vision",
    icon: ScanFace,
    color: "#8B5CF6", // Purple
    description: "Our neural networks dynamically map facial proportions to ensure the orthodontic outcome harmonizes perfectly with the patient's natural aesthetics.",
    visual: <FaceVisual />,
    items: [
      { title: "Soft Tissue Prediction", desc: "Simulates lip support and profile changes in real-time as you adjust incisor positions." },
      { title: "Symmetry Mapping", desc: "Quantifies structural asymmetries to guide midlines and cant corrections." },
      { title: "Macro-Aesthetic Scoring", desc: "Evaluates smile arc, buccal corridors, and gingival display automatically." }
    ]
  },
  {
    id: "cbct",
    title: "CBCT Integration",
    badge: "Volumetric Engine",
    icon: Layers,
    color: "#3B82F6", // Blue
    description: "Move beyond crowns. We reconstruct the entire periodontium, isolating individual roots, bone boundaries, and nerve canals from raw DICOM data.",
    visual: <CBCTVisual />,
    items: [
      { title: "True Root Isolation", desc: "Pixel-perfect segmentation algorithm that maps root morphology accurately, even in dense bone." },
      { title: "Cortical Plate Boundaries", desc: "Visualizes the limits of safe movement to prevent dehiscence or fenestration." },
      { title: "Automatic Superimposition", desc: "Registers intraoral scans to CBCT volumes automatically without manual point-picking." }
    ]
  },
  {
    id: "staging",
    title: "Smart Staging Engine",
    badge: "Timeline Matrix",
    icon: GitCommit,
    color: "#10B981", // Emerald
    description: "Stop manually scripting every aligner step. Our engine calculates optimal staging sequences that respect biological limits and clinical efficiency.",
    visual: <StagingVisual />,
    items: [
      { title: "Collision-Free Timelines", desc: "Calculates spatial movement to avoid interproximal collisions during complex rotations." },
      { title: "Adaptive Velocity", desc: "Adjusts movement speed dynamically based on the volume of surrounding bone." },
      { title: "Keyframe Automation", desc: "Generates step-by-step aligner states from initial to final with one click." }
    ]
  },
  {
    id: "force",
    title: "Force Visualization",
    badge: "Physics Engine",
    icon: Target,
    color: "#F43F5E", // Rose
    description: "Visualize applied biomechanics through finite element analysis before a single aligner is manufactured.",
    visual: <ForceVisual />,
    items: [
      { title: "Stress Heatmaps", desc: "Highlights areas of excessive PDL stress where root resorption risk is elevated." },
      { title: "Vector Analysis", desc: "Displays exactly where force is applied and the resulting center of rotation." },
      { title: "Attachment Optimization", desc: "Recommends attachment shapes and positions to counteract unwanted reactive forces." }
    ]
  },
  {
    id: "predictive",
    title: "Predictive Treatment",
    badge: "Predictive Intelligence",
    icon: Brain,
    color: "#EAB308", // Yellow
    description: "Harness the power of thousands of successful cases to predict the most stable and physiological final occlusion.",
    visual: <PredictiveVisual />,
    items: [
      { title: "Ideal Archform Generation", desc: "Automatically suggests an archform tailored to the patient's skeletal base." },
      { title: "Interdigitation Scoring", desc: "Scores the final occlusion for maximal contacts and functional guidance." },
      { title: "Relapse Risk Indicators", desc: "Flags movements that belong to high-relapse categories, suggesting overcorrection." }
    ]
  },
  {
    id: "cloud",
    title: "Cloud Workflow",
    badge: "Global Sync",
    icon: Cloud,
    color: "#0EA5E9", // Sky
    description: "A completely decentralized infrastructure. Process massive 3D datasets remotely without needing a supercomputer at your desk.",
    visual: <CloudVisual />,
    items: [
      { title: "Zero-Latency Streaming", desc: "Interact with gigabyte-sized CBCT files in the browser via edge-rendering." },
      { title: "Collaborative Planning", desc: "Share live 3D models with referring specialists via secure, expiring links." },
      { title: "Instant Manufacturing", desc: "Export water-tight STL files directly to your in-office 3D printing pipeline." }
    ]
  }
];

export const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-white/20">
      
      {/* Global Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>

      {/* Hero Intro Section */}
      <div className="relative pt-40 pb-20 px-6 z-10 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
                <Combine className="w-4 h-4 text-white/50" />
                <span className="text-xs font-mono text-white/70 tracking-widest uppercase">The Platform</span>
             </div>
             
             <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
               Orchestrate <br/> <span className="text-white/30">perfection.</span>
             </h1>
             
             <p className="text-xl md:text-2xl text-[#94A3B8] font-light leading-relaxed max-w-2xl mx-auto">
               A suite of interconnected modules designed to replace guesswork with deterministic, data-driven biomechanics.
             </p>
          </motion.div>
        </div>
      </div>

      {/* Features List */}
      <div className="relative z-10">
        {featuresData.map((feature, index) => (
          <CinematicFeature key={feature.id} feature={feature} index={index} />
        ))}
      </div>
      
      {/* Footer CTA Space */}
      <div className="h-64 flex items-center justify-center relative z-10">
         <motion.div 
           initial={{ opacity: 0 }} 
           whileInView={{ opacity: 1 }} 
           viewport={{ once: true }}
           className="text-[#94A3B8] font-mono text-sm tracking-widest uppercase"
         >
           Platform Capabilities
         </motion.div>
      </div>

    </div>
  );
};

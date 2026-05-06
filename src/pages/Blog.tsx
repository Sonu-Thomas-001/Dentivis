import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BookOpen, Clock, ArrowRight, Activity, Terminal } from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";

export const Blog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const articles = [
    {
      title: "The Limits of Generative AI in Orthognathic Surgery",
      category: "CLINICAL RESEARCH",
      readTime: "12 min read",
      desc: "Exploring the boundary between machine learning predictions and human clinical judgment in complex surgical interventions. How we maintain the doctor in the loop.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
      featured: true
    },
    {
      title: "WebGPU: Rendering 10 Million Vertices at 60FPS",
      category: "ENGINEERING",
      readTime: "8 min read",
      desc: "How we migrated from WebGL to WebGPU to achieve desktop-class rendering inside a standard web browser.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
    },
    {
      title: "The Future of Clear Aligner Biomechanics",
      category: "PRODUCT",
      readTime: "5 min read",
      desc: "Introducing our new finite element analysis integration for predictive staging.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80"
    },
    {
      title: "HIPAA Compliant LLMs: An Architecture Deep Dive",
      category: "SECURITY",
      readTime: "15 min read",
      desc: "Building a localized inference layer that entirely prevents PHI from touching public cloud networks.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white relative font-sans overflow-hidden pb-40">
      
      {/* Cinematic Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#2563EB]/10 via-transparent to-transparent blur-[150px] rounded-full mix-blend-screen opacity-70"></div>
        <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#14B8A6]/10 via-transparent to-transparent blur-[150px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </motion.div>

      <div className="pt-40 px-6 relative z-10 max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: 'easeOut' }} 
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 relative"
        >
          {/* Header Light */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#2563EB]/5 blur-[100px] rounded-full pointer-events-none -z-10" />
          
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl group hover:border-[#2563EB]/50 transition-colors">
               <BookOpen className="w-4 h-4 text-[#2563EB] group-hover:scale-110 transition-transform" />
               <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">Research Log</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] relative">
              <span className="absolute top-[-20px] left-[5px] text-white/5 font-mono text-sm tracking-widest">TRANSMISSION</span>
              Signal vs <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">Noise.</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[#94A3B8] font-light max-w-md leading-relaxed pb-2">
            Engineering deep-dives, clinical research, and thoughts on the future of dental intelligence from the Dentivis team.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {articles.map((article, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: i * 0.1, duration: 0.8 }}
               className={`flex flex-col h-full ${article.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
             >
                <TiltCard tiltStrength={article.featured ? 3 : 5} glowColor="rgba(37,99,235,0.1)" className="h-full flex flex-col rounded-[2.5rem] bg-[#0F172A]/40 border border-white/5 backdrop-blur-3xl overflow-hidden group/card cursor-pointer">
                   
                   <div className={`w-full overflow-hidden relative ${article.featured ? 'h-[400px] md:h-[500px]' : 'h-[300px]'}`}>
                     <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover/card:mix-blend-normal group-hover/card:scale-110 transition-all duration-1000 ease-out" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent"></div>
                     
                     {/* Internal Tag placed inside image if featured */}
                     {article.featured && (
                       <div className="absolute bottom-10 left-10 flex gap-4 items-center z-10">
                         <span className="px-4 py-2 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/50 text-[#3B82F6] text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                           {article.category}
                         </span>
                         <span className="flex items-center gap-2 text-xs text-white/80 font-mono tracking-widest uppercase bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
                           <Clock className="w-3.5 h-3.5" />
                           {article.readTime}
                         </span>
                       </div>
                     )}
                   </div>
                   
                   <div className={`flex flex-col flex-grow relative z-10 ${article.featured ? 'px-10 pb-10 pt-6 mt-[-40px]' : 'p-8'}`}>
                     {/* Metadata for non-featured */}
                     {!article.featured && (
                       <div className="flex gap-4 items-center mb-6">
                         <span className="text-[10px] font-bold tracking-widest uppercase text-[#14B8A6]">{article.category}</span>
                         <span className="flex items-center gap-1.5 text-[10px] text-[#94A3B8] font-mono tracking-widest uppercase">
                           <Clock className="w-3 h-3" />
                           {article.readTime}
                         </span>
                       </div>
                     )}
                     
                     <h3 className={`font-black mb-4 transition-colors leading-tight tracking-tight ${article.featured ? 'text-4xl md:text-5xl group-hover/card:text-[#2563EB]' : 'text-2xl group-hover/card:text-[#14B8A6]'}`}>
                       {article.title}
                     </h3>
                     <p className={`text-[#94A3B8] font-light leading-relaxed mb-8 flex-grow ${article.featured ? 'text-xl max-w-3xl line-clamp-2' : 'text-base line-clamp-3'}`}>
                       {article.desc}
                     </p>
                     
                     <div className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-white group-hover/card:text-[#2563EB] transition-colors uppercase tracking-widest">
                        Read Payload <ArrowRight className="w-4 h-4 group-hover/card:translate-x-2 transition-transform" />
                     </div>
                   </div>
                </TiltCard>
             </motion.div>
           ))}
        </div>

        {/* Newsletter / RSS CTA - Cinematic Update */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="mt-40 p-12 md:p-24 rounded-[4rem] bg-[#020617] border border-white/10 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-[0_0_100px_rgba(20,184,166,0.05)] group"
        >
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
           <div className="absolute top-0 w-[600px] h-[600px] bg-gradient-to-b from-[#2563EB]/10 via-transparent to-transparent pointer-events-none blur-[100px]"></div>
           <Terminal className="absolute bottom-[-10%] right-[-5%] w-64 h-64 text-white/5 rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-[3s]" />
           
           <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 mx-auto shadow-inner">
                 <Activity className="w-4 h-4 text-[#14B8A6]" />
                 <span className="text-[10px] font-mono text-white tracking-widest uppercase">Direct Channel</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Stay synchronized.</h2>
              <p className="text-xl md:text-2xl text-[#94A3B8] font-light leading-relaxed mb-10 pb-4">
                Receive high-signal updates on AI research, product releases, and clinical insights. No spam, ever.
              </p>
           </div>
           
           <div className="relative z-10 w-full max-w-[500px] mx-auto">
              <form className="relative flex items-center group/form">
                 <div className="absolute inset-0 bg-[#2563EB]/20 blur-xl opacity-0 group-focus-within/form:opacity-100 transition-opacity rounded-full z-0"></div>
                 <input type="email" placeholder="Email Address" className="w-full h-16 bg-[#0F172A] border border-white/10 rounded-full pl-8 pr-40 text-lg text-white placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all relative z-10 shadow-inner" />
                 <button type="button" className="absolute right-2 top-2 bottom-2 px-8 bg-white hover:bg-gray-200 text-[#020617] rounded-full font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all z-20 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                   Subscribe
                 </button>
              </form>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

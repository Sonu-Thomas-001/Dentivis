import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BookOpen, Clock, ArrowRight, Rss } from "lucide-react";
import { Link } from "react-router-dom";

export const Blog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const articles = [
    {
      title: "The Limits of Generative AI in Orthognathic Surgery",
      category: "CLINICAL RESEARCH",
      readTime: "12 min read",
      desc: "Exploring the boundary between machine learning predictions and human clinical judgment in complex surgical interventions.",
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
      title: "HIPAA Compliant LLMs: A Architecture Deep Dive",
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
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#2563EB]/10 to-transparent blur-[150px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </motion.div>

      <div className="pt-40 px-6 relative z-10 max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
               <BookOpen className="w-4 h-4 text-[#2563EB]" />
               <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">Journal</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1]">
              Signal vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">Noise.</span>
            </h1>
          </div>
          <p className="text-xl text-[#94A3B8] font-light max-w-md leading-relaxed">
            Engineering deep-dives, clinical research, and thoughts on the future of dental intelligence from the Dentivis team.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {articles.map((article, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.8 }}
               className={`group cursor-pointer flex flex-col ${article.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
             >
               <div className={`w-full rounded-[2.5rem] bg-[#0F172A] border border-white/10 mb-6 overflow-hidden relative ${article.featured ? 'h-[400px]' : 'h-[300px]'}`}>
                 <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-1000 ease-out" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
                 
                 {/* Internal Tag placed inside image if featured */}
                 {article.featured && (
                   <div className="absolute bottom-8 left-8 flex gap-4 items-center z-10">
                     <span className="px-3 py-1 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/50 text-[#3B82F6] text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                       {article.category}
                     </span>
                     <span className="flex items-center gap-1.5 text-xs text-white/80 font-mono tracking-widest uppercase">
                       <Clock className="w-3.5 h-3.5" />
                       {article.readTime}
                     </span>
                   </div>
                 )}
               </div>
               
               {/* Metadata for non-featured (placed below image) */}
               {!article.featured && (
                 <div className="flex gap-4 items-center mb-4">
                   <span className="text-xs font-bold tracking-widest uppercase text-[#14B8A6]">{article.category}</span>
                   <span className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-mono tracking-widest uppercase">
                     <Clock className="w-3.5 h-3.5" />
                     {article.readTime}
                   </span>
                 </div>
               )}
               
               <h3 className={`font-bold mb-3 group-hover:text-[#2563EB] transition-colors leading-tight ${article.featured ? 'text-4xl' : 'text-2xl'}`}>
                 {article.title}
               </h3>
               <p className="text-[#94A3B8] font-light leading-relaxed mb-6 line-clamp-3">
                 {article.desc}
               </p>
               
               <div className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-[#2563EB] transition-colors">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </div>
             </motion.div>
           ))}
        </div>

        {/* Newsletter / RSS CTA */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="mt-40 p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-[#0F172A] to-[#020617] border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12"
        >
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
           <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-tl from-[#2563EB]/10 to-transparent pointer-events-none"></div>
           
           <div className="relative z-10 max-w-xl">
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Stay synchronized.</h2>
              <p className="text-xl text-[#94A3B8] font-light leading-relaxed">
                Receive high-signal updates on AI research, product releases, and clinical insights. No spam, ever.
              </p>
           </div>
           
           <div className="relative z-10 w-full md:w-[400px]">
              <form className="relative flex items-center">
                 <input type="email" placeholder="Email Address" className="w-full bg-[#020617]/50 border border-white/10 rounded-full pl-6 pr-32 py-4 text-white focus:outline-none focus:border-[#2563EB] transition-colors" />
                 <button className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform text-sm">
                   Subscribe
                 </button>
              </form>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

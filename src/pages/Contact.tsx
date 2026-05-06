import React from "react";
import { motion } from "motion/react";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { TiltCard } from "../components/ui/TiltCard";

export const Contact = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white relative font-sans overflow-hidden">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="absolute top-[20%] left-[-10%] w-[1000px] h-[1000px] bg-gradient-to-tr from-[#2563EB]/10 via-transparent to-transparent blur-[150px] rounded-full mix-blend-screen pointer-events-none transition-opacity duration-[3s]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-[#14B8A6]/10 via-transparent to-transparent blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
        
        {/* Subtle grid map pattern */}
         <svg className="absolute inset-0 w-full h-full opacity-[0.03] animate-[pulse_10s_ease-in-out_infinite]" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <pattern id="gridMap" width="80" height="80" patternUnits="userSpaceOnUse">
               <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="1"/>
               <circle cx="0" cy="0" r="1.5" fill="white" opacity="0.5"/>
             </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#gridMap)" />
         </svg>
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-40 pb-40">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           {/* Left text */}
           <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl relative top-0 group hover:border-[#14B8A6]/50 transition-colors">
                 <MessageSquare className="w-4 h-4 text-[#14B8A6] group-hover:animate-pulse" />
                 <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">Encrypted Channel</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1] relative">
                <span className="absolute top-0 left-[-40px] text-white/5 font-mono text-sm tracking-widest rotate-90 origin-left hidden md:block">INIT_SEQ_01</span>
                Initialize <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#2563EB]">connection.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#94A3B8] font-light mb-16 max-w-lg leading-relaxed">
                Whether you're looking for a bespoke enterprise integration or just want to see a live demo of the neural engine, our engineers are ready.
              </p>
              
              <div className="space-y-10 border-l border-white/5 pl-8 relative">
                <div className="absolute top-0 bottom-0 left-[0px] w-px bg-gradient-to-b from-[#14B8A6] to-transparent h-1/2"></div>
                
                <div className="flex gap-6 items-start group">
                  <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all group-hover:scale-110 duration-500">
                    <Mail className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Email directly</h4>
                    <p className="text-[#94A3B8] mb-2 font-light">Our team replies within hours.</p>
                    <a href="mailto:hello@dentivis.ai" className="text-[#14B8A6] hover:text-white transition-colors font-medium border-b border-[#14B8A6]/30 hover:border-white pb-1">hello@dentivis.ai</a>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start group">
                  <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(20,184,166,0.1)] group-hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all group-hover:scale-110 duration-500">
                    <MapPin className="w-6 h-6 text-[#14B8A6]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Global Headquarters</h4>
                    <p className="text-[#94A3B8] mb-2 font-light">San Francisco, CA</p>
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Visits by appointment only</span>
                  </div>
                </div>
              </div>
           </motion.div>
           
           {/* Right Form wrapped in TiltCard */}
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="h-full">
              <TiltCard tiltStrength={3} glowColor="rgba(20,184,166,0.15)" className="h-full p-8 md:p-14 rounded-[3.5rem] bg-[#0F172A]/70 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(20,184,166,0.05)] relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                 
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <MessageSquare className="w-32 h-32 text-white" />
                 </div>

                 <form className="relative z-10 space-y-8 flex flex-col h-full">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3 group/input">
                        <label className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
                           <span className="w-1 h-1 bg-[#14B8A6] rounded-full group-focus-within/input:animate-ping inline-block"></span>
                           First Name
                        </label>
                        <input className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all focus:bg-[#020617] group-hover/input:border-white/20" placeholder="John" />
                      </div>
                      <div className="space-y-3 group/input">
                        <label className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
                           <span className="w-1 h-1 bg-[#14B8A6] rounded-full group-focus-within/input:animate-ping inline-block"></span>
                           Last Name
                        </label>
                        <input className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all focus:bg-[#020617] group-hover/input:border-white/20" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-3 group/input">
                      <label className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
                           <span className="w-1 h-1 bg-[#2563EB] rounded-full group-focus-within/input:animate-ping inline-block"></span>
                           Work Email
                      </label>
                      <input type="email" className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all focus:bg-[#020617] group-hover/input:border-white/20" placeholder="john@clinic.com" />
                    </div>
                    <div className="space-y-3 group/input flex-grow">
                      <label className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
                           <span className="w-1 h-1 bg-white/50 rounded-full group-focus-within/input:animate-ping inline-block"></span>
                           Directive
                      </label>
                      <textarea rows={6} className="w-full bg-[#020617]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all resize-none focus:bg-[#020617] group-hover/input:border-white/20" placeholder="Describe your operational needs..." />
                    </div>
                    
                    <button type="button" className="w-full h-16 rounded-2xl bg-white hover:bg-gray-100 text-[#020617] font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center relative overflow-hidden group/btn mt-8 active:scale-[0.98]">
                       <span className="relative z-10 flex items-center gap-3">
                          Transmit Payload <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                       </span>
                    </button>
                 </form>
              </TiltCard>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

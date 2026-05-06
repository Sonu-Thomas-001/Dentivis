import React from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";

export const Contact = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white relative font-sans overflow-hidden">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-[#2563EB]/20 to-transparent blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-40 pb-40">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           {/* Left text */}
           <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
                 <MessageSquare className="w-4 h-4 text-[#14B8A6]" />
                 <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">Contact Us</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
                Initialize <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#2563EB]">connection.</span>
              </h1>
              <p className="text-xl text-[#94A3B8] font-light mb-12 max-w-lg leading-relaxed">
                Whether you're looking for a bespoke enterprise integration or just want to see a live demo of the neural engine, our engineers are ready.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/5 transition-colors">
                    <Mail className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email directly</h4>
                    <p className="text-[#94A3B8] mb-1">Our team replies within hours.</p>
                    <a href="mailto:hello@dentivis.ai" className="text-[#14B8A6] hover:text-white transition-colors font-medium">hello@dentivis.ai</a>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/5 transition-colors">
                    <MapPin className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Global Headquarters</h4>
                    <p className="text-[#94A3B8] mb-1">San Francisco, CA</p>
                    <span className="text-sm text-white/40">Visits by appointment only.</span>
                  </div>
                </div>
              </div>
           </motion.div>
           
           {/* Right Form */}
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
              <div className="p-8 md:p-12 rounded-[2.5rem] bg-[#0F172A]/60 backdrop-blur-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/5 to-transparent"></div>
                 
                 <form className="relative z-10 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#94A3B8] ml-1">First Name</label>
                        <input className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#94A3B8] ml-1">Last Name</label>
                        <input className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#94A3B8] ml-1">Work Email</label>
                      <input type="email" className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all" placeholder="john@clinic.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#94A3B8] ml-1">How can we help?</label>
                      <textarea rows={5} className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all resize-none" placeholder="I am interested in..." />
                    </div>
                    
                    <button type="button" className="w-full h-14 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#2563EB] hover:opacity-90 text-white font-bold shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all flex items-center justify-center relative overflow-hidden group mt-4">
                       <span className="relative z-10">Send Transmission</span>
                       <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    </button>
                    <p className="text-xs text-center text-[#94A3B8] mt-4">By submitting this form, you agree to our <a href="#" className="underline">Privacy Policy</a>.</p>
                 </form>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

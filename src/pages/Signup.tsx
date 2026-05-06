import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Activity, ArrowLeft, BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';
import { TiltCard } from '../components/ui/TiltCard';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Registration failed");
      }
      
      const data = await response.json();
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#14B8A6]/15 via-[#020617] to-transparent blur-[10px] pointer-events-none mix-blend-screen transition-opacity duration-1000"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2563EB]/10 via-[#020617] to-transparent blur-[10px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      </div>

      <div className="absolute top-8 left-8 z-30">
        <Link to="/" className="text-[#94A3B8] hover:text-white flex items-center gap-2 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest">Return</span>
        </Link>
      </div>

      <div className="w-full max-w-[1100px] grid md:grid-cols-[1.2fr_1fr] rounded-[3rem] bg-[#0F172A]/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_100px_rgba(20,184,166,0.05)] overflow-hidden relative z-10">
        
        {/* Left Side (Visual) */}
        <div className="hidden md:block relative border-r border-white/5 overflow-hidden group/visual">
          <div className="absolute inset-0 bg-gradient-to-tl from-[#020617] via-[#0F172A]/80 to-[#14B8A6]/10 z-0"></div>
          
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <BrainCircuit className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] text-white/5 -rotate-12 group-hover/visual:-rotate-[20deg] group-hover/visual:scale-110 transition-transform duration-[5s] ease-out pointer-events-none" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full px-16">
             <TiltCard tiltStrength={8} glowColor="rgba(20,184,166,0.2)" className="p-10 rounded-[2.5rem] bg-[#020617]/60 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(20,184,166,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#14B8A6]/10 to-transparent pointer-events-none opacity-50"></div>
                
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3 bg-[#0F172A] px-3 py-1.5 border border-white/10 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_10px_#2563EB] animate-pulse"></div>
                      <span className="text-[10px] font-mono text-white tracking-widest uppercase">Node Provisioning</span>
                   </div>
                </div>
                
                <h3 className="text-3xl font-black text-white mb-4 leading-tight tracking-tight">Request access to the intelligence network.</h3>
                
                <div className="mt-8 space-y-4 font-mono text-xs text-[#94A3B8]">
                   <div className="flex justify-between border-b border-white/5 pb-2">
                     <span>Clearance Level</span>
                     <span className="text-[#14B8A6]">Pending Approval</span>
                   </div>
                   <div className="flex justify-between border-b border-white/5 pb-2">
                     <span>Compute Allocation</span>
                     <span className="text-white">Standby</span>
                   </div>
                   <div className="flex justify-between">
                     <span>Data Governance</span>
                     <span className="text-[#2563EB]">HIPAA Compliant</span>
                   </div>
                </div>
             </TiltCard>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="p-10 md:p-16 flex flex-col justify-center relative bg-[#020617]/40 shadow-xl z-20">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="w-14 h-14 bg-[#020617] border border-white/10 rounded-2xl flex items-center justify-center shadow-inner mb-10 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-bl from-[#14B8A6]/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
               <Activity className="w-6 h-6 text-[#2563EB] relative z-10" />
            </div>
            
            <h1 className="text-4xl font-black tracking-tight text-white mb-2">Request Access.</h1>
            <p className="text-[#94A3B8] text-sm mb-12 font-light leading-relaxed">Establish a new entity profile within the system.</p>
            
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-3 group/input">
                <label className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1 h-1 bg-white/50 rounded-full group-focus-within/input:animate-ping inline-block"></span>
                   Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Dr. John Doe" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all focus:bg-[#020617] group-hover/input:border-white/20 shadow-inner"
                />
              </div>
              <div className="space-y-3 group/input">
                <label className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1 h-1 bg-[#2563EB] rounded-full group-focus-within/input:animate-ping inline-block"></span>
                   Operator Identifier
                </label>
                <input 
                  type="email" 
                  placeholder="doctor@clinic.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all focus:bg-[#020617] group-hover/input:border-white/20 shadow-inner"
                />
              </div>
              <div className="space-y-3 group/input">
                <label className="text-xs font-mono font-medium text-[#94A3B8] uppercase tracking-widest flex items-center gap-2">
                   <span className="w-1 h-1 bg-[#14B8A6] rounded-full group-focus-within/input:animate-ping inline-block"></span>
                   Create Key
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all focus:bg-[#020617] group-hover/input:border-white/20 shadow-inner"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-16 mt-8 rounded-2xl bg-white hover:bg-gray-100 text-[#020617] font-black tracking-widest uppercase text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all flex items-center justify-center relative overflow-hidden group/btn active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                     <span className="relative z-10">Generate Entity Profile</span>
                  </>
                )}
              </button>
            </form>
            
            <p className="text-center text-sm text-[#94A3B8] mt-10">
              Already initialized? <Link to="/login" className="text-white hover:text-[#2563EB] font-medium transition-colors ml-1 border-b border-white/30 hover:border-[#2563EB]">Authenticate</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

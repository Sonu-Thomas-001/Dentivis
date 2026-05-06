import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Sparkles, Activity, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
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
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#2563EB]/20 to-transparent blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tl from-[#14B8A6]/20 to-transparent blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="absolute top-8 left-8 z-20">
        <Link to="/" className="text-[#94A3B8] hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-[1000px] grid md:grid-cols-2 rounded-[2rem] bg-[#0F172A]/40 backdrop-blur-3xl border border-white/5 shadow-2xl overflow-hidden relative z-10">
        {/* Left Side (Form) */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner mb-8 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/20 to-transparent opacity-50"></div>
               <Activity className="w-6 h-6 text-[#14B8A6] relative z-10" />
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
            <p className="text-[#94A3B8] text-sm mb-10 font-light">Enter your credentials to access the intelligence platform.</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#94A3B8] ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="doctor@clinic.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-medium text-[#94A3B8]">Password</label>
                  <a href="#" className="text-xs font-medium text-[#2563EB] hover:text-[#3B82F6] transition-colors">Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-12 mt-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:opacity-90 text-white font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center relative overflow-hidden group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                     <span className="relative z-10">Initialize Session</span>
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  </>
                )}
              </button>
            </form>
            
            <p className="text-center text-sm text-[#94A3B8] mt-8">
              New to the platform? <Link to="/signup" className="text-white hover:text-[#14B8A6] font-medium transition-colors">Request Access</Link>
            </p>
          </motion.div>
        </div>

        {/* Right Side (Visual) */}
        <div className="hidden md:block relative border-l border-white/5 bg-[#020617]/30 overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/20 to-[#020617] z-10"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full px-12">
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-transparent"></div>
                
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-2 h-2 rounded-full bg-[#14B8A6] shadow-[0_0_10px_#14B8A6] animate-pulse"></div>
                   <span className="text-xs font-mono text-[#94A3B8] tracking-widest uppercase">System Status</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Neural network operating at optimal capacity.</h3>
                <p className="text-sm text-[#94A3B8] font-light mt-4 border-t border-white/5 pt-4">Global rendering nodes: <span className="text-white">Active</span></p>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Activity, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

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
        
        {/* Left Side (Visual) */}
        <div className="hidden md:block relative border-r border-white/5 bg-[#020617]/30 overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-[#020617] z-10"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full px-12">
             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#14B8A6]/10 to-transparent"></div>
                
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Join the new era of orthodontic care.</h3>
                <p className="text-sm text-[#94A3B8] font-light mt-4 border-t border-white/5 pt-4">Empowering <span className="text-white">1000+</span> clinics globally.</p>
             </motion.div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner mb-8 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/20 to-transparent opacity-50"></div>
               <Activity className="w-6 h-6 text-[#2563EB] relative z-10" />
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Create Account</h1>
            <p className="text-[#94A3B8] text-sm mb-10 font-light">Enter your details to register for the platform.</p>
            
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#94A3B8] ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Dr. Sarah Smith" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#94A3B8] ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="doctor@clinic.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#94A3B8] ml-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-12 mt-4 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#2563EB] hover:opacity-90 text-white font-medium shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all flex items-center justify-center relative overflow-hidden group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                     <span className="relative z-10">Sign Up</span>
                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  </>
                )}
              </button>
            </form>
            
            <p className="text-center text-sm text-[#94A3B8] mt-8">
              Already have an account? <Link to="/login" className="text-white hover:text-[#2563EB] font-medium transition-colors">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

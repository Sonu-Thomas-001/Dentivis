import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Activity, ArrowLeft, Building2, User, ChevronRight, Lock, Check } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="absolute top-8 left-8 z-30">
        <Link to="/" className="text-[#64748B] hover:text-[#0F172A] flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-[1100px] h-full md:h-[700px] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* Left Side (Visual) */}
        <div className="hidden md:flex w-[45%] bg-[#F8FAFC] flex-col relative overflow-hidden border-r border-[#E2E8F0] items-center justify-center p-12">
          
          <div className="absolute inset-0 z-0">
             <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-gradient-to-br from-[#DBEAFE]/80 to-transparent blur-[80px] rounded-full pointer-events-none"></div>
             <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] bg-gradient-to-tl from-[#14B8A6]/10 to-transparent blur-[80px] rounded-full pointer-events-none"></div>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10 text-center flex flex-col items-center">
            
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-[#E2E8F0] flex items-center justify-center mb-8">
               <Activity className="w-8 h-8 text-[#2563EB]" />
            </div>

            <h2 className="text-3xl font-semibold text-[#0F172A] tracking-tight mb-4 leading-snug">Join the future of <br/>Orthodontics</h2>
            <p className="text-[#64748B] mb-12 max-w-sm mx-auto font-medium leading-relaxed">Elevate your practice with AI-powered, deterministic treatment planning.</p>
            
            <div className="w-full max-w-sm bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] p-6 shadow-sm text-left">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                     <Building2 className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0F172A]">Enterprise Ready</h4>
                    <p className="text-xs text-[#64748B]">Scalable for multi-clinic operations</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center">
                     <Check className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0F172A]">Instant Approval</h4>
                    <p className="text-xs text-[#64748B]">Start creating cases immediately</p>
                  </div>
               </div>
            </div>

          </motion.div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-[55%] p-8 md:p-14 lg:p-20 flex flex-col justify-center bg-white overflow-y-auto">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full max-w-[400px] mx-auto py-8">
            
            <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Create your account</h1>
            <p className="text-[#64748B] text-sm mb-8">Already have an account? <Link to="/login" className="text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors">Sign In</Link></p>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#0F172A]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input 
                    type="text" 
                    placeholder="Dr. John Doe" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#0F172A]">Clinic / Hospital Name <span className="text-[#94A3B8] font-normal">(Optional)</span></label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input 
                    type="text" 
                    placeholder="Apex Dental Care"
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#0F172A]">Email Address</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input 
                    type="email" 
                    placeholder="doctor@clinic.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-sm font-medium text-[#0F172A]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 pb-4">
                <div className="flex items-start gap-2">
                   <input type="checkbox" required id="terms" className="w-4 h-4 mt-0.5 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]/20" />
                   <label htmlFor="terms" className="text-xs text-[#64748B] leading-relaxed">
                     I agree to the <a href="#" className="font-medium text-[#2563EB] hover:text-[#1D4ED8]">Terms of Service</a>, <a href="#" className="font-medium text-[#2563EB] hover:text-[#1D4ED8]">Privacy Policy</a>, and Data Processing Agreement.
                   </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:opacity-90 text-white font-medium shadow-sm transition-all flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account <ChevronRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                  </>
                )}
              </button>
            </form>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}

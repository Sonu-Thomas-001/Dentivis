import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Activity, ArrowLeft, Building2, User, ChevronRight, Lock, Check } from 'lucide-react';
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

            <h2 className="text-3xl font-semibold text-[#0F172A] tracking-tight mb-4 leading-snug">Welcome Back to <br/>Dentivis</h2>
            <p className="text-[#64748B] mb-12 max-w-sm mx-auto font-medium leading-relaxed">Securely access your orthodontic workflow platform.</p>
            
            <div className="w-full max-w-sm bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm text-left">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center">
                     <Check className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0F172A]">HIPAA Compliant</h4>
                    <p className="text-xs text-[#64748B]">Enterprise-grade security</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                     <Lock className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0F172A]">End-to-End Encryption</h4>
                    <p className="text-xs text-[#64748B]">Your patient data is protected</p>
                  </div>
               </div>
            </div>

          </motion.div>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-[55%] p-8 md:p-14 lg:p-20 flex flex-col justify-center bg-white">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full max-w-[400px] mx-auto">
            
            <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Sign in to your account</h1>
            <p className="text-[#64748B] text-sm mb-8">Don't have an account? <Link to="/signup" className="text-[#2563EB] hover:text-[#1D4ED8] font-medium transition-colors">Request Access</Link></p>
            
            <form onSubmit={handleLogin} className="space-y-5">
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

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#0F172A]">Password</label>
                  <a href="#" className="text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors">Forgot password?</a>
                </div>
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

              <div className="flex items-center gap-2 pt-2 pb-4">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]/20" />
                <label htmlFor="remember" className="text-sm text-[#64748B]">Remember me for 30 days</label>
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
                    Sign In <ChevronRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                  </>
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E2E8F0]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-[#64748B]">Or continue with</span>
                </div>
              </div>

              <button 
                type="button" 
                className="w-full py-3.5 rounded-xl bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-medium shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                Sign in with Google
              </button>
            </form>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}

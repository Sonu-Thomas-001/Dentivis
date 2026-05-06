import { Sidebar } from "./Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, Bell, Sun, Moon, Menu, LogOut, User, Fingerprint } from "lucide-react";
import { Input } from "./ui/input";
import { useTheme } from "../lib/useTheme";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#020617] font-sans text-white overflow-hidden relative">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#14B8A6]/10 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shrink-0 z-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <header className="h-20 px-6 border-b border-white/5 bg-[#020617]/40 backdrop-blur-3xl flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4 w-full max-w-md">
            {/* Mobile Sidebar Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger className="md:hidden p-2 -ml-2 rounded-xl text-[#94A3B8] hover:bg-white/5 transition-colors border-none bg-transparent cursor-pointer">
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r border-white/5 bg-[#020617] shadow-none">
                <Sidebar className="w-full h-full" onClickItem={() => setMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="flex items-center w-full relative group">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-4 group-focus-within:text-[#2563EB] transition-colors" />
              <Input 
                type="text" 
                placeholder="Query nodes, indents, telemetry..." 
                className="pl-11 bg-[#0F172A]/50 border-white/10 text-white placeholder:text-[#94A3B8] focus-visible:ring-[#2563EB] rounded-full transition-all h-10 w-full hover:bg-[#0F172A]/80 backdrop-blur-md"
              />
              <div className="absolute right-4 text-[10px] font-mono tracking-widest text-[#94A3B8] opacity-50 px-1 border border-white/10 rounded pointer-events-none hidden sm:block">CMD+K</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-[#0F172A]/50 text-[#94A3B8] hover:bg-white/10 transition-colors hidden sm:flex backdrop-blur-md relative">
              <Bell className="w-4 h-4" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#2563EB] rounded-full border-2 border-[#020617]"></div>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-[#0F172A]/50 text-[#94A3B8] hover:bg-white/10 transition-colors hidden sm:flex backdrop-blur-md">
              <Fingerprint className="w-4 h-4 text-[#14B8A6]" />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer p-1.5 sm:pr-4 rounded-full border border-white/10 bg-[#0F172A]/50 hover:bg-white/10 backdrop-blur-md transition-colors shrink-0 outline-none">
                <Avatar className="w-8 h-8 border border-white/10 shadow-sm bg-[#020617] rounded-full overflow-hidden">
                  <AvatarImage src={`https://avatar.vercel.sh/${user?.name || "doctor"}.png?theme=daisy`} className="rounded-full" />
                  <AvatarFallback className="bg-transparent text-[#94A3B8] font-mono text-xs">{user?.name?.charAt(0) || 'D'}</AvatarFallback>
                </Avatar>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white leading-none tracking-tight">{user?.name || 'Dr. Carter'}</p>
                  <p className="text-[10px] text-[#14B8A6] mt-1 font-mono uppercase tracking-widest leading-none drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]">Level 4 Auth</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl border border-white/10 bg-[#0F172A]/90 backdrop-blur-3xl p-2 shadow-2xl text-white">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal px-2 py-1.5">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">{user?.name || 'Dr. Carter'}</p>
                      <p className="text-xs leading-none text-[#94A3B8]">{user?.email || 'carter@dentivis.ai'}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="cursor-pointer rounded-xl hover:bg-white/10 focus:bg-white/10 px-3 py-2 text-sm transition-colors text-[#94A3B8] hover:text-white">
                    <User className="mr-3 h-4 w-4" />
                    <span>User Vector</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="cursor-pointer rounded-xl hover:bg-red-500/10 focus:bg-red-500/10 text-red-500 focus:text-red-500 px-3 py-2 text-sm transition-colors" onClick={handleLogout}>
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Terminate Session</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 z-10 relative">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

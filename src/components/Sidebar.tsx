import { Activity, Users, Settings, LayoutDashboard, Hexagon, Sparkles, Box, PanelLeftClose, PanelLeft, FileText, LogOut } from "lucide-react";
import { cn } from "../lib/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../lib/store";
import { useAuthStore } from "../store/useAuthStore";

interface SidebarProps {
  className?: string;
  onClickItem?: () => void;
}

export function Sidebar({ className, onClickItem }: SidebarProps) {
  const { sidebarCollapsed, setSidebarCollapsed } = useStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/cases", icon: FileText, label: "Registry" },
    { to: "/patients", icon: Users, label: "Patients" },
    { to: "/viewer", icon: Box, label: "Volume Viewer" },
    { to: "/insights", icon: Sparkles, label: "Neural Feed" },
  ];

  return (
    <aside className={cn(
      "border-r border-white/5 bg-[#020617]/80 backdrop-blur-3xl flex flex-col h-full overflow-y-auto transition-all duration-300 relative",
      sidebarCollapsed ? "w-[80px]" : "w-64",
      className
    )}>
      {/* Decorative gradient line */}
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-[#2563EB]/20 via-[#14B8A6]/10 to-transparent"></div>

      <div className={cn(
        "p-6 flex items-center gap-4 h-20 shrink-0",
        sidebarCollapsed ? "justify-center" : "justify-start"
      )}>
        <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#14B8A6] relative flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          <Hexagon className="w-6 h-6 text-white absolute" strokeWidth={2} />
          <div className="w-2 h-2 bg-white rounded-full absolute z-10 shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
        </div>
        {!sidebarCollapsed && (
          <span className="font-bold tracking-tight text-white text-xl">Dentivis<span className="text-[#14B8A6]">.</span></span>
        )}
      </div>
      
      <div className="flex-1 px-4 py-6 space-y-2 flex flex-col overflow-y-auto no-scrollbar">
        {!sidebarCollapsed && <p className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase ml-3 mb-2">Core Modules</p>}
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClickItem}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold transition-all group overflow-hidden relative",
              isActive 
                ? "text-white bg-white/5 shadow-inner" 
                : "text-[#94A3B8] hover:bg-white/[0.02] hover:text-white",
              sidebarCollapsed && "justify-center px-0"
            )}
            title={sidebarCollapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#2563EB] to-[#14B8A6] rounded-r-full shadow-[0_0_10px_rgba(20,184,166,0.6)]"></div>
                )}
                <item.icon className={cn(
                  "w-5 h-5 shrink-0 transition-colors z-10",
                  isActive ? "text-[#14B8A6]" : "text-[#94A3B8] group-hover:text-white"
                )} />
                {!sidebarCollapsed && <span className="z-10">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 mt-auto space-y-2 flex flex-col border-t border-white/5 bg-white/[0.01]">
        <NavLink
          to="/settings"
          onClick={onClickItem}
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold transition-all group overflow-hidden relative",
            isActive 
              ? "text-white bg-white/5 shadow-inner" 
              : "text-[#94A3B8] hover:bg-white/[0.02] hover:text-white",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={sidebarCollapsed ? "Settings" : undefined}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#2563EB] to-[#14B8A6] rounded-r-full shadow-[0_0_10px_rgba(20,184,166,0.6)]"></div>
              )}
              <Settings className={cn(
                "w-5 h-5 shrink-0 transition-colors z-10",
                isActive ? "text-white" : "text-[#94A3B8] group-hover:text-white"
              )} />
              {!sidebarCollapsed && <span className="z-10">Configuration</span>}
            </>
          )}
        </NavLink>
        
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            "hidden md:flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-[#94A3B8] hover:bg-white/[0.02] hover:text-white transition-all group overflow-hidden",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="w-5 h-5 shrink-0 text-[#94A3B8] group-hover:text-white" />
          ) : (
            <>
              <PanelLeftClose className="w-5 h-5 shrink-0 text-[#94A3B8] group-hover:text-white" />
              <span>Collapse</span>
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold text-red-500/80 hover:bg-red-500/10 hover:text-red-400 transition-all group overflow-hidden mt-2",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={sidebarCollapsed ? "Terminate Session" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0 transition-colors" />
          {!sidebarCollapsed && <span>Terminate Session</span>}
        </button>
      </div>
    </aside>
  );
}

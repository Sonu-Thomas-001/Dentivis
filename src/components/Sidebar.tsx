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
    { to: "/cases", icon: FileText, label: "Cases" },
    { to: "/patients", icon: Users, label: "Patients" },
    { to: "/viewer", icon: Box, label: "3D Viewer" },
    { to: "/insights", icon: Sparkles, label: "Activity" },
  ];

  return (
    <aside className={cn(
      "border-r border-border bg-background flex flex-col h-full overflow-y-auto transition-all duration-300 relative",
      sidebarCollapsed ? "w-[80px]" : "w-64",
      className
    )}>
      {/* Decorative gradient line */}
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent"></div>

      <div className={cn(
        "p-6 flex items-center gap-4 h-16 shrink-0",
        sidebarCollapsed ? "justify-center" : "justify-start"
      )}>
        <div className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-primary to-secondary relative flex items-center justify-center shadow-sm">
          <Hexagon className="w-5 h-5 text-white absolute" strokeWidth={2} />
          <div className="w-1.5 h-1.5 bg-white rounded-full absolute z-10"></div>
        </div>
        {!sidebarCollapsed && (
          <span className="font-bold tracking-tight text-foreground text-xl">Dentivis<span className="text-secondary">.</span></span>
        )}
      </div>
      
      <div className="flex-1 px-4 py-6 space-y-1 flex flex-col overflow-y-auto no-scrollbar">
        {!sidebarCollapsed && <p className="text-[10px] font-semibold text-muted-foreground uppercase ml-3 mb-2">Core Modules</p>}
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClickItem}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group overflow-hidden relative",
              isActive 
                ? "text-primary bg-primary/10 font-medium" 
                : "text-muted-foreground hover:bg-muted font-medium hover:text-foreground",
              sidebarCollapsed && "justify-center px-0"
            )}
            title={sidebarCollapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"></div>
                )}
                <item.icon className={cn(
                  "w-5 h-5 shrink-0 transition-colors z-10",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {!sidebarCollapsed && <span className="z-10">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 mt-auto space-y-1 flex flex-col border-t border-border bg-muted/20">
        <NavLink
          to="/settings"
          onClick={onClickItem}
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group overflow-hidden relative",
            isActive 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={sidebarCollapsed ? "Settings" : undefined}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"></div>
              )}
              <Settings className={cn(
                "w-5 h-5 shrink-0 transition-colors z-10",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!sidebarCollapsed && <span className="z-10">Settings</span>}
            </>
          )}
        </NavLink>
        
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            "hidden md:flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all group overflow-hidden",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
          ) : (
            <>
              <PanelLeftClose className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
              <span>Collapse</span>
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all group overflow-hidden mt-1",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={sidebarCollapsed ? "Log Out" : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0 transition-colors" />
          {!sidebarCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}

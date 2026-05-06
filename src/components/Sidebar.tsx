import { Activity, Users, Settings, LayoutDashboard, Hexagon, Sparkles, Box, PanelLeftClose, PanelLeft, FileText } from "lucide-react";
import { cn } from "../lib/utils";
import { NavLink } from "react-router-dom";
import { useStore } from "../lib/store";

interface SidebarProps {
  className?: string;
  onClickItem?: () => void;
}

export function Sidebar({ className, onClickItem }: SidebarProps) {
  const { sidebarCollapsed, setSidebarCollapsed } = useStore();

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/cases", icon: FileText, label: "Cases" },
    { to: "/patients", icon: Users, label: "Patients" },
    { to: "/viewer", icon: Box, label: "3D Viewer" },
    { to: "/insights", icon: Sparkles, label: "AI Insights" },
  ];

  return (
    <aside className={cn(
      "border-r border-border bg-background/80 backdrop-blur-xl flex flex-col h-full overflow-y-auto transition-all duration-300",
      sidebarCollapsed ? "w-[80px]" : "w-64",
      className
    )}>
      <div className={cn(
        "p-6 flex items-center gap-3",
        sidebarCollapsed ? "justify-center" : "justify-start"
      )}>
        <div className="w-10 h-10 shrink-0 rounded-xl bg-primary relative flex items-center justify-center shadow-lg shadow-primary/20">
          <Hexagon className="w-6 h-6 text-primary-foreground absolute" strokeWidth={2.5} />
          <div className="w-2 h-2 bg-primary-foreground rounded-full absolute z-10"></div>
        </div>
        {!sidebarCollapsed && (
          <span className="font-heading font-bold tracking-tight text-foreground text-xl">Dentivis</span>
        )}
      </div>
      
      <nav className="flex-1 px-3 py-2 space-y-1.5 flex flex-col">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClickItem}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all group overflow-hidden",
              isActive 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 active-nav-glow" 
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              sidebarCollapsed && "justify-center px-0"
            )}
            title={sidebarCollapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "w-5 h-5 shrink-0 transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 mt-auto space-y-1.5 flex flex-col">
        <NavLink
          to="/settings"
          onClick={onClickItem}
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all group overflow-hidden",
            isActive 
              ? "bg-muted text-foreground font-semibold" 
              : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={sidebarCollapsed ? "Settings" : undefined}
        >
          {({ isActive }) => (
            <>
              <Settings className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!sidebarCollapsed && <span>Settings</span>}
            </>
          )}
        </NavLink>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            "hidden md:flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all group overflow-hidden",
            sidebarCollapsed && "justify-center px-0"
          )}
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
          ) : (
            <>
              <PanelLeftClose className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

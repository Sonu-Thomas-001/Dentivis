import { Activity, Users, FileText, Settings, LayoutDashboard, Hexagon } from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  className?: string;
  onClickItem?: () => void;
}

export function Sidebar({ className, onClickItem }: SidebarProps) {
  return (
    <aside className={cn("border-r border-border bg-background/80 backdrop-blur-xl flex flex-col h-full overflow-y-auto", className)}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary relative flex items-center justify-center shadow-lg shadow-primary/20">
          <Hexagon className="w-6 h-6 text-primary-foreground absolute" strokeWidth={2.5} />
          <div className="w-2 h-2 bg-primary-foreground rounded-full absolute z-10"></div>
        </div>
        <span className="font-heading font-bold tracking-tight text-foreground text-xl">Dentivis</span>
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1.5">
        <a href="#" onClick={onClickItem} className="flex items-center gap-3 px-3 py-2.5 bg-card rounded-2xl text-sm font-medium text-foreground border border-border shadow-sm shadow-black/5 transition-all">
          <LayoutDashboard className="w-4 h-4 text-primary" />
          Overview
        </a>
        <a href="#" onClick={onClickItem} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all text-left w-full">
          <Users className="w-4 h-4 text-muted-foreground" />
          Patients
        </a>
        <a href="#" onClick={onClickItem} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all text-left w-full">
          <Activity className="w-4 h-4 text-muted-foreground" />
          Treatment Plans
        </a>
        <a href="#" onClick={onClickItem} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all text-left w-full">
          <FileText className="w-4 h-4 text-muted-foreground" />
          Invoices
        </a>
      </nav>

      <div className="p-4 mt-auto">
        <a href="#" onClick={onClickItem} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all w-full text-left">
          <Settings className="w-4 h-4 text-muted-foreground" />
          Settings
        </a>
      </div>
    </aside>
  );
}

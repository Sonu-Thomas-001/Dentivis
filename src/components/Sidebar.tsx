import { Activity, Users, FileText, Settings, LayoutDashboard, ChevronRight } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-50/50 flex flex-col h-full overflow-y-auto">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-sky-500 relative flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <span className="font-semibold tracking-tight text-slate-900 text-lg">Dentivis</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2 bg-white rounded-md text-sm font-medium text-slate-900 border border-slate-200 shadow-sm">
          <LayoutDashboard className="w-4 h-4 text-sky-500" />
          Overview
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <Users className="w-4 h-4 text-slate-400" />
          Patients
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <Activity className="w-4 h-4 text-slate-400" />
          Treatment Plans
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <FileText className="w-4 h-4 text-slate-400" />
          Invoices
        </a>
      </nav>

      <div className="p-4 mt-auto">
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <Settings className="w-4 h-4 text-slate-400" />
          Settings
        </a>
      </div>
    </aside>
  );
}

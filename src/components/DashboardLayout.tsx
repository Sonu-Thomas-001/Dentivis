import { Sidebar } from "./Sidebar";
import { useStore } from "../lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, Bell } from "lucide-react";
import { Input } from "./ui/input";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useStore((state) => state.user);

  return (
    <div className="flex h-screen bg-slate-100/50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center w-full relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <Input 
              type="text" 
              placeholder="Search patients, plans, or invoices..." 
              className="pl-9 bg-slate-50 border-slate-200 shadow-none focus-visible:ring-sky-500 rounded-full bg-slate-100"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900 leading-none">{user?.name}</p>
                <p className="text-xs text-slate-500 mt-1 capitalize">{user?.role.toLowerCase()}</p>
              </div>
              <Avatar className="w-8 h-8 border border-slate-200">
                <AvatarImage src={`https://avatar.vercel.sh/${user?.name}.png`} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

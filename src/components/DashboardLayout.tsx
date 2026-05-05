import { Sidebar } from "./Sidebar";
import { useStore } from "../lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import { Input } from "./ui/input";
import { useTheme } from "../lib/useTheme";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useStore((state) => state.user);
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background font-sans text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <Sidebar className="w-64" />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 px-4 md:px-6 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between shrink-0 sticky top-0 z-10 transition-colors">
          <div className="flex items-center gap-3 w-full max-w-md">
            {/* Mobile Sidebar Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              {/* @ts-expect-error type error from asChild */}
              <SheetTrigger asChild>
                <button className="md:hidden p-2 -ml-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r-border bg-transparent shadow-none">
                <Sidebar className="w-full h-full" onClickItem={() => setMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="flex items-center w-full relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
              <Input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 bg-muted border-transparent shadow-none focus-visible:ring-primary rounded-full transition-all h-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 ml-4">
            <button 
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors hidden sm:flex">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-border hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer p-1 sm:pr-2 rounded-full hover:bg-muted transition-colors shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground leading-none">{user?.name}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize font-mono tracking-tight">{user?.role.toLowerCase()}</p>
              </div>
              <Avatar className="w-8 h-8 border border-border shadow-sm">
                <AvatarImage src={`https://avatar.vercel.sh/${user?.name}.png`} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

import { Sidebar } from "./Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, Bell, Sun, Moon, Menu, LogOut, User } from "lucide-react";
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
    <div className="flex h-screen bg-background font-sans text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 px-4 md:px-6 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between shrink-0 sticky top-0 z-10 transition-colors">
          <div className="flex items-center gap-3 w-full max-w-md">
            {/* Mobile Sidebar Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger className="md:hidden p-2 -ml-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors border-none bg-transparent cursor-pointer">
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r-border bg-background shadow-none">
                <Sidebar className="w-full h-full" onClickItem={() => setMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="flex items-center w-full relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
              <Input 
                type="text" 
                placeholder="Search cases, patients..." 
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
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer p-1 sm:pr-2 rounded-full hover:bg-muted transition-colors shrink-0 outline-none border-none bg-transparent">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-foreground leading-none">{user?.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 capitalize font-mono tracking-tight">Orthodontist</p>
                </div>
                <Avatar className="w-8 h-8 border border-border shadow-sm">
                  <AvatarImage src={`https://avatar.vercel.sh/${user?.name || "doctor"}.png`} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'D'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-muted/10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

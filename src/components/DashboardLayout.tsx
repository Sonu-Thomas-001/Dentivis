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
    <div className="flex h-screen bg-background font-sans text-foreground overflow-hidden relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shrink-0 z-10 relative border-r border-border">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <header className="h-16 px-6 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4 w-full max-w-md">
            {/* Mobile Sidebar Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger className="md:hidden p-2 -ml-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors border-none bg-transparent cursor-pointer">
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r border-border bg-background shadow-none">
                <Sidebar className="w-full h-full" onClickItem={() => setMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="flex items-center w-full relative group">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 group-focus-within:text-primary transition-colors" />
              <Input 
                type="text" 
                placeholder="Search patients, cases, scans..." 
                className="pl-11 bg-muted/50 border-transparent focus-visible:ring-primary rounded-full transition-all h-9 w-full hover:bg-muted"
              />
              <div className="absolute right-4 text-[10px] font-medium text-muted-foreground opacity-50 px-1.5 border border-border rounded pointer-events-none hidden sm:block">CMD+K</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <button 
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:bg-muted transition-colors hidden sm:flex relative">
              <Bell className="w-4 h-4" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-background"></div>
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer p-1 sm:pr-3 rounded-full border border-border bg-background hover:bg-muted transition-colors shrink-0 outline-none">
                <Avatar className="w-7 h-7 border border-border shadow-sm bg-muted rounded-full overflow-hidden">
                  <AvatarImage src={`https://avatar.vercel.sh/${user?.name || "doctor"}.png?theme=daisy`} className="rounded-full" />
                  <AvatarFallback className="bg-transparent text-muted-foreground font-medium text-xs">{user?.name?.charAt(0) || 'D'}</AvatarFallback>
                </Avatar>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-foreground leading-none tracking-tight">{user?.name || 'Dr. Carter'}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl border border-border bg-popover p-2 shadow-md text-popover-foreground">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal px-2 py-1.5">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">{user?.name || 'Dr. Carter'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email || 'carter@dentivis.ai'}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="cursor-pointer rounded-md hover:bg-muted focus:bg-muted px-2 py-2 text-sm transition-colors text-muted-foreground hover:text-foreground">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="cursor-pointer rounded-md hover:bg-destructive/10 focus:bg-destructive/10 text-destructive focus:text-destructive px-2 py-2 text-sm transition-colors" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 z-10 relative bg-muted/30">
          <div className="max-w-6xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

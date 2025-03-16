"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  Pen,
  Mic,
  Book,
  LogIn,
  ChevronRight,
  ChevronLeft,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/components/ui/use-mobile";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Always collapse sidebar on mobile when not explicitly opened
  const [mobileOpen, setMobileOpen] = useState(false);
  const isOpen = isMobile ? mobileOpen : isExpanded;

  // Define nav items based on authentication status
  const navItems = [
    ...(isAuthenticated ? [] : [{ name: "Home", path: "/", icon: Home }]),
    ...(isAuthenticated
      ? [{ name: "Dashboard", path: "/dashboard", icon: User }]
      : []),
    { name: "Kana Game", path: "/kana-game", icon: Pen },
    { name: "Pronunciation", path: "/pronunciation", icon: Mic },
    { name: "Visual Novel", path: "/visual-novel", icon: Book },
  ];

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed h-full z-50 flex flex-col border-r bg-background transition-all duration-300",
          isOpen ? "w-64" : "w-16",
          isMobile && !mobileOpen && "translate-x-[-100%]",
          "before:absolute before:inset-0 before:bg-[url('/ui/dark-cta.png')] dark:before:bg-[url('/ui/cta.png')] before:bg-fill before:bg-center before:bg-repeat before:opacity-30 before:pointer-events-none"
        )}
      >
        {/* Theme toggle at the top instead of title */}
        <div className="flex justify-center items-center p-4 h-16 border-b">
          {isOpen ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-xl font-yokomoji">ことば❀ネクサス</span>
              <ModeToggle />
            </div>
          ) : (
            <ModeToggle />
          )}
        </div>

        {/* Collapsible toggle */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-[-12px] top-5 h-6 w-6 rounded-full border shadow-sm bg-background z-10"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === item.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted",
                    !isOpen && "justify-center"
                  )}
                  onClick={() => isMobile && setMobileOpen(false)}
                >
                  <Icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-3 border-t">
          {isAuthenticated ? (
            <div className="flex flex-col space-y-2">
              {isOpen && (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Signed in as <span className="font-medium">{user?.name}</span>
                </div>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                size="sm"
                className={!isOpen ? "p-2" : ""}
              >
                {isOpen ? "Logout" : <LogIn className="h-4 w-4 rotate-180" />}
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="w-full">
              <Link href="/login">
                {isOpen ? "Login" : <LogIn className="h-4 w-4" />}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Page content wrapper - adds margin to accommodate sidebar */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          !isMobile && (isExpanded ? "ml-64" : "ml-16")
        )}
      >
        <main className="flex-grow">
          {/* Pass children/page content here */}
        </main>
      </div>
    </>
  );
}

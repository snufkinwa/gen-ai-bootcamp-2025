"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Kana Game", path: "/kana-game" },
  { name: "Pronunciation", path: "/pronunciation" },
  { name: "Visual Novel", path: "/visual-novel" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { isAuthenticated, user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logonav.svg"
              alt="KOTOBA NEXUS Logo"
              width={100}
              height={100}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <ModeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden md:inline-block">
                  Welcome, {user.name}
                </span>
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-2 py-1 text-sm font-medium rounded-md transition-colors hover:bg-accent ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              {isAuthenticated ? (
                <Button
                  className="w-full"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full"
                    size="sm"
                    variant="outline"
                    asChild
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="w-full" size="sm" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

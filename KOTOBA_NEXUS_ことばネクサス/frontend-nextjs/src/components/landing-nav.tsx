"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LandingNav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-4 py-0">
        <div className="flex justify-between items-center">
          {/* Left section - empty to balance the layout */}
          <div className="w-32"></div>

          {/* Center section - logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="KOTOBA NEXUS Logo"
                width={350}
                height={350}
              />
            </Link>
          </div>

          {/* Right section - mode toggle and login button */}
          <div className="flex items-center gap-2 w-32 justify-end">
            <ModeToggle />
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

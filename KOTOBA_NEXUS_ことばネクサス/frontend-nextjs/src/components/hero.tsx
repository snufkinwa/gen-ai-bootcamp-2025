"use client";

import { useRef } from "react";
import Image from "next/image";
import LandingNav from "./landing-nav";

export default function Hero() {
  const constraintsRef = useRef(null);

  return (
    <div className="relative min-h-screen">
      <LandingNav />

      {/* Hero background image - now smaller and positioned at the top */}
      <div className="absolute top-0 inset-x-0 w-full h-full z-0">
        <Image
          src="/p06.png"
          alt="Japanese landscape"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10 "></div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function CombinedSectionBreak({ className = "" }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getSectionBreakSrc = () => {
    if (!mounted) return "/section.svg";

    const isDarkTheme = theme === "dark" || resolvedTheme === "dark";
    return isDarkTheme ? "/section-dark.svg" : "/section.svg";
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Section break background with theme awareness */}
      <div className="relative w-full">
        <img
          src={getSectionBreakSrc()}
          alt="Section break with cherry blossoms"
          className="w-full h-[50%]"
        />
      </div>

      {/* Torii gate positioned on top of the section break */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-[70%] ">
        <Image
          src="/jpblog.svg"
          alt="Japanese Torii Gate"
          width={200}
          height={200}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

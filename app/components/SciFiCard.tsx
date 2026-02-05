"use client";

import React from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SciFiCardProps {
  title?: string;
  logoSrc?: string;
  bgImageSrc?: string; // 👈 Iska use poore card ko cover karne ke liye hoga
  themeColor?: string;
  onClick?: () => void;
  className?: string;
}

const SciFiCard: React.FC<SciFiCardProps> = ({
  title = "Project",
  logoSrc,
  bgImageSrc,
  themeColor = "#4285F4",
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative group w-full aspect-video cursor-pointer select-none",
        "transition-transform duration-300 ease-out hover:scale-105", 
        className
      )}
      style={{ ["--theme-color" as any]: themeColor }}
    >
      {/* 1. BACKGROUND LAYER - Isko 100% cover ke liye set kiya hai */}
      <div 
        className="absolute inset-0 z-0 bg-gray-900 transition-all duration-500 overflow-hidden"
        style={{
          clipPath: "polygon(10% 0, 90% 0, 100% 15%, 100% 85%, 90% 100%, 10% 100%, 0 85%, 0 15%)"
        }}
      >
        {/* Default background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-100" />

        {/* 🛠️ PROJECT IMAGE: Default visible (opacity-60) and covers everything */}
        {logoSrc && (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-110"
            style={{ backgroundImage: `url(${logoSrc})` }}
          />
        )}
        
        {/* Overlay to keep text readable */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
      </div>

      {/* 2. SVG BORDER OVERLAY */}
      <svg
        className="absolute inset-0 z-20 w-full h-full pointer-events-none drop-shadow-[0_0_8px_var(--theme-color)]"
        viewBox="0 0 400 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M40,5 L360,5 L395,40 L395,210 L360,245 L40,245 L5,210 L5,40 Z"
          stroke="var(--theme-color)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          className="opacity-90 transition-opacity duration-300"
        />
      </svg>

      {/* 3. CONTENT LAYER */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)] font-orbitron">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default SciFiCard;
/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// Created by AshrafMorningstar
// GitHub: https://github.com/AshrafMorningstar

import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl transition-all duration-300",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50",
        "hover:border-white/20 hover:bg-black/30 hover:shadow-emerald-500/10",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

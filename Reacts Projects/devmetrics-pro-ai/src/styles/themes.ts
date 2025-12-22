/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

export type ThemeType = "cyberpunk" | "zen";

export const themes: Record<ThemeType, any> = {
  cyberpunk: {
    name: "cyberpunk",
    background: "bg-slate-950",
    text: "text-cyan-400",
    textPrimary: "text-white",
    textSecondary: "text-gray-400",
    accent: "bg-gradient-to-r from-cyan-400 to-purple-500",
    accentText:
      "bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500",
    card: "bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]",
    gridColor:
      "bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]",
    gridOpacity: "opacity-20",
    orbColors: ["bg-violet-600/30", "bg-cyan-600/30"],
  },
  zen: {
    name: "zen",
    background: "bg-slate-50",
    text: "text-slate-800",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-500",
    accent: "bg-gradient-to-r from-blue-400 to-teal-400",
    accentText:
      "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500",
    card: "bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl",
    gridColor:
      "bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]",
    gridOpacity: "opacity-40",
    orbColors: ["bg-blue-300/30", "bg-teal-300/30"],
  },
};

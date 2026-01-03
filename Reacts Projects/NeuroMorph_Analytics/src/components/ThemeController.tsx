/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
import { motion } from "framer-motion";
import { Palette, Zap, Play, Pause } from "lucide-react";
import { useThemeStore, Theme } from "../store";

const ThemeController = () => {
  const { currentTheme, setTheme, cycleTheme, autoRotate, toggleAutoRotate } =
    useThemeStore();

  const themes: { name: Theme; label: string; color: string }[] = [
    { name: "cyber", label: "Cyberpunk Neon", color: "#00f0ff" },
    { name: "quantum", label: "Quantum Aurora", color: "#7b2cbf" },
    { name: "bio", label: "Bioluminescent", color: "#00ff88" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-6 right-6 z-50 glass-strong rounded-2xl p-4 neon-border"
      style={{
        borderColor: themes.find((t) => t.name === currentTheme)?.color,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Palette
          size={20}
          className="neon-text"
          style={{ color: themes.find((t) => t.name === currentTheme)?.color }}
        />
        <span className="font-bold text-sm">THEME MORPH</span>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setTheme(theme.name)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentTheme === theme.name
                ? "neon-border scale-105"
                : "glass opacity-60 hover:opacity-100"
            }`}
            style={{
              borderColor:
                currentTheme === theme.name ? theme.color : "transparent",
              color: theme.color,
            }}
          >
            {theme.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={cycleTheme}
          className="flex-1 glass-strong px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all neon-border flex items-center justify-center gap-2"
          style={{
            borderColor: themes.find((t) => t.name === currentTheme)?.color,
          }}
        >
          <Zap size={16} />
          Cycle
        </button>
        <button
          onClick={toggleAutoRotate}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all neon-border flex items-center justify-center gap-2 ${
            autoRotate ? "glass-strong" : "glass opacity-60"
          }`}
          style={{
            borderColor: themes.find((t) => t.name === currentTheme)?.color,
          }}
        >
          {autoRotate ? <Pause size={16} /> : <Play size={16} />}
          Auto
        </button>
      </div>
    </motion.div>
  );
};

export default ThemeController;

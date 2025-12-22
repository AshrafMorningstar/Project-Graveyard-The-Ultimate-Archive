/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Scene3D from "./components/Scene3D";
import DataVisualizations from "./components/DataVisualizations";
import ThemeController from "./components/ThemeController";
import { useThemeStore } from "./store";
import { Activity, TrendingUp, Zap, Database } from "lucide-react";

function App() {
  const { currentTheme, cycleTheme, autoRotate } = useThemeStore();

  // Auto-rotate themes every 10 seconds
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      cycleTheme();
    }, 10000);

    return () => clearInterval(interval);
  }, [autoRotate, cycleTheme]);

  const themeClasses = {
    cyber: "bg-cyber-bg",
    quantum: "bg-quantum-bg",
    bio: "bg-bio-bg",
  };

  const themeColors = {
    cyber: { primary: "#00f0ff", secondary: "#ff00ff" },
    quantum: { primary: "#7b2cbf", secondary: "#c77dff" },
    bio: { primary: "#00ff88", secondary: "#00ffcc" },
  };

  const colors = themeColors[currentTheme];

  return (
    <div
      className={`min-h-screen ${themeClasses[currentTheme]} transition-colors duration-1000 relative overflow-hidden`}
    >
      {/* 3D Background */}
      <Scene3D />

      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Particle Field */}
      <div className="absolute inset-0 particle-field opacity-30" />

      {/* Theme Controller */}
      <ThemeController />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 pb-6 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1
              className="text-6xl font-black mb-2 holographic gradient-text bg-clip-text"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              NEUROMORPH ANALYTICS
            </motion.h1>
            <p className="text-xl opacity-80" style={{ color: colors.primary }}>
              Revolutionary 3D Data Visualization Platform
            </p>
            <p className="text-sm mt-2 opacity-60">
              Created by{" "}
              <a
                href="https://github.com/AshrafMorningstar"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-text hover:underline"
                style={{ color: colors.secondary }}
              >
                AshrafMorningstar
              </a>
            </p>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                icon: Activity,
                label: "Active Nodes",
                value: "1,234",
                color: colors.primary,
              },
              {
                icon: TrendingUp,
                label: "Growth Rate",
                value: "+45%",
                color: colors.secondary,
              },
              {
                icon: Zap,
                label: "Processing Speed",
                value: "2.4ms",
                color: colors.primary,
              },
              {
                icon: Database,
                label: "Data Points",
                value: "8.9M",
                color: colors.secondary,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-xl p-4 neon-border hover:scale-105 transition-transform cursor-pointer"
                style={{ borderColor: stat.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon
                    size={24}
                    style={{ color: stat.color }}
                    className="neon-text"
                  />
                  <span
                    className="text-2xl font-bold neon-text"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm opacity-70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Visualizations */}
        <DataVisualizations />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center py-8 px-6"
        >
          <div
            className="glass-strong rounded-xl p-4 max-w-2xl mx-auto neon-border"
            style={{ borderColor: colors.primary }}
          >
            <p className="text-sm opacity-80">
              <span
                className="neon-text font-bold"
                style={{ color: colors.primary }}
              >
                NeuroMorph Analytics
              </span>{" "}
              • Powered by Advanced AI & Quantum Computing
            </p>
            <p className="text-xs mt-2 opacity-60">
              Themes auto-rotate every 10 seconds • Use controls to customize
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;

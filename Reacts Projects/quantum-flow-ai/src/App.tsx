/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Cpu,
  Zap,
  TrendingUp,
  Database,
  Network,
} from "lucide-react";
import QuantumParticles from "./components/QuantumParticles";
import Dashboard from "./components/Dashboard";
import ThemeSelector from "./components/ThemeSelector";
import "./App.css";

// Theme configurations
const themes = {
  quantum: {
    primary: "#00ffff",
    secondary: "#ff00ff",
    tertiary: "#ffff00",
    name: "Quantum",
  },
  nebula: {
    primary: "#ff6b9d",
    secondary: "#c06c84",
    tertiary: "#6c5b7b",
    name: "Nebula",
  },
  matrix: {
    primary: "#00ff00",
    secondary: "#008f00",
    tertiary: "#00ff88",
    name: "Matrix",
  },
  aurora: {
    primary: "#00ff88",
    secondary: "#00d4ff",
    tertiary: "#ff00ff",
    name: "Aurora",
  },
  cyber: {
    primary: "#ff0080",
    secondary: "#00ffff",
    tertiary: "#ffff00",
    name: "Cyberpunk",
  },
};

function App() {
  const [currentTheme, setCurrentTheme] =
    useState<keyof typeof themes>("quantum");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apply theme colors to CSS variables
    const theme = themes[currentTheme];
    document.documentElement.style.setProperty(
      "--quantum-primary",
      theme.primary
    );
    document.documentElement.style.setProperty(
      "--quantum-secondary",
      theme.secondary
    );
    document.documentElement.style.setProperty(
      "--quantum-tertiary",
      theme.tertiary
    );
  }, [currentTheme]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="app">
      <div className="quantum-grid" />
      <QuantumParticles count={50} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="loader-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="quantum-loader"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Cpu size={80} className="neon-text" />
            </motion.div>
            <motion.h1
              className="neon-text"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              INITIALIZING QUANTUM FLOW
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <header className="app-header">
              <motion.div
                className="logo-container"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="logo-icon" />
                <h1 className="neon-text">QUANTUMFLOW AI</h1>
              </motion.div>

              <ThemeSelector
                themes={themes}
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
              />

              <div className="header-stats">
                <div className="stat-item glass-card">
                  <Activity size={20} />
                  <span>98.7% Uptime</span>
                </div>
                <div className="stat-item glass-card">
                  <Network size={20} />
                  <span>42 Nodes Active</span>
                </div>
                <div className="stat-item glass-card">
                  <Database size={20} />
                  <span>2.4 PB Processed</span>
                </div>
              </div>
            </header>

            <Dashboard theme={themes[currentTheme]} />

            <footer className="app-footer">
              <p>
                Created by{" "}
                <a
                  href="https://github.com/AshrafMorningstar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-text"
                >
                  AshrafMorningstar
                </a>
              </p>
              <p>QuantumFlow AI © 2024 - Ultra Premium Dashboard</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

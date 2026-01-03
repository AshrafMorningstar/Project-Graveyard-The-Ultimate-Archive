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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: "#050505",
          dark: "#0a0a0a",
          card: "rgba(20, 20, 30, 0.6)",
          text: "#e0e0e0",
          dim: "#808080",
        },
        neon: {
          blue: "#00f3ff",
          pink: "#ff00ff",
          green: "#00ff9d",
          purple: "#bc13fe",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        cyber: ["'Orbitron'", "sans-serif"],
      },
      boxShadow: {
        "neon-blue": "0 0 10px #00f3ff, 0 0 20px #00f3ff50",
        "neon-pink": "0 0 10px #ff00ff, 0 0 20px #ff00ff50",
        "neon-green": "0 0 10px #00ff9d, 0 0 20px #00ff9d50",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glitch: "glitch 1s linear infinite",
        scan: "scan 4s linear infinite",
      },
      keyframes: {
        glitch: {
          "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
      },
    },
  },
  plugins: [],
};

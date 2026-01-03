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
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cyberpunk Neon Theme
        cyber: {
          bg: "#0a0e27",
          surface: "#151932",
          primary: "#00f0ff",
          secondary: "#ff00ff",
          accent: "#ffff00",
          success: "#00ff88",
          danger: "#ff0055",
        },
        // Quantum Aurora Theme
        quantum: {
          bg: "#0d0221",
          surface: "#1a0b2e",
          primary: "#7b2cbf",
          secondary: "#c77dff",
          accent: "#e0aaff",
          glow: "#5a189a",
        },
        // Bioluminescent Theme
        bio: {
          bg: "#001a0f",
          surface: "#003322",
          primary: "#00ff88",
          secondary: "#00ffcc",
          accent: "#88ffdd",
          glow: "#00aa66",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        morph: "morph 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px currentColor, 0 0 20px currentColor" },
          to: { boxShadow: "0 0 20px currentColor, 0 0 40px currentColor" },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

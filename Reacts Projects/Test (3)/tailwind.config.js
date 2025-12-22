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
        aether: {
          white: "#ffffff",
          ghost: "#f8faff",
          frost: "#e3f2fd",
          crystal: "#bbdefb",
          steel: "#90a4ae",
          shadow: "#37474f",
          deep: "#263238",
          "aurora-cyan": "#18ffff",
          "aurora-pink": "#f50057",
          "aurora-gold": "#ffd600",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
        serif: ["GT Super", "serif"],
        system: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

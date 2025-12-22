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
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00A3E0",
        secondary: "#FF6B6B",
        dark: {
          bg: "#1a1a1a",
          text: "#f5f5f5"
        },
        light: {
          bg: "#ffffff",
          text: "#1a1a1a"
        }
      },
      fontFamily: {
        sans: ['"SF Pro Text"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"SF Pro Display"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', 'monospace'],
      },
      animation: {
        'dock-bounce': 'dockBounce 0.5s ease-in-out',
      },
      keyframes: {
        dockBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

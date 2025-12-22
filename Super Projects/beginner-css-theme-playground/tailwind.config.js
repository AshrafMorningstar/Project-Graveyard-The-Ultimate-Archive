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
        bg: {
          primary: '#111827', // Gray 900
          secondary: '#1F2937', // Gray 800
          tertiary: '#374151', // Gray 700
        },
        text: {
          primary: '#F9FAFB', // Gray 50
          secondary: '#9CA3AF', // Gray 400
        },
        brand: {
          DEFAULT: '#3B82F6', // Blue 500
          hover: '#2563EB', // Blue 600
        }
      }
    },
  },
  plugins: [],
}

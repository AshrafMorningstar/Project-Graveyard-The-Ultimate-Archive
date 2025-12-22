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
          primary: '#F8FAFC',
          secondary: '#FFFFFF',
        },
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          focus: '#93C5FD'
        },
        text: {
          primary: '#1E293B',
          secondary: '#64748B'
        }
      }
    },
  },
  plugins: [],
}

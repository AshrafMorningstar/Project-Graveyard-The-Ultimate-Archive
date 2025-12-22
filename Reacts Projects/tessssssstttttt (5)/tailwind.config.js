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
        // Light Mode
        'mac-bg-light': '#F5F5F7',
        'mac-dock-light': 'rgba(255, 255, 255, 0.2)',
        'mac-window-light': 'rgba(255, 255, 255, 0.85)',
        'mac-accent-light': '#007AFF', // Apple Blue
        
        // Dark Mode
        'mac-bg-dark': '#1C1C1E',
        'mac-dock-dark': 'rgba(0, 0, 0, 0.2)',
        'mac-window-dark': '#2C2C2E', // Slightly transparent in implementation often
        'mac-accent-dark': '#0A84FF',
        
        // System Colors
        'mac-red': '#FF3B30',
        'mac-yellow': '#FFCC00',
        'mac-green': '#34C759',
        'mac-gray': '#8E8E93',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Open Sans"',
          '"Helvetica Neue"',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          'Monaco',
          'Menlo',
          'Consolas',
          '"Courier New"',
          'monospace'
        ]
      },
      cursor: {
        'mac-default': 'default', // Placeholder for custom cursor if needed
      }
    },
  },
  plugins: [],
}

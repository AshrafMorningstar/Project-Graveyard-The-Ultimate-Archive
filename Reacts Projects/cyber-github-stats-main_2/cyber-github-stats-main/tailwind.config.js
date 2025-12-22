/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: '#00ffff',
          secondary: '#ff00ff',
          accent: '#00ff88',
          dark: '#0a0e27',
          darker: '#050812',
          blue: '#0080ff',
          purple: '#8000ff',
          pink: '#ff0080',
        },
      },
      fontFamily: {
        cyber: ['Orbitron', 'monospace'],
        code: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0, 255, 255, 0.5)',
        'cyber-lg': '0 0 40px rgba(0, 255, 255, 0.7)',
        'neon': '0 0 10px currentColor',
      },
      animation: {
        'pulse-cyber': 'pulse-cyber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        'pulse-cyber': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'glow': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.5)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
    },
  },
  plugins: [],
};

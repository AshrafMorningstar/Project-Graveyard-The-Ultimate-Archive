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
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chronos: {
          blue: "#0A0C27",
          dark: "#050510",
          space: "#0F102E"
        },
        neuro: {
          purple: "#3A0CA3",
          pink: "#FF00FF",
          cyan: "#00F5FF"
        },
        quantum: {
          glow: "#4CC9F0",
          energy: "#7209B7",
          matter: "#F72585"
        },
        hologram: {
          primary: "rgba(10, 12, 39, 0.95)",
          secondary: "rgba(58, 12, 163, 0.8)",
          accent: "rgba(0, 245, 255, 0.6)"
        }
      },
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'quantum': ['monospace'], // Fallback
      },
      animation: {
        'quantum-pulse': 'quantum-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'chronos-spin': 'chronos-spin 20s linear infinite',
        'neural-flow': 'neural-flow 3s ease-in-out infinite',
        'hologram-flicker': 'hologram-flicker 1.5s ease-in-out infinite',
        'cosmic-drift': 'cosmic-drift 60s linear infinite',
        'particle-float': 'particle-float 30s ease-in-out infinite',
        'time-dilation': 'time-dilation 5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        'quantum-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        'chronos-spin': {
          from: { transform: 'rotate(0deg) scale(1)' },
          to: { transform: 'rotate(360deg) scale(1.1)' }
        },
        'neural-flow': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' }
        },
        'hologram-flicker': {
          '0%, 100%': { opacity: 1, filter: 'brightness(1)' },
          '25%': { opacity: 0.8, filter: 'brightness(1.2)' },
          '50%': { opacity: 0.9, filter: 'brightness(0.9)' },
          '75%': { opacity: 0.85, filter: 'brightness(1.1)' }
        },
        'cosmic-drift': {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-5px)' },
          '50%': { transform: 'translateX(0) translateY(-10px)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px)' },
          '100%': { transform: 'translateX(0) translateY(0)' }
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) rotate(120deg)' },
          '66%': { transform: 'translateY(15px) rotate(240deg)' }
        },
        'time-dilation': {
          '0%': { transform: 'scale(1)', filter: 'blur(0px)' },
          '50%': { transform: 'scale(1.1)', filter: 'blur(2px)' },
          '100%': { transform: 'scale(1)', filter: 'blur(0px)' }
        }
      },
      backdropBlur: {
        'quantum': '20px',
        'hologram': '40px',
        'neural': '60px'
      },
      boxShadow: {
        'quantum': '0 0 50px rgba(76, 201, 240, 0.3)',
        'neuro': '0 0 70px rgba(255, 0, 255, 0.4)',
        'chronos': '0 0 100px rgba(10, 12, 39, 0.5)',
        'hologram': '0 0 120px rgba(0, 245, 255, 0.2)'
      }
    }
  },
  plugins: [],
}

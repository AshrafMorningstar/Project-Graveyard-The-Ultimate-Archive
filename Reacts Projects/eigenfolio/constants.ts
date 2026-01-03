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

import { Project } from './types';

export const WALLPAPERS = [
  { name: "Nebula", url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" },
  { name: "Midnight City", url: "https://images.unsplash.com/photo-1514302240736-b1fee59858eb?q=80&w=2070&auto=format&fit=crop" },
  { name: "Abstract Waves", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop" },
  { name: "Zen Garden", url: "https://images.unsplash.com/photo-1590013330689-f53ebcf59f71?q=80&w=2074&auto=format&fit=crop" },
  { name: "Cyberpunk", url: "https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop" },
];

export const ACCENT_COLORS = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Orange", value: "#f97316" },
];

export const APP_TITLES: Record<string, string> = {
  finder: 'Finder',
  projects: 'Projects',
  'ai-chat': 'Gemini AI',
  tictactoe: 'Arcade',
  memory: 'Memory',
  settings: 'Settings',
  browser: 'GitHub',
  terminal: 'Terminal',
  mail: 'Mail',
  about: 'About AshrafOS'
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AshrafOS',
    description: 'A React-based web operating system simulation with window management and interactive apps. Features a custom window manager and Gemini AI integration.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Zustand', 'Vite'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://picsum.photos/seed/os/600/400',
    featured: true
  },
  {
    id: '2',
    title: 'Neon Commerce',
    description: 'High-performance e-commerce dashboard featuring real-time analytics, inventory management, and dark mode UI.',
    tech: ['Next.js', 'Stripe', 'Supabase', 'Recharts'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://picsum.photos/seed/ecom/600/400',
    featured: true
  },
  {
    id: '3',
    title: 'AI Visionary',
    description: 'Generative AI application for image synthesis and text analysis using Gemini API. Includes prompt engineering tools.',
    tech: ['Gemini API', 'Python', 'FastAPI', 'React'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://picsum.photos/seed/ai/600/400',
    featured: true
  },
  {
    id: '4',
    title: 'CryptoTracker Pro',
    description: 'Real-time cryptocurrency tracking application with websocket integration for live price updates and portfolio management.',
    tech: ['React Native', 'Redux', 'WebSockets'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://picsum.photos/seed/crypto/600/400'
  },
  {
    id: '5',
    title: 'TaskFlow Enterprise',
    description: 'Collaborative project management tool similar to Jira, optimized for small agile teams.',
    tech: ['Vue.js', 'Firebase', 'Tailwind'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://picsum.photos/seed/task/600/400'
  },
  {
    id: '6',
    title: 'Morningstar Portfolio v1',
    description: 'The previous iteration of my personal portfolio featuring 3D WebGL elements and GSAP animations.',
    tech: ['Three.js', 'GSAP', 'WebGL'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://picsum.photos/seed/port/600/400'
  }
];

export const ICONS = {
  finder: "https://img.icons8.com/color/96/mac-os-finder.png",
  projects: "https://img.icons8.com/color/96/folder-invoices.png",
  ai: "https://img.icons8.com/color/96/artificial-intelligence.png",
  game: "https://img.icons8.com/color/96/controller.png",
  github: "https://img.icons8.com/fluency/96/github.png",
  terminal: "https://img.icons8.com/fluency/96/console.png",
  mail: "https://img.icons8.com/color/96/apple-mail.png",
  settings: "https://img.icons8.com/color/96/settings--v1.png",
  browser: "https://img.icons8.com/color/96/safari--v1.png",
  memory: "https://img.icons8.com/color/96/brain--v1.png",
  about: "https://img.icons8.com/color/96/info--v1.png"
};
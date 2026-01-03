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

export const WALLPAPER_URL = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop";

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AshrafOS',
    description: 'A React-based web operating system simulation with window management and interactive apps.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Zustand'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://picsum.photos/seed/os/600/400'
  },
  {
    id: '2',
    title: 'Neon Commerce',
    description: 'High-performance e-commerce dashboard featuring real-time analytics and dark mode UI.',
    tech: ['Next.js', 'Stripe', 'Supabase'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://picsum.photos/seed/ecom/600/400'
  },
  {
    id: '3',
    title: 'AI Visionary',
    description: 'Generative AI application for image synthesis and text analysis using Gemini API.',
    tech: ['Gemini API', 'Python', 'FastAPI'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://picsum.photos/seed/ai/600/400'
  },
  {
    id: '4',
    title: 'Morningstar Portfolio',
    description: 'The previous iteration of my personal portfolio with 3D elements.',
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
  github: "https://img.icons8.com/fluency/96/github.png"
};

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { Project, FileNode } from './types';

export const WALLPAPERS = [
  { name: "Deep Space", url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop" },
  { name: "Quantum Grid", url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop" },
  { name: "Cyber Matrix", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
  { name: "Nebula", url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074&auto=format&fit=crop" },
  { name: "Synthwave", url: "https://images.unsplash.com/photo-1534224039826-c7a11821de42?q=80&w=2070&auto=format&fit=crop" },
  { name: "Circuit Board", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" },
];

export const ACCENT_COLORS = [
  { name: "Neuro Purple", value: "#3A0CA3" },
  { name: "Quantum Cyan", value: "#00F5FF" },
  { name: "Energy Pink", value: "#F72585" },
  { name: "Chronos Blue", value: "#4361ee" },
  { name: "Matrix Green", value: "#00FF41" },
  { name: "Solar Orange", value: "#FF9F1C" },
];

export const APP_TITLES: Record<string, string> = {
  finder: 'Cosmic Profile',
  projects: 'Project Nebula',
  'ai-chat': 'Neuro AI',
  chess: 'Quantum Chess',
  memory: 'Neural Memory',
  settings: 'System Core',
  browser: 'Cyber Web',
  terminal: 'Chronos Terminal',
  mail: 'Comms Uplink',
  about: 'Manifest',
  calculator: 'Quantum Calc',
  notepad: 'Star Notes',
  music: 'Cosmic Waves',
  files: 'Data Bank',
  paint: 'Quantum Canvas',
  snake: 'Serpent Protocol',
  tasks: 'Process Manager',
  camera: 'HoloLens',
  weather: 'Atmosphere',
  code: 'Code Matrix',
  video: 'HoloView',
  calendar: 'Time Log',
  recycle: 'Trash'
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Eigenfolio Quantum',
    description: 'The first neuromorphic portfolio architecture. Features time-dilation effects, quantum state management, and holographic UI.',
    tech: ['React', 'Three.js', 'Quantum Core', 'Tailwind'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop',
    featured: true
  },
  {
    id: '2',
    title: 'Neon Commerce',
    description: 'High-performance e-commerce dashboard featuring real-time analytics, inventory management, and dark mode UI.',
    tech: ['Next.js', 'Stripe', 'Supabase', 'Recharts'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://images.unsplash.com/photo-1555421689-49263376da7a?q=80&w=1000&auto=format&fit=crop',
    featured: true
  },
  {
    id: '3',
    title: 'AI Visionary',
    description: 'Generative AI application for image synthesis and text analysis using Gemini API. Includes prompt engineering tools.',
    tech: ['Gemini API', 'Python', 'FastAPI', 'React'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    featured: true
  },
  {
    id: '4',
    title: 'CryptoTracker Pro',
    description: 'Real-time cryptocurrency tracking application with websocket integration for live price updates and portfolio management.',
    tech: ['React Native', 'Redux', 'WebSockets'],
    link: 'https://github.com/AshrafMorningstar',
    image: 'https://images.unsplash.com/photo-1621504450162-6667a3e71d09?q=80&w=1000&auto=format&fit=crop'
  }
];

export const ICONS = {
  finder: "https://img.icons8.com/fluency/96/user-menu-male.png",
  projects: "https://img.icons8.com/fluency/96/nebula.png",
  ai: "https://img.icons8.com/fluency/96/brain.png",
  chess: "https://img.icons8.com/fluency/96/knight-shield.png",
  github: "https://img.icons8.com/fluency/96/github.png",
  terminal: "https://img.icons8.com/fluency/96/console.png",
  mail: "https://img.icons8.com/fluency/96/satellite-sending-signal.png",
  settings: "https://img.icons8.com/fluency/96/gear.png",
  browser: "https://img.icons8.com/fluency/96/internet.png",
  memory: "https://img.icons8.com/fluency/96/memory-slot.png",
  about: "https://img.icons8.com/fluency/96/information.png",
  calculator: "https://img.icons8.com/fluency/96/calculator.png",
  notepad: "https://img.icons8.com/fluency/96/spiral-bound-booklet.png",
  music: "https://img.icons8.com/fluency/96/musical-notes.png",
  files: "https://img.icons8.com/fluency/96/folder-invoices.png",
  paint: "https://img.icons8.com/fluency/96/paint-palette.png",
  snake: "https://img.icons8.com/fluency/96/snake.png",
  tasks: "https://img.icons8.com/fluency/96/system-task.png",
  camera: "https://img.icons8.com/fluency/96/camera.png",
  weather: "https://img.icons8.com/fluency/96/partly-cloudy-day.png",
  code: "https://img.icons8.com/fluency/96/source-code.png",
  video: "https://img.icons8.com/fluency/96/video-playlist.png",
  calendar: "https://img.icons8.com/fluency/96/calendar.png",
  recycle: "https://img.icons8.com/fluency/96/trash.png"
};

export const INITIAL_FILE_SYSTEM: FileNode[] = [
  {
    id: 'root',
    name: 'Root',
    type: 'folder',
    parentId: null,
    children: [
      {
        id: 'docs',
        name: 'Documents',
        type: 'folder',
        parentId: 'root',
        children: [
          { id: 'resume', name: 'Resume.txt', type: 'file', content: 'Ashraf Morningstar - Senior Engineer\n\nExperience:\n- Morningstar Tech (2021-Present)\n- Freelance (2018-2021)\n\nSkills: React, Next.js, AI, Quantum UI', parentId: 'docs' },
          { id: 'notes', name: 'Project_Ideas.txt', type: 'file', content: '1. Neural Interface VR\n2. AI Code Assistant\n3. Quantum Stock Predictor', parentId: 'docs' },
          { id: 'script', name: 'hello.js', type: 'file', content: 'console.log("Hello, Quantum World!");\n\nfunction quantumSuperposition() {\n  return Math.random() > 0.5 ? "Alive" : "Dead";\n}', parentId: 'docs' },
        ]
      },
      {
        id: 'images',
        name: 'Images',
        type: 'folder',
        parentId: 'root',
        children: [
          { id: 'img1', name: 'nebula.png', type: 'file', image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=400', parentId: 'images' },
          { id: 'img2', name: 'cyber.png', type: 'file', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400', parentId: 'images' },
        ]
      },
      {
        id: 'system',
        name: 'System',
        type: 'folder',
        parentId: 'root',
        children: [
          { id: 'sys_log', name: 'kernel.log', type: 'file', content: '[OK] Kernel initialized.\n[OK] Neural Link established.\n[WARN] Quantum instability detected in sector 7.', parentId: 'system' },
          { id: 'config', name: 'config.json', type: 'file', content: '{\n  "version": "2.0.0",\n  "theme": "dark",\n  "gpu_acceleration": true\n}', parentId: 'system' },
        ]
      },
      {
        id: 'trash',
        name: 'Trash',
        type: 'folder',
        parentId: 'root',
        children: []
      }
    ]
  }
];
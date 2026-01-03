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

export type ThemeName = 
  | 'cyber-neon'
  | 'quantum-glass'
  | 'aurora-dream'
  | 'matrix-code'
  | 'synthwave-retro'
  | 'cosmic-nebula'
  | 'minimal-luxury'
  | 'hacker-terminal';

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundAlt: string;
    cardBg: string;
    text: string;
    textMuted: string;
    success: string;
    warning: string;
  };
  effects: {
    glow: string;
    blur: number;
    cardOpacity: number;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  animations: {
    speed: 'slow' | 'medium' | 'fast';
    style: 'smooth' | 'bouncy' | 'sharp';
  };
}

export const THEMES: Record<ThemeName, Theme> = {
  'cyber-neon': {
    name: 'cyber-neon',
    displayName: 'Cyber Neon',
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      accent: '#00ff88',
      background: '#0a0e27',
      backgroundAlt: '#050812',
      cardBg: 'rgba(15, 23, 42, 0.7)',
      text: '#e5e7eb',
      textMuted: '#9ca3af',
      success: '#00ff88',
      warning: '#ffaa00',
    },
    effects: {
      glow: '0 0 30px',
      blur: 20,
      cardOpacity: 0.7,
    },
    fonts: {
      heading: 'Orbitron, monospace',
      body: 'Inter, sans-serif',
      mono: 'Fira Code, monospace',
    },
    animations: {
      speed: 'fast',
      style: 'sharp',
    },
  },
  'quantum-glass': {
    name: 'quantum-glass',
    displayName: 'Quantum Glass',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      background: '#0f172a',
      backgroundAlt: '#1e293b',
      cardBg: 'rgba(51, 65, 85, 0.4)',
      text: '#f1f5f9',
      textMuted: '#cbd5e1',
      success: '#10b981',
      warning: '#f59e0b',
    },
    effects: {
      glow: '0 8px 32px',
      blur: 40,
      cardOpacity: 0.4,
    },
    fonts: {
      heading: 'Space Grotesk, sans-serif',
      body: 'Inter, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    animations: {
      speed: 'medium',
      style: 'smooth',
    },
  },
  'aurora-dream': {
    name: 'aurora-dream',
    displayName: 'Aurora Dream',
    colors: {
      primary: '#60efff',
      secondary: '#c471ed',
      accent: '#f7971e',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundAlt: '#5a67d8',
      cardBg: 'rgba(255, 255, 255, 0.15)',
      text: '#ffffff',
      textMuted: 'rgba(255, 255, 255, 0.7)',
      success: '#48bb78',
      warning: '#ed8936',
    },
    effects: {
      glow: '0 0 40px',
      blur: 30,
      cardOpacity: 0.15,
    },
    fonts: {
      heading: 'Montserrat, sans-serif',
      body: 'Poppins, sans-serif',
      mono: 'Source Code Pro, monospace',
    },
    animations: {
      speed: 'slow',
      style: 'smooth',
    },
  },
  'matrix-code': {
    name: 'matrix-code',
    displayName: 'Matrix Code',
    colors: {
      primary: '#00ff41',
      secondary: '#008f11',
      accent: '#39ff14',
      background: '#000000',
      backgroundAlt: '#0d0d0d',
      cardBg: 'rgba(0, 20, 0, 0.8)',
      text: '#00ff41',
      textMuted: '#008f11',
      success: '#00ff41',
      warning: '#ffff00',
    },
    effects: {
      glow: '0 0 20px',
      blur: 10,
      cardOpacity: 0.8,
    },
    fonts: {
      heading: 'Courier New, monospace',
      body: 'Courier New, monospace',
      mono: 'Courier New, monospace',
    },
    animations: {
      speed: 'fast',
      style: 'sharp',
    },
  },
  'synthwave-retro': {
    name: 'synthwave-retro',
    displayName: 'Synthwave Retro',
    colors: {
      primary: '#ff006e',
      secondary: '#8338ec',
      accent: '#ffbe0b',
      background: 'linear-gradient(180deg, #2d1b69 0%, #0f0524 100%)',
      backgroundAlt: '#1a0b3a',
      cardBg: 'rgba(131, 56, 236, 0.2)',
      text: '#ffd60a',
      textMuted: '#d896ff',
      success: '#06ffa5',
      warning: '#ff006e',
    },
    effects: {
      glow: '0 0 50px',
      blur: 25,
      cardOpacity: 0.2,
    },
    fonts: {
      heading: 'Audiowide, cursive',
      body: 'Roboto, sans-serif',
      mono: 'VT323, monospace',
    },
    animations: {
      speed: 'medium',
      style: 'bouncy',
    },
  },
  'cosmic-nebula': {
    name: 'cosmic-nebula',
    displayName: 'Cosmic Nebula',
    colors: {
      primary: '#b794f4',
      secondary: '#f687b3',
      accent: '#4fd1c5',
      background: 'radial-gradient(circle, #1a202c 0%, #0a0e1a 100%)',
      backgroundAlt: '#2d3748',
      cardBg: 'rgba(113, 128, 150, 0.2)',
      text: '#e2e8f0',
      textMuted: '#a0aec0',
      success: '#68d391',
      warning: '#f6ad55',
    },
    effects: {
      glow: '0 0 60px',
      blur: 50,
      cardOpacity: 0.2,
    },
    fonts: {
      heading: 'Exo 2, sans-serif',
      body: 'Nunito, sans-serif',
      mono: 'IBM Plex Mono, monospace',
    },
    animations: {
      speed: 'slow',
      style: 'smooth',
    },
  },
  'minimal-luxury': {
    name: 'minimal-luxury',
    displayName: 'Minimal Luxury',
    colors: {
      primary: '#d4af37',
      secondary: '#c0c0c0',
      accent: '#ffd700',
      background: '#0a0a0a',
      backgroundAlt: '#1a1a1a',
      cardBg: 'rgba(255, 255, 255, 0.05)',
      text: '#ffffff',
      textMuted: '#888888',
      success: '#50c878',
      warning: '#ff6b6b',
    },
    effects: {
      glow: '0 0 15px',
      blur: 15,
      cardOpacity: 0.05,
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Lato, sans-serif',
      mono: 'Inconsolata, monospace',
    },
    animations: {
      speed: 'medium',
      style: 'smooth',
    },
  },
  'hacker-terminal': {
    name: 'hacker-terminal',
    displayName: 'Hacker Terminal',
    colors: {
      primary: '#00ff00',
      secondary: '#00aa00',
      accent: '#ffff00',
      background: '#0c0c0c',
      backgroundAlt: '#1a1a1a',
      cardBg: 'rgba(0, 50, 0, 0.5)',
      text: '#00ff00',
      textMuted: '#00aa00',
      success: '#00ff00',
      warning: '#ff0000',
    },
    effects: {
      glow: '0 0 10px',
      blur: 5,
      cardOpacity: 0.5,
    },
    fonts: {
      heading: 'Share Tech Mono, monospace',
      body: 'Anonymous Pro, monospace',
      mono: 'Ubuntu Mono, monospace',
    },
    animations: {
      speed: 'fast',
      style: 'sharp',
    },
  },
};

export const getRandomTheme = (): Theme => {
  const themeNames = Object.keys(THEMES) as ThemeName[];
  const randomIndex = Math.floor(Math.random() * themeNames.length);
  return THEMES[themeNames[randomIndex]];
};

export const getThemeByName = (name: ThemeName): Theme => {
  return THEMES[name];
};

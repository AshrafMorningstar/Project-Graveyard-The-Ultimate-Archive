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

export interface ArtisticTheme {
  id: string;
  name: string;
  palette: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    text: string;
    accent: string;
  };
  style: {
    fontFamily: string;
    fontWeight: number;
    borderRadius: number;
    shadowIntensity: number;
    glowEffect: boolean;
  };
  animation: {
    type: 'fluid' | 'sharp' | 'organic' | 'geometric' | 'chaotic';
    speed: number;
    easing: string;
  };
  texture: 'smooth' | 'grainy' | 'glossy' | 'matte' | 'ethereal';
}

export const ARTISTIC_THEMES: ArtisticTheme[] = [
  {
    id: 'moonlit-zen',
    name: 'Moonlit Zen',
    palette: {
      primary: '#e0e7ff',
      secondary: '#c7d2fe',
      tertiary: '#a5b4fc',
      background: '#0f172a',
      text: '#f1f5f9',
      accent: '#818cf8',
    },
    style: {
      fontFamily: 'Inter',
      fontWeight: 300,
      borderRadius: 24,
      shadowIntensity: 0.3,
      glowEffect: true,
    },
    animation: {
      type: 'fluid',
      speed: 1.2,
      easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    },
    texture: 'ethereal',
  },
  {
    id: 'sakura-bloom',
    name: 'Sakura Bloom',
    palette: {
      primary: '#fda4af',
      secondary: '#fecdd3',
      tertiary: '#ffe4e6',
      background: '#1c1917',
      text: '#fafaf9',
      accent: '#fb7185',
    },
    style: {
      fontFamily: 'Quicksand',
      fontWeight: 400,
      borderRadius: 32,
      shadowIntensity: 0.5,
      glowEffect: true,
    },
    animation: {
      type: 'organic',
      speed: 0.8,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    texture: 'smooth',
  },
  {
    id: 'arctic-frost',
    name: 'Arctic Frost',
    palette: {
      primary: '#67e8f9',
      secondary: '#a5f3fc',
      tertiary: '#cffafe',
      background: '#082f49',
      text: '#f0fdfa',
      accent: '#06b6d4',
    },
    style: {
      fontFamily: 'Poppins',
      fontWeight: 500,
      borderRadius: 16,
      shadowIntensity: 0.7,
      glowEffect: true,
    },
    animation: {
      type: 'sharp',
      speed: 1.5,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    texture: 'glossy',
  },
  {
    id: 'desert-mirage',
    name: 'Desert Mirage',
    palette: {
      primary: '#fbbf24',
      secondary: '#fcd34d',
      tertiary: '#fde68a',
      background: '#44403c',
      text: '#fef3c7',
      accent: '#f59e0b',
    },
    style: {
      fontFamily: 'Raleway',
      fontWeight: 600,
      borderRadius: 12,
      shadowIntensity: 0.6,
      glowEffect: false,
    },
    animation: {
      type: 'chaotic',
      speed: 1.8,
      easing: 'ease-in-out',
    },
    texture: 'grainy',
  },
  {
    id: 'velvet-night',
    name: 'Velvet Night',
    palette: {
      primary: '#c084fc',
      secondary: '#d8b4fe',
      tertiary: '#e9d5ff',
      background: '#1e1b4b',
      text: '#f5f3ff',
      accent: '#a855f7',
    },
    style: {
      fontFamily: 'Playfair Display',
      fontWeight: 700,
      borderRadius: 20,
      shadowIntensity: 0.8,
      glowEffect: true,
    },
    animation: {
      type: 'fluid',
      speed: 1.0,
      easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    },
    texture: 'matte',
  },
  {
    id: 'emerald-garden',
    name: 'Emerald Garden',
    palette: {
      primary: '#34d399',
      secondary: '#6ee7b7',
      tertiary: '#a7f3d0',
      background: '#064e3b',
      text: '#ecfdf5',
      accent: '#10b981',
    },
    style: {
      fontFamily: 'Nunito',
      fontWeight: 400,
      borderRadius: 28,
      shadowIntensity: 0.4,
      glowEffect: true,
    },
    animation: {
      type: 'organic',
      speed: 0.9,
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    texture: 'smooth',
  },
  {
    id: 'crimson-ember',
    name: 'Crimson Ember',
    palette: {
      primary: '#fb923c',
      secondary: '#fdba74',
      tertiary: '#fed7aa',
      background: '#431407',
      text: '#fff7ed',
      accent: '#ea580c',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 800,
      borderRadius: 8,
      shadowIntensity: 0.9,
      glowEffect: false,
    },
    animation: {
      type: 'sharp',
      speed: 2.0,
      easing: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
    },
    texture: 'grainy',
  },
  {
    id: 'ocean-depth',
    name: 'Ocean Depth',
    palette: {
      primary: '#38bdf8',
      secondary: '#7dd3fc',
      tertiary: '#bae6fd',
      background: '#0c4a6e',
      text: '#f0f9ff',
      accent: '#0284c7',
    },
    style: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      borderRadius: 18,
      shadowIntensity: 0.5,
      glowEffect: true,
    },
    animation: {
      type: 'fluid',
      speed: 0.7,
      easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    texture: 'glossy',
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    palette: {
      primary: '#d8b4fe',
      secondary: '#e9d5ff',
      tertiary: '#f3e8ff',
      background: '#2e1065',
      text: '#faf5ff',
      accent: '#c026d3',
    },
    style: {
      fontFamily: 'Lato',
      fontWeight: 300,
      borderRadius: 36,
      shadowIntensity: 0.3,
      glowEffect: true,
    },
    animation: {
      type: 'organic',
      speed: 0.6,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    texture: 'ethereal',
  },
  {
    id: 'monochrome-ink',
    name: 'Monochrome Ink',
    palette: {
      primary: '#f3f4f6',
      secondary: '#e5e7eb',
      tertiary: '#d1d5db',
      background: '#111827',
      text: '#f9fafb',
      accent: '#6b7280',
    },
    style: {
      fontFamily: 'IBM Plex Sans',
      fontWeight: 500,
      borderRadius: 4,
      shadowIntensity: 0.2,
      glowEffect: false,
    },
    animation: {
      type: 'geometric',
      speed: 1.4,
      easing: 'linear',
    },
    texture: 'matte',
  },
];

export const getRandomTheme = (): ArtisticTheme => {
  return ARTISTIC_THEMES[Math.floor(Math.random() * ARTISTIC_THEMES.length)];
};

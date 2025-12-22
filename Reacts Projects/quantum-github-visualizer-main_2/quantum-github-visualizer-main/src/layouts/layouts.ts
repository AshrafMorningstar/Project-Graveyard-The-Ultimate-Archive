/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

export type LayoutName =
  | 'dashboard-grid'
  | 'cinematic-scroll'
  | 'floating-cards'
  | 'terminal-stack'
  | 'holographic-pyramid'
  | 'particle-explosion';

export interface LayoutConfig {
  name: LayoutName;
  displayName: string;
  description: string;
  cardPositions: {
    profile: {x: number; y: number; width: number; height: number; delay: number};
    stats: {x: number; y: number; width: number; height: number; delay: number};
    activity: {x: number; y: number; width: number; height: number; delay: number};
    languages: {x: number; y: number; width: number; height: number; delay: number};
    achievements: {x: number; y: number; width: number; height: number; delay: number};
  };
  animationStyle: 'fade' | 'slide' | 'zoom' | 'rotate' | 'morph' | 'glitch';
  particleCount: number;
}

export const LAYOUTS: Record<LayoutName, LayoutConfig> = {
  'dashboard-grid': {
    name: 'dashboard-grid',
    displayName: 'Dashboard Grid',
    description: 'Professional dashboard layout with organized grid',
    cardPositions: {
      profile: {x: 5, y: 5, width: 45, height: 25, delay: 0.5},
      stats: {x: 52, y: 5, width: 43, height: 25, delay: 1.0},
      activity: {x: 5, y: 32, width: 60, height: 63, delay: 2.0},
      languages: {x: 67, y: 32, width: 28, height: 35, delay: 3.0},
      achievements: {x: 67, y: 69, width: 28, height: 26, delay: 4.0},
    },
    animationStyle: 'fade',
    particleCount: 30,
  },
  'cinematic-scroll': {
    name: 'cinematic-scroll',
    displayName: 'Cinematic Scroll',
    description: 'Vertical scrolling with cinematic transitions',
    cardPositions: {
      profile: {x: 10, y: 5, width: 80, height: 18, delay: 0.5},
      stats: {x: 10, y: 25, width: 80, height: 15, delay: 1.5},
      activity: {x: 10, y: 42, width: 80, height: 20, delay: 3.0},
      languages: {x: 10, y: 64, width: 38, height: 31, delay: 4.5},
      achievements: {x: 52, y: 64, width: 38, height: 31, delay: 5.5},
    },
    animationStyle: 'slide',
    particleCount: 50,
  },
  'floating-cards': {
    name: 'floating-cards',
    displayName: 'Floating Cards',
    description: 'Cards floating in 3D space with depth',
    cardPositions: {
      profile: {x: 15, y: 10, width: 35, height: 20, delay: 0.8},
      stats: {x: 55, y: 15, width: 30, height: 18, delay: 1.5},
      activity: {x: 10, y: 35, width: 40, height: 50, delay: 2.5},
      languages: {x: 55, y: 38, width: 35, height: 25, delay: 3.5},
      achievements: {x: 55, y: 68, width: 35, height: 22, delay: 4.5},
    },
    animationStyle: 'zoom',
    particleCount: 80,
  },
  'terminal-stack': {
    name: 'terminal-stack',
    displayName: 'Terminal Stack',
    description: 'Stacked terminal windows with command-line style',
    cardPositions: {
      profile: {x: 5, y: 3, width: 90, height: 15, delay: 0.3},
      stats: {x: 5, y: 20, width: 90, height: 12, delay: 1.0},
      activity: {x: 5, y: 34, width: 90, height: 20, delay: 2.0},
      languages: {x: 5, y: 56, width: 43, height: 39, delay: 3.0},
      achievements: {x: 52, y: 56, width: 43, height: 39, delay: 4.0},
    },
    animationStyle: 'glitch',
    particleCount: 20,
  },
  'holographic-pyramid': {
    name: 'holographic-pyramid',
    displayName: 'Holographic Pyramid',
    description: 'Cards arranged in pyramid formation with holograms',
    cardPositions: {
      profile: {x: 32.5, y: 5, width: 35, height: 18, delay: 0.5},
      stats: {x: 15, y: 25, width: 30, height: 20, delay: 1.2},
      activity: {x: 55, y: 25, width: 30, height: 20, delay: 1.4},
      languages: {x: 8, y: 48, width: 35, height: 47, delay: 2.5},
      achievements: {x: 57, y: 48, width: 35, height: 47, delay: 2.7},
    },
    animationStyle: 'rotate',
    particleCount: 100,
  },
  'particle-explosion': {
    name: 'particle-explosion',
    displayName: 'Particle Explosion',
    description: 'Cards emerge from particle explosions',
    cardPositions: {
      profile: {x: 25, y: 8, width: 50, height: 20, delay: 1.0},
      stats: {x: 8, y: 32, width: 40, height: 22, delay: 2.0},
      activity: {x: 52, y: 32, width: 40, height: 22, delay: 2.2},
      languages: {x: 8, y: 58, width: 40, height: 35, delay: 3.5},
      achievements: {x: 52, y: 58, width: 40, height: 35, delay: 3.7},
    },
    animationStyle: 'morph',
    particleCount: 150,
  },
};

export const getRandomLayout = (): LayoutConfig => {
  const layoutNames = Object.keys(LAYOUTS) as LayoutName[];
  const randomIndex = Math.floor(Math.random() * layoutNames.length);
  return LAYOUTS[layoutNames[randomIndex]];
};

export const getLayoutByName = (name: LayoutName): LayoutConfig => {
  return LAYOUTS[name];
};

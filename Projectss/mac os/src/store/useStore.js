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

import { create } from 'zustand';

// App IDs
export const APPS = {
  PORTFOLIO: 'portfolio',
  PROFILE: 'profile',
  NEURO_AI: 'neuro-ai',
  MATTER_SHAPER: 'matter-shaper',
  SKILLS: 'skills',
  ARTICLES: 'articles',
  CONTACT: 'contact',
  GALLERY: 'gallery',
  ARCHIVE: 'archive',
  TERMINAL: 'terminal',
  SETTINGS: 'settings',
  MUSIC: 'music',
  CALCULATOR: 'calculator',
  NOTEPAD: 'notepad',
  CALENDAR: 'calendar',
  FINDER: 'finder',
  SAFARI: 'safari',
  MESSAGES: 'messages',
  MAIL: 'mail',
  PHOTOS: 'photos',
  VSCODE: 'vscode',
  FACETIME: 'facetime',
  CAMERA: 'camera',
  PAINT: 'paint',
  TICTACTOE: 'tictactoe',
  SNAKE: 'snake',
  WEATHER: 'weather',
  SPOTLIGHT: 'spotlight',
  MAPS: 'maps',
  REMINDERS: 'reminders',
  CLOCK: 'clock',
  MAIL: 'mail',
  PHOTOS: 'photos',
  STOCKS: 'stocks',
  VOICEMEMOS: 'voicememos',
  CONTACTS: 'contacts',
  BOOKS: 'books',
  GITHUB: 'github',
  PAGES: 'pages',
  NUMBERS: 'numbers',
  KEYNOTE: 'keynote',
  ACTIVITY: 'activity',
  DISK: 'disk',
  PODCASTS: 'podcasts',
  APPSTORE: 'appstore',
  TRANSLATE: 'translate',
  HOME: 'home',
  FINDMY: 'findmy',
  SOLITAIRE: 'solitaire',
  CHESS: 'chess',
  SUDOKU: 'sudoku',
  MINESWEEPER: 'minesweeper',
  GAME2048: 'game2048',
  DINORUN: 'dinorun',
  DICTIONARY: 'dictionary',
  FONTBOOK: 'fontbook',
  GRAPHER: 'grapher',
  COLORMETER: 'colormeter',
  FREEFORM: 'freeform',
  STICKIES: 'stickies',
  TEXTEDIT: 'textedit',
  FACETIME: 'facetime',
  WALLET: 'wallet',
  SHORTCUTS: 'shortcuts',
  TIMEMACHINE: 'timemachine',
  TIMEMACHINE: 'timemachine',
  DEVTOOLS: 'devtools',
  RECYCLEBIN: 'recyclebin',
};

const initialFS = {
  '/Desktop': [
     { name: 'Project Nebula', type: 'folder' }, 
     { name: 'resume.pdf', type: 'file' },
     { name: 'screenshot.png', type: 'file' }
  ],
  '/Documents': [
     { name: 'Notes', type: 'folder' },
     { name: 'budget.xlsx', type: 'file' }
  ],
  '/Downloads': [
     { name: 'installer.dmg', type: 'file' }
  ],
  '/Pictures': [
     { name: 'vacation.jpg', type: 'file' }
  ],
  '/Music': [],
};

const useStore = create((set) => ({
  // File System
  fs: initialFS,
  currentPath: '/Desktop',
  setCurrentPath: (path) => set({ currentPath: path }),

  // Spotlight
  isSpotlightOpen: false,
  toggleSpotlight: () => set(s => ({ isSpotlightOpen: !s.isSpotlightOpen })),
  // Launchpad
  isLaunchpadOpen: false,
  toggleLaunchpad: () => set(s => ({ isLaunchpadOpen: !s.isLaunchpadOpen })),

  // Window interactions
  windows: {}, // { [appId]: { isOpen, isMinimized, isMaximized, minZIndex } }
  activeWindow: null,
  zStack: [], // Array of appIds in z-order (last is top)
  isLoggedIn: false,
  theme: 'dark', // 'light' or 'dark'
  brightness: 100,
  volume: 50,
  wifi: true,
  bluetooth: true,
  wallpaper: "https://c4.wallpaperflare.com/wallpaper/746/208/875/apple-mac-osx-os-x-mavericks-wallpaper-preview.jpg",
  accentColor: "blue",
  notifications: [],

  // Actions
  setWallpaper: (url) => set({ wallpaper: url }),
  setAccentColor: (color) => set({ accentColor: color }),
  addNotification: (note) => set((state) => ({ notifications: [note, ...state.notifications] })),
  clearNotifications: () => set({ notifications: [] }),
  
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setBrightness: (val) => set({ brightness: val }),
  setVolume: (val) => set({ volume: val }),
  toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
  toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
  
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),

  openWindow: (appId) => set((state) => {
    if (state.windows[appId]?.isOpen) {
      // If already open, just focus it
      const newZStack = state.zStack.filter(id => id !== appId);
      newZStack.push(appId);
      return { 
        activeWindow: appId, 
        zStack: newZStack,
        windows: {
            ...state.windows,
            [appId]: { ...state.windows[appId], isMinimized: false }
        }
      };
    }
    
    // Open new window
    const newZStack = [...state.zStack, appId];
    return {
      windows: {
        ...state.windows,
        [appId]: { isOpen: true, isMinimized: false, isMaximized: false }
      },
      activeWindow: appId,
      zStack: newZStack
    };
  }),

  closeWindow: (appId) => set((state) => {
    const newWindows = { ...state.windows };
    delete newWindows[appId]; // Or set isOpen: false
    // Ideally we just set isOpen false to keep state if needed, or delete to reset
    // For this clone, let's just delete to reset state
    
    const newZStack = state.zStack.filter(id => id !== appId);
    const newActive = newZStack.length > 0 ? newZStack[newZStack.length - 1] : null;

    return {
      windows: newWindows,
      zStack: newZStack,
      activeWindow: newActive
    };
  }),

  minimizeWindow: (appId) => set((state) => {
    const newZStack = state.zStack.filter(id => id !== appId);
    // Put it at bottom or just remove from zStack visual focus?
    // macOS minimizes to dock. It loses focus.
    const newActive = newZStack.length > 0 ? newZStack[newZStack.length - 1] : null;

    return {
      windows: {
        ...state.windows,
        [appId]: { ...state.windows[appId], isMinimized: true }
      },
      activeWindow: newActive
      // We don't remove from zStack completely or we treat zStack as only visible windows?
      // Let's keep it simple.
    };
  }),
  
  maxMinWindow: (appId) => set((state) => {
      const isMax = state.windows[appId]?.isMaximized;
      return {
          windows: {
              ...state.windows,
              [appId]: { ...state.windows[appId], isMaximized: !isMax }
          }
      };
  }),

  focusWindow: (appId) => set((state) => {
    if (state.activeWindow === appId) return {};
    const newZStack = state.zStack.filter(id => id !== appId);
    newZStack.push(appId);
    return {
      activeWindow: appId,
      zStack: newZStack,
      windows: {
          ...state.windows,
          [appId]: { ...state.windows[appId], isMinimized: false }
      }
    };
  }),
}));

export default useStore;

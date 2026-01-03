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
import { AppId, WindowState, Notification, SystemSettings } from '../types';
import { WALLPAPERS, ACCENT_COLORS } from '../constants';
import { soundService } from '../utils/sound';

interface OSState {
  windows: Record<AppId, WindowState>;
  activeAppId: AppId | null;
  highestZIndex: number;
  notifications: Notification[];
  settings: SystemSettings;
  isNotificationCenterOpen: boolean;
  
  // Window Actions
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  updateWindowPosition: (id: AppId, x: number, y: number) => void;
  updateWindowSize: (id: AppId, width: number, height: number) => void;
  
  // System Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  toggleNotificationCenter: () => void;
  setWallpaper: (url: string) => void;
  setAccentColor: (color: string) => void;
}

const DEFAULT_WINDOW_SIZE = { width: 800, height: 600 };
const MOBILE_BREAKPOINT = 768;

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;

const getInitialPosition = (index: number) => {
  if (isMobile()) return { x: 0, y: 32 }; // Start below menu bar on mobile
  return { x: 100 + (index * 30), y: 50 + (index * 30) };
};

const defaultWindows: Record<AppId, WindowState> = {
    finder: { id: 'finder', isOpen: true, isMinimized: false, isMaximized: isMobile(), zIndex: 1, position: getInitialPosition(0), size: DEFAULT_WINDOW_SIZE },
    projects: { id: 'projects', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(1), size: DEFAULT_WINDOW_SIZE },
    'ai-chat': { id: 'ai-chat', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(2), size: { width: 400, height: 600 } },
    tictactoe: { id: 'tictactoe', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(3), size: { width: 400, height: 500 } },
    settings: { id: 'settings', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(4), size: DEFAULT_WINDOW_SIZE },
    browser: { id: 'browser', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(5), size: DEFAULT_WINDOW_SIZE },
    terminal: { id: 'terminal', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(6), size: { width: 600, height: 400 } },
    mail: { id: 'mail', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(7), size: DEFAULT_WINDOW_SIZE },
    memory: { id: 'memory', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(8), size: { width: 420, height: 500 } },
    about: { id: 'about', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: {x: 150, y: 150}, size: { width: 350, height: 400 } },
};

export const useStore = create<OSState>((set, get) => ({
  windows: defaultWindows,
  activeAppId: 'finder',
  highestZIndex: 1,
  notifications: [
    { id: '1', title: 'Welcome to AshrafOS', message: 'Explore the apps and check out my projects.', timestamp: Date.now(), read: false, appId: 'finder' }
  ],
  isNotificationCenterOpen: false,
  settings: {
    wallpaper: WALLPAPERS[0].url,
    accentColor: ACCENT_COLORS[0].value,
    darkMode: true,
  },

  openApp: (id) => set((state) => {
    if (!state.windows[id]) {
      console.warn(`Attempted to open unknown app: ${id}`);
      soundService.playError();
      return state;
    }

    const isAlreadyOpen = state.windows[id].isOpen;
    if(!isAlreadyOpen) soundService.playOpen();

    const newZ = state.highestZIndex + 1;
    
    if (isAlreadyOpen) {
      return {
        activeAppId: id,
        highestZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: false, zIndex: newZ }
        }
      };
    }

    return {
      activeAppId: id,
      highestZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: { 
            ...state.windows[id], 
            isOpen: true, 
            zIndex: newZ, 
            isMinimized: false,
            isMaximized: isMobile() || state.windows[id].isMaximized 
        }
      }
    };
  }),

  closeApp: (id) => set((state) => {
    // Sound is handled in component before calling this, or here as fallback
    // soundService.playClose(); 
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: false }
      }
    };
  }),

  minimizeApp: (id) => set((state) => {
    soundService.playClick();
    return {
      activeAppId: null,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true }
      }
    };
  }),

  toggleMaximizeApp: (id) => set((state) => {
    soundService.playClick();
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
      }
    };
  }),

  focusApp: (id) => set((state) => {
    if (state.activeAppId === id) return {};
    const newZ = state.highestZIndex + 1;
    return {
      activeAppId: id,
      highestZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: newZ }
      }
    };
  }),

  updateWindowPosition: (id, x, y) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], position: { x, y } }
    }
  })),

  updateWindowSize: (id, width, height) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], size: { width, height } }
    }
  })),

  addNotification: (notification) => set((state) => ({
    notifications: [
        { ...notification, id: Date.now().toString(), timestamp: Date.now(), read: false },
        ...state.notifications
    ]
  })),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),

  clearNotifications: () => set({ notifications: [] }),
  
  toggleNotificationCenter: () => set((state) => {
    soundService.playClick();
    return { isNotificationCenterOpen: !state.isNotificationCenterOpen };
  }),
  
  setWallpaper: (url) => set((state) => ({ settings: { ...state.settings, wallpaper: url } })),
  
  setAccentColor: (color) => set((state) => ({ settings: { ...state.settings, accentColor: color } })),

}));

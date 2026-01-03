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
import { AppId, WindowState } from '../types';

interface OSState {
  windows: Record<AppId, WindowState>;
  activeAppId: AppId | null;
  highestZIndex: number;
  
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  updateWindowPosition: (id: AppId, x: number, y: number) => void;
  updateWindowSize: (id: AppId, width: number, height: number) => void;
}

const DEFAULT_WINDOW_SIZE = { width: 800, height: 600 };
const MOBILE_BREAKPOINT = 768;

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;

const getInitialPosition = (index: number) => {
  if (isMobile()) return { x: 0, y: 0 };
  return { x: 100 + (index * 30), y: 50 + (index * 30) };
};

export const useStore = create<OSState>((set, get) => ({
  windows: {
    finder: { id: 'finder', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 1, position: getInitialPosition(0), size: DEFAULT_WINDOW_SIZE },
    projects: { id: 'projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(1), size: DEFAULT_WINDOW_SIZE },
    'ai-chat': { id: 'ai-chat', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(2), size: { width: 400, height: 600 } },
    tictactoe: { id: 'tictactoe', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(3), size: { width: 400, height: 500 } },
    settings: { id: 'settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(4), size: DEFAULT_WINDOW_SIZE },
    browser: { id: 'browser', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(5), size: DEFAULT_WINDOW_SIZE },
  },
  activeAppId: 'finder',
  highestZIndex: 1,

  openApp: (id) => set((state) => {
    const isAlreadyOpen = state.windows[id].isOpen;
    const newZ = state.highestZIndex + 1;
    
    if (isAlreadyOpen) {
      if (state.windows[id].isMinimized) {
        return {
          activeAppId: id,
          highestZIndex: newZ,
          windows: {
            ...state.windows,
            [id]: { ...state.windows[id], isMinimized: false, zIndex: newZ }
          }
        };
      }
      // Just focus
      return {
        activeAppId: id,
        highestZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex: newZ }
        }
      };
    }

    return {
      activeAppId: id,
      highestZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isOpen: true, zIndex: newZ, isMinimized: false }
      }
    };
  }),

  closeApp: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: false }
    }
  })),

  minimizeApp: (id) => set((state) => ({
    activeAppId: null, // Deselect
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true }
    }
  })),

  toggleMaximizeApp: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
    }
  })),

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

}));

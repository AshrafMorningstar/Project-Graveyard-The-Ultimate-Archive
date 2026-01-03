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

// File: useWindowStore.js
// Developed by Ashraf
// GitHub: https://github.com/AshrafMorningstar
// Created on: 2025-12-14

import { create } from 'zustand';

export const useWindowStore = create((set) => ({
  windows: {}, // Map of windowID -> windowState
  activeWindowId: null,
  zCounter: 100, // Base z-index

  openWindow: (id, initialConfig = {}) => set((state) => {
    const existingWindow = state.windows[id];
    if (existingWindow) {
      // If already open, just focus and restore if minimized
      return {
        activeWindowId: id,
        zCounter: state.zCounter + 1,
        windows: {
          ...state.windows,
          [id]: {
            ...existingWindow,
            isMinimized: false,
            zIndex: state.zCounter + 1
          }
        }
      };
    }

    // New window
    return {
      activeWindowId: id,
      zCounter: state.zCounter + 1,
      windows: {
        ...state.windows,
        [id]: {
          id,
          title: initialConfig.title || 'Application',
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          position: initialConfig.position || { x: 100, y: 50 },
          size: initialConfig.size || { width: 600, height: 400 },
          zIndex: state.zCounter + 1,
          component: initialConfig.component || null, // Component identifier or object
        }
      }
    };
  }),

  closeWindow: (id) => set((state) => {
    const newWindows = { ...state.windows };
    delete newWindows[id];
    return { windows: newWindows };
  }),

  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true }
    },
    activeWindowId: null // simplistic, could find next top window
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
    }
  })),

  focusWindow: (id) => set((state) => {
    if (state.activeWindowId === id) return {};
    return {
      activeWindowId: id,
      zCounter: state.zCounter + 1,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], zIndex: state.zCounter + 1, isMinimized: false }
      }
    };
  }),

  updateWindowPosition: (id, position) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], position }
    }
  })),

  updateWindowSize: (id, size) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], size }
    }
  })),
}));

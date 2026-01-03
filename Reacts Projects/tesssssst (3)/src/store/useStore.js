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

import { create } from 'zustand'

const useStore = create((set, get) => ({
  windows: {}, 
  activeWindowId: null,
  
  // App Configs could be here or passed in. 
  // We'll manage state of windows here.
  
  openWindow: (appId, appConfig) => {
    const state = get();
    if (state.windows[appId]) {
      // If already open, just focus and restore if minimized
      state.focusWindow(appId);
      return;
    }
    
    const maxZIndex = Object.values(state.windows).reduce((max, win) => Math.max(max, win.zIndex || 0), 0) + 1;

    set((state) => ({
      windows: {
        ...state.windows,
        [appId]: {
          id: appId,
          title: appConfig.title,
          icon: appConfig.icon,
          component: appConfig.component,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: maxZIndex,
          position: { x: 100 + (Object.keys(state.windows).length * 20), y: 50 + (Object.keys(state.windows).length * 20) }, // Cascade effect
          size: { width: 800, height: 600 }
        }
      },
      activeWindowId: appId
    }));
  },

  closeWindow: (appId) => set((state) => {
    const { [appId]: _, ...rest } = state.windows;
    return { windows: rest, activeWindowId: null };
  }),

  minimizeWindow: (appId) => set((state) => ({
    windows: {
      ...state.windows,
      [appId]: { ...state.windows[appId], isMinimized: true }
    },
    activeWindowId: null
  })),

  toggleMaximize: (appId) => set((state) => ({
    windows: {
      ...state.windows,
      [appId]: { ...state.windows[appId], isMaximized: !state.windows[appId].isMaximized }
    }
  })),

  focusWindow: (appId) => {
    const state = get();
    const maxZIndex = Object.values(state.windows).reduce((max, win) => Math.max(max, win.zIndex || 0), 0) + 1;
    set((state) => ({
      windows: {
        ...state.windows,
        [appId]: { ...state.windows[appId], zIndex: maxZIndex, isMinimized: false }
      },
      activeWindowId: appId
    }));
  },

  updateWindowPosition: (appId, position) => set((state) => ({
    windows: {
      ...state.windows,
      [appId]: { ...state.windows[appId], position }
    }
  })),

  updateWindowSize: (appId, size) => set((state) => ({
    windows: {
      ...state.windows,
      [appId]: { ...state.windows[appId], size }
    }
  })),
}));

export default useStore;

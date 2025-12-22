/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from 'zustand';

const useWindowStore = create((set, get) => ({
  windows: {},
  activeWindow: null,
  zIndices: {}, // Track z-index for each window
  maxZIndex: 100,

  openWindow: (id, component, initialProps = {}) => {
    const state = get();
    if (state.windows[id]) {
        // If already open, just bring to front
        state.bringToFront(id);
        return;
    }

    const newZIndex = state.maxZIndex + 1;

    set(state => ({
      windows: {
        ...state.windows,
        [id]: {
          id,
          component,
          isOpen: true,
          isActive: true,
          isMinimized: false,
          isMaximized: false,
          position: initialProps.position || { x: 100 + (Object.keys(state.windows).length * 30), y: 100 + (Object.keys(state.windows).length * 30) },
          size: initialProps.size || { width: 800, height: 600 },
          title: initialProps.title || 'Application',
          icon: initialProps.icon,
          ...initialProps
        }
      },
      activeWindow: id,
      zIndices: { ...state.zIndices, [id]: newZIndex },
      maxZIndex: newZIndex
    }));
  },

  closeWindow: (id) => set(state => {
    const newWindows = { ...state.windows };
    delete newWindows[id];
    const newZIndices = { ...state.zIndices };
    delete newZIndices[id];
    return { windows: newWindows, zIndices: newZIndices };
  }),

  minimizeWindow: (id) => set(state => ({
    windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true, isActive: false }
    },
    activeWindow: null // Or switch to next top window? keeping it simple
  })),

  restoreWindow: (id) => {
      const state = get();
      state.bringToFront(id);
      set(state => ({
          windows: {
              ...state.windows,
              [id]: { ...state.windows[id], isMinimized: false }
          }
      }));
  },

  toggleMaximize: (id) => set(state => ({
      windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized } // Toggle
      }
  })),

  bringToFront: (id) => set(state => {
    if (state.activeWindow === id && state.zIndices[id] === state.maxZIndex) return state; // Already top

    const newZIndex = state.maxZIndex + 1;
    return {
      activeWindow: id,
      zIndices: { ...state.zIndices, [id]: newZIndex },
      maxZIndex: newZIndex,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isActive: true, isMinimized: false }
      }
    };
  }),

  updateWindowPosition: (id, position) => set(state => ({
      windows: {
          ...state.windows,
          [id]: { ...state.windows[id], position }
      }
  })),

  updateWindowSize: (id, size) => set(state => ({
      windows: {
          ...state.windows,
          [id]: { ...state.windows[id], size }
      }
  }))
}));

export default useWindowStore;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from 'zustand';

export const useWindowStore = create((set, get) => ({
  windows: [], // Array of open windows { id, title, component, isOpen, isMinimized, isMaximized, position, size, zIndex }
  activeWindowId: null,
  maxZIndex: 10,

  openWindow: (id, config) => {
    const { windows, maxZIndex } = get();
    const existingWindow = windows.find((w) => w.id === id);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        set({
          windows: windows.map((w) =>
            w.id === id ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w
          ),
          activeWindowId: id,
          maxZIndex: maxZIndex + 1,
        });
      } else {
        set({
          activeWindowId: id,
          windows: windows.map((w) =>
            w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
          ),
          maxZIndex: maxZIndex + 1,
        });
      }
    } else {
      const newWindow = {
        id,
        title: config.title || 'Untitled',
        component: config.component, // Component identifier or React Node
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: maxZIndex + 1,
        position: config.position || { x: 100, y: 100 },
        size: config.size || { width: 600, height: 400 },
        ...config,
      };
      set({
        windows: [...windows, newWindow],
        activeWindowId: id,
        maxZIndex: maxZIndex + 1,
      });
    }
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId: state.windows.length > 1 ? state.windows[state.windows.length - 2].id : null, 
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: null, // Depending on behavior, might switch to next window
    }));
  },

  maximizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
      activeWindowId: id,
    }));
  },

  focusWindow: (id) => {
    const { maxZIndex } = get();
    set((state) => ({
      activeWindowId: id,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
      ),
      maxZIndex: maxZIndex + 1,
    }));
  },
  
  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
         w.id === id ? { ...w, position } : w
      )
    }));
  },
  
  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
         w.id === id ? { ...w, size } : w
      )
    }));
  }
}));

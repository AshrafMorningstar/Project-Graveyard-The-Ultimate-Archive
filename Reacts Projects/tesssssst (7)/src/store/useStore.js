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
  openWindows: [], // Array of appIds
  activeWindow: null, // appId
  windowState: {}, // { appId: { isOpen: bool, isMinimized: bool, isMaximized: bool, zIndex: int, position: {x,y}, size: {w,h} } }
  zIndexCounter: 10,
  
  openApp: (appId) => {
    const { openWindows, windowState, zIndexCounter } = get();
    
    // If not already open, add to openWindows
    if (!openWindows.includes(appId)) {
        set({
            openWindows: [...openWindows, appId],
            activeWindow: appId,
            zIndexCounter: zIndexCounter + 1,
            windowState: {
                ...windowState,
                [appId]: {
                    isOpen: true,
                    isMinimized: false,
                    isMaximized: false,
                    zIndex: zIndexCounter + 1,
                    position: { x: 50 + (openWindows.length * 20), y: 50 + (openWindows.length * 20) }, // Cascade effect
                    size: { width: 800, height: 600 }
                }
            }
        });
    } else {
        // If already open, just bring to front and focus
        get().focusWindow(appId);
        
        // If minimized, unminimize
        if (windowState[appId]?.isMinimized) {
            set((state) => ({
                windowState: {
                    ...state.windowState,
                    [appId]: {
                        ...state.windowState[appId],
                        isMinimized: false
                    }
                }
            }));
        }
    }
  },

  closeApp: (appId) => {
    set((state) => {
        const newOpenWindows = state.openWindows.filter(id => id !== appId);
        const newActiveWindow = newOpenWindows.length > 0 ? newOpenWindows[newOpenWindows.length - 1] : null;
        const newWindowState = { ...state.windowState };
        delete newWindowState[appId];
        
        return {
            openWindows: newOpenWindows,
            activeWindow: newActiveWindow,
            windowState: newWindowState
        };
    });
  },

  minimizeApp: (appId) => {
    set((state) => ({
        activeWindow: null, // Deselect active window when minimizing
        windowState: {
            ...state.windowState,
            [appId]: {
                ...state.windowState[appId],
                isMinimized: true
            }
        }
    }));
  },

  maximizeApp: (appId) => {
    set((state) => ({
        windowState: {
            ...state.windowState,
            [appId]: {
                ...state.windowState[appId],
                isMaximized: !state.windowState[appId].isMaximized
            }
        },
        // Also focus it
        zIndexCounter: state.zIndexCounter + 1
    }));
    // We need to update zIndex in a separate set or merge it above, but let's just call focus
    get().focusWindow(appId);
  },

  focusWindow: (appId) => {
    const { zIndexCounter } = get();
    set((state) => ({
        activeWindow: appId,
        zIndexCounter: zIndexCounter + 1,
        windowState: {
            ...state.windowState,
            [appId]: {
                ...state.windowState[appId],
                zIndex: zIndexCounter + 1
            }
        }
    }));
  },

  updateWindowPosition: (appId, position) => {
    set((state) => ({
        windowState: {
            ...state.windowState,
            [appId]: {
                ...state.windowState[appId],
                position
            }
        }
    }));
  },
  
  updateWindowSize: (appId, size) => {
      set((state) => ({
          windowState: {
              ...state.windowState,
              [appId]: {
                  ...state.windowState[appId],
                  size
              }
          }
      }));
  }
}))

export default useStore;

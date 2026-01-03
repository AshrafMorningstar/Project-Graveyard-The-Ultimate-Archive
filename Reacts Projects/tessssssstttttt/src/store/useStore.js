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

/* Built for Ashraf Morningstar — https://github.com/AshrafMorningstar */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // Window State
      windows: {
        about: { open: true, x: 100, y: 100, w: 500, h: 400, z: 1, minimized: false },
        projects: { open: false, x: 150, y: 150, w: 800, h: 600, z: 2, minimized: false },
        resume: { open: false, x: 200, y: 200, w: 600, h: 800, z: 3, minimized: false },
        music: { open: false, x: 250, y: 250, w: 350, h: 500, z: 4, minimized: false },
        contact: { open: false, x: 300, y: 300, w: 400, h: 500, z: 5, minimized: false },
      },
      zOrder: ['about', 'projects', 'resume', 'music', 'contact'],
      activeApp: 'about',

      // Actions
      openWindow: (id) => set((state) => {
        const isOpen = state.windows[id]?.open;
        if (isOpen) {
          // If already open, bring to front (logic to be improved with zOrder)
          return { activeApp: id };
        }
        return {
          windows: {
            ...state.windows,
            [id]: { ...state.windows[id], open: true, minimized: false }
          },
          activeApp: id
        };
      }),
      
      closeWindow: (id) => set((state) => ({
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], open: false }
        }
      })),

      minimizeWindow: (id) => set((state) => ({
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], minimized: true }
        }
      })),

      restoreWindow: (id) => set((state) => ({
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], minimized: false }
        },
        activeApp: id
      })),

      toggleWindow: (id) => set((state) => {
        const win = state.windows[id];
        if (win.open && !win.minimized) {
           // If open and focused, minimize? Or just do nothing? macOS behavior: toggle minimizes if clicked again in dock usually?
           // For now, let's say clicking dock icon toggles minimize/restore if open.
           return {
             windows: {
               ...state.windows,
               [id]: { ...state.windows[id], minimized: true }
             }
           };
        } else if (win.open && win.minimized) {
           return {
             windows: {
               ...state.windows,
               [id]: { ...state.windows[id], minimized: false }
             },
             activeApp: id
           };
        } else {
           return {
             windows: {
               ...state.windows,
               [id]: { ...state.windows[id], open: true, minimized: false }
             },
             activeApp: id
           };
        }
      }),

    }),
    {
      name: 'macos-portfolio-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useStore;

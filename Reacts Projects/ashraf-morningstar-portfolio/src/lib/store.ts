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
import { immer } from 'zustand/middleware'

export interface WindowState {
  id: string
  open: boolean
  minimized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

interface Store {
  windows: Record<string, WindowState>
  nextZIndex: number
  
  initializeWindow: (id: string, title: string) => void
  openWindow: (id: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  setPosition: (id: string, x: number, y: number) => void
  setSize: (id: string, width: number, height: number) => void
  focusWindow: (id: string) => void
}

const INITIAL_WINDOWS = {
  about: {
    id: 'about',
    open: false,
    minimized: false,
    position: { x: 100, y: 100 },
    size: { width: 700, height: 600 },
    zIndex: 50,
  },
  projects: {
    id: 'projects',
    open: false,
    minimized: false,
    position: { x: 150, y: 150 },
    size: { width: 700, height: 600 },
    zIndex: 50,
  },
  skills: {
    id: 'skills',
    open: false,
    minimized: false,
    position: { x: 200, y: 200 },
    size: { width: 700, height: 600 },
    zIndex: 50,
  },
  contact: {
    id: 'contact',
    open: false,
    minimized: false,
    position: { x: 250, y: 250 },
    size: { width: 700, height: 600 },
    zIndex: 50,
  },
}

export const useWindowStore = create<Store>()(
  immer((set) => ({
    windows: INITIAL_WINDOWS,
    nextZIndex: 100,

    initializeWindow: (id: string) =>
      set((state) => {
        if (!(id in state.windows)) {
          state.windows[id] = {
            ...INITIAL_WINDOWS[id as keyof typeof INITIAL_WINDOWS],
            id,
          }
        }
      }),

    openWindow: (id: string) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].open = true
          state.windows[id].minimized = false
          state.windows[id].zIndex = state.nextZIndex++
        }
      }),

    closeWindow: (id: string) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].open = false
        }
      }),

    minimizeWindow: (id: string) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].minimized = true
        }
      }),

    maximizeWindow: (id: string) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].position = { x: 20, y: 60 }
          state.windows[id].size = { width: window.innerWidth - 40, height: window.innerHeight - 120 }
        }
      }),

    setPosition: (id: string, x: number, y: number) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].position = { x, y }
        }
      }),

    setSize: (id: string, width: number, height: number) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].size = { width, height }
        }
      }),

    focusWindow: (id: string) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].zIndex = state.nextZIndex++
        }
      }),
  }))
)

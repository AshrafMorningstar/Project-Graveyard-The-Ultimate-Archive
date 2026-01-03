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

interface Notification {
  id: string
  title: string
  message: string
  timestamp: number
}

interface SettingsState {
  wallpaper: string
  accentColor: string
}

type SystemStatus = 'booting' | 'locked' | 'active'

interface Store {
  windows: Record<string, WindowState>
  nextZIndex: number
  theme: 'dark' | 'light'
  notifications: Notification[]
  settings: SettingsState
  systemStatus: SystemStatus
  volume: number
  brightness: number
  wifi: boolean
  bluetooth: boolean
  airdrop: boolean
  
  setTheme: (theme: 'dark' | 'light') => void
  toggleTheme: () => void
  setSystemStatus: (status: SystemStatus) => void
  setVolume: (vol: number) => void
  setBrightness: (level: number) => void
  toggleWifi: () => void
  toggleBluetooth: () => void
  toggleAirdrop: () => void

  initializeWindow: (id: string, title?: string) => void
  openWindow: (id: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  setPosition: (id: string, x: number, y: number) => void
  setSize: (id: string, width: number, height: number) => void
  focusWindow: (id: string) => void
  
  addNotification: (n: Omit<Notification, 'id' | 'timestamp'>) => void
  clearNotifications: () => void
  setWallpaper: (url: string) => void
  setAccentColor: (color: string) => void
}

const INITIAL_WINDOWS = {
  about: { id: 'about', open: false, minimized: false, position: { x: 100, y: 100 }, size: { width: 700, height: 600 }, zIndex: 50 },
  projects: { id: 'projects', open: false, minimized: false, position: { x: 150, y: 150 }, size: { width: 800, height: 600 }, zIndex: 50 },
  skills: { id: 'skills', open: false, minimized: false, position: { x: 200, y: 200 }, size: { width: 700, height: 600 }, zIndex: 50 },
  contact: { id: 'contact', open: false, minimized: false, position: { x: 250, y: 250 }, size: { width: 700, height: 600 }, zIndex: 50 },
  terminal: { id: 'terminal', open: false, minimized: false, position: { x: 300, y: 300 }, size: { width: 600, height: 400 }, zIndex: 50 },
  music: { id: 'music', open: false, minimized: false, position: { x: 350, y: 350 }, size: { width: 350, height: 500 }, zIndex: 50 },
  neuroAI: { id: 'neuroAI', open: false, minimized: false, position: { x: 400, y: 100 }, size: { width: 800, height: 600 }, zIndex: 50 },
  matterShaper: { id: 'matterShaper', open: false, minimized: false, position: { x: 150, y: 150 }, size: { width: 900, height: 600 }, zIndex: 50 },
  settings: { id: 'settings', open: false, minimized: false, position: { x: 200, y: 200 }, size: { width: 700, height: 550 }, zIndex: 50 },
  browser: { id: 'browser', open: false, minimized: false, position: { x: 100, y: 80 }, size: { width: 900, height: 600 }, zIndex: 50 },
  calculator: { id: 'calculator', open: false, minimized: false, position: { x: 200, y: 200 }, size: { width: 280, height: 380 }, zIndex: 50 },
  calendar: { id: 'calendar', open: false, minimized: false, position: { x: 50, y: 50 }, size: { width: 800, height: 600 }, zIndex: 50 },
  notes: { id: 'notes', open: false, minimized: false, position: { x: 300, y: 100 }, size: { width: 800, height: 500 }, zIndex: 50 },
  launchpad: { id: 'launchpad', open: false, minimized: false, position: { x: 0, y: 0 }, size: { width: 0, height: 0 }, zIndex: 999 },
  messages: { id: 'messages', open: false, minimized: false, position: { x: 100, y: 100 }, size: { width: 800, height: 600 }, zIndex: 50 },
  photos: { id: 'photos', open: false, minimized: false, position: { x: 150, y: 150 }, size: { width: 800, height: 600 }, zIndex: 50 },
  weather: { id: 'weather', open: false, minimized: false, position: { x: 200, y: 200 }, size: { width: 800, height: 600 }, zIndex: 50 },
  snake: { id: 'snake', open: false, minimized: false, position: { x: 250, y: 250 }, size: { width: 400, height: 500 }, zIndex: 50 },
  vscode: { id: 'vscode', open: false, minimized: false, position: { x: 50, y: 50 }, size: { width: 900, height: 600 }, zIndex: 50 },
}

export const useWindowStore = create<Store>()(
  immer((set) => ({
    windows: INITIAL_WINDOWS,
    nextZIndex: 100,
    theme: 'dark',
    notifications: [],
    settings: {
      wallpaper: 'bg-[url("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&auto=format&fit=crop")]',
      accentColor: '#6366f1'
    },
    systemStatus: 'booting',
    volume: 75,
    brightness: 100,
    wifi: true,
    bluetooth: true,
    airdrop: true,

    setTheme: (theme) => set((state) => { state.theme = theme }),
    toggleTheme: () => set((state) => { state.theme = state.theme === 'dark' ? 'light' : 'dark' }),
    setSystemStatus: (status) => set((state) => { state.systemStatus = status }),
    setVolume: (vol) => set((state) => { state.volume = vol }),
    setBrightness: (level) => set((state) => { state.brightness = level }),
    toggleWifi: () => set((state) => { state.wifi = !state.wifi }),
    toggleBluetooth: () => set((state) => { state.bluetooth = !state.bluetooth }),
    toggleAirdrop: () => set((state) => { state.airdrop = !state.airdrop }),

    initializeWindow: (id) =>
      set((state) => {
        if (!(id in state.windows)) {
          state.windows[id] = {
            ...INITIAL_WINDOWS[id as keyof typeof INITIAL_WINDOWS],
            id,
          }
        }
      }),

    openWindow: (id) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].open = true
          state.windows[id].minimized = false
          state.windows[id].zIndex = state.nextZIndex++
        }
      }),

    closeWindow: (id) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].open = false
        }
      }),

    minimizeWindow: (id) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].minimized = true
        }
      }),

    maximizeWindow: (id) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].position = { x: 20, y: 60 }
          state.windows[id].size = { width: window.innerWidth - 40, height: window.innerHeight - 120 }
        }
      }),

    setPosition: (id, x, y) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].position = { x, y }
        }
      }),

    setSize: (id, width, height) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].size = { width, height }
        }
      }),

    focusWindow: (id) =>
      set((state) => {
        if (id in state.windows) {
          state.windows[id].zIndex = state.nextZIndex++
        }
      }),

    addNotification: (n) => set((state) => {
      state.notifications.unshift({ ...n, id: crypto.randomUUID(), timestamp: Date.now() })
    }),

    clearNotifications: () => set((state) => {
      state.notifications = []
    }),

    setWallpaper: (url) => set((state) => {
      state.settings.wallpaper = url
    }),

    setAccentColor: (color) => set((state) => {
      state.settings.accentColor = color
    }),
  }))
)

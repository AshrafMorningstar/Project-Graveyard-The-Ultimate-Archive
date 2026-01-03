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
import { WindowState, Theme, Notification } from './types';
import { playSound } from './utils/sound';

interface SystemState {
  windows: Record<string, WindowState>;
  notifications: Notification[];
  activeWindowId: string | null;
  maxZIndex: number;
  theme: Theme;
  soundEnabled: boolean;
  isNotificationCenterOpen: boolean;
  neuralActivity: number;
  isLocked: boolean;
  
  // Actions
  openWindow: (id: string, defaults?: Partial<WindowState>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, pos: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  setTheme: (theme: Theme) => void;
  toggleSound: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  toggleNotificationCenter: () => void;
  increaseNeuralActivity: () => void;
  unlock: () => void;
  lock: () => void;
}

export const useStore = create<SystemState>((set, get) => ({
  windows: {},
  notifications: [],
  activeWindowId: null,
  maxZIndex: 100,
  theme: Theme.QUANTUM,
  soundEnabled: true,
  isNotificationCenterOpen: false,
  neuralActivity: 0.5,
  isLocked: true, // Default to locked

  openWindow: (id, defaults) => {
    const state = get();
    const existing = state.windows[id];
    const newZ = state.maxZIndex + 1;
    
    if (state.soundEnabled) playSound('open');

    if (existing) {
      set({
        windows: { 
          ...state.windows, 
          [id]: { ...existing, isMinimized: false, zIndex: newZ } 
        },
        activeWindowId: id,
        maxZIndex: newZ,
      });
      return;
    }

    // Responsive default size
    const isMobile = window.innerWidth < 768;
    const defaultWidth = isMobile ? window.innerWidth : (defaults?.size?.width || 800);
    const defaultHeight = isMobile ? window.innerHeight - 80 : (defaults?.size?.height || 600);
    
    const width = Math.min(defaultWidth, window.innerWidth);
    const height = Math.min(defaultHeight, window.innerHeight - 50);
    
    const x = isMobile ? 0 : Math.max(0, (window.innerWidth - width) / 2 + (Math.random() * 40 - 20));
    const y = isMobile ? 0 : Math.max(0, (window.innerHeight - height) / 2 + (Math.random() * 40 - 20));

    set({
      windows: {
        ...state.windows,
        [id]: {
          id,
          isOpen: true,
          isMinimized: false,
          isMaximized: isMobile, // Auto maximize on mobile
          zIndex: newZ,
          position: { x, y },
          size: { width, height },
          ...defaults,
        },
      },
      activeWindowId: id,
      maxZIndex: newZ,
    });
  },

  closeWindow: (id) => {
    const state = get();
    if (state.soundEnabled) playSound('close');
    const newWindows = { ...state.windows };
    delete newWindows[id];
    set({ windows: newWindows, activeWindowId: null });
  },

  minimizeWindow: (id) =>
    set((state) => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], isMinimized: true } },
      activeWindowId: null,
    })),

  maximizeWindow: (id) =>
    set((state) => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized } },
    })),

  focusWindow: (id) =>
    set((state) => {
      if (state.activeWindowId === id) return {};
      const newZ = state.maxZIndex + 1;
      return {
        windows: { ...state.windows, [id]: { ...state.windows[id], zIndex: newZ, isMinimized: false } },
        activeWindowId: id,
        maxZIndex: newZ,
      };
    }),

  updateWindowPosition: (id, pos) =>
    set((state) => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], position: pos } },
    })),

  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: { ...state.windows, [id]: { ...state.windows[id], size } },
    })),

  setTheme: (theme) => set({ theme }),
  
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  
  addNotification: (n) => {
    const state = get();
    if (state.soundEnabled) playSound('notification');
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
      ...n
    };
    set({ notifications: [newNotification, ...state.notifications] });
  },

  markNotificationRead: (id) => 
    set((state) => ({
      notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
    })),

  clearNotifications: () => set({ notifications: [] }),
  
  toggleNotificationCenter: () => set((state) => ({ isNotificationCenterOpen: !state.isNotificationCenterOpen })),

  increaseNeuralActivity: () => set((state) => ({ neuralActivity: Math.min(1, state.neuralActivity + 0.1) })),
  
  unlock: () => set({ isLocked: false }),
  lock: () => set({ isLocked: true })
}));
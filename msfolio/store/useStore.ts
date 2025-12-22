/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file useStore.ts
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import { create } from 'zustand';
import { AppId, WindowState, Notification, SystemSettings, FileNode, SystemState } from '../types';
import { WALLPAPERS, ACCENT_COLORS, INITIAL_FILE_SYSTEM } from '../constants';
import { soundService } from '../utils/sound';

interface OSState {
  isBooting: boolean;
  isLocked: boolean;
  windows: Record<AppId, WindowState>;
  activeAppId: AppId | null;
  highestZIndex: number;
  notifications: Notification[];
  settings: SystemSettings;
  systemState: SystemState;
  isNotificationCenterOpen: boolean;
  isControlCenterOpen: boolean;
  isSpotlightOpen: boolean;
  fileSystem: FileNode[];
  
  // Actions
  setBooting: (booting: boolean) => void;
  setLocked: (locked: boolean) => void;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  updateWindowPosition: (id: AppId, x: number, y: number) => void;
  updateWindowSize: (id: AppId, width: number, height: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  toggleNotificationCenter: () => void;
  toggleControlCenter: () => void;
  toggleSpotlight: () => void;
  setWallpaper: (url: string) => void;
  setAccentColor: (color: string) => void;
  toggleTheme: () => void;
  toggleCrtEffect: () => void;
  updateSystemState: (updates: Partial<SystemState>) => void;
  
  // File System Actions
  createFile: (parentId: string, name: string, type: 'folder' | 'file', content?: string) => void;
  moveFileToTrash: (id: string) => void;
  restoreFileFromTrash: (id: string) => void;
  emptyTrash: () => void;
  updateFileContent: (id: string, content: string) => void;
  getFileContent: (id: string) => string | undefined;
}

const DEFAULT_WINDOW_SIZE = { width: 800, height: 600 };
const MOBILE_BREAKPOINT = 768;

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;

const getInitialPosition = (index: number) => {
  if (isMobile()) return { x: 0, y: 32 }; 
  return { x: 50 + (index * 40), y: 50 + (index * 40) };
};

const defaultWindows: Record<AppId, WindowState> = {
    finder: { id: 'finder', isOpen: true, isMinimized: false, isMaximized: isMobile(), zIndex: 1, position: getInitialPosition(0), size: DEFAULT_WINDOW_SIZE },
    projects: { id: 'projects', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(1), size: DEFAULT_WINDOW_SIZE },
    'ai-chat': { id: 'ai-chat', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(2), size: { width: 450, height: 650 } },
    tictactoe: { id: 'tictactoe', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(3), size: { width: 400, height: 500 } },
    settings: { id: 'settings', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(4), size: { width: 700, height: 550 } },
    browser: { id: 'browser', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(5), size: { width: 900, height: 650 } },
    terminal: { id: 'terminal', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(6), size: { width: 700, height: 450 } },
    mail: { id: 'mail', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(7), size: DEFAULT_WINDOW_SIZE },
    memory: { id: 'memory', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(8), size: { width: 460, height: 580 } },
    about: { id: 'about', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: {x: 150, y: 150}, size: { width: 350, height: 420 } },
    calculator: { id: 'calculator', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(9), size: { width: 320, height: 480 } },
    notepad: { id: 'notepad', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(10), size: { width: 550, height: 450 } },
    music: { id: 'music', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(11), size: { width: 400, height: 550 } },
    files: { id: 'files', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(12), size: { width: 800, height: 550 } },
    paint: { id: 'paint', isOpen: false, isMinimized: false, isMaximized: isMobile(), zIndex: 0, position: getInitialPosition(13), size: { width: 800, height: 600 } },
    snake: { id: 'snake', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(14), size: { width: 400, height: 450 } },
    tasks: { id: 'tasks', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(15), size: { width: 500, height: 600 } },
    camera: { id: 'camera', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(16), size: { width: 640, height: 520 } },
    weather: { id: 'weather', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(17), size: { width: 400, height: 600 } },
    code: { id: 'code', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(18), size: { width: 800, height: 600 } },
    video: { id: 'video', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(19), size: { width: 700, height: 500 } },
    calendar: { id: 'calendar', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, position: getInitialPosition(20), size: { width: 700, height: 600 } },
};

export const useStore = create<OSState>((set, get) => ({
  isBooting: true,
  isLocked: false,
  windows: defaultWindows,
  activeAppId: 'finder',
  highestZIndex: 1,
  notifications: [
    { id: '1', title: 'System Ready', message: 'Eigenfolio Quantum v2.0 initialized successfully.', timestamp: Date.now(), read: false, appId: 'settings' }
  ],
  isNotificationCenterOpen: false,
  isControlCenterOpen: false,
  isSpotlightOpen: false,
  settings: {
    wallpaper: WALLPAPERS[0].url,
    accentColor: ACCENT_COLORS[1].value, 
    darkMode: true,
    crtEffect: false,
    soundEnabled: true
  },
  systemState: {
    wifi: true,
    bluetooth: true,
    airplaneMode: false,
    volume: 75,
    brightness: 100,
    batteryLevel: 85,
    isCharging: false
  },
  fileSystem: INITIAL_FILE_SYSTEM,

  setBooting: (booting) => set({ isBooting: booting }),
  setLocked: (locked) => set({ isLocked: locked }),

  openApp: (id) => set((state) => {
    if (!state.windows[id]) return state;
    const isAlreadyOpen = state.windows[id].isOpen;
    if(!isAlreadyOpen && state.settings.soundEnabled) soundService.playOpen();

    const newZ = state.highestZIndex + 1;
    
    // Specifically handle files app to open trash if clicked from desktop
    if (id === 'files') {
        // Logic handled in component to route to last path, but we just open here
    }

    if (isAlreadyOpen) {
      return {
        activeAppId: id,
        highestZIndex: newZ,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: false, zIndex: newZ }
        },
        isSpotlightOpen: false,
      };
    }

    return {
      activeAppId: id,
      highestZIndex: newZ,
      windows: {
        ...state.windows,
        [id]: { 
            ...state.windows[id], 
            isOpen: true, 
            zIndex: newZ, 
            isMinimized: false,
            isMaximized: isMobile() || state.windows[id].isMaximized 
        }
      },
      isSpotlightOpen: false,
    };
  }),

  closeApp: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: false }
    }
  })),

  minimizeApp: (id) => set((state) => {
    if(state.settings.soundEnabled) soundService.playClick();
    return {
      activeAppId: null,
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true }
      }
    };
  }),

  toggleMaximizeApp: (id) => set((state) => {
    if(state.settings.soundEnabled) soundService.playClick();
    return {
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
      }
    };
  }),

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

  addNotification: (notification) => set((state) => ({
    notifications: [
        { ...notification, id: Date.now().toString(), timestamp: Date.now(), read: false },
        ...state.notifications
    ]
  })),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),

  clearNotifications: () => set({ notifications: [] }),
  
  toggleNotificationCenter: () => set((state) => {
    if(state.settings.soundEnabled) soundService.playClick();
    return { 
        isNotificationCenterOpen: !state.isNotificationCenterOpen,
        isControlCenterOpen: false 
    };
  }),

  toggleControlCenter: () => set((state) => {
    if(state.settings.soundEnabled) soundService.playClick();
    return { 
        isControlCenterOpen: !state.isControlCenterOpen,
        isNotificationCenterOpen: false
    };
  }),

  toggleSpotlight: () => set((state) => ({ isSpotlightOpen: !state.isSpotlightOpen })),
  
  setWallpaper: (url) => set((state) => ({ settings: { ...state.settings, wallpaper: url } })),
  setAccentColor: (color) => set((state) => ({ settings: { ...state.settings, accentColor: color } })),
  toggleTheme: () => set((state) => ({ settings: { ...state.settings, darkMode: !state.settings.darkMode } })),
  toggleCrtEffect: () => set((state) => ({ settings: { ...state.settings, crtEffect: !state.settings.crtEffect } })),
  
  updateSystemState: (updates) => set((state) => ({
    systemState: { ...state.systemState, ...updates }
  })),

  createFile: (parentId, name, type, content) => set((state) => {
    const newFs = JSON.parse(JSON.stringify(state.fileSystem));
    const addToFolder = (nodes: FileNode[]): boolean => {
      for (const node of nodes) {
        if (node.id === parentId && node.type === 'folder') {
          node.children = node.children || [];
          if (node.children.some(c => c.name === name)) return true;
          node.children.push({
             id: Date.now().toString(),
             name,
             type,
             content,
             parentId,
             children: type === 'folder' ? [] : undefined
          });
          return true;
        }
        if (node.children && addToFolder(node.children)) return true;
      }
      return false;
    };
    addToFolder(newFs);
    return { fileSystem: newFs };
  }),

  // Move to trash instead of delete
  moveFileToTrash: (id) => set((state) => {
    const newFs = JSON.parse(JSON.stringify(state.fileSystem));
    let fileToMove: FileNode | null = null;

    // Helper to remove from current location
    const removeNode = (nodes: FileNode[]): boolean => {
      const idx = nodes.findIndex(n => n.id === id);
      if (idx !== -1) {
        fileToMove = nodes[idx];
        nodes.splice(idx, 1);
        return true;
      }
      for (const node of nodes) {
        if (node.children && removeNode(node.children)) return true;
      }
      return false;
    };

    // Helper to add to trash
    const addToTrash = (nodes: FileNode[]) => {
       const trash = nodes.find(n => n.id === 'root')?.children?.find(n => n.id === 'trash');
       if (trash && fileToMove) {
           trash.children = trash.children || [];
           trash.children.push(fileToMove);
       }
    };

    removeNode(newFs);
    if(fileToMove) addToTrash(newFs);
    
    return { fileSystem: newFs };
  }),

  restoreFileFromTrash: (id) => set((state) => {
      const newFs = JSON.parse(JSON.stringify(state.fileSystem));
      let fileToRestore: FileNode | null = null;
      
      // Find in trash
      const trash = newFs.find((n: FileNode) => n.id === 'root')?.children?.find((n: FileNode) => n.id === 'trash');
      if(!trash || !trash.children) return state;

      const idx = trash.children.findIndex((n: FileNode) => n.id === id);
      if(idx !== -1) {
          fileToRestore = trash.children[idx];
          trash.children.splice(idx, 1);
      }

      if(fileToRestore) {
          // Restore to docs by default if original parent lost, or root
          const root = newFs.find((n: FileNode) => n.id === 'root');
          const target = root?.children?.find((n: FileNode) => n.id === 'docs') || root;
          target.children = target.children || [];
          target.children.push(fileToRestore);
      }

      return { fileSystem: newFs };
  }),

  emptyTrash: () => set((state) => {
      const newFs = JSON.parse(JSON.stringify(state.fileSystem));
      const trash = newFs.find((n: FileNode) => n.id === 'root')?.children?.find((n: FileNode) => n.id === 'trash');
      if(trash) trash.children = [];
      return { fileSystem: newFs };
  }),

  updateFileContent: (id, content) => set((state) => {
      const newFs = JSON.parse(JSON.stringify(state.fileSystem));
      const updateNode = (nodes: FileNode[]): boolean => {
          for (const node of nodes) {
              if (node.id === id) {
                  node.content = content;
                  return true;
              }
              if (node.children && updateNode(node.children)) return true;
          }
          return false;
      };
      updateNode(newFs);
      return { fileSystem: newFs };
  }),

  getFileContent: (id) => {
      const state = get();
      const findFile = (nodes: FileNode[]): string | undefined => {
          for(const node of nodes) {
              if (node.id === id) return node.content;
              if (node.children) {
                  const found = findFile(node.children);
                  if (found) return found;
              }
          }
          return undefined;
      }
      return findFile(state.fileSystem);
  }

}));
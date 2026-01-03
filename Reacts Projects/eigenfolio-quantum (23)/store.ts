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
import { persist } from 'zustand/middleware';
import { SystemNotification, FileNode, CalendarEvent, WindowState, AppID, DesktopItem, UserProfile, SystemStatus, BrowserTab, SystemProcess, ClipboardItem } from './types';

// --- SOUND ENGINE ---
class AudioEngine {
  ctx: AudioContext | null = null;
  gainNode: GainNode | null = null;

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.ctx.createGain();
      this.gainNode.connect(this.ctx.destination);
    }
  }

  playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
    if (!this.ctx) this.init();
    if (this.ctx?.state === 'suspended') this.ctx.resume();
    
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
    gain.gain.setValueAtTime(vol, this.ctx!.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.start();
    osc.stop(this.ctx!.currentTime + duration);
  }

  playClick() { this.playTone(800, 'sine', 0.05, 0.03); }
  playOpen() { this.playTone(400, 'sine', 0.1, 0.05); setTimeout(() => this.playTone(600, 'sine', 0.2, 0.05), 50); }
  playError() { this.playTone(150, 'sawtooth', 0.3, 0.1); }
  playStartup() { 
    if (!this.ctx) this.init();
    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 'sine', 0.6, 0.1), i * 150);
    });
  }
  playNotification() { 
      this.playTone(600, 'sine', 0.1, 0.05); 
      setTimeout(() => this.playTone(800, 'sine', 0.1, 0.05), 100); 
  }
  playDelete() { this.playTone(100, 'sawtooth', 0.2, 0.1); }
}
export const audio = new AudioEngine();

// --- NEURAL STORE ---
interface NeuralState {
  neuralActivity: number;
  quantumState: 'stable' | 'superposition' | 'entangled';
  increaseActivity: () => void;
  setQuantumState: (state: 'stable' | 'superposition' | 'entangled') => void;
}
export const useNeuralStore = create<NeuralState>((set) => ({
  neuralActivity: 0.5,
  quantumState: 'stable',
  increaseActivity: () => set((state) => ({ neuralActivity: Math.min(1, state.neuralActivity + 0.1) })),
  setQuantumState: (state) => set({ quantumState: state }),
}));

// --- SYSTEM STORE ---
interface SystemState {
  // OS State
  bootStatus: 'off' | 'booting' | 'login' | 'active' | 'bsod' | 'screensaver';
  setBootStatus: (status: 'off' | 'booting' | 'login' | 'active' | 'bsod' | 'screensaver') => void;
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  
  // Status Bar
  systemStatus: SystemStatus;
  updateSystemStatus: (status: Partial<SystemStatus>) => void;

  // Window Management
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (appId: AppID, title?: string, data?: any) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPos: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, w: number, h: number) => void;
  snapWindow: (id: string, snap: 'left' | 'right' | 'none') => void;
  closeAll: () => void;

  // Settings
  accentColor: string;
  wallpaper: string; // 'default' | 'nebula' | 'video_url'
  fontSize: number;
  reducedMotion: boolean;
  soundEnabled: boolean;
  themePreset: 'default' | 'cyberpunk' | 'nebula' | 'monochrome';
  
  // Data
  notifications: SystemNotification[];
  notes: { id: string, text: string, color: string }[];
  calendarEvents: CalendarEvent[];
  desktopItems: DesktopItem[];
  fileSystem: Record<string, FileNode>;
  clipboard: ClipboardItem[];
  
  // Browser State
  browserTabs: BrowserTab[];
  activeTabId: string;
  addBrowserTab: (url?: string) => void;
  closeBrowserTab: (id: string) => void;
  updateBrowserTab: (id: string, data: Partial<BrowserTab>) => void;
  setActiveTab: (id: string) => void;

  // Actions
  addNotification: (notification: Omit<SystemNotification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  markAllRead: () => void;
  
  setAccentColor: (c: string) => void;
  setWallpaper: (w: string) => void;
  setFontSize: (s: number) => void;
  toggleReducedMotion: () => void;
  toggleSound: () => void;
  setThemePreset: (t: 'default' | 'cyberpunk' | 'nebula' | 'monochrome') => void;
  
  addNote: () => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;
  
  // VFS Actions
  createFile: (parentId: string, name: string, content: string) => void;
  createDir: (parentId: string, name: string) => void;
  deleteNode: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
  updateDesktopIconPos: (itemId: string, x: number, y: number) => void;
  
  // Clipboard
  copyToClipboard: (text: string) => void;
}

// Initial File System
const initialFS: Record<string, FileNode> = {
  'root': { id: 'root', name: 'root', type: 'dir', parentId: null, children: ['home'], createdAt: Date.now(), size: 0 },
  'home': { id: 'home', name: 'home', type: 'dir', parentId: 'root', children: ['user'], createdAt: Date.now(), size: 0 },
  'user': { id: 'user', name: 'user', type: 'dir', parentId: 'home', children: ['desktop', 'documents', 'downloads', 'readme', 'music', 'code'], createdAt: Date.now(), size: 0 },
  'desktop': { id: 'desktop', name: 'Desktop', type: 'dir', parentId: 'user', children: ['welcome_note', 'todo_list'], createdAt: Date.now(), size: 0 },
  'documents': { id: 'documents', name: 'Documents', type: 'dir', parentId: 'user', children: ['project_alpha'], createdAt: Date.now(), size: 0 },
  'downloads': { id: 'downloads', name: 'Downloads', type: 'dir', parentId: 'user', children: [], createdAt: Date.now(), size: 0 },
  'music': { id: 'music', name: 'Music', type: 'dir', parentId: 'user', children: ['song1'], createdAt: Date.now(), size: 0 },
  'code': { id: 'code', name: 'Code', type: 'dir', parentId: 'user', children: ['hello_world_js'], createdAt: Date.now(), size: 0 },
  'readme': { id: 'readme', name: 'README.md', type: 'file', parentId: 'user', content: '# Eigenfolio Quantum OS\n\nWelcome to the future of web portfolios.\n\nFeatures:\n- Neural AI Integration\n- Full Virtual File System\n- Quantum Chess\n- And more...', createdAt: Date.now(), size: 120 },
  'welcome_note': { id: 'welcome_note', name: 'Welcome.txt', type: 'file', parentId: 'desktop', content: 'Double click me to edit!', color: 'text-yellow-400', createdAt: Date.now(), size: 24 },
  'todo_list': { id: 'todo_list', name: 'Todo.md', type: 'file', parentId: 'desktop', content: '- [x] Build OS\n- [ ] Conquer Universe', createdAt: Date.now(), size: 35 },
  'project_alpha': { id: 'project_alpha', name: 'Project Alpha.txt', type: 'file', parentId: 'documents', content: 'Confidential.\nQuantum Core Status: Stable.', createdAt: Date.now(), size: 45 },
  'song1': { id: 'song1', name: 'Quantum_Vibes.mp3', type: 'file', parentId: 'music', content: '', createdAt: Date.now(), size: 4096 },
  'hello_world_js': { id: 'hello_world_js', name: 'main.js', type: 'file', parentId: 'code', content: 'console.log("Hello Quantum World");', createdAt: Date.now(), size: 40 }
};

export const useSystemStore = create<SystemState>()(
  persist(
    (set, get) => ({
      bootStatus: 'booting',
      setBootStatus: (status) => set({ bootStatus: status }),
      user: { name: 'Ashraf Morningstar', avatar: 'https://avatars.githubusercontent.com/u/10000000?v=4', role: 'admin', githubUsername: 'AshrafMorningstar' },
      setUser: (user) => set({ user }),
      
      systemStatus: { battery: 100, isCharging: false, wifiStrength: 4, volume: 80, brightness: 100 },
      updateSystemStatus: (newStatus) => set(s => ({ systemStatus: { ...s.systemStatus, ...newStatus } })),

      windows: [],
      activeWindowId: null,

      openWindow: (appId, title, data) => set((state) => {
        if (state.soundEnabled) audio.playOpen();
        const existing = state.windows.find(w => w.appId === appId && appId !== 'explorer' && appId !== 'editor' && appId !== 'browser'); 
        if (existing) {
             return { 
                 activeWindowId: existing.id, 
                 windows: state.windows.map(w => w.id === existing.id ? { ...w, isMinimized: false, zIndex: 999 } : { ...w, zIndex: w.zIndex > 0 ? w.zIndex - 1 : 0 }) 
             };
        }
        const id = Math.random().toString(36).substr(2, 9);
        const maxZ = Math.max(0, ...state.windows.map(w => w.zIndex));
        
        let width = 800; let height = 600;
        if (appId === 'calculator') { width = 320; height = 480; }
        if (appId === 'notes') { width = 400; height = 400; }
        if (appId === 'media') { width = 600; height = 400; }
        if (appId === 'terminal') { width = 700; height = 500; }
        if (appId === 'task-manager') { width = 500; height = 600; }
        if (appId === 'browser') { width = 1000; height = 700; }
        
        return {
            windows: [...state.windows, {
                id, appId, title: title || appId.charAt(0).toUpperCase() + appId.slice(1),
                x: 100 + (state.windows.length * 30), y: 50 + (state.windows.length * 30),
                width, height, isMinimized: false, isMaximized: false, zIndex: maxZ + 1, data, snapState: 'none'
            }],
            activeWindowId: id
        };
      }),
      closeWindow: (id) => set((state) => ({ windows: state.windows.filter(w => w.id !== id) })),
      minimizeWindow: (id) => set((state) => ({ windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w) })),
      maximizeWindow: (id) => set((state) => ({ windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized, snapState: 'none' } : w) })),
      focusWindow: (id) => set((state) => {
          const maxZ = Math.max(0, ...state.windows.map(w => w.zIndex));
          if (state.activeWindowId === id) return {};
          if (state.soundEnabled) audio.playClick();
          return {
              activeWindowId: id,
              windows: state.windows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w)
          };
      }),
      updateWindowPos: (id, x, y) => set(s => ({ windows: s.windows.map(w => w.id === id ? { ...w, x, y, snapState: 'none', isMaximized: false } : w) })),
      updateWindowSize: (id, w, h) => set(s => ({ windows: s.windows.map(win => win.id === id ? { ...win, width: w, height: h, snapState: 'none', isMaximized: false } : win) })),
      snapWindow: (id, snap) => set(s => ({ windows: s.windows.map(w => w.id === id ? { ...w, snapState: snap, isMaximized: false } : w) })),
      closeAll: () => set({ windows: [] }),

      accentColor: 'cyan',
      wallpaper: 'default',
      fontSize: 14,
      reducedMotion: false,
      soundEnabled: true,
      themePreset: 'default',
      
      notifications: [],
      notes: [{ id: '1', text: 'Quantum Idea:\nUse entanglement for instant state updates.', color: 'bg-yellow-200/80' }],
      calendarEvents: [{ id: '1', title: 'Launch Day', date: new Date(), type: 'deadline' }],
      desktopItems: [
        { id: 'dt1', fileId: 'welcome_note', x: 20, y: 20 },
        { id: 'dt2', fileId: 'todo_list', x: 20, y: 120 }
      ],
      fileSystem: initialFS,
      clipboard: [],
      
      // Browser
      browserTabs: [{id: 't1', title: 'New Tab', url: 'about:blank', loading: false, history: []}],
      activeTabId: 't1',
      
      addBrowserTab: (url = 'https://www.google.com/search?igu=1') => set(s => {
          const id = Math.random().toString(36).substr(2,9);
          return {
              browserTabs: [...s.browserTabs, {id, title: 'New Tab', url, loading: true, history: []}],
              activeTabId: id
          };
      }),
      closeBrowserTab: (id) => set(s => {
          const newTabs = s.browserTabs.filter(t => t.id !== id);
          if (newTabs.length === 0) return { browserTabs: newTabs }; // Usually close window if no tabs
          return { 
              browserTabs: newTabs,
              activeTabId: s.activeTabId === id ? newTabs[newTabs.length-1].id : s.activeTabId
          };
      }),
      updateBrowserTab: (id, data) => set(s => ({
          browserTabs: s.browserTabs.map(t => t.id === id ? {...t, ...data} : t)
      })),
      setActiveTab: (id) => set({ activeTabId: id }),

      addNotification: (n) => {
          if (get().soundEnabled) audio.playNotification();
          set(s => ({ notifications: [{...n, id: Math.random().toString(36).substr(2,9), timestamp: Date.now(), read: false}, ...s.notifications] }));
      },
      removeNotification: (id) => set(s => ({ notifications: s.notifications.filter(n => n.id !== id) })),
      clearNotifications: () => set({ notifications: [] }),
      markAllRead: () => set(s => ({ notifications: s.notifications.map(n => ({...n, read: true})) })),
      
      setAccentColor: (c) => set({ accentColor: c }),
      setWallpaper: (w) => set({ wallpaper: w }),
      setFontSize: (s) => set({ fontSize: s }),
      toggleReducedMotion: () => set(s => ({ reducedMotion: !s.reducedMotion })),
      toggleSound: () => set(s => ({ soundEnabled: !s.soundEnabled })),
      setThemePreset: (t) => set({ themePreset: t }),
      
      addNote: () => set(s => ({ notes: [...s.notes, { id: Math.random().toString(), text: '', color: 'bg-cyan-200/80' }] })),
      updateNote: (id, text) => set(s => ({ notes: s.notes.map(n => n.id === id ? {...n, text} : n) })),
      deleteNote: (id) => set(s => ({ notes: s.notes.filter(n => n.id !== id) })),
      
      addEvent: (e) => set(s => ({ calendarEvents: [...s.calendarEvents, { ...e, id: Math.random().toString() }] })),
      deleteEvent: (id) => set(s => ({ calendarEvents: s.calendarEvents.filter(e => e.id !== id) })),
      
      createFile: (parentId, name, content) => set(s => {
          const newId = Math.random().toString();
          const parent = s.fileSystem[parentId];
          if(!parent) return {};
          return {
              fileSystem: {
                  ...s.fileSystem,
                  [newId]: { id: newId, name, type: 'file', content, parentId, createdAt: Date.now(), size: content.length },
                  [parentId]: { ...parent, children: [...(parent.children || []), newId] }
              }
          };
      }),
      createDir: (parentId, name) => set(s => {
          const newId = Math.random().toString();
          const parent = s.fileSystem[parentId];
          if(!parent) return {};
          return {
              fileSystem: {
                  ...s.fileSystem,
                  [newId]: { id: newId, name, type: 'dir', parentId, children: [], createdAt: Date.now(), size: 0 },
                  [parentId]: { ...parent, children: [...(parent.children || []), newId] }
              }
          };
      }),
      deleteNode: (id) => set(s => {
           if(['root', 'home', 'user', 'desktop', 'documents', 'downloads'].includes(id)) return {};
           const node = s.fileSystem[id];
           if (!node || !node.parentId) return {};
           if (get().soundEnabled) audio.playDelete();
           const newFS = { ...s.fileSystem };
           delete newFS[id];
           if (newFS[node.parentId]) {
               newFS[node.parentId] = {
                   ...newFS[node.parentId],
                   children: newFS[node.parentId].children?.filter(cid => cid !== id)
               };
           }
           const newDesktopItems = s.desktopItems.filter(item => item.fileId !== id);
           return { fileSystem: newFS, desktopItems: newDesktopItems };
      }),
      updateFileContent: (id, content) => set(s => ({
          fileSystem: { ...s.fileSystem, [id]: { ...s.fileSystem[id], content, size: content.length } }
      })),
      updateDesktopIconPos: (itemId, x, y) => set(s => ({
          desktopItems: s.desktopItems.map(i => i.id === itemId ? { ...i, x, y } : i)
      })),
      
      copyToClipboard: (text) => set(s => ({
          clipboard: [{id: Math.random().toString(), text, timestamp: Date.now()}, ...s.clipboard.slice(0, 9)]
      }))
    }),
    {
      name: 'eigenfolio-system-v5-ultimate',
      partialize: (state) => ({ 
          accentColor: state.accentColor, 
          wallpaper: state.wallpaper,
          notes: state.notes,
          calendarEvents: state.calendarEvents,
          soundEnabled: state.soundEnabled,
          fontSize: state.fontSize,
          reducedMotion: state.reducedMotion,
          fileSystem: state.fileSystem,
          desktopItems: state.desktopItems,
          user: state.user,
          themePreset: state.themePreset
      }),
    }
  )
);

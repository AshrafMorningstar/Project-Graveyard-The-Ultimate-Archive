/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from 'zustand';
import { WindowState } from '../types';

interface StoreState {
  appStates: Record<string, WindowState>;
  maxZIndex: number;
  theme: 'light' | 'dark';
  volume: number;
  brightness: number;
  wifi: boolean;
  bluetooth: boolean;
  
  toggleTheme: () => void;
  setVolume: (val: number) => void;
  setBrightness: (val: number) => void;
  toggleWifi: () => void;
  toggleBluetooth: () => void;

  openApp: (appId: string) => void;
  closeApp: (appId: string) => void;
  minimizeApp: (appId: string) => void;
  focusApp: (appId: string) => void;
  toggleMaximize: (appId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  appStates: {},
  maxZIndex: 10,
  theme: 'light',
  volume: 50,
  brightness: 100,
  wifi: true,
  bluetooth: true,

  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setVolume: (val) => set({ volume: val }),
  setBrightness: (val) => set({ brightness: val }),
  toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
  toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),

  openApp: (appId) => set((state) => {
    const currentState = state.appStates[appId];
    if (currentState?.isOpen) {
        if (currentState.isMinimized) {
            return {
                appStates: {
                    ...state.appStates,
                    [appId]: { ...currentState, isMinimized: false, zIndex: state.maxZIndex + 1 }
                },
                maxZIndex: state.maxZIndex + 1
            };
        }
        return {
             appStates: {
                ...state.appStates,
                [appId]: { ...currentState, zIndex: state.maxZIndex + 1 }
            },
            maxZIndex: state.maxZIndex + 1
        };
    }
    return {
        appStates: {
            ...state.appStates,
            [appId]: {
                isOpen: true,
                isMinimized: false,
                isMaximized: false,
                zIndex: state.maxZIndex + 1
            }
        },
        maxZIndex: state.maxZIndex + 1
    };
  }),
  closeApp: (appId) => set((state) => ({
      appStates: {
          ...state.appStates,
          [appId]: { ...state.appStates[appId], isOpen: false }
      }
  })),
  minimizeApp: (appId) => set((state) => ({
      appStates: {
          ...state.appStates,
          [appId]: { ...state.appStates[appId], isMinimized: true }
      }
  })),
  focusApp: (appId) => set((state) => {
     return {
        appStates: {
            ...state.appStates,
            [appId]: { ...state.appStates[appId], zIndex: state.maxZIndex + 1 }
        },
        maxZIndex: state.maxZIndex + 1
     }
  }),
  toggleMaximize: (appId) => set((state) => ({
      appStates: {
            ...state.appStates,
            [appId]: { ...state.appStates[appId], isMaximized: !state.appStates[appId].isMaximized }
        }
  }))
}));

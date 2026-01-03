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

interface SystemState {
  isLocked: boolean;
  wallpaperId: number;
  brightness: number;
  volume: number;
  wifiConnected: boolean;
  bluetoothOn: boolean;
  isMenuOpen: boolean;
  isSpotlightOpen: boolean;
  isLaunchpadOpen: boolean;
  setIsLocked: (locked: boolean) => void;
  setWallpaper: (id: number) => void;
  toggleSpotlight: () => void;
  toggleLaunchpad: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  isLocked: true,
  wallpaperId: 1,
  brightness: 100,
  volume: 80,
  wifiConnected: true,
  bluetoothOn: true,
  isMenuOpen: false,
  isSpotlightOpen: false,
  isLaunchpadOpen: false,
  setIsLocked: (locked) => set({ isLocked: locked }),
  setWallpaper: (id) => set({ wallpaperId: id }),
  toggleSpotlight: () => set((state) => ({ isSpotlightOpen: !state.isSpotlightOpen })),
  toggleLaunchpad: () => set((state) => ({ isLaunchpadOpen: !state.isLaunchpadOpen })),
}));

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from 'zustand';

interface DockState {
  activeApp: string | null;
  setActiveApp: (appId: string | null) => void;
}

export const useDockStore = create<DockState>((set) => ({
  activeApp: null,
  setActiveApp: (appId) => set({ activeApp: appId })
}));

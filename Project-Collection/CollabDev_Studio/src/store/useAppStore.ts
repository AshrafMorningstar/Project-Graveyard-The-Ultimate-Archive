/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from "zustand";

interface AppState {
  activeView: "explorer" | "search" | "git" | "debug" | "extensions";
  setActiveView: (
    view: "explorer" | "search" | "git" | "debug" | "extensions"
  ) => void;
  terminalOpen: boolean;
  toggleTerminal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeView: "explorer",
  setActiveView: (view) => set({ activeView: view }),
  terminalOpen: true,
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
}));

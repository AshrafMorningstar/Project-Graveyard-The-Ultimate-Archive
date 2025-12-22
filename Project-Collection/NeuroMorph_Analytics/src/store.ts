/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from "zustand";

export type Theme = "cyber" | "quantum" | "bio";

interface ThemeState {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
  autoRotate: boolean;
  toggleAutoRotate: () => void;
}

const themes: Theme[] = ["cyber", "quantum", "bio"];

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentTheme: "cyber",
  autoRotate: true,

  setTheme: (theme) => set({ currentTheme: theme }),

  cycleTheme: () => {
    const current = get().currentTheme;
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    set({ currentTheme: themes[nextIndex] });
  },

  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
}));

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from 'zustand';

// Neural Interface Store
interface NeuralState {
  neuralActivity: number;
  quantumState: 'stable' | 'superposition' | 'entangled';
  increaseActivity: () => void;
  setQuantumState: (state: 'stable' | 'superposition' | 'entangled') => void;
}

export const useNeuralStore = create<NeuralState>((set) => ({
  neuralActivity: 0.5,
  quantumState: 'stable',
  increaseActivity: () => set((state) => ({ 
    neuralActivity: Math.min(1, state.neuralActivity + 0.1) 
  })),
  setQuantumState: (state) => set({ quantumState: state }),
}));

// Dock Store
interface DockState {
  activeApp: string;
  setActiveApp: (appId: string) => void;
}

export const useDockStore = create<DockState>((set) => ({
  activeApp: 'profile', // Default active section
  setActiveApp: (appId) => set({ activeApp: appId }),
}));

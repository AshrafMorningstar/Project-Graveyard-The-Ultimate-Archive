/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from 'zustand';

interface NeuralState {
  neuralActivity: number;
  quantumState: string;
  increaseActivity: () => void;
  setQuantumState: (state: string) => void;
}

export const useNeuralStore = create<NeuralState>((set) => ({
  neuralActivity: 0.5,
  quantumState: 'SUPERPOSITION',
  increaseActivity: () => set((state) => ({ 
    neuralActivity: Math.min(1, state.neuralActivity + 0.1) 
  })),
  setQuantumState: (state) => set({ quantumState: state })
}));

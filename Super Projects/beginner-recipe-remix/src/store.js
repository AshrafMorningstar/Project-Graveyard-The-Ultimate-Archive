/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { create } from 'zustand'

export const useStore = create((set) => ({
  myIngredients: [],
  addIngredient: (ing) => set((state) => ({ 
    myIngredients: [... new Set([...state.myIngredients, ing.toLowerCase()])] 
  })),
  removeIngredient: (ing) => set((state) => ({ 
    myIngredients: state.myIngredients.filter(i => i !== ing) 
  })),
}))

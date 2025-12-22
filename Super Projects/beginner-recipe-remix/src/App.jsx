/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react'
import { Plus, X, Search, ChefHat, Flame, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { recipes } from './data'
import { useStore } from './store'

function App() {
  const [inputVal, setInputVal] = useState('')
  const { myIngredients, addIngredient, removeIngredient } = useStore()

  // Logic to match recipes based on ingredients
  const matchedRecipes = recipes
    .map(recipe => {
      const matchCount = recipe.ingredients.filter(ing => 
        myIngredients.some(myIng => ing.includes(myIng) || myIng.includes(ing))
      ).length
      return { ...recipe, matchCount }
    })
    .sort((a, b) => b.matchCount - a.matchCount)

  const handleAdd = (e) => {
    e.preventDefault()
    if (inputVal.trim()) {
      addIngredient(inputVal.trim())
      setInputVal('')
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-accent text-white p-2 rounded-lg">
              <ChefHat size={24} />
            </span>
            <h1 className="text-2xl font-serif font-bold text-text-primary">Recipe Remix</h1>
          </div>
          <p className="hidden md:block text-text-secondary text-sm font-medium">
            Find recipes with what you have
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10">
        {/* Ingredient Input */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4 text-text-primary">What's in your fridge?</h2>
          <p className="text-text-secondary mb-8">Enter your ingredients and we'll tell you what to cook.</p>
          
          <form onSubmit={handleAdd} className="relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g., eggs, tomato, chicken..."
              className="w-full px-6 py-4 rounded-full border-2 border-orange-100 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 shadow-sm text-lg"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bg-accent text-white p-2.5 rounded-full hover:bg-accent-hover transition-colors"
            >
              <Plus size={24} />
            </button>
          </form>

          {/* Active Ingredients Tags */}
          <div className="flex flex-wrap gap-2 justify-center mt-6 min-h-[40px]">
            <AnimatePresence>
              {myIngredients.map(ing => (
                <motion.span
                  key={ing}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white border border-orange-200 px-4 py-1.5 rounded-full text-text-primary font-medium flex items-center gap-2 shadow-sm"
                >
                  {ing}
                  <button onClick={() => removeIngredient(ing)} className="text-text-secondary hover:text-accent">
                    <X size={14} />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
            {myIngredients.length === 0 && (
              <span className="text-gray-400 italic">No ingredients added yet...</span>
            )}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matchedRecipes.map(recipe => (
            <motion.div 
              layout
              key={recipe.id} 
              className="card group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-text-primary shadow-sm flex items-center gap-1">
                  <Clock size={12} /> {recipe.time}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-text-primary leading-tight">
                    {recipe.title}
                  </h3>
                  {recipe.matchCount > 0 && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                      {recipe.matchCount} matched
                    </span>
                  )}
                </div>
                
                <p className="text-text-secondary/80 text-sm line-clamp-2 mb-4">
                  {recipe.description}
                </p>

                <div className="flex items-center gap-4 text-sm font-medium text-text-secondary border-t border-orange-50 pt-4">
                  <span className="flex items-center gap-1">
                    <Flame size={16} className="text-accent" /> {recipe.calories} kcal
                  </span>
                  <span className={`
                    px-2 py-0.5 rounded-md text-xs
                    ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                  `}>
                    {recipe.difficulty}
                  </span>
                </div>
                
                {/* Missing Ingredients Preview */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {recipe.ingredients.slice(0, 3).map((ing, i) => {
                    const isMatched = myIngredients.some(my => ing.includes(my))
                    return (
                      <span 
                        key={i} 
                        className={`text-xs px-2 py-1 rounded-sm ${isMatched ? 'bg-accent/10 text-accent font-bold' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {ing}
                      </span>
                    )
                  })}
                  {recipe.ingredients.length > 3 && (
                    <span className="text-xs text-gray-400 px-1">+{recipe.ingredients.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App

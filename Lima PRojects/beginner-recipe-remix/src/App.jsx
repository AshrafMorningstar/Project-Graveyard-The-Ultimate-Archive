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

/**
 * Main Application Component
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useState, useEffect, useMemo } from 'react';
import recipesData from './data/recipes.json';
import { RecipeMatcher } from './logic/matcher';
import { CookingMode } from './components/CookingMode';
import { Plus, X, Search, ChefHat } from 'lucide-react';

export default function App() {
  const [pantry, setPantry] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [matches, setMatches] = useState([]);
  const [activeRecipe, setActiveRecipe] = useState(null);

  const matcher = useMemo(() => new RecipeMatcher(recipesData), []);

  useEffect(() => {
    if (pantry.length > 0) {
      const results = matcher.search(pantry);
      setMatches(results);
    } else {
      setMatches([]);
    }
  }, [pantry, matcher]);

  const addIngredient = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setPantry([...pantry, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeIngredient = (index) => {
    const newPantry = [...pantry];
    newPantry.splice(index, 1);
    setPantry(newPantry);
  };

  const printShoppingList = (recipe) => {
    const missing = recipe.missingIngredients.map(i => `${i.amount} ${i.item}`).join('\n');
    const win = window.open('', '', 'height=500,width=500');
    win.document.write(`
      <h1>Shopping List for ${recipe.title}</h1>
      <pre>${missing}</pre>
      <script>window.print();window.close();</script>
    `);
  };

  return (
    <div className="app-container">
      {activeRecipe ? (
        <CookingMode recipe={activeRecipe} onClose={() => setActiveRecipe(null)} />
      ) : (
        <>
          <header>
            <h1>Recipe Remix</h1>
            <p className="subtitle">Tell us what's in your fridge, and we'll tell you what to cook.</p>
          </header>

          <section className="search-section">
            <form onSubmit={addIngredient} className="input-group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type an ingredient (e.g., 'chicken', 'tomato')..."
                autoFocus
              />
              <button type="submit" className="add-btn">
                <Plus size={24} />
              </button>
            </form>

            <div className="pantry-chips">
              {pantry.map((item, index) => (
                <div key={index} className="chip">
                  <span>{item}</span>
                  <button onClick={() => removeIngredient(index)}>&times;</button>
                </div>
              ))}
            </div>
          </section>

          {matches.length > 0 && (
            <main>
              <h2 className="matches-count">Found {matches.length} recipes matching your ingredients.</h2>
              <div className="recipe-grid">
                {matches.map(recipe => (
                  <article key={recipe.id} className="recipe-card" onClick={() => setActiveRecipe(recipe)}>
                    <div className="card-image" style={{ backgroundImage: `url(${recipe.image})` }}>
                      <div className="match-badge">{recipe.matchScore}% Match</div>
                    </div>
                    <div className="card-content">
                      <div className="card-meta">
                        <span>⏱ {recipe.time}</span>
                        <span>👥 {recipe.servings} servings</span>
                      </div>
                      <h3>{recipe.title}</h3>
                      <p>{recipe.description}</p>
                      
                      {recipe.missingIngredients.length > 0 ? (
                        <div className="missing-ingredients">
                          <p><strong>Missing:</strong> {recipe.missingIngredients.map(i => i.item).slice(0, 3).join(', ')}</p>
                          <button 
                            className="print-btn" 
                            onClick={(e) => { e.stopPropagation(); printShoppingList(recipe); }}
                          >
                            Print Shopping List
                          </button>
                        </div>
                      ) : (
                        <div className="missing-ingredients" style={{ color: '#2D6A4F' }}>
                          <strong>You have everything!</strong>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </main>
          )}

          {pantry.length === 0 && (
            <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '40px' }}>
              <ChefHat size={64} style={{ marginBottom: '16px' }} />
              <p>Add ingredients to start remixing!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

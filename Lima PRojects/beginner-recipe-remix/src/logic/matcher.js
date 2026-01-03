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
 * Search Logic (Fuzzy Matcher)
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import lunr from 'lunr';

export class RecipeMatcher {
  constructor(recipes) {
    this.recipes = recipes;
    this.idx = lunr(function () {
      this.ref('id');
      this.field('ingredients');
      this.field('tags');
      this.field('title');

      recipes.forEach(function (doc) {
        // Flatten ingredients for better indexing
        const flatIngredients = doc.ingredients.map(i => i.item).join(' ');
        this.add({
          id: doc.id,
          ingredients: flatIngredients,
          tags: doc.tags.join(' '),
          title: doc.title
        });
      }, this);
    });
  }

  search(pantryItems) {
    if (!pantryItems || pantryItems.length === 0) return [];

    // Create a fuzzy query string
    const query = pantryItems.map(item => `${item}~1`).join(' ');
    
    // Get search results
    const results = this.idx.search(query);

    // Hydrate and rank results
    return results.map(result => {
      const recipe = this.recipes.find(r => r.id === result.ref);
      const matchScore = this.calculateMatchScore(recipe, pantryItems);
      
      return {
        ...recipe,
        matchScore, // Percentage of ingredients matched
        missingIngredients: this.getMissingIngredients(recipe, pantryItems)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }

  calculateMatchScore(recipe, pantryItems) {
    const recipeIngredients = recipe.ingredients.map(i => i.item.toLowerCase());
    const pantryLower = pantryItems.map(i => i.toLowerCase());

    let matches = 0;
    recipeIngredients.forEach(ing => {
      if (pantryLower.some(p => ing.includes(p) || p.includes(ing))) {
        matches++;
      }
    });

    return Math.round((matches / recipeIngredients.length) * 100);
  }

  getMissingIngredients(recipe, pantryItems) {
    const pantryLower = pantryItems.map(i => i.toLowerCase());
    return recipe.ingredients.filter(ing => {
      const ingName = ing.item.toLowerCase();
      return !pantryLower.some(p => ingName.includes(p) || p.includes(ingName));
    });
  }
}

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
 * Recipe Matching Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class RecipeMatcher {
    constructor(recipes) {
        this.recipes = recipes;
    }

    // Normalize ingredient names for better matching
    normalizeIngredient(ingredient) {
        return ingredient.toLowerCase().trim()
            .replace(/s$/, '') // Remove plural 's'
            .replace(/[^a-z]/g, ''); // Remove special characters
    }

    // Calculate match score between user ingredients and recipe
    calculateMatchScore(userIngredients, recipeIngredients) {
        const normalizedUser = userIngredients.map(i => this.normalizeIngredient(i));
        const normalizedRecipe = recipeIngredients.map(i => this.normalizeIngredient(i));
        
        let matches = 0;
        let partialMatches = 0;

        normalizedRecipe.forEach(recipeIng => {
            // Exact match
            if (normalizedUser.includes(recipeIng)) {
                matches++;
            } else {
                // Partial match (ingredient contains user input or vice versa)
                normalizedUser.forEach(userIng => {
                    if (recipeIng.includes(userIng) || userIng.includes(recipeIng)) {
                        partialMatches += 0.5;
                    }
                });
            }
        });

        const totalMatches = matches + partialMatches;
        const matchPercentage = (totalMatches / recipeIngredients.length) * 100;
        
        return {
            matches: Math.floor(totalMatches),
            total: recipeIngredients.length,
            percentage: Math.round(matchPercentage),
            missing: recipeIngredients.length - Math.floor(totalMatches)
        };
    }

    // Find recipes based on user ingredients
    findRecipes(userIngredients, filters = {}) {
        if (!userIngredients || userIngredients.length === 0) {
            return [];
        }

        let results = this.recipes.map(recipe => {
            const matchScore = this.calculateMatchScore(userIngredients, recipe.ingredients);
            return {
                ...recipe,
                matchScore
            };
        });

        // Filter by diet
        if (filters.diet && filters.diet !== 'all') {
            results = results.filter(r => 
                r.diet === filters.diet || r.diet === 'all'
            );
        }

        // Filter by difficulty
        if (filters.difficulty && filters.difficulty !== 'all') {
            results = results.filter(r => r.difficulty === filters.difficulty);
        }

        // Sort by match percentage (highest first)
        results.sort((a, b) => b.matchScore.percentage - a.matchScore.percentage);

        // Only return recipes with at least 30% match
        return results.filter(r => r.matchScore.percentage >= 30);
    }

    // Get missing ingredients for a recipe
    getMissingIngredients(userIngredients, recipeIngredients) {
        const normalizedUser = userIngredients.map(i => this.normalizeIngredient(i));
        
        return recipeIngredients.filter(recipeIng => {
            const normalized = this.normalizeIngredient(recipeIng);
            return !normalizedUser.some(userIng => 
                normalized.includes(userIng) || userIng.includes(normalized)
            );
        });
    }
}

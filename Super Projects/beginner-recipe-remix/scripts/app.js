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
 * Recipe Remix - Main Application
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class RecipeApp {
    constructor() {
        this.matcher = new RecipeMatcher(recipesDatabase);
        this.userIngredients = [];
        this.currentRecipes = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedIngredients();
    }

    bindEvents() {
        const input = document.getElementById('ingredientInput');
        const addBtn = document.getElementById('addIngredientsBtn');
        const searchBtn = document.getElementById('searchBtn');
        const closeModal = document.getElementById('closeModal');

        // Add ingredients on button click
        addBtn.addEventListener('click', () => this.addIngredients());
        
        // Add ingredients on Enter key
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addIngredients();
        });

        // Search recipes
        searchBtn.addEventListener('click', () => this.searchRecipes());

        // Close modal
        closeModal.addEventListener('click', () => this.closeModal());
        
        // Close modal on outside click
        document.getElementById('cookingModal').addEventListener('click', (e) => {
            if (e.target.id === 'cookingModal') this.closeModal();
        });
    }

    addIngredients() {
        const input = document.getElementById('ingredientInput');
        const value = input.value.trim();
        
        if (!value) return;

        const newIngredients = value.split(',')
            .map(i => i.trim())
            .filter(i => i.length > 0)
            .filter(i => !this.userIngredients.includes(i));

        this.userIngredients.push(...newIngredients);
        this.renderIngredientChips();
        this.saveIngredients();
        
        input.value = '';
        input.focus();

        // Auto-search if we have ingredients
        if (this.userIngredients.length > 0) {
            this.searchRecipes();
        }
    }

    removeIngredient(ingredient) {
        this.userIngredients = this.userIngredients.filter(i => i !== ingredient);
        this.renderIngredientChips();
        this.saveIngredients();
        
        if (this.userIngredients.length > 0) {
            this.searchRecipes();
        } else {
            this.clearResults();
        }
    }

    renderIngredientChips() {
        const container = document.getElementById('ingredientChips');
        
        if (this.userIngredients.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = this.userIngredients.map(ingredient => `
            <div class="chip">
                <span>${ingredient}</span>
                <button class="chip-remove" onclick="app.removeIngredient('${ingredient}')">×</button>
            </div>
        `).join('');
    }

    searchRecipes() {
        const dietFilter = document.getElementById('dietFilter').value;
        const difficultyFilter = document.getElementById('difficultyFilter').value;

        const filters = {
            diet: dietFilter,
            difficulty: difficultyFilter
        };

        this.currentRecipes = this.matcher.findRecipes(this.userIngredients, filters);
        this.renderRecipes();
    }

    renderRecipes() {
        const grid = document.getElementById('recipeGrid');
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsCount = document.getElementById('resultsCount');

        if (this.currentRecipes.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <p>No recipes found with these ingredients. Try adding more!</p>
                </div>
            `;
            resultsCount.textContent = '';
            return;
        }

        resultsTitle.textContent = 'Suggested Recipes';
        resultsCount.textContent = `${this.currentRecipes.length} recipe${this.currentRecipes.length > 1 ? 's' : ''} found`;

        grid.innerHTML = this.currentRecipes.map(recipe => this.createRecipeCard(recipe)).join('');
    }

    createRecipeCard(recipe) {
        const missing = this.matcher.getMissingIngredients(this.userIngredients, recipe.ingredients);
        
        return `
            <div class="recipe-card" onclick="app.openCookingMode(${recipe.id})">
                <div class="recipe-image">${recipe.emoji}</div>
                <div class="recipe-content">
                    <div class="recipe-meta">
                        <span class="recipe-badge">${recipe.difficulty}</span>
                        ${recipe.diet !== 'all' ? `<span class="recipe-badge">${recipe.diet}</span>` : ''}
                    </div>
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <div class="recipe-match">
                        ✓ ${recipe.matchScore.percentage}% match (${recipe.matchScore.matches}/${recipe.matchScore.total} ingredients)
                    </div>
                    <div class="recipe-info">
                        <span>⏱️ ${recipe.time} min</span>
                        <span>👥 ${recipe.servings} servings</span>
                    </div>
                    ${missing.length > 0 ? `
                        <div style="color: var(--text-secondary); font-size: 13px; margin-bottom: 12px;">
                            Missing: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '...' : ''}
                        </div>
                    ` : ''}
                    <div class="recipe-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); app.openCookingMode(${recipe.id})">
                            Start Cooking
                        </button>
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); app.printShoppingList(${recipe.id})">
                            Shopping List
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    openCookingMode(recipeId) {
        const recipe = this.currentRecipes.find(r => r.id === recipeId);
        if (!recipe) return;

        const modal = document.getElementById('cookingModal');
        const content = document.getElementById('cookingModeContent');

        const missing = this.matcher.getMissingIngredients(this.userIngredients, recipe.ingredients);

        content.innerHTML = `
            <div style="padding-right: 40px;">
                <div style="text-align: center; font-size: 64px; margin-bottom: 16px;">${recipe.emoji}</div>
                <h2 style="font-size: 32px; margin-bottom: 8px; text-align: center;">${recipe.title}</h2>
                <div style="text-align: center; color: var(--text-secondary); margin-bottom: 24px;">
                    ⏱️ ${recipe.time} min | 👥 ${recipe.servings} servings
                </div>

                ${missing.length > 0 ? `
                    <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                        <strong style="color: #EF4444;">⚠️ Missing Ingredients:</strong>
                        <div style="margin-top: 8px;">${missing.join(', ')}</div>
                    </div>
                ` : ''}

                <h3 style="margin-bottom: 16px;">Instructions:</h3>
                ${recipe.steps.map((step, index) => `
                    <div class="cooking-step">
                        <span class="step-number">${index + 1}</span>
                        <span>${step}</span>
                    </div>
                `).join('')}

                <div style="margin-top: 24px; text-align: center;">
                    <button class="btn btn-primary" onclick="app.closeModal()" style="padding: 14px 32px;">
                        Done Cooking! 🎉
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('cookingModal').classList.remove('active');
    }

    printShoppingList(recipeId) {
        const recipe = this.currentRecipes.find(r => r.id === recipeId);
        if (!recipe) return;

        const missing = this.matcher.getMissingIngredients(this.userIngredients, recipe.ingredients);

        if (missing.length === 0) {
            alert('You have all the ingredients! 🎉');
            return;
        }

        const printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write(`
            <html>
            <head>
                <title>Shopping List - ${recipe.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    h1 { color: #F59E0B; }
                    ul { line-height: 2; }
                    li { font-size: 16px; }
                </style>
            </head>
            <body>
                <h1>Shopping List</h1>
                <h2>${recipe.title}</h2>
                <ul>
                    ${missing.map(ing => `<li>☐ ${ing}</li>`).join('')}
                </ul>
                <p style="margin-top: 40px; color: #666;">Generated by Recipe Remix</p>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    clearResults() {
        const grid = document.getElementById('recipeGrid');
        grid.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                    <path d="M7 2v20"></path>
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
                </svg>
                <p>Add ingredients to discover delicious recipes!</p>
            </div>
        `;
        document.getElementById('resultsCount').textContent = '';
    }

    saveIngredients() {
        localStorage.setItem('recipeRemixIngredients', JSON.stringify(this.userIngredients));
    }

    loadSavedIngredients() {
        const saved = localStorage.getItem('recipeRemixIngredients');
        if (saved) {
            this.userIngredients = JSON.parse(saved);
            this.renderIngredientChips();
            if (this.userIngredients.length > 0) {
                this.searchRecipes();
            }
        }
    }
}

// Initialize app
const app = new RecipeApp();

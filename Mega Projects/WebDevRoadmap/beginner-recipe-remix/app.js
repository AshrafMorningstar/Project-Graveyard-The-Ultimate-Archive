/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Recipe Remix - Application Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

let userIngredients = [];
let currentRecipe = null;
let currentStep = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  const input = document.getElementById('ingredientInput');
  const addBtn = document.getElementById('addIngredientBtn');
  const findBtn = document.getElementById('findRecipesBtn');
  
  // Add ingredient on Enter or button click
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addIngredient();
  });
  
  addBtn.addEventListener('click', addIngredient);
  findBtn.addEventListener('click', findRecipes);
  
  // Modal controls
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('prevStepBtn').addEventListener('click', () => navigateStep(-1));
  document.getElementById('nextStepBtn').addEventListener('click', () => navigateStep(1));
}

// Add ingredient
function addIngredient() {
  const input = document.getElementById('ingredientInput');
  const ingredient = input.value.trim().toLowerCase();
  
  if (ingredient && !userIngredients.includes(ingredient)) {
    userIngredients.push(ingredient);
    renderIngredients();
    input.value = '';
    input.focus();
  }
}

// Remove ingredient
function removeIngredient(ingredient) {
  userIngredients = userIngredients.filter(i => i !== ingredient);
  renderIngredients();
}

// Render ingredients chips
function renderIngredients() {
  const container = document.getElementById('ingredientsChips');
  const findBtn = document.getElementById('findRecipesBtn');
  
  container.innerHTML = userIngredients.map(ingredient => `
    <div class="chip">
      <span>${ingredient}</span>
      <button class="chip-remove" onclick="removeIngredient('${ingredient}')">×</button>
    </div>
  `).join('');
  
  findBtn.disabled = userIngredients.length === 0;
}

// Find matching recipes
function findRecipes() {
  const matches = recipesDatabase.map(recipe => {
    const matchCount = recipe.ingredients.filter(ing => 
      userIngredients.some(userIng => 
        ing.includes(userIng) || userIng.includes(ing)
      )
    ).length;
    
    const matchPercent = Math.round((matchCount / recipe.ingredients.length) * 100);
    
    return {
      ...recipe,
      matchCount,
      matchPercent
    };
  })
  .filter(r => r.matchCount > 0)
  .sort((a, b) => b.matchPercent - a.matchPercent);
  
  renderRecipes(matches);
}

// Render recipe results
function renderRecipes(recipes) {
  const resultsSection = document.getElementById('resultsSection');
  const grid = document.getElementById('recipesGrid');
  
  if (recipes.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No recipes found. Try adding more ingredients!</p>';
  } else {
    grid.innerHTML = recipes.map(recipe => `
      <div class="recipe-card">
        <div class="recipe-image">${recipe.emoji}</div>
        <div class="recipe-content">
          <h3 class="recipe-title">${recipe.title}</h3>
          <span class="recipe-match">${recipe.matchPercent}% Match</span>
          <p class="recipe-ingredients">
            <strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}
          </p>
          <p class="recipe-ingredients">
            <strong>Cook Time:</strong> ${recipe.cookTime}
          </p>
          <button class="btn-cook" onclick="startCooking(${recipe.id})">
            👨‍🍳 Start Cooking
          </button>
        </div>
      </div>
    `).join('');
  }
  
  resultsSection.style.display = 'block';
}

// Start cooking mode
function startCooking(recipeId) {
  currentRecipe = recipesDatabase.find(r => r.id === recipeId);
  currentStep = 0;
  
  document.getElementById('recipeTitle').textContent = currentRecipe.title;
  updateCookingStep();
  
  document.getElementById('cookingModal').classList.add('active');
}

// Update cooking step
function updateCookingStep() {
  const totalSteps = currentRecipe.steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  document.getElementById('progressFill').style.width = `${progress}%`;
  document.getElementById('stepCounter').textContent = `Step ${currentStep + 1} of ${totalSteps}`;
  document.getElementById('stepContent').textContent = currentRecipe.steps[currentStep];
  
  // Update navigation buttons
  document.getElementById('prevStepBtn').disabled = currentStep === 0;
  document.getElementById('nextStepBtn').disabled = currentStep === totalSteps - 1;
  
  if (currentStep === totalSteps - 1) {
    document.getElementById('nextStepBtn').textContent = '✓ Done';
  } else {
    document.getElementById('nextStepBtn').textContent = 'Next →';
  }
}

// Navigate cooking steps
function navigateStep(direction) {
  const totalSteps = currentRecipe.steps.length;
  currentStep = Math.max(0, Math.min(totalSteps - 1, currentStep + direction));
  updateCookingStep();
}

// Close modal
function closeModal() {
  document.getElementById('cookingModal').classList.remove('active');
}

// Make functions globally accessible
window.removeIngredient = removeIngredient;
window.startCooking = startCooking;

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

// Created by Ashraf Morningstar - https://github.com/AshrafMorningstar

const paletteContainer = document.getElementById('palette-container');
const generateBtn = document.getElementById('generate-btn');
const saveBtn = document.getElementById('save-btn');
const savedPalettesContainer = document.getElementById('saved-palettes');

let currentPalette = [];
let savedPalettes = JSON.parse(localStorage.getItem('savedPalettes')) || [];

// Generate random color
function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Generate palette
function generatePalette() {
  currentPalette = [];
  paletteContainer.innerHTML = '';
  
  for (let i = 0; i < 5; i++) {
    const color = generateRandomColor();
    currentPalette.push(color);
    
    const colorCard = document.createElement('div');
    colorCard.className = 'color-card';
    colorCard.style.background = color;
    colorCard.innerHTML = `<div class="color-value">${color}</div>`;
    
    colorCard.addEventListener('click', () => copyToClipboard(color));
    
    paletteContainer.appendChild(colorCard);
    
    // Entrance animation
    setTimeout(() => {
      colorCard.style.opacity = '0';
      colorCard.style.transform = 'scale(0.8)';
      setTimeout(() => {
        colorCard.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        colorCard.style.opacity = '1';
        colorCard.style.transform = 'scale(1)';
      }, 50);
    }, i * 100);
  }
}

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  showNotification(`Copied ${text}`);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// Save palette
function savePalette() {
  if (currentPalette.length === 0) return;
  
  savedPalettes.unshift(currentPalette);
  if (savedPalettes.length > 5) savedPalettes.pop();
  
  localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
  displaySavedPalettes();
  showNotification('Palette saved!');
}

// Display saved palettes
function displaySavedPalettes() {
  savedPalettesContainer.innerHTML = '<h3 style="color: #fff; margin-bottom: 1rem;">Saved Palettes</h3>';
  
  savedPalettes.forEach((palette, index) => {
    const paletteDiv = document.createElement('div');
    paletteDiv.className = 'saved-palette';
    
    palette.forEach(color => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'saved-color';
      colorDiv.style.background = color;
      colorDiv.addEventListener('click', () => copyToClipboard(color));
      paletteDiv.appendChild(colorDiv);
    });
    
    savedPalettesContainer.appendChild(paletteDiv);
  });
}

// Event listeners
generateBtn.addEventListener('click', generatePalette);
saveBtn.addEventListener('click', savePalette);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    generatePalette();
  }
});

// Initialize
generatePalette();
displaySavedPalettes();

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Living CSS Garden
   Level: Beginner
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

// Controls
const sunlightInput = document.getElementById('sunlight');
const windInput = document.getElementById('wind');
const waterInput = document.getElementById('water');
const colorInput = document.getElementById('bloom-color');
const seedBtn = document.getElementById('seed-btn');
const soil = document.getElementById('soil');

// Update CSS Variables based on input
function updateGarden() {
    const root = document.documentElement;
    
    // Sunlight controls Scale
    root.style.setProperty('--sunlight-scale', sunlightInput.value);
    
    // Wind controls Skew/Rotation (simulating sway)
    // We add a base value, animation handles the rest
    root.style.setProperty('--wind-strength', `${windInput.value}deg`);
    
    // Water controls Border Radius (Leaf shape)
    root.style.setProperty('--water-level', `${waterInput.value}%`);
    
    // Bloom Color
    root.style.setProperty('--flower-color', colorInput.value);
    
    // Wind also affects animation speed (Higher wind = faster wave)
    // Inverse relationship: more wind = lower duration
    const speed = Math.max(0.5, 3 - (windInput.value / 10)) + 's';
    root.style.setProperty('--animation-speed', speed);
}

// Add event listeners
[sunlightInput, windInput, waterInput, colorInput].forEach(input => {
    input.addEventListener('input', updateGarden);
});

// Plant a new seed
seedBtn.addEventListener('click', () => {
    // Limit plants
    if (soil.children.length >= 5) {
        alert("The garden is full! Refresh or remove plants to add more.");
        return;
    }

    const plant = document.createElement('div');
    plant.classList.add('plant');
    
    // Randomize slight variations locally if desired, 
    // but here we stick to CSS variables for the tutorial aspect
    
    plant.innerHTML = `
        <div class="stem"></div>
        <div class="leaf leaf-left"></div>
        <div class="leaf leaf-right"></div>
        <div class="flower"></div>
    `;
    
    // Click to remove
    plant.addEventListener('click', () => {
        plant.style.transform = "scale(0)";
        setTimeout(() => plant.remove(), 500);
    });
    
    soil.appendChild(plant);
});

// Initialize
updateGarden();

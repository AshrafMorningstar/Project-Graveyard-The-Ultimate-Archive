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
 * ThemeSmith - Token Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class TokenEngine {
    constructor() {
        this.sliders = {
            hue: document.getElementById('hueSlider'),
            contrast: document.getElementById('contrastSlider'),
            radius: document.getElementById('radiusSlider'),
            elevation: document.getElementById('elevationSlider')
        };
        
        this.values = {
            hue: document.getElementById('hueValue'),
            contrast: document.getElementById('contrastValue'),
            radius: document.getElementById('radiusValue'),
            elevation: document.getElementById('elevationValue')
        };
        
        this.init();
    }
    
    init() {
        Object.keys(this.sliders).forEach(key => {
            this.sliders[key].addEventListener('input', () => this.updateTokens());
        });
        this.updateTokens();
    }
    
    updateTokens() {
        const hue = this.sliders.hue.value;
        const contrast = this.sliders.contrast.value;
        const radius = this.sliders.radius.value;
        const elevation = this.sliders.elevation.value;
        
        document.documentElement.style.setProperty('--hue', hue);
        document.documentElement.style.setProperty('--contrast', contrast);
        document.documentElement.style.setProperty('--radius', `${radius}px`);
        document.documentElement.style.setProperty('--elevation', elevation);
        
        this.values.hue.textContent = `${hue}°`;
        this.values.contrast.textContent = `${contrast}%`;
        this.values.radius.textContent = `${radius}px`;
        this.values.elevation.textContent = `${elevation}%`;
    }
}

new TokenEngine();

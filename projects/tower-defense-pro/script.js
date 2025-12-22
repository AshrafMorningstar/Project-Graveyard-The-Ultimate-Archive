/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Tower Defense Pro
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class TowerDefensePro {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('Tower Defense Pro initialized');
        this.setupUI();
        this.attachEventListeners();
    }
    
    setupUI() {
        const main = document.getElementById('appMain');
        main.innerHTML = this.generateUI();
    }
    
    generateUI() {
        return `
            <div class="feature-grid">
                
                <div class="feature-card">
                    <h3>Towers</h3>
                    <p>Premium towers functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>Upgrades</h3>
                    <p>Premium upgrades functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>Waves</h3>
                    <p>Premium waves functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
            </div>
        `;
    }
    
    attachEventListeners() {
        // Add event listeners here
        console.log('Event listeners attached');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TowerDefensePro();
});

// Add smooth animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
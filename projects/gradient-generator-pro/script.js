/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Gradient Generator Pro
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class GradientGeneratorPro {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('Gradient Generator Pro initialized');
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
                    <h3>CSS gradients</h3>
                    <p>Premium css gradients functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>Export code</h3>
                    <p>Premium export code functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>Presets</h3>
                    <p>Premium presets functionality</p>
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
    new GradientGeneratorPro();
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
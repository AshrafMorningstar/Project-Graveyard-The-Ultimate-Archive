/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Universal Unit Nexus
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class UniversalUnitNexus {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('Universal Unit Nexus initialized');
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
                    <h3>500+ units</h3>
                    <p>Premium 500+ units functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>Custom units</h3>
                    <p>Premium custom units functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>History</h3>
                    <p>Premium history functionality</p>
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
    new UniversalUnitNexus();
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
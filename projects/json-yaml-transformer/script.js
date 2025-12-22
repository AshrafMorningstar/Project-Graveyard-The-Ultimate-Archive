/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * JSON-YAML Transformer Studio
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class JsonYamlTransformer {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('JSON-YAML Transformer Studio initialized');
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
                    <h3>JSON/YAML/XML</h3>
                    <p>Premium json/yaml/xml functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>Validation</h3>
                    <p>Premium validation functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>Beautify</h3>
                    <p>Premium beautify functionality</p>
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
    new JsonYamlTransformer();
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
/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Base64 Cipher Vault
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class Base64CipherVault {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('Base64 Cipher Vault initialized');
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
                    <h3>Base64/32/16</h3>
                    <p>Premium base64/32/16 functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>File encoding</h3>
                    <p>Premium file encoding functionality</p>
                    <button class="btn btn-primary">Try Now</button>
                </div>
            
                <div class="feature-card">
                    <h3>Encryption</h3>
                    <p>Premium encryption functionality</p>
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
    new Base64CipherVault();
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
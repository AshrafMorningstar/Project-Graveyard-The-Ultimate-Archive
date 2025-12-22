/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * SilentNav Navigation Controller
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class NavController {
    constructor() {
        this.navSymbols = document.querySelectorAll('.nav-symbol');
        this.sections = document.querySelectorAll('.content-section');
        this.currentSection = 'home';
        
        this.init();
    }
    
    init() {
        // Add click listeners to navigation symbols
        this.navSymbols.forEach(symbol => {
            symbol.addEventListener('click', (e) => {
                const targetSection = symbol.getAttribute('data-section');
                this.navigateTo(targetSection);
            });
        });
        
        // Keyboard navigation
        this.setupKeyboardNav();
        
        // Set initial active state
        this.updateActiveStates();
    }
    
    navigateTo(sectionId) {
        if (sectionId === this.currentSection) return;
        
        // Update current section
        const previousSection = this.currentSection;
        this.currentSection = sectionId;
        
        // Update sections
        this.sections.forEach(section => {
            if (section.getAttribute('data-section') === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        
        // Update navigation symbols
        this.updateActiveStates();
        
        // Trigger transition animation
        this.animateTransition(previousSection, sectionId);
    }
    
    updateActiveStates() {
        this.navSymbols.forEach(symbol => {
            const sectionId = symbol.getAttribute('data-section');
            if (sectionId === this.currentSection) {
                symbol.classList.add('active');
                symbol.setAttribute('aria-current', 'page');
            } else {
                symbol.classList.remove('active');
                symbol.removeAttribute('aria-current');
            }
        });
    }
    
    animateTransition(from, to) {
        // Add subtle page transition effect
        const activeSection = document.querySelector(`[data-section="${to}"].content-section`);
        
        if (activeSection) {
            // Reset and trigger animation
            activeSection.style.animation = 'none';
            setTimeout(() => {
                activeSection.style.animation = 'slideIn 0.6s ease';
            }, 10);
        }
    }
    
    setupKeyboardNav() {
        // Arrow key navigation
        document.addEventListener('keydown', (e) => {
            const sections = ['home', 'work', 'about', 'contact'];
            const currentIndex = sections.indexOf(this.currentSection);
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % sections.length;
                this.navigateTo(sections[nextIndex]);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
                this.navigateTo(sections[prevIndex]);
            }
        });
        
        // Number key shortcuts (1-4)
        document.addEventListener('keydown', (e) => {
            const sections = ['home', 'work', 'about', 'contact'];
            const keyNum = parseInt(e.key);
            
            if (keyNum >= 1 && keyNum <= 4) {
                e.preventDefault();
                this.navigateTo(sections[keyNum - 1]);
            }
        });
    }
}

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NavController());
} else {
    new NavController();
}

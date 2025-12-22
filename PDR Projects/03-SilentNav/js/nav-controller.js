/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * SilentNav Controller
 * Manages navigation state and section transitions
 */

class NavController {
    constructor() {
        this.navButtons = document.querySelectorAll('.nav-symbol');
        this.sections = document.querySelectorAll('.content-section');
        this.currentSection = 'grid'; // Default section
        
        this.init();
    }
    
    init() {
        // Set initial active state
        this.setActiveButton(this.currentSection);
        this.setActiveSection(this.currentSection);
        
        // Add click listeners to nav buttons
        this.navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleNavClick(e.currentTarget);
            });
        });
        
        // Keyboard navigation
        this.setupKeyboardNav();
        
        console.log('🧭 SilentNav Controller initialized');
    }
    
    handleNavClick(button) {
        const targetSection = button.dataset.section;
        
        // Don't do anything if already on this section
        if (targetSection === this.currentSection) return;
        
        // Add transition state
        button.classList.add('transitioning');
        
        // Navigate to section
        this.navigateToSection(targetSection);
        
        // Remove transition state after animation
        setTimeout(() => {
            button.classList.remove('transitioning');
        }, 600);
    }
    
    navigateToSection(sectionName) {
        // Update current section
        const previousSection = this.currentSection;
        this.currentSection = sectionName;
        
        // Update UI
        this.setActiveButton(sectionName);
        this.setActiveSection(sectionName);
        
        console.log(`📍 Navigated from ${previousSection} to ${sectionName}`);
    }
    
    setActiveButton(sectionName) {
        this.navButtons.forEach(button => {
            if (button.dataset.section === sectionName) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'page');
            } else {
                button.classList.remove('active');
                button.removeAttribute('aria-current');
            }
        });
    }
    
    setActiveSection(sectionName) {
        this.sections.forEach(section => {
            if (section.dataset.section === sectionName) {
                section.classList.add('active');
                section.setAttribute('aria-hidden', 'false');
            } else {
                section.classList.remove('active');
                section.setAttribute('aria-hidden', 'true');
            }
        });
    }
    
    setupKeyboardNav() {
        const navButtons = Array.from(this.navButtons);
        
        navButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                let targetIndex;
                
                switch(e.key) {
                    case 'ArrowDown':
                    case 'ArrowRight':
                        e.preventDefault();
                        targetIndex = (index + 1) % navButtons.length;
                        navButtons[targetIndex].focus();
                        break;
                        
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        e.preventDefault();
                        targetIndex = (index - 1 + navButtons.length) % navButtons.length;
                        navButtons[targetIndex].focus();
                        break;
                        
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        this.handleNavClick(button);
                        break;
                        
                    case 'Home':
                        e.preventDefault();
                        navButtons[0].focus();
                        break;
                        
                    case 'End':
                        e.preventDefault();
                        navButtons[navButtons.length - 1].focus();
                        break;
                }
            });
        });
        
        // Number key shortcuts (1-4)
        document.addEventListener('keydown', (e) => {
            const key = parseInt(e.key);
            if (key >= 1 && key <= navButtons.length) {
                e.preventDefault();
                this.handleNavClick(navButtons[key - 1]);
            }
        });
    }
    
    // Public method to programmatically navigate
    goToSection(sectionName) {
        const button = Array.from(this.navButtons).find(
            btn => btn.dataset.section === sectionName
        );
        
        if (button) {
            this.handleNavClick(button);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.navController = new NavController();
    });
} else {
    window.navController = new NavController();
}

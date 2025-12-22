/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * SilentNav - Navigation Controller
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class NavigationController {
    constructor() {
        this.currentSection = 'grid';
        this.navSymbols = document.querySelectorAll('.nav-symbol');
        this.contentSections = document.querySelectorAll('.content-section');
        
        this.init();
    }
    
    init() {
        // Set initial active state
        this.setActiveSection(this.currentSection);
        
        // Add click listeners
        this.navSymbols.forEach(symbol => {
            symbol.addEventListener('click', (e) => {
                const section = symbol.dataset.section;
                this.navigateTo(section);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateWithKeyboard(e.key);
            }
        });
    }
    
    navigateTo(sectionName) {
        if (sectionName === this.currentSection) return;
        
        // Add transition animation to nav symbol
        const activeSymbol = document.querySelector(`.nav-symbol[data-section="${sectionName}"]`);
        activeSymbol.classList.add('transitioning');
        setTimeout(() => activeSymbol.classList.remove('transitioning'), 600);
        
        // Update sections
        this.currentSection = sectionName;
        this.setActiveSection(sectionName);
    }
    
    setActiveSection(sectionName) {
        // Update navigation
        this.navSymbols.forEach(symbol => {
            if (symbol.dataset.section === sectionName) {
                symbol.classList.add('active');
            } else {
                symbol.classList.remove('active');
            }
        });
        
        // Update content
        this.contentSections.forEach(section => {
            if (section.dataset.section === sectionName) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    navigateWithKeyboard(key) {
        const sections = ['grid', 'flow', 'minimal', 'visual'];
        const currentIndex = sections.indexOf(this.currentSection);
        
        let newIndex;
        if (key === 'ArrowDown') {
            newIndex = (currentIndex + 1) % sections.length;
        } else {
            newIndex = (currentIndex - 1 + sections.length) % sections.length;
        }
        
        this.navigateTo(sections[newIndex]);
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NavigationController());
} else {
    new NavigationController();
}

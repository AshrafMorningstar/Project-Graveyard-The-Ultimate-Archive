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
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class NavController {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.sections = document.querySelectorAll('.section');
        this.currentSection = 'home';
        
        this.init();
    }
    
    init() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Set initial active state
        this.setActiveNav('home');
    }
    
    handleNavClick(e) {
        const target = e.currentTarget;
        const section = target.getAttribute('data-section');
        
        if (section !== this.currentSection) {
            this.navigateTo(section);
        }
    }
    
    navigateTo(sectionId) {
        // Remove active from all
        this.navItems.forEach(item => item.classList.remove('active'));
        this.sections.forEach(section => section.classList.remove('active'));
        
        // Add active to target
        const targetNav = document.querySelector(`[data-section="${sectionId}"]`);
        const targetSection = document.getElementById(sectionId);
        
        if (targetNav && targetSection) {
            targetNav.classList.add('active');
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }
    }
    
    setActiveNav(sectionId) {
        const targetNav = document.querySelector(`[data-section="${sectionId}"]`);
        if (targetNav) {
            targetNav.classList.add('active');
        }
    }
    
    handleKeyboard(e) {
        const navArray = Array.from(this.navItems);
        const currentIndex = navArray.findIndex(item => 
            item.getAttribute('data-section') === this.currentSection
        );
        
        let newIndex = currentIndex;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            newIndex = (currentIndex + 1) % navArray.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            newIndex = (currentIndex - 1 + navArray.length) % navArray.length;
        }
        
        if (newIndex !== currentIndex) {
            const newSection = navArray[newIndex].getAttribute('data-section');
            this.navigateTo(newSection);
            navArray[newIndex].focus();
        }
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NavController());
} else {
    new NavController();
}

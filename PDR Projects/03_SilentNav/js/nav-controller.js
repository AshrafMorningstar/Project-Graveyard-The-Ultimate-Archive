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
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleNavClick(e);
                }
            });
        });
        
        this.setActiveNav('home');
    }
    
    handleNavClick(e) {
        const target = e.currentTarget;
        const section = target.dataset.section;
        
        if (section === this.currentSection) return;
        
        this.navigateToSection(section);
    }
    
    navigateToSection(sectionId) {
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 100);
        }
        
        this.setActiveNav(sectionId);
        this.currentSection = sectionId;
    }
    
    setActiveNav(sectionId) {
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NavController();
});

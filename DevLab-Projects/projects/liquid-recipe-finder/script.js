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
 * Liquid Recipe Finder - Interactive Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class LiquidRecipeFinderApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('%c Liquid Recipe Finder Initialized ', 'background: linear-gradient(135deg, #f093fb, #4facfe); color: white; padding: 10px; font-weight: bold;');
        console.log('%c Created by Ashraf Morningstar ', 'color: #f093fb; font-weight: bold;');
        console.log('%c GitHub: https://github.com/AshrafMorningstar ', 'color: #4facfe;');

        this.setupUI();
        this.attachEventListeners();
        this.startAnimations();
    }

    setupUI() {
        const interactiveSection = document.querySelector('.interactive-section');
        interactiveSection.innerHTML = `
            <div class="demo-content">
                <h2>Interactive Demo</h2>
                <p>This is a fully functional food application.</p>
                <button class="action-btn" id="actionBtn">Get Started</button>
            </div>
        `;
    }

    attachEventListeners() {
        const actionBtn = document.getElementById('actionBtn');
        if (actionBtn) {
            actionBtn.addEventListener('click', () => {
                this.handleAction();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.handleAction();
            }
        });
    }

    handleAction() {
        console.log('Action triggered!');
        this.showNotification('Feature activated!');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, var(--color-accent), var(--color-highlight));
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease-out;
            z-index: 1000;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    startAnimations() {
        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.feature-card');
            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                el.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
            });
        });

        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new LiquidRecipeFinderApp();
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
    });
}
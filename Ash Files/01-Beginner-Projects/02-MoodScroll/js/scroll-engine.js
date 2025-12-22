/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @author Ashraf Morningstar
 * @link https://github.com/AshrafMorningstar
 * @description Premium Viral Deployment
 * @design_status Premium_Pro_Max
 */

/* 
 * MoodScroll - Scroll Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class ScrollMoodEngine {
    constructor() {
        this.zones = document.querySelectorAll('.zone');
        this.indicatorBar = document.getElementById('indicatorBar');
        this.body = document.body;
        this.isScrolling = false;
        
        this.init();
    }
    
    init() {
        this.updateOnScroll();
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('resize', () => this.updateOnScroll());
    }
    
    handleScroll() {
        if (!this.isScrolling) {
            window.requestAnimationFrame(() => {
                this.updateOnScroll();
                this.isScrolling = false;
            });
            this.isScrolling = true;
        }
    }
    
    updateOnScroll() {
        const scrollProgress = this.getScrollProgress();
        this.updateIndicator(scrollProgress);
        this.updateZoneStates(scrollProgress);
        this.updateBodyBackground(scrollProgress);
    }
    
    getScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        return (scrollTop / (documentHeight - windowHeight)) * 100;
    }
    
    updateIndicator(progress) {
        this.indicatorBar.style.width = `${progress}%`;
        
        // Change indicator color based on progress
        if (progress < 25) {
            this.indicatorBar.style.background = 'linear-gradient(90deg, #a8dadc, #457b9d)';
        } else if (progress < 50) {
            this.indicatorBar.style.background = 'linear-gradient(90deg, #f4a261, #e76f51)';
        } else if (progress < 75) {
            this.indicatorBar.style.background = 'linear-gradient(90deg, #e63946, #d62828)';
        } else {
            this.indicatorBar.style.background = 'linear-gradient(90deg, #457b9d, #1d3557)';
        }
    }
    
    updateZoneStates(scrollProgress) {
        this.zones.forEach((zone, index) => {
            const rect = zone.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate visibility percentage
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visibilityPercent = (visibleHeight / windowHeight) * 100;
            
            // Apply transformations based on visibility
            const title = zone.querySelector('.zone-title');
            const text = zone.querySelector('.zone-text');
            const accent = zone.querySelector('.zone-accent');
            
            if (visibilityPercent > 0) {
                const intensity = Math.min(visibilityPercent / 100, 1);
                
                // Title effects
                if (title) {
                    title.style.opacity = intensity;
                    title.style.transform = `translateY(${(1 - intensity) * 30}px)`;
                }
                
                // Text effects
                if (text) {
                    text.style.opacity = intensity * 0.9;
                    text.style.transform = `translateY(${(1 - intensity) * 20}px)`;
                }
                
                // Accent effects
                if (accent) {
                    accent.style.opacity = intensity * 0.4;
                    accent.style.transform = `scale(${0.8 + intensity * 0.2})`;
                }
            }
        });
    }
    
    updateBodyBackground(scrollProgress) {
        // Smooth background transition based on scroll
        if (scrollProgress < 25) {
            this.body.style.backgroundColor = '#f8f9fa';
        } else if (scrollProgress < 50) {
            this.body.style.backgroundColor = '#e9ecef';
        } else if (scrollProgress < 75) {
            this.body.style.backgroundColor = '#212529';
        } else {
            this.body.style.backgroundColor = '#2c3e50';
        }
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ScrollMoodEngine());
} else {
    new ScrollMoodEngine();
}

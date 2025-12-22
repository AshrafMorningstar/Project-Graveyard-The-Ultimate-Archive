/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * MoodScroll Scroll Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * 
 * Manages scroll-driven emotional state transitions
 */

class ScrollEngine {
    constructor() {
        this.scrollContainer = document.getElementById('scrollContainer');
        this.scrollIndicator = document.getElementById('scrollIndicator');
        this.indicatorBar = this.scrollIndicator.querySelector('.indicator-bar');
        this.zones = document.querySelectorAll('.zone');
        
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        // Use requestAnimationFrame for smooth scroll tracking
        this.handleScroll();
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        
        // Initial zone visibility check
        this.checkZoneVisibility();
        
        // Observe zones for intersection
        this.setupIntersectionObserver();
    }
    
    onScroll() {
        if (!this.isScrolling) {
            window.requestAnimationFrame(() => this.handleScroll());
        }
        this.isScrolling = true;
        
        // Clear existing timeout
        clearTimeout(this.scrollTimeout);
        
        // Set timeout to detect scroll end
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    }
    
    handleScroll() {
        // Update scroll progress
        this.updateScrollProgress();
        
        // Check zone visibility
        this.checkZoneVisibility();
    }
    
    updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate scroll percentage
        const scrollableHeight = documentHeight - windowHeight;
        const scrollPercentage = (scrollTop / scrollableHeight) * 100;
        
        // Update indicator bar
        this.indicatorBar.style.width = `${scrollPercentage}%`;
        
        // Update body data attribute for theme transitions
        let progressRange = '0-25';
        if (scrollPercentage >= 75) {
            progressRange = '75-100';
        } else if (scrollPercentage >= 50) {
            progressRange = '50-75';
        } else if (scrollPercentage >= 25) {
            progressRange = '25-50';
        }
        
        document.body.setAttribute('data-scroll-progress', progressRange);
    }
    
    checkZoneVisibility() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        this.zones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            const zoneTop = rect.top + scrollTop;
            const zoneBottom = zoneTop + rect.height;
            const viewportTop = scrollTop;
            const viewportBottom = scrollTop + windowHeight;
            
            // Check if zone is in viewport
            const isVisible = (
                (zoneTop >= viewportTop && zoneTop <= viewportBottom) ||
                (zoneBottom >= viewportTop && zoneBottom <= viewportBottom) ||
                (zoneTop <= viewportTop && zoneBottom >= viewportBottom)
            );
            
            if (isVisible) {
                zone.classList.add('visible');
            }
        });
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);
        
        this.zones.forEach(zone => {
            observer.observe(zone);
        });
    }
}

// Initialize Scroll Engine when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ScrollEngine());
} else {
    new ScrollEngine();
}

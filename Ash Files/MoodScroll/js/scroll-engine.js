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
 */

class ScrollEngine {
    constructor() {
        this.zones = document.querySelectorAll('.zone');
        this.body = document.body;
        this.scrollProgress = 0;
        this.currentZone = null;
        
        this.init();
    }
    
    init() {
        this.updateScroll();
        
        // Use requestAnimationFrame for smooth 60fps updates
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Initial check
        this.checkActiveZone();
    }
    
    updateScroll() {
        // Calculate scroll progress (0 to 1)
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        
        // Update CSS variable
        document.documentElement.style.setProperty('--scroll-progress', this.scrollProgress);
        
        // Update visual state based on scroll
        this.updateVisualState();
        
        // Check which zone is active
        this.checkActiveZone();
        
        // Update parallax offsets
        this.updateParallax();
    }
    
    updateVisualState() {
        const progress = this.scrollProgress;
        
        // Interpolate background color based on scroll position
        let bgColor, textColor, accentColor;
        
        if (progress < 0.25) {
            // Calm zone
            bgColor = this.interpolateColor('#f0f4f8', '#fef5e7', progress / 0.25);
            textColor = this.interpolateColor('#2d3748', '#744210', progress / 0.25);
            accentColor = this.interpolateColor('#90cdf4', '#f6ad55', progress / 0.25);
        } else if (progress < 0.5) {
            // Curiosity zone
            const localProgress = (progress - 0.25) / 0.25;
            bgColor = this.interpolateColor('#fef5e7', '#2d1b2e', localProgress);
            textColor = this.interpolateColor('#744210', '#fef5f6', localProgress);
            accentColor = this.interpolateColor('#f6ad55', '#fc8181', localProgress);
        } else if (progress < 0.75) {
            // Intensity zone
            const localProgress = (progress - 0.5) / 0.25;
            bgColor = this.interpolateColor('#2d1b2e', '#1a202c', localProgress);
            textColor = this.interpolateColor('#fef5f6', '#e2e8f0', localProgress);
            accentColor = this.interpolateColor('#fc8181', '#81e6d9', localProgress);
        } else {
            // Reflection zone
            const localProgress = (progress - 0.75) / 0.25;
            bgColor = this.interpolateColor('#1a202c', '#1a202c', localProgress);
            textColor = this.interpolateColor('#e2e8f0', '#e2e8f0', localProgress);
            accentColor = this.interpolateColor('#81e6d9', '#81e6d9', localProgress);
        }
        
        document.documentElement.style.setProperty('--bg-color', bgColor);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--accent-color', accentColor);
    }
    
    checkActiveZone() {
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        
        this.zones.forEach(zone => {
            const zoneTop = zone.offsetTop;
            const zoneBottom = zoneTop + zone.offsetHeight;
            
            if (scrollPosition >= zoneTop && scrollPosition <= zoneBottom) {
                if (!zone.classList.contains('active')) {
                    zone.classList.add('active');
                }
            } else {
                zone.classList.remove('active');
            }
        });
    }
    
    updateParallax() {
        this.zones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            const offset = rect.top;
            zone.style.setProperty('--scroll-offset', offset);
        });
    }
    
    interpolateColor(color1, color2, factor) {
        // Simple hex color interpolation
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        
        if (!c1 || !c2) return color1;
        
        const r = Math.round(c1.r + (c2.r - c1.r) * factor);
        const g = Math.round(c1.g + (c2.g - c1.g) * factor);
        const b = Math.round(c1.b + (c2.b - c1.b) * factor);
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ScrollEngine());
} else {
    new ScrollEngine();
}

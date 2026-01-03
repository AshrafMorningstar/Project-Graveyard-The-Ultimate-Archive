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
 * MoodScroll - Scroll Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * 
 * Scroll-driven emotional state interpolation
 */

class ScrollEngine {
    constructor() {
        this.scrollProgress = 0;
        this.ticking = false;
        
        this.elements = {
            scrollProgress: document.getElementById('scrollProgress'),
            zones: document.querySelectorAll('.zone')
        };
        
        // Emotional zone definitions
        this.emotionalZones = [
            {
                name: 'calm',
                range: [0, 0.25],
                bgColor: '#fafafa',
                textColor: '#1a1a1a',
                accentColor: '#666666',
                fontWeight: 300,
                letterSpacing: '0.02em',
                lineHeight: 1.8
            },
            {
                name: 'curiosity',
                range: [0.25, 0.5],
                bgColor: '#e8f4f8',
                textColor: '#1a4d5c',
                accentColor: '#2d6a7d',
                fontWeight: 400,
                letterSpacing: '0em',
                lineHeight: 1.7
            },
            {
                name: 'intensity',
                range: [0.5, 0.75],
                bgColor: '#2d1b4e',
                textColor: '#ffffff',
                accentColor: '#8a2be2',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.5
            },
            {
                name: 'reflection',
                range: [0.75, 1],
                bgColor: '#0a0a0a',
                textColor: '#f5f5f5',
                accentColor: '#666666',
                fontWeight: 300,
                letterSpacing: '0.03em',
                lineHeight: 1.9
            }
        ];
        
        this.init();
    }
    
    init() {
        // Initial update
        this.updateScroll();
        
        // Scroll event with requestAnimationFrame
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
        
        // Update on resize
        window.addEventListener('resize', () => this.updateScroll());
    }
    
    updateScroll() {
        // Calculate scroll progress (0 to 1)
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
        
        // Update progress bar
        this.elements.scrollProgress.style.width = `${this.scrollProgress * 100}%`;
        
        // Update emotional state
        this.interpolateEmotionalState();
        
        // Update active zone
        this.updateActiveZone();
    }
    
    interpolateEmotionalState() {
        // Find current emotional zone
        let currentZone = this.emotionalZones[0];
        let nextZone = this.emotionalZones[1];
        let localProgress = 0;
        
        for (let i = 0; i < this.emotionalZones.length; i++) {
            const zone = this.emotionalZones[i];
            if (this.scrollProgress >= zone.range[0] && this.scrollProgress <= zone.range[1]) {
                currentZone = zone;
                nextZone = this.emotionalZones[Math.min(i + 1, this.emotionalZones.length - 1)];
                
                // Calculate local progress within zone
                const zoneRange = zone.range[1] - zone.range[0];
                localProgress = (this.scrollProgress - zone.range[0]) / zoneRange;
                break;
            }
        }
        
        // Interpolate colors
        const bgColor = this.interpolateColor(currentZone.bgColor, nextZone.bgColor, localProgress);
        const textColor = this.interpolateColor(currentZone.textColor, nextZone.textColor, localProgress);
        const accentColor = this.interpolateColor(currentZone.accentColor, nextZone.accentColor, localProgress);
        
        // Interpolate typography
        const fontWeight = this.lerp(currentZone.fontWeight, nextZone.fontWeight, localProgress);
        const letterSpacing = this.interpolateLetterSpacing(
            currentZone.letterSpacing,
            nextZone.letterSpacing,
            localProgress
        );
        const lineHeight = this.lerp(currentZone.lineHeight, nextZone.lineHeight, localProgress);
        
        // Apply to CSS variables
        document.documentElement.style.setProperty('--bg-color', bgColor);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--accent-color', accentColor);
        document.documentElement.style.setProperty('--font-weight', Math.round(fontWeight));
        document.documentElement.style.setProperty('--letter-spacing', letterSpacing);
        document.documentElement.style.setProperty('--line-height', lineHeight);
    }
    
    interpolateColor(color1, color2, progress) {
        const c1 = this.hexToRgb(color1);
        const c2 = this.hexToRgb(color2);
        
        const r = Math.round(this.lerp(c1.r, c2.r, progress));
        const g = Math.round(this.lerp(c1.g, c2.g, progress));
        const b = Math.round(this.lerp(c1.b, c2.b, progress));
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }
    
    interpolateLetterSpacing(spacing1, spacing2, progress) {
        const val1 = parseFloat(spacing1);
        const val2 = parseFloat(spacing2);
        return `${this.lerp(val1, val2, progress)}em`;
    }
    
    lerp(start, end, progress) {
        return start + (end - start) * progress;
    }
    
    updateActiveZone() {
        this.elements.zones.forEach((zone, index) => {
            const rect = zone.getBoundingClientRect();
            const isActive = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
            
            if (isActive) {
                zone.classList.add('active');
            } else {
                zone.classList.remove('active');
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ScrollEngine());
} else {
    new ScrollEngine();
}

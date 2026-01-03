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
 * MoodScroll Engine
 * Manages scroll-driven emotional state transitions
 */

class ScrollEngine {
    constructor() {
        this.zones = document.querySelectorAll('.mood-zone');
        this.indicatorFill = document.querySelector('.indicator-fill');
        this.moodLabel = document.getElementById('moodLabel');
        this.moodName = this.moodLabel.querySelector('.mood-name');
        
        this.currentZone = null;
        this.scrollProgress = 0;
        this.ticking = false;
        
        this.moodNames = {
            'calm': 'Calm',
            'curiosity': 'Curiosity',
            'intensity': 'Intensity',
            'reflection': 'Reflection'
        };
        
        this.moodColors = {
            'calm': {
                bg: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                text: '#2c3e50',
                accent: '#74b9ff'
            },
            'curiosity': {
                bg: 'linear-gradient(135deg, #dfe6e9 0%, #b2bec3 100%)',
                text: '#2d3436',
                accent: '#6c5ce7'
            },
            'intensity': {
                bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                text: '#ffffff',
                accent: '#f093fb'
            },
            'reflection': {
                bg: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                text: '#ecf0f1',
                accent: '#3498db'
            }
        };
        
        this.init();
    }
    
    init() {
        // Initial check
        this.updateOnScroll();
        
        // Scroll event with RAF throttling
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateOnScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
        
        console.log('📜 MoodScroll Engine initialized');
    }
    
    updateOnScroll() {
        this.updateScrollProgress();
        this.updateActiveZone();
        this.updateBodyTheme();
    }
    
    updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate overall scroll progress (0-100)
        this.scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // Update indicator
        this.indicatorFill.style.width = `${this.scrollProgress}%`;
    }
    
    updateActiveZone() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const centerPoint = scrollTop + (windowHeight / 2);
        
        let activeZone = null;
        let minDistance = Infinity;
        
        this.zones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            const zoneTop = scrollTop + rect.top;
            const zoneCenter = zoneTop + (rect.height / 2);
            const distance = Math.abs(centerPoint - zoneCenter);
            
            // Remove all states first
            zone.classList.remove('active', 'approaching');
            
            // Find closest zone
            if (distance < minDistance) {
                minDistance = distance;
                activeZone = zone;
            }
            
            // Mark approaching zones
            if (distance < windowHeight * 0.8) {
                zone.classList.add('approaching');
            }
        });
        
        // Set active zone
        if (activeZone) {
            activeZone.classList.add('active');
            const zoneName = activeZone.dataset.zone;
            
            if (this.currentZone !== zoneName) {
                this.currentZone = zoneName;
                this.updateMoodLabel(zoneName);
            }
        }
    }
    
    updateBodyTheme() {
        if (!this.currentZone) return;
        
        const mood = this.moodColors[this.currentZone];
        if (!mood) return;
        
        // Update CSS variables
        document.documentElement.style.setProperty('--current-bg', mood.bg);
        document.documentElement.style.setProperty('--current-text', mood.text);
        document.documentElement.style.setProperty('--current-accent', mood.accent);
        
        // Update body background
        document.body.style.background = mood.bg;
        document.body.style.color = mood.text;
    }
    
    updateMoodLabel(zoneName) {
        const moodDisplayName = this.moodNames[zoneName];
        
        // Fade transition
        this.moodName.style.opacity = '0';
        
        setTimeout(() => {
            this.moodName.textContent = moodDisplayName;
            this.moodName.style.opacity = '1';
        }, 200);
        
        console.log(`🎭 Mood changed to: ${moodDisplayName}`);
    }
    
    // Interpolate between two values based on scroll position
    interpolate(start, end, progress) {
        return start + (end - start) * progress;
    }
    
    // Get scroll progress within a specific zone
    getZoneProgress(zone) {
        const rect = zone.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Progress from 0 (top of viewport) to 1 (bottom of viewport)
        const progress = 1 - (rect.top / windowHeight);
        
        return Math.max(0, Math.min(1, progress));
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollEngine();
    });
} else {
    new ScrollEngine();
}

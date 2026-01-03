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
 * ChronoCard - Time Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * 
 * Centralized time state management and UI synchronization
 */

class TimeEngine {
    constructor() {
        this.currentTime = new Date();
        this.elements = {
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            greeting: document.getElementById('greeting'),
            weekdayName: document.getElementById('weekdayName'),
            card: document.getElementById('chronoCard')
        };
        
        this.weekdayColors = {
            0: '#ef4444', // Sunday - Red
            1: '#3b82f6', // Monday - Blue
            2: '#8b5cf6', // Tuesday - Purple
            3: '#10b981', // Wednesday - Green
            4: '#f59e0b', // Thursday - Amber
            5: '#ec4899', // Friday - Pink
            6: '#06b6d4'  // Saturday - Cyan
        };
        
        this.weekdayNames = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
            'Thursday', 'Friday', 'Saturday'
        ];
        
        this.init();
    }
    
    init() {
        this.updateTime();
        this.updateTheme();
        this.updateGreeting();
        this.updateWeekday();
        
        // Update every second
        setInterval(() => {
            this.updateTime();
            this.applyMicroMotion();
        }, 1000);
        
        // Check for theme changes every minute
        setInterval(() => {
            this.updateTheme();
            this.updateGreeting();
        }, 60000);
    }
    
    updateTime() {
        this.currentTime = new Date();
        const hours = String(this.currentTime.getHours()).padStart(2, '0');
        const minutes = String(this.currentTime.getMinutes()).padStart(2, '0');
        const seconds = String(this.currentTime.getSeconds()).padStart(2, '0');
        
        this.elements.hours.textContent = hours;
        this.elements.minutes.textContent = minutes;
        this.elements.seconds.textContent = seconds;
        
        // Update font weight based on AM/PM
        this.updateTypographyWeight();
    }
    
    updateTheme() {
        const hour = this.currentTime.getHours();
        const body = document.body;
        
        // Remove all theme classes
        body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');
        
        // Apply theme based on time
        if (hour >= 5 && hour < 12) {
            body.classList.add('theme-morning');
        } else if (hour >= 12 && hour < 17) {
            body.classList.add('theme-afternoon');
        } else if (hour >= 17 && hour < 21) {
            body.classList.add('theme-evening');
        } else {
            body.classList.add('theme-night');
        }
    }
    
    updateGreeting() {
        const hour = this.currentTime.getHours();
        let greeting;
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Good Morning';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'Good Afternoon';
        } else if (hour >= 17 && hour < 21) {
            greeting = 'Good Evening';
        } else {
            greeting = 'Good Night';
        }
        
        // Fade transition
        this.elements.greeting.style.opacity = '0';
        setTimeout(() => {
            this.elements.greeting.textContent = greeting;
            this.elements.greeting.style.opacity = '1';
        }, 300);
    }
    
    updateWeekday() {
        const dayIndex = this.currentTime.getDay();
        const dayName = this.weekdayNames[dayIndex];
        const accentColor = this.weekdayColors[dayIndex];
        
        this.elements.weekdayName.textContent = dayName;
        document.documentElement.style.setProperty('--accent-color', accentColor);
        document.documentElement.style.setProperty('--glow-color', accentColor + '4D'); // 30% opacity
    }
    
    updateTypographyWeight() {
        const hour = this.currentTime.getHours();
        const isAM = hour < 12;
        
        // AM: lighter weight, PM: heavier weight
        const primaryWeight = isAM ? 600 : 700;
        const secondaryWeight = isAM ? 400 : 500;
        
        document.documentElement.style.setProperty('--font-weight-primary', primaryWeight);
        document.documentElement.style.setProperty('--font-weight-secondary', secondaryWeight);
    }
    
    applyMicroMotion() {
        const seconds = this.currentTime.getSeconds();
        
        // Subtle scale oscillation (0.98 to 1.02)
        const scale = 1 + (Math.sin(seconds * Math.PI / 30) * 0.01);
        
        // Subtle opacity oscillation (0.95 to 1.0)
        const opacity = 0.975 + (Math.sin(seconds * Math.PI / 30) * 0.025);
        
        document.documentElement.style.setProperty('--scale-factor', scale);
        document.documentElement.style.setProperty('--opacity-factor', opacity);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TimeEngine());
} else {
    new TimeEngine();
}

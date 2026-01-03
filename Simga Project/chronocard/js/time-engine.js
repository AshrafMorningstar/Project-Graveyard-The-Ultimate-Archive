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
 * ChronoCard Time Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * 
 * Manages time-based UI transformations without user input
 */

class TimeEngine {
    constructor() {
        this.timeDisplay = document.getElementById('timeDisplay');
        this.dayIndicator = document.getElementById('dayIndicator');
        this.greeting = document.getElementById('greeting');
        this.body = document.body;
        
        this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.currentTheme = '';
        
        this.init();
    }
    
    init() {
        // Initial update
        this.updateTime();
        
        // Update every second
        this.intervalId = setInterval(() => this.updateTime(), 1000);
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => this.cleanup());
    }
    
    updateTime() {
        const now = new Date();
        
        // Update time display
        this.updateTimeDisplay(now);
        
        // Update day indicator
        this.updateDayIndicator(now);
        
        // Update greeting and theme
        this.updateGreetingAndTheme(now);
        
        // Apply weekday accent
        this.applyWeekdayAccent(now);
    }
    
    updateTimeDisplay(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        this.timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Subtle scale animation based on seconds
        const secondsValue = date.getSeconds();
        const scale = 1 + (Math.sin(secondsValue * Math.PI / 30) * 0.02);
        this.timeDisplay.style.transform = `scale(${scale})`;
    }
    
    updateDayIndicator(date) {
        const dayName = this.weekdays[date.getDay()];
        this.dayIndicator.textContent = dayName;
    }
    
    updateGreetingAndTheme(date) {
        const hours = date.getHours();
        let greeting = '';
        let theme = '';
        
        // Determine greeting and theme based on time
        if (hours >= 5 && hours < 12) {
            greeting = 'Good Morning';
            theme = 'morning';
        } else if (hours >= 12 && hours < 17) {
            greeting = 'Good Afternoon';
            theme = 'afternoon';
        } else if (hours >= 17 && hours < 21) {
            greeting = 'Good Evening';
            theme = 'evening';
        } else {
            greeting = 'Good Night';
            theme = 'night';
        }
        
        // Update greeting with fade transition
        if (this.greeting.textContent !== greeting) {
            this.greeting.style.opacity = '0';
            
            setTimeout(() => {
                this.greeting.textContent = greeting;
                this.greeting.style.opacity = '1';
            }, 400);
        }
        
        // Update theme class
        if (this.currentTheme !== theme) {
            this.body.classList.remove('morning', 'afternoon', 'evening', 'night');
            this.body.classList.add(theme);
            this.currentTheme = theme;
        }
    }
    
    applyWeekdayAccent(date) {
        const dayIndex = date.getDay();
        const weekdayColors = {
            0: '#e67e22', // Sunday
            1: '#3498db', // Monday
            2: '#e74c3c', // Tuesday
            3: '#2ecc71', // Wednesday
            4: '#f39c12', // Thursday
            5: '#9b59b6', // Friday
            6: '#1abc9c'  // Saturday
        };
        
        // Apply weekday-specific accent color
        const accentColor = weekdayColors[dayIndex];
        document.documentElement.style.setProperty('--current-accent', accentColor);
    }
    
    cleanup() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

// Initialize Time Engine when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TimeEngine());
} else {
    new TimeEngine();
}

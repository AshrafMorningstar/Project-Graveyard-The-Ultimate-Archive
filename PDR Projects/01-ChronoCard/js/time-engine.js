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
 * Manages time-based state and UI updates
 */

class TimeEngine {
    constructor() {
        this.elements = {
            body: document.body,
            greeting: document.getElementById('greeting'),
            currentTime: document.getElementById('currentTime'),
            tagline: document.getElementById('tagline'),
            dayName: document.getElementById('dayName'),
            timePeriod: document.getElementById('timePeriod'),
            dayIndicator: document.querySelector('.day-accent')
        };
        
        this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.dayColors = {
            0: '#e67e22', // Sunday
            1: '#3498db', // Monday
            2: '#e74c3c', // Tuesday
            3: '#2ecc71', // Wednesday
            4: '#f39c12', // Thursday
            5: '#9b59b6', // Friday
            6: '#1abc9c'  // Saturday
        };
        
        this.greetings = {
            morning: 'Good Morning',
            afternoon: 'Good Afternoon',
            evening: 'Good Evening',
            night: 'Good Night'
        };
        
        this.taglines = {
            morning: 'A fresh start to endless possibilities',
            afternoon: 'Making progress, one moment at a time',
            evening: 'Reflecting on the day\'s journey',
            night: 'Rest, recharge, dream'
        };
        
        this.currentTheme = null;
        this.init();
    }
    
    init() {
        // Initial update
        this.updateTime();
        
        // Update every second
        setInterval(() => this.updateTime(), 1000);
        
        console.log('⏰ ChronoCard Time Engine initialized');
    }
    
    updateTime() {
        const now = new Date();
        
        // Update time display
        this.updateTimeDisplay(now);
        
        // Update day
        this.updateDay(now);
        
        // Update theme based on time of day
        this.updateTheme(now);
        
        // Update greeting and tagline
        this.updateGreeting(now);
        
        // Update AM/PM indicator
        this.updateTimePeriod(now);
        
        // Subtle micro-motion based on seconds
        this.updateMicroMotion(now);
    }
    
    updateTimeDisplay(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        this.elements.currentTime.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    updateDay(date) {
        const dayIndex = date.getDay();
        const dayName = this.weekdays[dayIndex];
        const dayColor = this.dayColors[dayIndex];
        
        this.elements.dayName.textContent = dayName;
        
        // Update CSS variable for day accent color
        document.documentElement.style.setProperty('--current-day-accent', dayColor);
    }
    
    updateTheme(date) {
        const hours = date.getHours();
        let theme;
        
        // Determine theme based on time
        if (hours >= 5 && hours < 12) {
            theme = 'morning';
        } else if (hours >= 12 && hours < 17) {
            theme = 'afternoon';
        } else if (hours >= 17 && hours < 21) {
            theme = 'evening';
        } else {
            theme = 'night';
        }
        
        // Only update if theme changed
        if (theme !== this.currentTheme) {
            this.applyTheme(theme);
            this.currentTheme = theme;
        }
    }
    
    applyTheme(theme) {
        // Remove all theme classes
        this.elements.body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');
        
        // Add new theme class
        this.elements.body.classList.add(`theme-${theme}`);
        
        console.log(`🎨 Theme changed to: ${theme}`);
    }
    
    updateGreeting(date) {
        const hours = date.getHours();
        let greeting, tagline;
        
        if (hours >= 5 && hours < 12) {
            greeting = this.greetings.morning;
            tagline = this.taglines.morning;
        } else if (hours >= 12 && hours < 17) {
            greeting = this.greetings.afternoon;
            tagline = this.taglines.afternoon;
        } else if (hours >= 17 && hours < 21) {
            greeting = this.greetings.evening;
            tagline = this.taglines.evening;
        } else {
            greeting = this.greetings.night;
            tagline = this.taglines.night;
        }
        
        // Update with fade transition
        if (this.elements.greeting.textContent !== greeting) {
            this.fadeTransition(this.elements.greeting, greeting);
            this.fadeTransition(this.elements.tagline, tagline);
        }
    }
    
    updateTimePeriod(date) {
        const hours = date.getHours();
        const period = hours < 12 ? 'AM' : 'PM';
        
        this.elements.timePeriod.textContent = period;
        
        // Update font weight based on AM/PM
        const weight = hours < 12 ? '300' : '700';
        this.elements.timePeriod.style.fontWeight = weight;
    }
    
    updateMicroMotion(date) {
        const seconds = date.getSeconds();
        
        // Subtle scale based on seconds (imperceptible but present)
        const scale = 1 + (Math.sin(seconds * Math.PI / 30) * 0.002);
        const opacity = 1 - (Math.sin(seconds * Math.PI / 30) * 0.02);
        
        this.elements.currentTime.style.transform = `scale(${scale})`;
        this.elements.currentTime.style.opacity = opacity;
    }
    
    fadeTransition(element, newText) {
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = newText;
            element.style.opacity = '1';
        }, 300);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new TimeEngine();
    });
} else {
    new TimeEngine();
}

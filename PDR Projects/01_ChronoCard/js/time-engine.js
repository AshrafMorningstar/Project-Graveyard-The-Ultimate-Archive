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
 */

class TimeEngine {
    constructor() {
        this.timeDisplay = document.getElementById('timeDisplay');
        this.dateDisplay = document.getElementById('dateDisplay');
        this.greeting = document.getElementById('greeting');
        this.root = document.documentElement;
        
        // Weekday color palette
        this.weekdayColors = {
            0: { hue: 280, sat: 65, light: 55 }, // Sunday - Purple
            1: { hue: 210, sat: 70, light: 50 }, // Monday - Blue
            2: { hue: 340, sat: 65, light: 55 }, // Tuesday - Pink
            3: { hue: 160, sat: 60, light: 45 }, // Wednesday - Teal
            4: { hue: 30, sat: 70, light: 55 },  // Thursday - Orange
            5: { hue: 270, sat: 60, light: 50 }, // Friday - Violet
            6: { hue: 190, sat: 65, light: 50 }  // Saturday - Cyan
        };
        
        this.init();
    }
    
    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }
    
    updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const day = now.getDay();
        
        // Update time display
        this.timeDisplay.textContent = this.formatTime(hours, minutes);
        this.dateDisplay.textContent = this.formatDate(now);
        
        // Update greeting
        this.greeting.textContent = this.getGreeting(hours);
        
        // Update theme based on time
        this.updateTheme(hours, day, seconds);
    }
    
    formatTime(hours, minutes) {
        const h = hours % 12 || 12;
        const m = minutes.toString().padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        return `${h}:${m} ${period}`;
    }
    
    formatDate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
    }
    
    getGreeting(hours) {
        if (hours >= 5 && hours < 12) return 'Good Morning';
        if (hours >= 12 && hours < 17) return 'Good Afternoon';
        if (hours >= 17 && hours < 21) return 'Good Evening';
        return 'Good Night';
    }
    
    updateTheme(hours, day, seconds) {
        // Get weekday color
        const dayColor = this.weekdayColors[day];
        
        // Time-based theme adjustments
        let bgLightness, saturation, textLightness;
        
        if (hours >= 5 && hours < 12) {
            // Morning - Light, warm, airy
            bgLightness = 95;
            saturation = dayColor.sat;
            textLightness = 15;
        } else if (hours >= 12 && hours < 17) {
            // Afternoon - Neutral, balanced
            bgLightness = 92;
            saturation = dayColor.sat - 5;
            textLightness = 20;
        } else if (hours >= 17 && hours < 21) {
            // Evening - Saturated, soft contrast
            bgLightness = 85;
            saturation = dayColor.sat + 5;
            textLightness = 25;
        } else {
            // Night - Dark, low luminance
            bgLightness = 15;
            saturation = dayColor.sat - 10;
            textLightness = 85;
        }
        
        // Subtle scale based on seconds (micro-motion)
        const scaleFactor = 1 + (Math.sin(seconds * Math.PI / 30) * 0.01);
        
        // Font weight changes based on AM/PM
        const fontWeight = hours >= 12 ? 600 : 400;
        
        // Update CSS variables
        this.root.style.setProperty('--primary-hue', dayColor.hue);
        this.root.style.setProperty('--saturation', `${saturation}%`);
        this.root.style.setProperty('--lightness', `${dayColor.light}%`);
        this.root.style.setProperty('--font-weight', fontWeight);
        this.root.style.setProperty('--scale-factor', scaleFactor);
        
        // Update background and text colors for night mode
        if (hours >= 21 || hours < 5) {
            this.root.style.setProperty('--bg-color', `hsl(${dayColor.hue}, 20%, ${bgLightness}%)`);
            this.root.style.setProperty('--card-bg', `hsla(${dayColor.hue}, 30%, 20%, 0.7)`);
            this.root.style.setProperty('--text-primary', `hsl(${dayColor.hue}, 30%, ${textLightness}%)`);
            this.root.style.setProperty('--text-secondary', `hsl(${dayColor.hue}, 20%, 70%)`);
        } else {
            this.root.style.setProperty('--bg-color', `hsl(${dayColor.hue}, 20%, ${bgLightness}%)`);
            this.root.style.setProperty('--card-bg', `hsla(${dayColor.hue}, 30%, 98%, 0.7)`);
            this.root.style.setProperty('--text-primary', `hsl(${dayColor.hue}, 30%, ${textLightness}%)`);
            this.root.style.setProperty('--text-secondary', `hsl(${dayColor.hue}, 20%, 40%)`);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TimeEngine();
});

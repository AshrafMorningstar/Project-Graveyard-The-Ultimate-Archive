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
 * ChronoCard - Time Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class ChronoEngine {
    constructor() {
        this.timeDisplay = {
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        this.elements = {
            greeting: document.getElementById('greeting'),
            dayName: document.getElementById('dayName'),
            dateValue: document.getElementById('dateValue'),
            period: document.getElementById('period'),
            card: document.getElementById('chronoCard'),
            body: document.body
        };
        
        this.themes = {
            morning: {
                bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                glow: 'rgba(255, 216, 155, 0.3)',
                greeting: 'Good Morning'
            },
            afternoon: {
                bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                glow: 'rgba(255, 234, 167, 0.3)',
                greeting: 'Good Afternoon'
            },
            evening: {
                bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                glow: 'rgba(255, 107, 107, 0.3)',
                greeting: 'Good Evening'
            },
            night: {
                bg: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                glow: 'rgba(116, 185, 255, 0.3)',
                greeting: 'Good Night'
            }
        };
        
        this.weekdayColors = [
            '#e67e22', // Sunday
            '#e74c3c', // Monday
            '#3498db', // Tuesday
            '#2ecc71', // Wednesday
            '#f39c12', // Thursday
            '#9b59b6', // Friday
            '#1abc9c'  // Saturday
        ];
        
        this.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        this.init();
    }
    
    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }
    
    updateTime() {
        const now = new Date();
        
        // Update time display
        this.updateTimeDisplay(now);
        
        // Update theme based on time of day
        this.updateTheme(now);
        
        // Update metadata
        this.updateMetadata(now);
        
        // Subtle motion based on seconds
        this.updateMotion(now);
    }
    
    updateTimeDisplay(now) {
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        this.timeDisplay.hours.textContent = hours;
        this.timeDisplay.minutes.textContent = minutes;
        this.timeDisplay.seconds.textContent = seconds;
    }
    
    updateTheme(now) {
        const hour = now.getHours();
        let theme;
        
        if (hour >= 5 && hour < 12) {
            theme = this.themes.morning;
        } else if (hour >= 12 && hour < 17) {
            theme = this.themes.afternoon;
        } else if (hour >= 17 && hour < 21) {
            theme = this.themes.evening;
        } else {
            theme = this.themes.night;
        }
        
        // Update background
        this.elements.body.style.background = theme.bg;
        
        // Update greeting
        if (this.elements.greeting.textContent !== theme.greeting) {
            this.fadeTransition(this.elements.greeting, theme.greeting);
        }
        
        // Update glow
        const glow = this.elements.card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = theme.glow;
        }
    }
    
    updateMetadata(now) {
        const day = now.getDay();
        const date = now.getDate();
        const month = this.monthNames[now.getMonth()];
        const year = now.getFullYear();
        const period = now.getHours() >= 12 ? 'PM' : 'AM';
        
        // Update day name
        this.elements.dayName.textContent = this.dayNames[day];
        
        // Update date
        this.elements.dateValue.textContent = `${month} ${date}, ${year}`;
        
        // Update period
        this.elements.period.textContent = period;
        
        // Update accent color based on weekday
        const accentColor = this.weekdayColors[day];
        this.elements.greeting.style.color = accentColor;
        
        // Update typography weight based on AM/PM
        const weight = period === 'AM' ? '300' : '600';
        this.elements.greeting.style.fontWeight = weight;
    }
    
    updateMotion(now) {
        const seconds = now.getSeconds();
        const milliseconds = now.getMilliseconds();
        
        // Subtle scale based on seconds (very minimal)
        const scale = 1 + (Math.sin(seconds + milliseconds / 1000) * 0.005);
        const opacity = 0.95 + (Math.sin(seconds + milliseconds / 1000) * 0.05);
        
        this.elements.card.style.transform = `scale(${scale}) translateY(${Math.sin(seconds / 10) * 5}px)`;
        this.elements.card.style.opacity = opacity;
    }
    
    fadeTransition(element, newText) {
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = newText;
            element.style.opacity = '1';
        }, 500);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ChronoEngine());
} else {
    new ChronoEngine();
}

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

/*
 * Premium JavaScript by Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Color Guessing Game
 */

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✨ Color Guessing Game by Ashraf Morningstar', 'font-size: 16px; font-weight: bold; color: #667eea;');
    console.log('%c🔗 https://github.com/AshrafMorningstar', 'font-size: 12px; color: #764ba2;');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Initialize theme indicator tooltip
    initThemeTooltip();
});

// Ripple effect for buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Theme tooltip
function initThemeTooltip() {
    const indicator = document.querySelector('.theme-indicator');
    if (indicator) {
        indicator.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'theme-tooltip';
            tooltip.textContent = indicator.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.85rem;
                white-space: nowrap;
                pointer-events: none;
                animation: slideInUp 0.3s ease-out;
            `;
            indicator.appendChild(tooltip);
        });
        
        indicator.addEventListener('mouseleave', () => {
            const tooltip = indicator.querySelector('.theme-tooltip');
            if (tooltip) tooltip.remove();
        });
    }
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

let score = 0;
let highScore = localStorage.getItem('highScore_' + document.title) || 0;
document.getElementById('highScore').textContent = highScore;

function startGame() {
    score = 0;
    updateScore();
    document.querySelector('.game-message').textContent = 'Game Started!';
    // Game logic here
}

function resetGame() {
    score = 0;
    updateScore();
    document.querySelector('.game-message').textContent = 'Click Start to Play!';
}

function updateScore() {
    document.getElementById('score').textContent = score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore_' + document.title, highScore);
        document.getElementById('highScore').textContent = highScore;
    }
}

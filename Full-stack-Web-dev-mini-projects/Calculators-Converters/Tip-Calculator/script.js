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
 * Project: Tip Calculator
 */

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✨ Tip Calculator by Ashraf Morningstar', 'font-size: 16px; font-weight: bold; color: #667eea;');
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

function calculate() {
    const val1 = parseFloat(document.getElementById('input1').value);
    const val2 = parseFloat(document.getElementById('input2').value);
    const resultDiv = document.getElementById('result');
    
    if (isNaN(val1) || isNaN(val2)) {
        showNotification('Please enter valid numbers', 'error');
        return;
    }
    
    const result = val1 + val2; // Simplified calculation
    
    resultDiv.style.display = 'block';
    resultDiv.querySelector('.result-content').innerHTML = `
        <h3>Result</h3>
        <p class="result-value">${result.toFixed(2)}</p>
    `;
    
    animateResult(resultDiv);
}

function animateResult(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'slideInUp 0.5s ease-out';
    }, 10);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

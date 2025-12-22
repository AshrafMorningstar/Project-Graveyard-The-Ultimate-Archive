/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Predictive-Analytics-Dashboard
 * Premium Interactive JavaScript
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// Initialize particles animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Premium demo functionality
function handleDemo() {
    const input = document.getElementById('demo-input');
    const output = document.getElementById('demo-output');
    
    if (!input || !output) return;
    
    const value = input.value.trim();
    
    if (!value) {
        showNotification('Please enter something!', 'warning');
        return;
    }
    
    // Animate output
    output.style.opacity = '0';
    output.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        output.textContent = `✨ Amazing! You entered: "${value}"`;
        output.style.opacity = '1';
        output.style.transform = 'translateY(0)';
        output.style.transition = 'all 0.5s ease';
        
        showNotification('Success!', 'success');
    }, 300);
}

// Premium notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        color: var(--text-color);
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glass-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    showNotification('Welcome to Predictive-Analytics-Dashboard!', 'success');
    
    // Add entrance animations
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Handle Enter key in demo input
document.getElementById('demo-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleDemo();
    }
});

console.log('%cPredictive-Analytics-Dashboard', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cCreated by Ashraf Morningstar', 'font-size: 14px; color: #764ba2;');
console.log('%chttps://github.com/AshrafMorningstar', 'font-size: 12px; color: #00f5ff;');

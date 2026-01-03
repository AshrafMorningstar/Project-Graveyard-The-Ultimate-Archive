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

// Color-Palette by Ashraf Morningstar

function handleDemo() {
    const input = document.getElementById('demo-input');
    const output = document.getElementById('output');
    const value = input.value.trim();
    
    if (!value) {
        showNotification('Please enter something!', 'warning');
        return;
    }
    
    output.style.opacity = '0';
    setTimeout(() => {
        output.textContent = `Result: ${value}`;
        output.style.opacity = '1';
        output.style.transition = 'opacity 0.5s';
        showNotification('Success!', 'success');
    }, 300);
}

function showNotification(msg, type) {
    const notif = document.createElement('div');
    notif.textContent = msg;
    notif.style.cssText = `
        position: fixed; top: 20px; right: 20px; padding: 1rem 2rem;
        background: rgba(255,255,255,0.1); backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;
        color: white; font-weight: 600; z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    showNotification('Welcome to Color-Palette!', 'info');
    
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
});

document.getElementById('demo-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleDemo();
});

console.log('%cColor-Palette', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cBy Ashraf Morningstar', 'font-size: 14px; color: #764ba2;');

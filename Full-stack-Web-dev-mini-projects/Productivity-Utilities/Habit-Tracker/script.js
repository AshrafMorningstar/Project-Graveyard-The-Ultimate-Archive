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
 * Project: Habit Tracker
 */

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✨ Habit Tracker by Ashraf Morningstar', 'font-size: 16px; font-weight: bold; color: #667eea;');
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

let items = JSON.parse(localStorage.getItem('items_' + document.title)) || [];
let filter = 'all';

function addItem() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    items.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    
    input.value = '';
    saveItems();
    renderItems();
}

function toggleItem(id) {
    const item = items.find(i => i.id === id);
    if (item) {
        item.completed = !item.completed;
        saveItems();
        renderItems();
    }
}

function deleteItem(id) {
    items = items.filter(i => i.id !== id);
    saveItems();
    renderItems();
}

function saveItems() {
    localStorage.setItem('items_' + document.title, JSON.stringify(items));
}

function renderItems() {
    const list = document.getElementById('itemList');
    const filtered = items.filter(item => {
        if (filter === 'active') return !item.completed;
        if (filter === 'completed') return item.completed;
        return true;
    });
    
    list.innerHTML = filtered.map(item => `
        <div class="item ${item.completed ? 'completed' : ''}">
            <span onclick="toggleItem(${item.id})" class="item-text">${item.text}</span>
            <button onclick="deleteItem(${item.id})" class="delete-btn">🗑️</button>
        </div>
    `).join('');
    
    document.getElementById('stats').textContent = `${items.length} items`;
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filter = btn.dataset.filter;
        renderItems();
    });
});

renderItems();

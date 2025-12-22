/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Local Experience Booking System
 */

const grid = document.getElementById('grid');
const modal = document.getElementById('booking-modal');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const guestsInput = document.getElementById('booking-guests');
const confirmBtn = document.querySelector('.confirm-btn');
const closeBtn = document.querySelector('.close');
const filterBtns = document.querySelectorAll('.filter-btn');

let experiences = []; // Loaded from API
let currentExp = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    fetchExperiences();
    setupFilters();
});

async function fetchExperiences(category = 'All') {
    try {
        let url = '/api/experiences';
        if(category !== 'All') url += `?category=${category}`;
        
        const res = await fetch(url);
        if(!res.ok) throw new Error("API Failed");
        
        experiences = await res.json();
        renderGrid(experiences);
    } catch (e) {
        console.warn("Backend API not reachable, using mock fallback.");
        renderFallback();
    }
}

function renderFallback() {
    // Hardcoded data if server isn't running
    experiences = [
        { id: 1, title: "Pottery (Offline Mode)", rating: 4.9, reviews: 120, price: 45, image: "https://images.unsplash.com/photo-1565193566173-7a0ee335696e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 2, title: "Jazz Tour (Offline Mode)", rating: 4.8, reviews: 85, price: 30, image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
    ];
    renderGrid(experiences);
}

function renderGrid(items) {
    grid.innerHTML = items.map(exp => `
        <div class="card" onclick="openModal(${exp.id})">
            <div class="card-img">
                <img src="${exp.image}" alt="${exp.title}" loading="lazy">
            </div>
            <div class="card-info">
                <div class="rating">★ ${exp.rating} (${exp.reviews})</div>
                <h3>${exp.title}</h3>
                <div class="price">$${exp.price} <span>/ person</span></div>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            fetchExperiences(btn.textContent);
        });
    });
}

// Modal Logic
window.openModal = (id) => {
    currentExp = experiences.find(e => e.id === id);
    if(currentExp) {
        modalTitle.textContent = currentExp.title;
        updatePrice();
        modal.classList.add('show');
    }
};

const closeModal = () => modal.classList.remove('show');
closeBtn.onclick = closeModal;
window.onclick = (e) => { if(e.target === modal) closeModal(); };

guestsInput.oninput = updatePrice;

function updatePrice() {
    const guests = parseInt(guestsInput.value) || 1;
    modalPrice.textContent = guests * currentExp.price;
}

confirmBtn.onclick = async () => {
    const date = document.getElementById('booking-date').value;
    if(!date) {
        alert("Please select a date!");
        return;
    }
    
    confirmBtn.textContent = "Booking...";
    confirmBtn.disabled = true;

    try {
        const res = await fetch('/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                experienceId: currentExp.id,
                date: date,
                guests: parseInt(guestsInput.value)
            })
        });

        const data = await res.json();
        
        if(res.ok) {
            alert(`✅ ${data.message}\nRef: ${data.bookingRef}\nAmount: $${data.total}`);
            closeModal();
        } else {
            throw new Error(data.error);
        }
    } catch (e) {
        alert(`Booked Locally! (Server Mock)\nDate: ${date}`);
        closeModal();
    } finally {
        confirmBtn.textContent = "Confirm Booking";
        confirmBtn.disabled = false;
    }
};

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Emotional Weather Map
   Level: Beginner
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

// Initialize Map
const map = L.map('map').setView([20, 0], 2);

// Dark Mode Tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// State
let currentMood = null;
let markers = [];

// Mood Colors Mapping
const moodColors = {
    joy: '#facc15',
    calm: '#4ade80',
    sadness: '#60a5fa',
    anger: '#f87171',
    fear: '#a855f7',
    love: '#f472b6'
};

// Select DOM Elements
const moodBtns = document.querySelectorAll('.mood-btn');
const submitBtn = document.getElementById('submit-mood');
const noteInput = document.getElementById('mood-note');
const globalStats = document.getElementById('global-mood-display');

// Event Listeners
moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        moodBtns.forEach(b => b.classList.remove('selected'));
        // Add to current
        btn.classList.add('selected');
        currentMood = btn.dataset.mood;
    });
});

submitBtn.addEventListener('click', () => {
    if (!currentMood) {
        alert('Please select a mood first!');
        return;
    }

    // Get mock location (random for demo, or real geo)
    // For this Beginner project, we'll simulate a random location near the center if geo not avail, 
    // OR try to get real location. Let's try real first, fallback to random.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                addMoodMarker(position.coords.latitude, position.coords.longitude);
            },
            () => {
                // Denied or error -> Random location
                addMoodMarker(Math.random() * 160 - 80, Math.random() * 360 - 180);
            }
        );
    } else {
        addMoodMarker(Math.random() * 160 - 80, Math.random() * 360 - 180);
    }
});

function addMoodMarker(lat, lng) {
    const color = moodColors[currentMood];
    
    // Custom Marker Icon
    const customIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div style="
            background-color: ${color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
            border: 2px solid white;">
        </div>`,
        iconSize: [20, 20]
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    
    const note = noteInput.value || "No note added.";
    const date = new Date().toLocaleTimeString();

    marker.bindPopup(`
        <div style="font-family: 'Outfit', sans-serif;">
            <strong style="color: ${color}; text-transform: capitalize;">${currentMood}</strong><br>
            <p>${note}</p>
            <small>${date}</small>
        </div>
    `).openPopup();

    markers.push({ lat, lng, mood: currentMood });
    
    // Reset Form
    noteInput.value = '';
    moodBtns.forEach(b => b.classList.remove('selected'));
    currentMood = null;

    updateStats();
}

function updateStats() {
    // Simple stat: Most popular mood
    const counts = {};
    markers.forEach(m => {
        counts[m.mood] = (counts[m.mood] || 0) + 1;
    });

    const dominant = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    globalStats.innerHTML = `Dominant Mood: <span style="color:${moodColors[dominant]}; text-transform: capitalize;">${dominant}</span> (${markers.length} pins)`;
}

// Simulate some initial data
function simulateData() {
    const moods = Object.keys(moodColors);
    for(let i=0; i<10; i++) {
        const m = moods[Math.floor(Math.random() * moods.length)];
        const lat = Math.random() * 140 - 70;
        const lng = Math.random() * 360 - 180;
        
        currentMood = m; // temporary set for helper
        // Hacky bypass for helper function cleanliness in this simple script
        const color = moodColors[m];
        const customIcon = L.divIcon({
            className: 'custom-icon',
            html: `<div style="
                background-color: ${color};
                width: 15px;
                height: 15px;
                border-radius: 50%;
                opacity: 0.8;
                box-shadow: 0 0 5px ${color};">
            </div>`,
            iconSize: [15, 15]
        });
        
        L.marker([lat, lng], {icon: customIcon})
         .addTo(map)
         .bindPopup(`<strong style="color:${color}">${m}</strong>`);
         
        markers.push({ mood: m });
    }
    updateStats();
    currentMood = null;
}

simulateData();

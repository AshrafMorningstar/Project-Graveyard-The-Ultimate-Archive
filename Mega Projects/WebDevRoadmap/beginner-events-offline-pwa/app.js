/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Local Events PWA - Application Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: 'Summer Music Festival',
    category: 'music',
    date: '2024-07-15',
    description: 'Join us for an amazing outdoor music festival featuring local bands.',
    location: 'Central Park'
  },
  {
    id: 2,
    title: 'Tech Meetup: AI & ML',
    category: 'tech',
    date: '2024-06-20',
    description: 'Learn about the latest in artificial intelligence and machine learning.',
    location: 'Tech Hub Downtown'
  },
  {
    id: 3,
    title: 'Community Sports Day',
    category: 'sports',
    date: '2024-06-25',
    description: 'Family-friendly sports activities for all ages.',
    location: 'Sports Complex'
  },
  {
    id: 4,
    title: 'Food Truck Rally',
    category: 'food',
    date: '2024-07-01',
    description: 'Taste cuisines from around the world at our food truck event.',
    location: 'Riverside Plaza'
  },
  {
    id: 5,
    title: 'Art Gallery Opening',
    category: 'art',
    date: '2024-06-18',
    description: 'Explore contemporary art from emerging local artists.',
    location: 'Modern Art Gallery'
  },
  {
    id: 6,
    title: 'Jazz Night',
    category: 'music',
    date: '2024-06-22',
    description: 'Smooth jazz performances in an intimate setting.',
    location: 'Blue Note Cafe'
  }
];

// State
let events = [];
let favorites = [];
let currentView = 'list';
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  setupEventListeners();
  checkOnlineStatus();
  renderEvents();
  
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.log('Service Worker registration failed:', err);
    });
  }
});

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      switchView(e.target.dataset.view);
    });
  });

  // Category filter
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    currentFilter = e.target.value;
    renderEvents();
  });

  // Online/offline detection
  window.addEventListener('online', () => {
    updateOnlineStatus(true);
    syncData();
  });

  window.addEventListener('offline', () => {
    updateOnlineStatus(false);
  });
}

// Load data from localStorage
function loadFromStorage() {
  const storedEvents = localStorage.getItem('events');
  const storedFavorites = localStorage.getItem('favorites');
  
  events = storedEvents ? JSON.parse(storedEvents) : sampleEvents;
  favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  
  // Save sample events if first time
  if (!storedEvents) {
    localStorage.setItem('events', JSON.stringify(events));
  }
}

// Save to localStorage
function saveToStorage() {
  localStorage.setItem('events', JSON.stringify(events));
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Check online status
function checkOnlineStatus() {
  updateOnlineStatus(navigator.onLine);
}

// Update online status UI
function updateOnlineStatus(isOnline) {
  const indicator = document.getElementById('statusIndicator');
  const text = document.getElementById('statusText');
  
  if (isOnline) {
    indicator.classList.add('online');
    indicator.classList.remove('offline');
    text.textContent = 'Online';
  } else {
    indicator.classList.remove('online');
    indicator.classList.add('offline');
    text.textContent = 'Offline - Browsing cached events';
  }
}

// Sync data (simulated)
function syncData() {
  console.log('Syncing data with server...');
  // In a real app, this would sync with a backend
}

// Switch view
function switchView(view) {
  currentView = view;
  
  // Update tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
  
  // Update views
  document.querySelectorAll('.view').forEach(v => {
    v.classList.toggle('active', v.id === `${view}View`);
  });
}

// Render events
function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  const filteredEvents = currentFilter === 'all' 
    ? events 
    : events.filter(e => e.category === currentFilter);
  
  grid.innerHTML = filteredEvents.map(event => createEventCard(event)).join('');
  
  // Attach event listeners
  grid.querySelectorAll('.btn-favorite').forEach(btn => {
    btn.addEventListener('click', () => toggleFavorite(parseInt(btn.dataset.id)));
  });
  
  renderFavorites();
}

// Create event card HTML
function createEventCard(event) {
  const isFavorite = favorites.includes(event.id);
  const categoryEmojis = {
    music: '🎵',
    sports: '⚽',
    tech: '💻',
    food: '🍔',
    art: '🎨'
  };
  
  return `
    <div class="event-card">
      <span class="event-category">${categoryEmojis[event.category]} ${event.category}</span>
      <h3 class="event-title">${event.title}</h3>
      <p class="event-date">📅 ${new Date(event.date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
      <p class="event-description">${event.description}</p>
      <p class="event-date">📍 ${event.location}</p>
      <div class="event-actions">
        <button class="btn btn-favorite ${isFavorite ? 'active' : ''}" data-id="${event.id}">
          ${isFavorite ? '⭐' : '☆'}
        </button>
        <button class="btn btn-details">View Details</button>
      </div>
    </div>
  `;
}

// Toggle favorite
function toggleFavorite(eventId) {
  const index = favorites.indexOf(eventId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(eventId);
  }
  
  saveToStorage();
  renderEvents();
}

// Render favorites
function renderFavorites() {
  const container = document.getElementById('favoritesList');
  const favoriteEvents = events.filter(e => favorites.includes(e.id));
  
  if (favoriteEvents.length === 0) {
    container.innerHTML = '<p class="empty-state">No favorites yet. Click the star on any event!</p>';
    return;
  }
  
  container.innerHTML = favoriteEvents.map(event => `
    <div class="event-card">
      <span class="event-category">${event.category}</span>
      <h3 class="event-title">${event.title}</h3>
      <p class="event-date">${new Date(event.date).toLocaleDateString()}</p>
    </div>
  `).join('');
}

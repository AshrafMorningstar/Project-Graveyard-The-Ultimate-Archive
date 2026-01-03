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
 * Main Application Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class EventsApp {
    constructor() {
        this.currentView = 'list';
        this.currentFilter = 'all';
        this.showFavoritesOnly = false;
        this.map = null;
        this.init();
    }

    async init() {
        await eventsDB.init();
        await this.loadInitialData();
        this.bindEvents();
        this.loadEvents();
    }

    async loadInitialData() {
        // Load initial events if database is empty
        const events = await eventsDB.getAllEvents();
        if (!events || events.length === 0) {
            await syncEngine.syncData();
        }
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.closest('.tab-btn').dataset.view);
            });
        });

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.loadEvents();
            });
        }

        // Favorites filter
        const favoritesFilter = document.getElementById('favoritesFilter');
        if (favoritesFilter) {
            favoritesFilter.addEventListener('click', () => {
                this.showFavoritesOnly = !this.showFavoritesOnly;
                favoritesFilter.classList.toggle('active');
                this.loadEvents();
            });
        }
    }

    switchView(view) {
        this.currentView = view;
        
        // Update tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });

        // Update views
        document.querySelectorAll('.view-container').forEach(container => {
            container.classList.remove('active');
        });
        
        const viewContainer = document.getElementById(`${view}View`);
        if (viewContainer) {
            viewContainer.classList.add('active');
        }

        // Initialize view-specific features
        if (view === 'map' && !this.map) {
            this.initMap();
        } else if (view === 'calendar') {
            this.renderCalendar();
        }
    }

    async loadEvents() {
        let events = await eventsDB.getAllEvents();
        
        // Apply category filter
        if (this.currentFilter !== 'all') {
            events = events.filter(e => e.category === this.currentFilter);
        }

        // Apply favorites filter
        if (this.showFavoritesOnly) {
            const favorites = await eventsDB.getFavorites();
            const favoriteIds = favorites.map(f => f.id);
            events = events.filter(e => favoriteIds.includes(e.id));
        }

        this.renderEvents(events);
        
        if (this.currentView === 'map') {
            this.updateMapMarkers(events);
        }
    }

    renderEvents(events) {
        const container = document.getElementById('eventsList');
        if (!container) return;

        if (events.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 48px;">No events found</p>';
            return;
        }

        container.innerHTML = events.map(event => this.createEventCard(event)).join('');

        // Bind favorite buttons
        container.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(btn.dataset.eventId, btn);
            });
        });

        // Bind event cards
        container.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', () => {
                this.showEventDetails(card.dataset.eventId);
            });
        });
    }

    createEventCard(event) {
        return `
            <div class="event-card" data-event-id="${event.id}" style="position: relative;">
                <button class="favorite-btn" data-event-id="${event.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <div class="event-image"></div>
                <div class="event-content">
                    <span class="event-category">${event.category}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${this.formatDate(event.date)} at ${event.time}
                    </div>
                    <div class="event-location">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${event.location}
                    </div>
                </div>
            </div>
        `;
    }

    async toggleFavorite(eventId, button) {
        const isFav = await eventsDB.isFavorite(eventId);
        
        if (isFav) {
            await eventsDB.removeFavorite(eventId);
            button.classList.remove('active');
        } else {
            await eventsDB.addFavorite(eventId);
            button.classList.add('active');
        }
    }

    showEventDetails(eventId) {
        alert(`Event details for ${eventId} - Full modal would be implemented here`);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    initMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        this.map = L.map('map').setView([40.7580, -73.9855], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.loadEvents();
    }

    async updateMapMarkers(events) {
        if (!this.map) return;

        // Clear existing markers
        this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                this.map.removeLayer(layer);
            }
        });

        // Add new markers
        events.forEach(event => {
            if (event.lat && event.lng) {
                L.marker([event.lat, event.lng])
                    .addTo(this.map)
                    .bindPopup(`<strong>${event.title}</strong><br>${event.location}`);
            }
        });
    }

    renderCalendar() {
        const container = document.getElementById('calendar');
        if (!container) return;

        container.innerHTML = '<p style="text-align: center; padding: 48px;">Calendar view - Full implementation would include interactive calendar</p>';
    }
}

// Initialize app
window.app = new EventsApp();

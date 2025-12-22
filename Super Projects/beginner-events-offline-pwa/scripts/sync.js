/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Sync Engine for Online/Offline
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class SyncEngine {
    constructor() {
        this.isOnline = navigator.onLine;
        this.setupListeners();
    }

    setupListeners() {
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }

    handleOnline() {
        this.isOnline = true;
        this.updateConnectionStatus(true);
        this.hideOfflineBanner();
        this.syncData();
    }

    handleOffline() {
        this.isOnline = false;
        this.updateConnectionStatus(false);
        this.showOfflineBanner();
    }

    updateConnectionStatus(online) {
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        
        if (statusDot && statusText) {
            if (online) {
                statusDot.classList.add('online');
                statusText.textContent = 'Online';
            } else {
                statusDot.classList.remove('online');
                statusText.textContent = 'Offline';
            }
        }
    }

    showOfflineBanner() {
        const banner = document.getElementById('offlineBanner');
        if (banner) {
            banner.classList.remove('hidden');
        }
    }

    hideOfflineBanner() {
        const banner = document.getElementById('offlineBanner');
        if (banner) {
            banner.classList.add('hidden');
        }
    }

    async syncData() {
        console.log('Syncing data...');
        
        try {
            // Fetch fresh events from API (mock for now)
            const events = await this.fetchEvents();
            
            // Clear old events
            await eventsDB.clearEvents();
            
            // Store new events
            for (const event of events) {
                await eventsDB.addEvent(event);
            }
            
            // Trigger UI update
            if (window.app) {
                window.app.loadEvents();
            }
            
            console.log('Sync complete');
        } catch (error) {
            console.error('Sync failed:', error);
        }
    }

    async fetchEvents() {
        // Mock API - in production, this would fetch from a real API
        return this.getMockEvents();
    }

    getMockEvents() {
        return [
            {
                id: '1',
                title: 'Summer Music Festival',
                category: 'music',
                date: '2024-07-15',
                time: '18:00',
                location: 'Central Park',
                lat: 40.7829,
                lng: -73.9654,
                description: 'Annual summer music festival featuring local artists',
                image: null
            },
            {
                id: '2',
                title: 'Tech Conference 2024',
                category: 'tech',
                date: '2024-08-20',
                time: '09:00',
                location: 'Convention Center',
                lat: 40.7580,
                lng: -73.9855,
                description: 'Latest trends in technology and innovation',
                image: null
            },
            {
                id: '3',
                title: 'Food & Wine Expo',
                category: 'food',
                date: '2024-07-25',
                time: '12:00',
                location: 'Downtown Plaza',
                lat: 40.7614,
                lng: -73.9776,
                description: 'Taste the best local cuisine and wines',
                image: null
            },
            {
                id: '4',
                title: 'Marathon 2024',
                category: 'sports',
                date: '2024-09-10',
                time: '07:00',
                location: 'City Streets',
                lat: 40.7489,
                lng: -73.9680,
                description: 'Annual city marathon - 42km challenge',
                image: null
            },
            {
                id: '5',
                title: 'Art Gallery Opening',
                category: 'art',
                date: '2024-07-30',
                time: '19:00',
                location: 'Modern Art Museum',
                lat: 40.7614,
                lng: -73.9776,
                description: 'Contemporary art exhibition opening night',
                image: null
            }
        ];
    }
}

// Create global instance
const syncEngine = new SyncEngine();

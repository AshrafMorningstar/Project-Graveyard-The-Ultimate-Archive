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
 * IndexedDB Manager
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class EventsDB {
    constructor() {
        this.dbName = 'LocalEventsDB';
        this.version = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Events store
                if (!db.objectStoreNames.contains('events')) {
                    const eventsStore = db.createObjectStore('events', { keyPath: 'id' });
                    eventsStore.createIndex('category', 'category', { unique: false });
                    eventsStore.createIndex('date', 'date', { unique: false });
                }

                // Favorites store
                if (!db.objectStoreNames.contains('favorites')) {
                    db.createObjectStore('favorites', { keyPath: 'id' });
                }
            };
        });
    }

    async addEvent(event) {
        const tx = this.db.transaction(['events'], 'readwrite');
        const store = tx.objectStore('events');
        await store.add(event);
        return tx.complete;
    }

    async getAllEvents() {
        const tx = this.db.transaction(['events'], 'readonly');
        const store = tx.objectStore('events');
        return store.getAll();
    }

    async getEventsByCategory(category) {
        const tx = this.db.transaction(['events'], 'readonly');
        const store = tx.objectStore('events');
        const index = store.index('category');
        return index.getAll(category);
    }

    async addFavorite(eventId) {
        const tx = this.db.transaction(['favorites'], 'readwrite');
        const store = tx.objectStore('favorites');
        await store.add({ id: eventId, timestamp: Date.now() });
        return tx.complete;
    }

    async removeFavorite(eventId) {
        const tx = this.db.transaction(['favorites'], 'readwrite');
        const store = tx.objectStore('favorites');
        await store.delete(eventId);
        return tx.complete;
    }

    async getFavorites() {
        const tx = this.db.transaction(['favorites'], 'readonly');
        const store = tx.objectStore('favorites');
        return store.getAll();
    }

    async isFavorite(eventId) {
        const tx = this.db.transaction(['favorites'], 'readonly');
        const store = tx.objectStore('favorites');
        const result = await store.get(eventId);
        return !!result;
    }

    async clearEvents() {
        const tx = this.db.transaction(['events'], 'readwrite');
        const store = tx.objectStore('events');
        await store.clear();
        return tx.complete;
    }
}

// Create global instance
const eventsDB = new EventsDB();

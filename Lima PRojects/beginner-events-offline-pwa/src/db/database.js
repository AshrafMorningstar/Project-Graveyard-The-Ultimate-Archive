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
 * IndexedDB Database Layer
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import { openDB } from 'idb';

const DB_NAME = 'LocalEventsDB';
const DB_VERSION = 1;
const STORE_NAME = 'events';

class Database {
  constructor() {
    this.db = null;
  }

  async init() {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('date', 'date');
          store.createIndex('category', 'category');
          store.createIndex('favorite', 'favorite');
        }
      },
    });
    
    // Seed with sample data if empty
    const count = await this.db.count(STORE_NAME);
    if (count === 0) {
      await this.seedData();
    }
  }

  async seedData() {
    const sampleEvents = [
      {
        id: 1,
        title: 'Community Tech Meetup',
        description: 'Join us for an evening of tech talks and networking',
        date: new Date(Date.now() + 86400000 * 2).toISOString(),
        category: 'Technology',
        location: { lat: 40.7128, lng: -74.0060, name: 'New York' },
        favorite: false
      },
      {
        id: 2,
        title: 'Art Exhibition Opening',
        description: 'Contemporary art showcase featuring local artists',
        date: new Date(Date.now() + 86400000 * 5).toISOString(),
        category: 'Arts',
        location: { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
        favorite: false
      },
      {
        id: 3,
        title: 'Startup Pitch Night',
        description: 'Watch innovative startups pitch their ideas',
        date: new Date(Date.now() + 86400000 * 7).toISOString(),
        category: 'Business',
        location: { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
        favorite: false
      }
    ];

    for (const event of sampleEvents) {
      await this.db.add(STORE_NAME, event);
    }
  }

  async getAllEvents() {
    if (!this.db) await this.init();
    return await this.db.getAll(STORE_NAME);
  }

  async getEvent(id) {
    if (!this.db) await this.init();
    return await this.db.get(STORE_NAME, id);
  }

  async addEvent(event) {
    if (!this.db) await this.init();
    return await this.db.add(STORE_NAME, event);
  }

  async updateEvent(id, event) {
    if (!this.db) await this.init();
    return await this.db.put(STORE_NAME, { ...event, id });
  }

  async deleteEvent(id) {
    if (!this.db) await this.init();
    return await this.db.delete(STORE_NAME, id);
  }

  async getFavorites() {
    if (!this.db) await this.init();
    const allEvents = await this.getAllEvents();
    return allEvents.filter(event => event.favorite);
  }
}

export const db = new Database();

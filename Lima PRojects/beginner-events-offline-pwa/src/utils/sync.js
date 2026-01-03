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
 * Sync Utility
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import { db } from '../db/database';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API

export async function syncEvents() {
  if (!navigator.onLine) {
    throw new Error('Cannot sync while offline');
  }

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    // Transform API data to event format (mock transformation)
    const events = data.slice(0, 5).map((item, index) => ({
      id: item.id + 100,
      title: item.title,
      description: item.body,
      date: new Date(Date.now() + 86400000 * (index + 1)).toISOString(),
      category: 'General',
      location: { 
        lat: 40.7128 + (Math.random() - 0.5) * 0.1, 
        lng: -74.0060 + (Math.random() - 0.5) * 0.1, 
        name: 'New York Area' 
      },
      favorite: false
    }));

    // Update local database
    for (const event of events) {
      const existing = await db.getEvent(event.id);
      if (existing) {
        await db.updateEvent(event.id, { ...event, favorite: existing.favorite });
      } else {
        await db.addEvent(event);
      }
    }

    return events;
  } catch (error) {
    console.error('Sync error:', error);
    throw error;
  }
}

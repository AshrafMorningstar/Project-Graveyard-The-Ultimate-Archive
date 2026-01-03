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

import { openDB } from 'idb'

const DB_NAME = 'events-pwa-db'
const DB_VERSION = 1
const STORE_NAME = 'events'

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('date', 'date')
        
        // Seed initial data
        const initialEvents = [
          {
            id: '1',
            title: 'Tech Meetup 2024',
            date: new Date(Date.now() + 86400000).toISOString(),
            location: { lat: 40.7128, lng: -74.0060, address: 'NYC Tech Hub' },
            category: 'Technology',
            description: 'Join us for an evening of networking and tech talks.'
          },
          {
            id: '2',
            title: 'Jazz in the Park',
            date: new Date(Date.now() + 172800000).toISOString(),
            location: { lat: 40.785091, lng: -73.968285, address: 'Central Park' },
            category: 'Music',
            description: 'Live jazz performance in the heart of the city.'
          },
          {
            id: '3',
            title: 'React Workshop',
            date: new Date(Date.now() + 259200000).toISOString(),
            location: { lat: 40.758896, lng: -73.985130, address: 'Times Square Conf Center' },
            category: 'Education',
            description: 'Learn React patterns from experts.'
          }
        ]
        
        initialEvents.forEach(evt => store.add(evt))
      }
    },
  })
}

export const getAllEvents = async () => {
  const db = await initDB()
  return db.getAll(STORE_NAME)
}

export const addEvent = async (event) => {
  const db = await initDB()
  return db.add(STORE_NAME, event)
}

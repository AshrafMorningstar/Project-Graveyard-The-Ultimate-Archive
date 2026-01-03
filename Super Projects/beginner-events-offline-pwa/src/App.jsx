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

import React, { useState, useEffect } from 'react'
import { Calendar as CalIcon, Map as MapIcon, List, Wifi, WifiOff } from 'lucide-react'
import EventCard from './components/EventCard'
import MapView from './components/MapView'
import CalendarView from './components/CalendarView'
import { getAllEvents } from './db/db'

function App() {
  const [view, setView] = useState('list')
  const [events, setEvents] = useState([])
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    // Load events from IndexedDB
    const loadData = async () => {
      const data = await getAllEvents()
      setEvents(data)
    }
    loadData()

    // Network status listeners
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="min-h-screen pb-20">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-warning/20 text-warning px-4 py-2 text-center text-sm font-medium border-b border-warning/20 flex items-center justify-center gap-2">
          <WifiOff size={16} />
          <span>You are offline. Showing cached events.</span>
        </div>
      )}

      <header className="pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
              Local Events
            </h1>
            <p className="text-text-secondary mt-1">Discover what's happening nearby</p>
          </div>
          
          {/* View Toggles */}
          <div className="flex bg-bg-secondary p-1 rounded-lg border border-white/10">
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-bg-tertiary text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => setView('map')}
              className={`p-2 rounded-md transition-all ${view === 'map' ? 'bg-bg-tertiary text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <MapIcon size={20} />
            </button>
            <button 
              onClick={() => setView('calendar')}
              className={`p-2 rounded-md transition-all ${view === 'calendar' ? 'bg-bg-tertiary text-accent shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <CalIcon size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        {view === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {view === 'map' && <MapView events={events} />}

        {view === 'calendar' && <CalendarView events={events} />}
      </main>
    </div>
  )
}

export default App

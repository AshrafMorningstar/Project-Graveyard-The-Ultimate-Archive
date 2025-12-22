/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Main App Component
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useState, useEffect } from 'react';
import { EventList } from './components/EventList';
import { MapView } from './components/MapView';
import { CalendarView } from './components/CalendarView';
import { OfflineBanner } from './components/OfflineBanner';
import { db } from './db/database';
import { syncEvents } from './utils/sync';

function App() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('list'); // list, map, calendar
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    loadEvents();
    
    // Online/offline listeners
    const handleOnline = () => {
      setIsOnline(true);
      handleSync();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadEvents = async () => {
    const storedEvents = await db.getAllEvents();
    setEvents(storedEvents);
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncEvents();
      await loadEvents();
    } catch (error) {
      console.error('Sync failed:', error);
    }
    setSyncing(false);
  };

  const toggleFavorite = async (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      await db.updateEvent(eventId, { ...event, favorite: !event.favorite });
      await loadEvents();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Local Events</h1>
        <div className="header-actions">
          <button 
            onClick={handleSync} 
            disabled={!isOnline || syncing}
            className="sync-btn"
          >
            {syncing ? 'Syncing...' : 'Sync'}
          </button>
        </div>
      </header>

      <OfflineBanner isOnline={isOnline} />

      <nav className="view-tabs">
        <button 
          className={view === 'list' ? 'active' : ''} 
          onClick={() => setView('list')}
        >
          List
        </button>
        <button 
          className={view === 'map' ? 'active' : ''} 
          onClick={() => setView('map')}
        >
          Map
        </button>
        <button 
          className={view === 'calendar' ? 'active' : ''} 
          onClick={() => setView('calendar')}
        >
          Calendar
        </button>
      </nav>

      <main className="app-main">
        {view === 'list' && (
          <EventList events={events} onToggleFavorite={toggleFavorite} />
        )}
        {view === 'map' && (
          <MapView events={events} />
        )}
        {view === 'calendar' && (
          <CalendarView events={events} />
        )}
      </main>
    </div>
  );
}

export default App;

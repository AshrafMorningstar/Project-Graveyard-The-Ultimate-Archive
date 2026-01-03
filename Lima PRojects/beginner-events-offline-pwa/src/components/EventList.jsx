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
 * Event List Component
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React from 'react';

export function EventList({ events, onToggleFavorite }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="event-list">
      {events.length === 0 ? (
        <div className="empty-state">
          <p>No events found. Try syncing when online!</p>
        </div>
      ) : (
        events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <span className="event-category">{event.category}</span>
              <button
                className={`favorite-btn ${event.favorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(event.id)}
                aria-label="Toggle favorite"
              >
                {event.favorite ? '★' : '☆'}
              </button>
            </div>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <div className="event-meta">
              <span className="event-date">📅 {formatDate(event.date)}</span>
              <span className="event-location">📍 {event.location.name}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

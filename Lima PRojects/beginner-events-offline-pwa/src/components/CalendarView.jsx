/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Calendar View Component
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React from 'react';

export function CalendarView({ events }) {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  const groupByMonth = (events) => {
    const groups = {};
    events.forEach(event => {
      const date = new Date(event.date);
      const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(event);
    });
    return groups;
  };

  const groupedEvents = groupByMonth(sortedEvents);

  return (
    <div className="calendar-view">
      {Object.entries(groupedEvents).map(([month, monthEvents]) => (
        <div key={month} className="calendar-month">
          <h2 className="month-title">{month}</h2>
          <div className="month-events">
            {monthEvents.map(event => (
              <div key={event.id} className="calendar-event">
                <div className="calendar-date">
                  <span className="day">{new Date(event.date).getDate()}</span>
                  <span className="weekday">
                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
                <div className="calendar-event-info">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <span className="event-location">📍 {event.location.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

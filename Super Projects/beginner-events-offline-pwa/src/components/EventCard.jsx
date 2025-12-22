/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react'
import { Calendar, MapPin, Tag } from 'lucide-react'
import { format } from 'date-fns'

export default function EventCard({ event }) {
  return (
    <div className="bg-bg-tertiary rounded-xl p-4 border border-white/5 hover:border-accent/50 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
          {event.title}
        </h3>
        <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-medium">
          {event.category}
        </span>
      </div>
      
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {event.description}
      </p>
      
      <div className="space-y-2 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-accent" />
          <span>{format(new Date(event.date), 'PPP p')}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-accent" />
          <span>{event.location.address}</span>
        </div>
      </div>
    </div>
  )
}

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

import React from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CalendarView({ events }) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const getEventsForDay = (day) => {
    return events.filter(event => isSameDay(new Date(event.date), day))
  }

  return (
    <div className="bg-bg-tertiary rounded-xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          const dayEvents = getEventsForDay(day)
          return (
            <div 
              key={day.toString()} 
              className={`
                aspect-square rounded-lg p-1 border border-white/5 relative group
                ${!isSameMonth(day, currentMonth) ? 'opacity-30' : ''}
                ${dayEvents.length > 0 ? 'bg-white/5 hover:border-accent' : ''}
              `}
            >
              <span className={`text-sm ${isSameDay(day, new Date()) ? 'text-accent font-bold' : ''}`}>
                {format(day, 'd')}
              </span>
              
              {dayEvents.length > 0 && (
                <div className="absolute bottom-1 right-1">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

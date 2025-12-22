/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <div className="flex h-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-64 bg-slate-100 dark:bg-slate-800/50 p-4 border-r border-slate-200 dark:border-white/10 flex flex-col gap-4">
        <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 font-medium shadow-sm transition-colors">
          <Plus size={18} /> New Event
        </button>
        
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-white/5">
           <div className="text-4xl font-light text-red-500">{selectedDate.getDate()}</div>
           <div className="text-sm font-medium uppercase tracking-wide opacity-60">
             {DAYS[selectedDate.getDay()]}
           </div>
        </div>

        <div className="mt-4">
           <div className="text-xs font-semibold opacity-50 mb-2 uppercase tracking-wider">My Calendars</div>
           <div className="space-y-2">
             <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-blue-500" /> Work</div>
             <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-green-500" /> Personal</div>
             <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-purple-500" /> Birthdays</div>
           </div>
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{MONTHS[month]} {year}</h2>
            <div className="flex gap-1 bg-slate-200 dark:bg-slate-800 rounded-lg p-1">
              <button onClick={handlePrevMonth} className="p-1 hover:bg-white/10 rounded"><ChevronLeft size={18} /></button>
              <button onClick={() => setCurrentDate(new Date())} className="px-2 text-xs font-medium">Today</button>
              <button onClick={handleNextMonth} className="p-1 hover:bg-white/10 rounded"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-800 rounded-md">Day</button>
            <button className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-800 rounded-md">Week</button>
            <button className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md shadow">Month</button>
            <button className="px-3 py-1 text-sm bg-slate-200 dark:bg-slate-800 rounded-md">Year</button>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(day => (
              <div key={day} className="text-center font-medium opacity-50 text-sm py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-6 h-full gap-px bg-slate-200 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden">
            {days.map((d, i) => (
              <div 
                key={i} 
                className={`bg-white dark:bg-slate-900 p-2 min-h-[80px] hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer relative ${!d && 'bg-slate-50 dark:bg-slate-900/50'}`}
                onClick={() => d && setSelectedDate(new Date(year, month, d))}
              >
                {d && (
                  <>
                    <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium ${
                      d === new Date().getDate() && month === new Date().getMonth() 
                        ? 'bg-red-500 text-white' 
                        : d === selectedDate.getDate() && month === selectedDate.getMonth() ? 'bg-indigo-500 text-white' : ''
                    }`}>
                      {d}
                    </span>
                    {/* Simulated Events */}
                    {d === 15 && <div className="mt-1 text-[10px] truncate bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1 rounded">Project Deadline</div>}
                    {d === 22 && <div className="mt-1 text-[10px] truncate bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-1 rounded">Meeting</div>}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

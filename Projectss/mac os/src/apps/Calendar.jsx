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

import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const days = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate)
    });

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h1>
                <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded"><ChevronLeft /></button>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded"><ChevronRight /></button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-white/10 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 flex-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="bg-gray-50 dark:bg-[#252525] p-2 text-center text-xs font-bold uppercase text-gray-400">
                        {d}
                    </div>
                ))}
                
                {days.map((day, i) => (
                    <div key={day.toString()} className={`bg-white dark:bg-[#1e1e1e] p-2 min-h-[80px] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative group ${!isSameMonth(day, currentDate) ? 'opacity-30' : ''}`}>
                         <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday(day) ? 'bg-red-500 text-white' : ''}`}>
                            {format(day, 'd')}
                         </span>
                         {/* Fake Events */}
                         {Math.random() > 0.8 && (
                             <div className="mt-1 text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-1 py-0.5 rounded truncate">
                                 Meeting
                             </div>
                         )}
                    </div>
                ))}
            </div>
        </div>
    );
};

import { useState } from 'react'; // Fix missing import
export default Calendar;

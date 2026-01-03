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

const CalendarApp: React.FC = () => {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const startDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: startDay }, (_, i) => i);

    return (
        <div className="h-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-red-500">{today.toLocaleDateString('en-US', { month: 'long' })}</h2>
                    <p className="text-xl opacity-60">{today.getFullYear()}</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 dark:bg-white/10 rounded-lg">Today</button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-white/10 border-b border-gray-200 dark:border-white/10 text-center py-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="bg-white dark:bg-slate-900">{d}</div>)}
            </div>

            <div className="flex-1 grid grid-cols-7 gap-px bg-gray-200 dark:bg-white/10">
                {blanks.map(b => (
                    <div key={`blank-${b}`} className="bg-white dark:bg-slate-900 min-h-[80px]" />
                ))}
                {days.map(d => {
                    const isToday = d === today.getDate();
                    return (
                        <div key={d} className={`bg-white dark:bg-slate-900 p-2 min-h-[80px] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group relative cursor-pointer`}>
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${isToday ? 'bg-red-500 text-white shadow-lg' : ''}`}>
                                {d}
                            </span>
                            {/* Mock Event */}
                            {d === 15 && (
                                <div className="mt-2 text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 px-1 py-0.5 rounded truncate">
                                    Project Launch
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarApp;
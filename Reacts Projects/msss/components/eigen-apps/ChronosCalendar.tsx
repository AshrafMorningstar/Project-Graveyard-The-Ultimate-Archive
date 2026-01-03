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

'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ChronosCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] flex flex-col text-gray-800 dark:text-white">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-bold">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-neuro-purple/20 text-neuro-purple rounded-md text-sm font-medium">Day</button>
                    <button className="px-3 py-1 bg-neuro-purple/20 text-neuro-purple rounded-md text-sm font-medium">Week</button>
                    <button className="px-3 py-1 bg-neuro-purple text-white rounded-md text-sm font-medium">Month</button>
                    <button className="p-1 bg-quantum-glow text-black rounded-full shadow-lg hover:scale-105 transition-transform">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 border-b border-gray-200 dark:border-white/10">
                {DAYS.map(day => (
                    <div key={day} className="py-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-7 grid-rows-6">
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="border-b border-r border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02]" />
                ))}
                
                {Array.from({ length: days }).map((_, i) => {
                    const day = i + 1;
                    const isToday = day === new Date().getDate() && 
                                  currentDate.getMonth() === new Date().getMonth();
                    
                    return (
                        <div key={day} className="border-b border-r border-gray-200 dark:border-white/5 p-2 relative group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <span className={`
                                w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium
                                ${isToday ? 'bg-red-500 text-white shadow-md' : 'text-gray-700 dark:text-gray-300'}
                            `}>
                                {day}
                            </span>
                            
                            {/* Mock Event */}
                            {day === 15 && (
                                <div className="mt-2 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 p-1 rounded truncate border-l-2 border-blue-500">
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

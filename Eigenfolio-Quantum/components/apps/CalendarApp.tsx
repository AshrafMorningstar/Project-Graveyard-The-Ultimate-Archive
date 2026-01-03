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
 * @file CalendarApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Calendar Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarApp: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const today = new Date();
  const isToday = (day: number) => {
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(currentDate);
    const startDay = startDayOfMonth(currentDate);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5"></div>);
    }

    // Days of the month
    for (let i = 1; i <= totalDays; i++) {
        days.push(
            <div key={i} className={`h-24 border border-gray-100 dark:border-white/5 p-2 relative group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${isToday(i) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday(i) ? 'bg-red-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300'}`}>
                    {i}
                </span>
                {/* Simulated Event Dots */}
                {Math.random() > 0.8 && (
                    <div className="absolute bottom-2 left-2 right-2 space-y-1">
                        <div className="text-[10px] truncate bg-neuro-purple/20 text-neuro-purple dark:text-neuro-cyan px-1 rounded">Meeting</div>
                    </div>
                )}
            </div>
        );
    }

    return days;
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10">
        <h2 className="text-xl font-bold font-space-grotesk">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded"><ChevronLeft /></button>
            <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-sm bg-gray-100 dark:bg-white/10 rounded hover:bg-gray-200 dark:hover:bg-white/20">Today</button>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded"><ChevronRight /></button>
            <button className="ml-4 p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded"><Plus /></button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-white/10">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {day}
            </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-7 auto-rows-fr">
            {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;

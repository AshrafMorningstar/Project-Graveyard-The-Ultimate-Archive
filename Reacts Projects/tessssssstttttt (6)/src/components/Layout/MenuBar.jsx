/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';

const MenuBar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="h-11 bg-black/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-4 text-sm text-gray-100 font-medium select-none z-50 fixed top-0 w-full">
            <div className="flex items-center gap-4">
                <span className="text-lg hover:opacity-80 cursor-pointer">🍎</span>
                <span className="font-bold">Ashraf Morningstar</span>
                <div className="hidden sm:flex gap-4 font-normal text-gray-300">
                    <span className="hover:text-white cursor-pointer transition-colors">File</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
                    <span className="hover:text-white cursor-pointer transition-colors">View</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Go</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Window</span>
                    <span className="hover:text-white cursor-pointer transition-colors">Help</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 text-lg">
                    <span>🔋</span>
                    <span>📶</span>
                    <span>🔊</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block">{formatDate(time)}</span>
                    <span className="font-semibold w-11 text-center">{formatTime(time)}</span>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;

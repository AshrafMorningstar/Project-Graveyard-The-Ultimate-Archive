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

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Wifi, Battery, Search, Command } from 'lucide-react'; // Simulating SF Symbols

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md text-white flex justify-between items-center px-4 text-sm z-50 select-none">
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg"></span>
        <span className="font-medium hidden sm:inline">Finder</span>
        <span className="hidden sm:inline">File</span>
        <span className="hidden sm:inline">Edit</span>
        <span className="hidden sm:inline">View</span>
        <span className="hidden sm:inline">Go</span>
        <span className="hidden sm:inline">Window</span>
        <span className="hidden sm:inline">Help</span>
      </div>

      <div className="flex items-center gap-4">
        <Battery size={18} className="rotate-90" />
        <Wifi size={16} />
        <Search size={16} />
        <span className="hidden sm:inline"><Command size={16} /></span>
        <span className="font-medium">{format(time, 'EEE MMM d h:mm aa')}</span>
      </div>
    </div>
  );
};

export default TopBar;

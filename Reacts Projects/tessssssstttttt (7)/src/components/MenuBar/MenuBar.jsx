/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// File: MenuBar.jsx
// Developed by Ashraf
// GitHub: https://github.com/AshrafMorningstar
// Created on: 2025-12-14

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Wifi, Battery, Command, Search } from 'lucide-react';
import { useWindowStore } from '../../stores/useWindowStore';

const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const { activeWindowId, windows } = useWindowStore();
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const activeAppTitle = activeWindowId && windows[activeWindowId] 
    ? windows[activeWindowId].title 
    : 'Finder';

  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-white/30 backdrop-blur-md z-[1000] flex items-center justify-between px-4 text-sm font-medium text-gray-800 shadow-sm select-none">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <div className="font-bold flex items-center space-x-1 hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors">
          <Command size={14} />
          <span>Ashraf</span>
        </div>
        
        <div className="font-semibold hidden sm:block">
           {activeAppTitle}
        </div>

        <div className="hidden sm:flex space-x-3 text-gray-700/90 text-xs">
          <span className="cursor-default hover:text-black">File</span>
          <span className="cursor-default hover:text-black">Edit</span>
          <span className="cursor-default hover:text-black">View</span>
          <span className="cursor-default hover:text-black">Go</span>
          <span className="cursor-default hover:text-black">Window</span>
          <span className="cursor-default hover:text-black">Help</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
         <div className="hover:bg-white/20 p-1 rounded cursor-pointer">
            <Battery size={16} className="text-gray-800" />
            {/* Could simulate battery level if we wanted to be fancy */}
         </div>
         <div className="hover:bg-white/20 p-1 rounded cursor-pointer">
            <Wifi size={16} className="text-gray-800" />
         </div>
         <div className="hover:bg-white/20 p-1 rounded cursor-pointer">
            <Search size={14} className="text-gray-800" />
         </div>
         <div className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer min-w-[60px] text-center">
            {format(time, 'EEE MMM d h:mm aa')}
         </div>
      </div>
    </div>
  );
};

export default MenuBar;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { FaApple, FaWifi, FaBatteryFull, FaSearch } from 'react-icons/fa';
import { IoIosSwitch } from 'react-icons/io'; // Placeholder for Control Center
import { useThemeStore } from '../../store/themeStore';

const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className={`w-full h-8 px-4 flex items-center justify-between z-50 text-xs font-medium select-none
        ${isDarkMode ? 'bg-black/40 text-white' : 'bg-white/40 text-black'} backdrop-blur-md transition-colors duration-300`}>
        
      <div className="flex items-center space-x-4">
        <div className="text-sm cursor-pointer hover:bg-white/20 p-1 rounded transition-colors">
            <FaApple />
        </div>
        <div className="hidden sm:flex items-center space-x-4 font-bold">
            <span className="cursor-default">Finder</span>
            <span className="font-normal cursor-pointer hover:bg-white/20 px-2 rounded">File</span>
            <span className="font-normal cursor-pointer hover:bg-white/20 px-2 rounded">Edit</span>
            <span className="font-normal cursor-pointer hover:bg-white/20 px-2 rounded">View</span>
            <span className="font-normal cursor-pointer hover:bg-white/20 px-2 rounded">Go</span>
            <span className="font-normal cursor-pointer hover:bg-white/20 px-2 rounded">Window</span>
            <span className="font-normal cursor-pointer hover:bg-white/20 px-2 rounded">Help</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Right Status Items */}
        <div className="hidden sm:block cursor-pointer hover:bg-white/20 p-1 rounded">
             <FaWifi />
        </div>
        <div className="hidden sm:block cursor-pointer hover:bg-white/20 p-1 rounded">
             <FaBatteryFull />
        </div>
        <div className="cursor-pointer hover:bg-white/20 p-1 rounded" onClick={toggleTheme} title="Toggle Dark Mode">
             <IoIosSwitch className={isDarkMode ? 'text-white' : 'text-gray-800'} />
        </div>
        <div className="cursor-pointer hover:bg-white/20 p-1 rounded">
             <FaSearch />
        </div>
        
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-white/20 px-2 py-0.5 rounded">
            <span>{formatDate(time)}</span>
            <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;

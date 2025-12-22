/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Battery } from 'lucide-react';

const MenuBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
  };

  const formatDate = (date) => {
      return date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
      });
  }

  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-black/20 backdrop-blur-md text-white/90 flex items-center justify-between px-4 z-50 text-xs font-medium select-none">
      <div className="flex items-center gap-4">
        <button className="hover:bg-white/10 p-1 rounded"><Apple size={16} fill="currentColor" /></button>
        <div className="flex gap-4 font-semibold">
           <span className="cursor-default hover:text-white">AshrafMorningstar OS</span>
           <button className="hover:bg-white/10 px-2 rounded">File</button>
           <button className="hover:bg-white/10 px-2 rounded">Edit</button>
           <button className="hover:bg-white/10 px-2 rounded">View</button>
           <button className="hover:bg-white/10 px-2 rounded">Go</button>
           <button className="hover:bg-white/10 px-2 rounded">Window</button>
           <button className="hover:bg-white/10 px-2 rounded">Help</button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
            <Battery size={16} />
            <Wifi size={16} />
        </div>
        <div>
            {formatDate(time)} &nbsp; {formatTime(time)}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search, Command } from 'lucide-react';
import { format } from 'date-fns';
import ControlCenter from './ControlCenter';
import useStore from '../store/useStore';

const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const [showControlCenter, setShowControlCenter] = useState(false);
  const { theme } = useStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md text-white flex items-center justify-between px-4 z-50 text-sm shadow-sm border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="hover:bg-white/20 p-1 rounded cursor-default">
           <svg viewBox="0 0 170 170" width="16" height="16" fill="white">
             <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.93 7.03-10.32 13.51-16.18 19.46a4.8 4.8 0 0 1-.95.83c-1.38.99-3.09 1.51-4.8 1.48-5.37-.11-7.25-3.37-12.75-3.37-5.7 0-7.85 3.37-13.3 3.37-1.56-.03-3.11-.47-4.47-1.28a5.2 5.2 0 0 1-1.57-1.32c-6.14-6.41-11.83-13.23-16.92-20.67-10.46-15.34-16.14-33.39-16.14-51.52 0-36.98 23.95-56.33 46.7-56.33 6.36.08 12.64 2.13 18.08 5.92 3.65 2.51 6.64 3.73 9.4 3.73 2.15 0 5.4-1.37 9.38-4.04 5.95-3.9 12.91-5.83 20-5.55 2.53.05 5.04.41 7.47 1.07 3.37.93 6.55 2.45 9.4 4.5 2.22 1.6 4.19 3.53 5.86 5.75-26.65 14.77-22.34 50.48 4.7 61.16-.14.41-.27.83-.41 1.25zM113.84 0c4.1 5.3 6.09 11.96 5.56 18.6-6.49.53-12.87-1.57-17.22-6.07-4.06-4.52-6.17-10.97-5.82-17.47 6.83-.82 13.52 1.25 17.48 4.94z"/>
           </svg>
        </div>
        <div className="font-bold cursor-default hover:bg-white/20 px-2 rounded">Finder</div>
        <div className="cursor-default hover:bg-white/20 px-2 rounded hidden sm:block">File</div>
        <div className="cursor-default hover:bg-white/20 px-2 rounded hidden sm:block">Edit</div>
        <div className="cursor-default hover:bg-white/20 px-2 rounded hidden sm:block">View</div>
        <div className="cursor-default hover:bg-white/20 px-2 rounded hidden sm:block">Go</div>
        <div className="cursor-default hover:bg-white/20 px-2 rounded hidden sm:block">Window</div>
        <div className="cursor-default hover:bg-white/20 px-2 rounded hidden sm:block">Help</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hover:bg-white/20 p-1 rounded cursor-pointer hidden sm:block">
            <Battery size={18} />
        </div>
        <div className="hover:bg-white/20 p-1 rounded cursor-pointer hidden sm:block">
            <Wifi size={18} />
        </div>
        <div className="hover:bg-white/20 p-1 rounded cursor-pointer">
            <Search size={18} />
        </div>
        <div 
           className="hover:bg-white/20 p-1 rounded cursor-pointer"
           onClick={() => setShowControlCenter(!showControlCenter)}
        >
             <div className="flex gap-1 items-center">
                <Command size={16} />
                <span className="hidden sm:inline">CC</span>
             </div>
        </div>
        <div className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer">
           <div className="text-xs text-right hidden sm:block">
              {format(time, 'EEE d MMM')}
           </div>
           <div className="text-sm font-medium w-14 text-center">
              {format(time, 'HH:mm')}
           </div>
        </div>
      </div>
    </div>
    
    {showControlCenter && (
       <>
         <div className="fixed inset-0 z-[55] bg-transparent" onClick={() => setShowControlCenter(false)} />
         <ControlCenter onClose={() => setShowControlCenter(false)} />
       </>
    )}
    </>
  );
};

export default MenuBar;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { activeAppId, windows } = useStore();
  
  const activeAppTitle = activeAppId ? windows[activeAppId]?.id.charAt(0).toUpperCase() + windows[activeAppId]?.id.slice(1) : 'Finder';

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-os-dock backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 z-50 text-xs md:text-sm text-white select-none">
      <div className="flex items-center gap-4">
        <button className="font-bold text-lg hover:text-os-accent transition-colors"></button>
        <span className="font-bold hidden md:block">{activeAppTitle}</span>
        <div className="hidden md:flex gap-4 text-white/80">
          <span className="hover:text-white cursor-default">File</span>
          <span className="hover:text-white cursor-default">Edit</span>
          <span className="hover:text-white cursor-default">View</span>
          <span className="hover:text-white cursor-default">Window</span>
          <span className="hover:text-white cursor-default">Help</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-white/80">
           <span className="hidden md:block hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">Ashraf Morningstar</span>
           <span className="hover:text-white cursor-default">{formatDate(time)}</span>
           <span className="hover:text-white cursor-default">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;

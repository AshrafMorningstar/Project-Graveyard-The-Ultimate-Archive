/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search, Command, Bell, Volume2, VolumeX, Menu } from 'lucide-react';
import { useStore } from '../store';
import { Theme } from '../types';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const activeWindowId = useStore((state) => state.activeWindowId);
  const theme = useStore((state) => state.theme);
  const soundEnabled = useStore((state) => state.soundEnabled);
  const toggleSound = useStore((state) => state.toggleSound);
  const notifications = useStore((state) => state.notifications);
  const toggleNotificationCenter = useStore((state) => state.toggleNotificationCenter);
  const openWindow = useStore((state) => state.openWindow);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="h-8 w-full glass fixed top-0 left-0 z-50 flex items-center justify-between px-2 sm:px-4 text-xs font-medium text-white/90 select-none">
      <div className="flex items-center gap-2 sm:gap-4">
        <div 
          onClick={() => openWindow('about')}
          className="flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors"
        >
          <Command size={14} className="fill-current" />
        </div>
        <span className="font-bold cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors hidden sm:block">
          {activeWindowId ? activeWindowId.charAt(0).toUpperCase() + activeWindowId.slice(1) : 'AshrafOS'}
        </span>
        <div className="hidden md:flex items-center gap-1">
           {['File', 'Edit', 'View', 'Window'].map(item => (
             <span key={item} className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors">{item}</span>
           ))}
           <span onClick={() => openWindow('about')} className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors">Help</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div 
          onClick={toggleSound}
          className="cursor-pointer hover:bg-white/10 p-1 rounded transition-colors"
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} className="text-red-400" />}
        </div>

        <div 
          onClick={toggleNotificationCenter}
          className="cursor-pointer hover:bg-white/10 p-1 rounded transition-colors relative"
        >
          <Bell size={14} />
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2">
            <span className="opacity-60 text-[10px] tracking-wider uppercase">{theme}</span>
        </div>
        
        <Wifi size={14} className="hidden sm:block cursor-pointer hover:text-white" />
        <Battery size={14} className="hidden sm:block cursor-pointer hover:text-white" />
        
        <div className="flex items-center gap-2 ml-2 cursor-default min-w-[120px] justify-end">
          <span className="hidden sm:inline">{formatDate(time)}</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};
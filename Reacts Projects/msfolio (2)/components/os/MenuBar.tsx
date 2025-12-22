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
import { APP_TITLES } from '../../constants';
import { Battery, Wifi, Search, Command } from 'lucide-react';

const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { 
      activeAppId, 
      isNotificationCenterOpen, 
      toggleNotificationCenter, 
      notifications, 
      clearNotifications, 
      openApp, 
      markNotificationRead,
      toggleControlCenter,
      toggleSpotlight,
      systemState
  } = useStore();
  
  // Safe lookup for app title
  const activeAppTitle = activeAppId ? APP_TITLES[activeAppId] || 'Finder' : 'Finder';
  const unreadCount = notifications.filter(n => !n.read).length;

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

  const handleAppleClick = () => {
      openApp('about');
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-8 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 z-[9999] text-xs md:text-sm text-white select-none shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            className="font-bold text-lg hover:text-white/80 transition-colors"
            onClick={handleAppleClick}
          >
            
          </button>
          <span className="font-bold hidden md:block">{activeAppTitle}</span>
          <div className="hidden md:flex gap-4 text-white/80">
            <span className="hover:text-white cursor-default">File</span>
            <span className="hover:text-white cursor-default">Edit</span>
            <span className="hover:text-white cursor-default">View</span>
            <span className="hover:text-white cursor-default">Window</span>
            <span className="hover:text-white cursor-default" onClick={() => openApp('about')}>Help</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-white/90">
             {/* Spotlight Trigger */}
             <button onClick={toggleSpotlight} className="hover:bg-white/10 p-1 rounded transition-colors" title="Spotlight Search (Cmd+K)">
                 <Search size={14} />
             </button>

             {/* Status Icons */}
             {systemState.wifi && <Wifi size={14} className="hidden sm:block" />}
             
             {/* Battery */}
             <div className="hidden sm:flex items-center gap-1.5 opacity-90">
                 <span className="text-[10px]">{systemState.batteryLevel}%</span>
                 <Battery size={16} fill="white" fillOpacity={0.6} />
             </div>

             {/* Control Center Trigger */}
             <button 
                onClick={toggleControlCenter}
                className="hover:bg-white/10 p-1 rounded transition-colors"
             >
                 <Command size={14} />
             </button>

            {/* Notification Icon */}
            <button 
                onClick={toggleNotificationCenter}
                className="relative hover:bg-white/10 p-1 rounded transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-[8px] flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>
            
            <button 
                className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors" 
                onClick={() => openApp('calendar')}
            >
                {formatDate(time)} &nbsp; {formatTime(time)}
            </button>
          </div>
        </div>
      </div>

      {/* Notification Center Side Panel */}
      <div 
        className={`fixed top-8 right-0 h-[calc(100vh-32px)] w-80 bg-slate-900/90 backdrop-blur-xl border-l border-white/10 z-[9998] transition-transform duration-300 ease-in-out transform ${isNotificationCenterOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <h3 className="font-bold text-white">Notifications</h3>
                {notifications.length > 0 && (
                    <button onClick={clearNotifications} className="text-xs text-blue-400 hover:text-blue-300">Clear All</button>
                )}
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3">
                {notifications.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">No new notifications</div>
                ) : (
                    notifications.map(n => (
                        <div 
                            key={n.id} 
                            className={`p-3 rounded-lg border border-white/5 ${n.read ? 'bg-white/5' : 'bg-white/10 border-blue-500/30'} hover:bg-white/15 transition-colors cursor-pointer`}
                            onClick={() => {
                                markNotificationRead(n.id);
                                if (n.appId) openApp(n.appId);
                            }}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-semibold text-sm text-white">{n.title}</span>
                                <span className="text-[10px] text-gray-400">{new Date(n.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed">{n.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
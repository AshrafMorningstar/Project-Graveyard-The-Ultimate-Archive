/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef, useEffect } from 'react';
import useStore from '../store/useStore';
import { appsConfig } from '../utils/appsConfig';
import { gsap } from 'gsap';

const DockItem = ({ app, isOpen, onClick }) => {
  const iconRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, { scale: 1.5, duration: 0.2, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' });
  };

  const handleClick = () => {
    gsap.to(iconRef.current, { 
      y: -20, 
      duration: 0.2, 
      yoyo: true, 
      repeat: 1,
      onComplete: onClick 
    });
  };

  return (
    <div className="relative group flex flex-col items-center gap-1">
        {/* Tooltip */}
       <div className="absolute -top-12 bg-gray-800/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm border border-white/10">
         {app.title}
       </div>
       
       <button
         ref={iconRef}
         onClick={handleClick}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         className={`w-12 h-12 ${app.color} rounded-xl shadow-lg flex items-center justify-center text-white transition-all`}
       >
         <app.icon size={24} />
       </button>
       
       <div className={`w-1 h-1 rounded-full bg-white transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
};

const Dock = () => {
  const { openWindow, windows } = useStore();
  
  const handleAppClick = (appId) => {
    const app = appsConfig[appId];
    if (app.isExternal) {
      window.open(app.url, '_blank');
    } else {
      openWindow(appId, app);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-full overflow-x-visible">
      <div className="flex items-end gap-4 px-4 pb-2 pt-4 bg-gray-200/30 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-2xl">
         {Object.values(appsConfig).map((app) => (
             <DockItem 
               key={app.id} 
               app={app} 
               isOpen={!!windows[app.id]} 
               onClick={() => handleAppClick(app.id)} 
             />
         ))}
      </div>
    </div>
  );
};

export default Dock;

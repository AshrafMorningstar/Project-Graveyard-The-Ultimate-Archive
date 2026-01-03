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

import React, { useRef } from 'react';
import { useStore } from '../../store/useStore';
import { AppConfig, AppId } from '../../types';
import { gsap } from 'gsap';

interface DockProps {
  apps: AppConfig[];
}

const Dock: React.FC<DockProps> = ({ apps }) => {
  const { openApp, windows } = useStore();
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Simple scale effect using GSAP context could be added here for "wave" effect
    // keeping it simple with hover scale for now to ensure robustness
    gsap.to(e.currentTarget, { scale: 1.2, duration: 0.2, ease: "back.out(1.7)" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-3 px-4 py-3 rounded-2xl bg-os-dock backdrop-blur-xl border border-white/10 shadow-2xl">
        {apps.map((app) => {
          const isOpen = windows[app.id].isOpen;
          return (
            <div key={app.id} className="relative flex flex-col items-center gap-1 group">
               {/* Tooltip */}
               <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
                 {app.title}
               </div>

              <button
                onClick={() => openApp(app.id)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/5"
              >
                {app.icon.startsWith('http') ? (
                  <img src={app.icon} alt={app.title} className="w-full h-full object-contain p-1" />
                ) : (
                  <span className="text-2xl md:text-3xl">{app.icon}</span>
                )}
              </button>
              
              {/* Active Indicator */}
              <div className={`w-1 h-1 rounded-full bg-white transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef } from 'react';
import { useStore } from '../store';
import { AppConfig } from '../types';

interface DockProps {
  apps: AppConfig[];
}

export const Dock: React.FC<DockProps> = ({ apps }) => {
  const openWindow = useStore((state) => state.openWindow);
  const windows = useStore((state) => state.windows);
  const activeWindowId = useStore((state) => state.activeWindowId);

  // Mouse movement logic for scale effect could go here, 
  // but for simplicity and performance in this specific output, 
  // we'll use CSS hover transforms and a clean layout.

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="glass px-4 pb-3 pt-3 rounded-2xl flex items-end gap-3 mx-auto shadow-2xl border border-white/10 bg-black/40 backdrop-blur-2xl">
        {apps.map((app) => {
          const isOpen = windows[app.id]?.isOpen;
          const isActive = activeWindowId === app.id;

          return (
            <div key={app.id} className="group relative flex flex-col items-center gap-1">
              <button
                onClick={() => openWindow(app.id, { size: app.isFull ? {width: 1000, height: 700} : undefined })}
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:-translate-y-4 hover:mx-2 focus:outline-none"
              >
                 {/* Icon Background Glow */}
                 <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <app.icon 
                    size={28} 
                    className={`relative z-10 text-gray-200 transition-colors duration-300 ${isActive ? 'text-blue-400' : 'group-hover:text-white'}`} 
                    strokeWidth={1.5}
                 />
              </button>
              
              {/* Dot indicator for open apps */}
              <div className={`w-1 h-1 rounded-full bg-white transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-xl">
                {app.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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

import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { AppConfig } from '../../types';
import { useSpring, animated } from '@react-spring/web';
import { soundService } from '../../utils/sound';

interface DockProps {
  apps: AppConfig[];
}

const Dock: React.FC<DockProps> = ({ apps }) => {
  const { openApp, windows } = useStore();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Entrance animation
  const dockSpring = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: { tension: 120, friction: 14 }
  });

  const handleClick = (id: string) => {
      // @ts-ignore
      openApp(id);
      soundService.playClick();
  }

  return (
    <animated.div 
        style={dockSpring}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9990] perspective-[1000px]"
    >
      <div className="relative group">
        {/* Holographic Container */}
        <div className="absolute inset-0 bg-chronos-dark/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(58,12,163,0.4)] transform skew-x-1 transition-all duration-300"></div>

        <div className="relative flex items-end gap-3 px-6 py-4">
          {apps.map((app) => {
            const isOpen = windows[app.id].isOpen;
            const isHovered = hoveredApp === app.id;
            
            return (
              <div 
                key={app.id} 
                className="relative flex flex-col items-center gap-2 group/icon"
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                 {/* Tooltip */}
                 {isHovered && (
                     <div className="absolute -top-12 animate-in fade-in slide-in-from-bottom-2 bg-chronos-blue/90 text-neuro-cyan text-xs font-display px-3 py-1 rounded border border-neuro-purple/30 shadow-lg whitespace-nowrap backdrop-blur-md">
                        {app.title}
                     </div>
                 )}

                <button
                  onClick={() => handleClick(app.id)}
                  className={`
                    w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center 
                    transition-all duration-300 ease-out transform
                    ${isHovered ? 'scale-125 -translate-y-4 bg-white/20 shadow-[0_0_20px_rgba(0,245,255,0.5)]' : 'bg-white/5 hover:bg-white/10'}
                    border border-white/5 relative overflow-hidden
                  `}
                >
                    {/* Inner Glow */}
                    {isHovered && <div className="absolute inset-0 bg-gradient-to-tr from-neuro-purple/40 to-quantum-cyan/40" />}
                    
                    <img 
                        src={app.icon} 
                        alt={app.title} 
                        className={`w-full h-full object-contain p-2 relative z-10 transition-transform ${isHovered ? 'scale-110' : ''}`} 
                    />
                </button>
                
                {/* Active Indicator (Quantum Dot) */}
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isOpen ? 'bg-quantum-glow shadow-[0_0_8px_#4CC9F0]' : 'bg-transparent'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </animated.div>
  );
};

export default Dock;
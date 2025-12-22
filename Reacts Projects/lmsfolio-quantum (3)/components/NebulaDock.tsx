/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import gsap from 'gsap';
import { useSpring, animated } from '@react-spring/web';
import { useSystemStore } from '../store';
import { AppID } from '../types';
import { 
  Terminal, Folder, Code2, Brain, Gamepad2, User, Settings, Activity, StickyNote, Radio, Calendar, PenTool, Globe, Calculator, FileText, Rocket
} from 'lucide-react';

export const NebulaDock: React.FC = () => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const { openWindow, windows, minimizeWindow, focusWindow } = useSystemStore();
  
  const dockSpring = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: { tension: 300, friction: 20 }
  });

  const DOCK_APPS: { id: AppID, name: string, icon: any, color: string }[] = [
    { id: 'profile', name: 'Profile', icon: User, color: 'text-quantum-glow' },
    { id: 'projects', name: 'Nebula', icon: Rocket, color: 'text-neuro-pink' },
    { id: 'explorer', name: 'Files', icon: Folder, color: 'text-yellow-400' },
    { id: 'browser', name: 'Web', icon: Globe, color: 'text-blue-400' },
    { id: 'ai-lab', name: 'Neuro AI', icon: Brain, color: 'text-neuro-pink' },
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-neuro-cyan' },
    { id: 'editor', name: 'Edit', icon: FileText, color: 'text-gray-300' },
    { id: 'calculator', name: 'Calc', icon: Calculator, color: 'text-orange-400' },
    { id: 'draw', name: 'Shaper', icon: PenTool, color: 'text-purple-400' },
    { id: 'games', name: 'Games', icon: Gamepad2, color: 'text-quantum-matter' },
    { id: 'settings', name: 'Prefs', icon: Settings, color: 'text-gray-400' },
  ];
  
  const handleAppHover = (appId: string) => {
    setHoveredApp(appId);
    DOCK_APPS.forEach(app => {
      const element = document.getElementById(`dock-icon-${app.id}`);
      if (element && app.id !== appId) {
        gsap.to(element, { scale: 0.9, opacity: 0.7, duration: 0.3 });
      }
    });
    const hoveredElement = document.getElementById(`dock-icon-${appId}`);
    if (hoveredElement) {
      gsap.to(hoveredElement, { scale: 1.3, y: -15, duration: 0.3, ease: 'back.out(1.7)' });
    }
  };
  
  const handleAppLeave = () => {
    setHoveredApp(null);
    DOCK_APPS.forEach(app => {
      const element = document.getElementById(`dock-icon-${app.id}`);
      if (element) {
        gsap.to(element, { scale: 1, y: 0, opacity: 1, duration: 0.3 });
      }
    });
  };
  
  const handleAppClick = (appId: AppID) => {
    const isOpen = windows.find(w => w.appId === appId);
    if (isOpen) {
        if (isOpen.isMinimized) focusWindow(isOpen.id);
        else if (windows[windows.length-1].id === isOpen.id) minimizeWindow(isOpen.id); // Toggle min/focus
        else focusWindow(isOpen.id);
    } else {
        openWindow(appId);
    }
  };
  
  return (
    <animated.div
      id="nebula-dock"
      style={dockSpring}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[98vw]"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-glass-primary backdrop-blur-xl rounded-2xl border border-white/20 shadow-quantum transform" />
        <div className="relative flex items-center justify-between px-3 py-3 gap-2 md:gap-3 md:px-6">
          {DOCK_APPS.map((app) => {
            const Icon = app.icon;
            const isOpen = windows.some(w => w.appId === app.id);
            const isHovered = hoveredApp === app.id;
            
            return (
              <div
                key={app.id}
                className="relative flex flex-col items-center group"
                onMouseEnter={() => handleAppHover(app.id)}
                onMouseLeave={handleAppLeave}
                onClick={() => handleAppClick(app.id)}
              >
                <div
                  id={`dock-icon-${app.id}`}
                  className={`
                    relative p-2 md:p-3 rounded-xl cursor-pointer 
                    transition-all duration-300 ease-in-out
                    bg-transparent
                    border border-transparent
                  `}
                >
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${app.color} dark:text-white text-gray-800 transition-colors duration-300`} />
                  {isOpen && <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-quantum-glow rounded-full shadow-[0_0_5px_currentColor]" />}
                </div>
                
                {isHovered && (
                  <div className="absolute -top-14 bg-chronos-dark/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neuro-purple/30 z-50 shadow-xl animate-slide-up-fade">
                    <span className="text-xs font-space text-neuro-cyan whitespace-nowrap">{app.name}</span>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-chronos-dark/90 rotate-45 border-r border-b border-neuro-purple/30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </animated.div>
  );
};

export default NebulaDock;
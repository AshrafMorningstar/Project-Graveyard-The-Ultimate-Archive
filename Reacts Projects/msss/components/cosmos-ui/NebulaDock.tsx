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

'use client';

import React, { useState } from 'react';
import { useDockStore } from '@/stores/cosmos/dock-store';
import { useSystemStore } from '@/stores/system/system-store';
import { useSpring, animated } from '@react-spring/web';
import { 
  Terminal, Folder, Brain, Gamepad2, User, Cuboid, Music, Activity, 
  Calculator, Globe, Image as ImageIcon, Calendar, CloudSun, CheckSquare, 
  Code2, FileText, Grid, Mail, Newspaper, Mic, ShoppingBag, Bitcoin,
  Camera, Map, Timer, Hash, Edit3, Scale
} from 'lucide-react';
import gsap from 'gsap';

// Main dock apps (pinned)
const DOCK_APPS = [
  { id: 'launchpad', name: 'Launchpad', icon: Grid, color: 'text-white' },
  { id: 'profile', name: 'Profile', icon: User, color: 'text-quantum-glow' },
  { id: 'mail', name: 'Mail', icon: Mail, color: 'text-sky-500' },
  { id: 'browser', name: 'Browser', icon: Globe, color: 'text-cyan-400' },
  { id: 'camera', name: 'Camera', icon: Camera, color: 'text-gray-200' },
  { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-neuro-cyan' },
  { id: 'code', name: 'Code', icon: Code2, color: 'text-blue-500' },
  { id: 'store', name: 'App Store', icon: ShoppingBag, color: 'text-blue-600' },
  { id: 'files', name: 'Files', icon: FileText, color: 'text-indigo-400' },
];

export const NebulaDock: React.FC = () => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const { activeApp, setActiveApp } = useDockStore();
  const { toggleLaunchpad } = useSystemStore();
  
  const dockSpring = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: { tension: 300, friction: 20 }
  });
  
  const handleAppHover = (appId: string) => {
    setHoveredApp(appId);
    
    // Animate other icons
    DOCK_APPS.forEach(app => {
      const element = document.getElementById(`dock-icon-${app.id}`);
      if (element && app.id !== appId) {
        gsap.to(element, {
          scale: 0.9,
          opacity: 0.8,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    });
    
    // Animate hovered icon
    const hoveredElement = document.getElementById(`dock-icon-${appId}`);
    if (hoveredElement) {
      gsap.to(hoveredElement, {
        scale: 1.5,
        y: -15,
        duration: 0.25,
        ease: 'back.out(2)'
      });
    }
  };
  
  const handleAppLeave = () => {
    setHoveredApp(null);
    
    // Reset all icons
    DOCK_APPS.forEach(app => {
      const element = document.getElementById(`dock-icon-${app.id}`);
      if (element) {
        gsap.to(element, {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    });
  };
  
  const handleAppClick = (appId: string) => {
    if (appId === 'launchpad') {
        toggleLaunchpad();
    } else {
        setActiveApp(appId === activeApp ? null : appId);
    }
    
    // Bounce effect on click
    const element = document.getElementById(`dock-icon-${appId}`);
    if (element) {
        gsap.to(element, {
            y: -30,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
        });
    }
  };
  
  return (
    <animated.div
      id="nebula-dock"
      style={dockSpring}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="relative group">
        {/* Dock Background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl 
          rounded-2xl border border-white/10 shadow-2xl transition-all duration-300
          group-hover:bg-black/70 group-hover:border-white/20" />
        
        {/* Dock Icons - Scrollable if too many */}
        <div className="relative flex items-end justify-center gap-1 md:gap-3 px-3 md:px-5 py-4 h-24 overflow-x-auto no-scrollbar max-w-[98vw]">
          {DOCK_APPS.map((app) => {
            const Icon = app.icon;
            const isActive = activeApp === app.id;
            const isHovered = hoveredApp === app.id;
            
            return (
              <div
                key={app.id}
                className="relative flex flex-col items-center justify-end h-full w-10 md:w-14 shrink-0 group/icon"
                onMouseEnter={() => handleAppHover(app.id)}
                onMouseLeave={handleAppLeave}
                onClick={() => handleAppClick(app.id)}
              >
                {/* App Name Tooltip */}
                {isHovered && (
                  <div className="absolute -top-16 bg-black/80 backdrop-blur-md 
                    px-3 py-1.5 rounded-lg border border-white/10 shadow-xl pointer-events-none z-50">
                    <span className="text-xs font-semibold text-white whitespace-nowrap">
                      {app.name}
                    </span>
                  </div>
                )}

                {/* App Icon Container */}
                <div
                  id={`dock-icon-${app.id}`}
                  className={`
                    relative p-2 md:p-3 rounded-xl cursor-pointer bg-white/5 border border-white/5
                    shadow-lg transition-colors duration-200
                    hover:bg-white/10 hover:border-white/20 hover:shadow-xl
                    ${isActive && app.id !== 'launchpad' ? 'bg-white/20 border-white/30' : ''}
                  `}
                >
                  <Icon className={`w-5 h-5 md:w-7 md:h-7 ${app.color} transition-transform`} />
                </div>
                
                {/* Active Dot Indicator */}
                <div className={`mt-2 w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-300 ${isActive && app.id !== 'launchpad' ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </animated.div>
  );
};

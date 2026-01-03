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
import gsap from 'gsap';
import { useSpring, animated } from '@react-spring/web';
import { useDockStore } from '../store';
import { 
  Terminal, 
  Folder, 
  Code2, 
  Brain, 
  Gamepad2, 
  MessageSquare,
  User,
  Sparkles,
  Cuboid
} from 'lucide-react';

export const NebulaDock: React.FC = () => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const { activeApp, setActiveApp } = useDockStore();
  
  const dockSpring = useSpring({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: { tension: 300, friction: 20 }
  });

  const DOCK_APPS = [
    { id: 'profile', name: 'Cosmic Profile', icon: User, color: 'text-quantum-glow' },
    { id: 'projects', name: 'Project Nebula', icon: Folder, color: 'text-neuro-purple' },
    { id: 'ai-lab', name: 'Neuro AI', icon: Brain, color: 'text-neuro-pink' },
    { id: 'games', name: 'Neural Games', icon: Gamepad2, color: 'text-quantum-matter' },
    { id: 'terminal', name: 'Chronos Terminal', icon: Terminal, color: 'text-neuro-cyan' },
    { id: 'code', name: 'Quantum Editor', icon: Code2, color: 'text-quantum-energy' },
  ];
  
  const handleAppHover = (appId: string) => {
    setHoveredApp(appId);
    
    // Animate other icons (scale down slightly)
    DOCK_APPS.forEach(app => {
      const element = document.getElementById(`dock-icon-${app.id}`);
      if (element && app.id !== appId) {
        gsap.to(element, {
          scale: 0.9,
          opacity: 0.7,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
    
    // Animate hovered icon
    const hoveredElement = document.getElementById(`dock-icon-${appId}`);
    if (hoveredElement) {
      gsap.to(hoveredElement, {
        scale: 1.3,
        y: -15,
        duration: 0.3,
        ease: 'back.out(1.7)'
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
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  };
  
  const handleAppClick = (appId: string) => {
    setActiveApp(appId);
    
    // Quantum ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'absolute w-20 h-20 rounded-full bg-quantum-glow/30';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    
    const dock = document.getElementById('nebula-dock');
    dock?.appendChild(ripple);
    
    gsap.to(ripple, {
      scale: 3,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => ripple.remove()
    });
  };
  
  return (
    <animated.div
      id="nebula-dock"
      style={dockSpring}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-2xl"
    >
      <div className="relative">
        {/* Dock Background with Glass Morphism */}
        <div className="absolute inset-0 bg-glass-primary backdrop-blur-xl 
          rounded-2xl border border-white/20 shadow-quantum 
          transform" />
        
        {/* Quantum Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
          from-neuro-purple/10 via-transparent to-quantum-glow/10 
          blur-xl" />
        
        {/* Dock Icons */}
        <div className="relative flex items-center justify-between px-4 py-4 md:px-8">
          {DOCK_APPS.map((app) => {
            const Icon = app.icon;
            const isActive = activeApp === app.id;
            const isHovered = hoveredApp === app.id;
            
            return (
              <div
                key={app.id}
                className="relative flex flex-col items-center group"
                onMouseEnter={() => handleAppHover(app.id)}
                onMouseLeave={handleAppLeave}
                onClick={() => handleAppClick(app.id)}
              >
                {/* App Icon */}
                <div
                  id={`dock-icon-${app.id}`}
                  className={`
                    relative p-3 md:p-4 rounded-xl cursor-pointer 
                    transition-all duration-300 ease-in-out
                    ${isActive ? 'bg-neuro-purple/20 shadow-[0_0_15px_var(--neuro-purple)]' : 'bg-transparent'}
                    border ${isActive ? 'border-neuro-purple/40' : 'border-transparent'}
                  `}
                >
                  <Icon className={`w-6 h-6 md:w-8 md:h-8 ${app.color} dark:text-white text-gray-800 dark:group-hover:text-white transition-colors duration-300`} />
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                      w-1 h-1 bg-quantum-glow rounded-full animate-pulse" />
                  )}
                </div>
                
                {/* App Name (Shown on hover) */}
                {isHovered && (
                  <div className="absolute -top-14 bg-chronos-dark/90 backdrop-blur-md 
                    px-3 py-1.5 rounded-lg border border-neuro-purple/30 z-50 shadow-xl">
                    <span className="text-xs font-space text-neuro-cyan whitespace-nowrap">
                      {app.name}
                    </span>
                    
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                      w-2 h-2 bg-chronos-dark/90 rotate-45 border-r border-b 
                      border-neuro-purple/30" />
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

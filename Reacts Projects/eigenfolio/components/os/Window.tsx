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

import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { AppConfig } from '../../types';
import { gsap } from 'gsap';
import { soundService } from '../../utils/sound';

interface WindowProps {
  app: AppConfig;
}

const Window: React.FC<WindowProps> = ({ app }) => {
  const { windows, closeApp, minimizeApp, toggleMaximizeApp, focusApp, updateWindowPosition, updateWindowSize } = useStore();
  const windowState = windows[app.id];
  const windowRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);

  // Entrance Animation: Bounce effect
  useEffect(() => {
    if (windowState.isOpen && !windowState.isMinimized && windowRef.current) {
      gsap.killTweensOf(windowRef.current);
      gsap.fromTo(windowRef.current, 
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }
      );
    }
  }, [windowState.isOpen, windowState.isMinimized]);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playClose();
    if (windowRef.current) {
      // Exit Animation
      gsap.to(windowRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => closeApp(app.id)
      });
    } else {
      closeApp(app.id);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return;
    const target = e.target as HTMLElement;
    if (target.closest('.window-controls')) return;

    setIsDragging(true);
    focusApp(app.id);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      updateWindowPosition(app.id, newX, newY);
    }
    if (isResizing) {
       e.preventDefault();
       const rect = windowRef.current?.getBoundingClientRect();
       if(rect) {
         updateWindowSize(app.id, Math.max(300, e.clientX - rect.left), Math.max(200, e.clientY - rect.top));
       }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset]);

  const Component = app.component;

  // Center About window specifically or use store position
  const isAbout = app.id === 'about';
  
  const style: React.CSSProperties = windowState.isMaximized ? {
    top: 32,
    left: 0,
    width: '100%',
    height: 'calc(100% - 32px - 80px)',
    transform: 'none',
    zIndex: windowState.zIndex,
    borderRadius: 0,
  } : {
    top: windowState.position.y,
    left: windowState.position.x,
    width: windowState.size.width,
    height: windowState.size.height,
    zIndex: isAbout ? 9999 : windowState.zIndex,
  };

  return (
    <div
      ref={windowRef}
      style={{...style, position: 'absolute'}}
      className={`flex flex-col rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl transition-shadow duration-200 ${windowState.id === useStore.getState().activeAppId ? 'shadow-white/5' : ''}`}
      onMouseDown={() => focusApp(app.id)}
    >
      {/* Title Bar */}
      <div 
        className="h-9 bg-[#1c1c1e] border-b border-black/20 flex items-center justify-between px-4 select-none cursor-default"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => toggleMaximizeApp(app.id)}
      >
        <div className="flex items-center gap-2 window-controls">
          <button 
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 flex items-center justify-center group border border-black/10"
          >
             <span className="text-[8px] font-bold text-black/50 opacity-0 group-hover:opacity-100">x</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeApp(app.id); }}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-90 flex items-center justify-center group border border-black/10"
          >
             <span className="text-[8px] font-bold text-black/50 opacity-0 group-hover:opacity-100">-</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMaximizeApp(app.id); }}
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-90 flex items-center justify-center group border border-black/10"
          >
             <span className="text-[6px] font-bold text-black/50 opacity-0 group-hover:opacity-100">{'<>'}</span>
          </button>
        </div>
        <div className="text-sm font-semibold text-gray-400 font-sans tracking-tight">{app.title}</div>
        <div className="w-14"></div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-[#1e1e1e] text-slate-100 relative">
        <Component />
      </div>
      
      {/* Resize Handle */}
      {!windowState.isMaximized && !isAbout && (
        <div 
          className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-50 hover:bg-white/5 rounded-tl-lg"
          onMouseDown={(e) => {
             e.preventDefault();
             e.stopPropagation();
             setIsResizing(true);
             focusApp(app.id);
          }}
        />
      )}
    </div>
  );
};

export default Window;

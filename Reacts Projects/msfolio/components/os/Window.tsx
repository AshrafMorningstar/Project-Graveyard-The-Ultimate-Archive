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
  const { windows, closeApp, minimizeApp, toggleMaximizeApp, focusApp, updateWindowPosition, updateWindowSize, settings } = useStore();
  const windowState = windows[app.id];
  const windowRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);

  // Theme-aware styles
  const isDark = settings.darkMode;
  const borderColor = isDark ? 'border-neuro-purple/30' : 'border-black/10';
  const bgColor = isDark ? 'bg-chronos-dark/95' : 'bg-white/95'; 
  const headerColor = isDark ? 'bg-chronos-blue/95' : 'bg-gray-100/95';
  const textColor = isDark ? 'text-slate-100' : 'text-slate-900';
  const glowShadow = isDark ? 'shadow-[0_0_50px_rgba(58,12,163,0.4)]' : 'shadow-2xl';

  // Entrance Animation - macOS style bounce
  useEffect(() => {
    if (windowState.isOpen && !windowState.isMinimized && windowRef.current) {
      // Reset state for animation
      gsap.set(windowRef.current, { scale: 0.8, opacity: 0, filter: 'blur(10px)' });
      
      // Animate
      gsap.to(windowRef.current, { 
        scale: 1, 
        opacity: 1, 
        filter: 'blur(0px)', 
        duration: 0.5, 
        ease: "elastic.out(1, 0.75)",
        clearProps: "transform,filter" // Allow dragging after animation
      });
    }
  }, [windowState.isOpen, windowState.isMinimized]);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playClose();
    if (windowRef.current) {
      // Exit Animation - Fade and shrink
      gsap.to(windowRef.current, {
        opacity: 0,
        scale: 0.9,
        filter: 'blur(5px)',
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
  const isAbout = app.id === 'about';
  
  const style: React.CSSProperties = windowState.isMaximized ? {
    top: 32,
    left: 0,
    width: '100%',
    height: 'calc(100% - 32px)',
    transform: 'none',
    zIndex: windowState.zIndex,
    borderRadius: 0,
    border: 'none',
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
      className={`flex flex-col rounded-xl overflow-hidden backdrop-blur-2xl border ${!windowState.isMaximized ? borderColor : ''} ${!windowState.isMaximized ? glowShadow : ''} transition-shadow duration-200 ${windowState.id === useStore.getState().activeAppId ? 'ring-1 ring-white/10' : ''}`}
      onMouseDown={() => focusApp(app.id)}
    >
      {/* Window Header */}
      <div 
        className={`h-10 ${headerColor} border-b ${borderColor} flex items-center justify-between px-4 select-none cursor-default`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => toggleMaximizeApp(app.id)}
      >
        <div className="flex items-center gap-2 window-controls group">
          <button onClick={handleClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center border border-black/10 transition-transform active:scale-90 shadow-sm">
             <span className="text-[8px] font-bold text-black/50 opacity-0 group-hover:opacity-100">x</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); minimizeApp(app.id); }} className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center border border-black/10 transition-transform active:scale-90 shadow-sm">
             <span className="text-[8px] font-bold text-black/50 opacity-0 group-hover:opacity-100">-</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleMaximizeApp(app.id); }} className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 flex items-center justify-center border border-black/10 transition-transform active:scale-90 shadow-sm">
             <span className="text-[6px] font-bold text-black/50 opacity-0 group-hover:opacity-100">{'<>'}</span>
          </button>
        </div>
        <div className={`text-sm font-display font-medium tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-600'} flex items-center gap-2`}>
            {app.title}
        </div>
        <div className="w-14"></div>
      </div>

      {/* Window Content */}
      <div className={`flex-1 overflow-auto ${bgColor} ${textColor} relative`}>
        <Component />
      </div>
      
      {/* Resize Handle */}
      {!windowState.isMaximized && !isAbout && (
        <div 
          className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize z-50 hover:bg-white/10 rounded-tl-lg"
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
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

interface WindowProps {
  app: AppConfig;
}

const Window: React.FC<WindowProps> = ({ app }) => {
  const { windows, closeApp, minimizeApp, toggleMaximizeApp, focusApp, updateWindowPosition, updateWindowSize } = useStore();
  const windowState = windows[app.id];
  const windowRef = useRef<HTMLDivElement>(null);
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Resizing state
  const [isResizing, setIsResizing] = useState(false);

  // GSAP Entrance Animation
  useEffect(() => {
    if (windowState.isOpen && !windowState.isMinimized && windowRef.current) {
      gsap.fromTo(windowRef.current, 
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [windowState.isOpen, windowState.isMinimized]);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  // Handlers for Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return;
    // Only allow drag from header
    const target = e.target as HTMLElement;
    if (target.closest('.window-controls')) return; // Don't drag if clicking buttons

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
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      updateWindowPosition(app.id, newX, newY);
    }
    if (isResizing) {
       const rect = windowRef.current?.getBoundingClientRect();
       if(rect) {
         updateWindowSize(app.id, e.clientX - rect.left, e.clientY - rect.top);
       }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Global mouse listeners
  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset]);

  const Component = app.component;

  // Styles based on state
  const style: React.CSSProperties = windowState.isMaximized ? {
    top: 32, // Menu bar height
    left: 0,
    width: '100%',
    height: 'calc(100% - 32px - 80px)', // Minus menu bar and dock
    transform: 'none',
    zIndex: windowState.zIndex,
  } : {
    top: windowState.position.y,
    left: windowState.position.x,
    width: windowState.size.width,
    height: windowState.size.height,
    zIndex: windowState.zIndex,
  };

  return (
    <div
      ref={windowRef}
      style={{...style, position: 'absolute'}}
      className="flex flex-col rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl transition-shadow duration-200"
      onMouseDown={() => focusApp(app.id)}
    >
      {/* Title Bar */}
      <div 
        className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 select-none cursor-default"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 window-controls">
          <button 
            onClick={(e) => { e.stopPropagation(); closeApp(app.id); }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
          >
             <span className="text-[8px] font-bold text-red-900 opacity-0 group-hover:opacity-100">x</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeApp(app.id); }}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
          >
             <span className="text-[8px] font-bold text-yellow-900 opacity-0 group-hover:opacity-100">-</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMaximizeApp(app.id); }}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
          >
             <span className="text-[6px] font-bold text-green-900 opacity-0 group-hover:opacity-100">{'<>'}</span>
          </button>
        </div>
        <div className="text-sm font-medium text-slate-200 font-display tracking-wide">{app.title}</div>
        <div className="w-14"></div> {/* Spacer for centering */}
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-os-window/90 text-os-text relative">
        <Component />
      </div>
      
      {/* Resize Handle */}
      {!windowState.isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 hover:bg-white/10"
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

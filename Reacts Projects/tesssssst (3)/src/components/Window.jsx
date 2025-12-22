/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useEffect, useRef } from 'react'; // draggable implementation
import { X, Minus, Maximize2 } from 'lucide-react';
import useStore from '../store/useStore';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const Window = ({ windowState }) => {
  const { closeWindow, minimizeWindow, focusWindow, toggleMaximize } = useStore();
  const windowRef = useRef(null);
  
  const { id, title, component: Component, zIndex, isMinimized, isMaximized, position, size } = windowState;

  useEffect(() => {
    // Initial Render Animation
    gsap.fromTo(windowRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.2)' }
    );
  }, []);

  useEffect(() => {
    if (windowRef.current && !isMaximized) {
      // Initialize Draggable
      const tracker = Draggable.create(windowRef.current, {
        type: "x,y",
        trigger: ".window-title-bar",
        bounds: "#desktop-container",
        edgeResistance: 0.5,
        zIndexBoost: false, // We handle Z-Index manually
        onPress: () => focusWindow(id),
      });

      return () => {
        tracker[0].kill();
      };
    }
  }, [id, focusWindow, isMaximized]); // Re-init if maximized state changes

  useEffect(() => {
      // Minimize Animation
      if (isMinimized) {
        gsap.to(windowRef.current, { 
            scale: 0, 
            y: 300, 
            x: 0, // Should animate towards dock position ideally
            opacity: 0, 
            duration: 0.4, 
            onComplete: () => {
                if (windowRef.current) windowRef.current.style.visibility = 'hidden';
            }
        });
      } else {
        if (windowRef.current) windowRef.current.style.visibility = 'visible';
        gsap.to(windowRef.current, { 
            scale: isMaximized ? 1 : 1, 
            y: 0, 
            x: 0, // Reset logic would be needed for precise restore
            opacity: 1, 
            duration: 0.4 
        });
      }
  }, [isMinimized, isMaximized]);

  // Handle Maximize Style
  const style = isMaximized 
    ? { top: 32, left: 0, width: '100%', height: 'calc(100% - 32px)', transform: 'none' } 
    : { top: position.y, left: position.x, width: size.width, height: size.height };

  return (
    <div 
        ref={windowRef}
        className="absolute bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden flex flex-col"
        style={{ 
            ...style, 
            zIndex,
            display: isMinimized && !windowRef.current?.style?.opacity ? 'none' : 'flex' // Prevent interaction when hidden
        }}
        onMouseDown={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div className="window-title-bar h-10 bg-gray-800 flex items-center px-4 border-b border-gray-700 select-none cursor-default">
        <div className="flex gap-2 group">
          <button onClick={() => closeWindow(id)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-black/50 hover:text-black">
              <X size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={() => minimizeWindow(id)} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-black/50 hover:text-black">
              <Minus size={8} className="opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={() => toggleMaximize(id)} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-black/50 hover:text-black">
              <Maximize2 size={6} className="opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="flex-1 text-center text-sm font-medium text-gray-400">
            {title}
        </div>
        <div className="w-16"></div> {/* Spacer for alignment */}
      </div>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden bg-white">
        {Component && <Component />}
      </div>
    </div>
  );
};

export default Window;

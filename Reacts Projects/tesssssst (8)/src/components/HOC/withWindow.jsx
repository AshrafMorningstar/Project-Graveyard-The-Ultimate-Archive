/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// File: withWindow.jsx
// Developed by Ashraf
// GitHub: https://github.com/AshrafMorningstar
// Created on: 2025-12-14

import React, { useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore } from '../../stores/useWindowStore';
import { X, Minus, Square, Maximize2 } from 'lucide-react'; // Fallback if no specific icons, but standard mac dots are better

const withWindow = (WrappedComponent, appId, defaultTitle) => {
  return function WindowComponent(props) {
    const { 
      windows, 
      focusWindow, 
      closeWindow, 
      minimizeWindow, 
      maximizeWindow, 
      updateWindowPosition, 
      updateWindowSize 
    } = useWindowStore();

    const windowState = windows[appId];

    // If window is not open, don't render (though usually parent controls this)
    if (!windowState || !windowState.isOpen) return null;

    const { position, size, zIndex, isMinimized, isMaximized, title } = windowState;

    if (isMinimized) return null; // Or render nothing, drag effect handled by Dock?

    const handleDragStop = (e, d) => {
      updateWindowPosition(appId, { x: d.x, y: d.y });
    };

    const handleResizeStop = (e, direction, ref, delta, position) => {
      updateWindowSize(appId, { width: ref.style.width, height: ref.style.height });
      updateWindowPosition(appId, position);
    };

    return (
      <Rnd
        size={{ width: isMaximized ? '100%' : size.width, height: isMaximized ? '100%' : size.height }}
        position={isMaximized ? { x: 0, y: 0 } : { x: position.x, y: position.y }}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        onMouseDown={() => focusWindow(appId)}
        minWidth={300}
        minHeight={200}
        bounds="parent"
        disableDragging={isMaximized}
        enableResizing={!isMaximized}
        style={{ zIndex: zIndex, position: 'absolute' }}
        dragHandleClassName="window-title-bar"
        className="flex flex-col overflow-hidden rounded-lg shadow-2xl border border-white/20 bg-mac-gray/90 backdrop-blur-xl transition-all duration-200"
      >
        {/* Title Bar */}
        <div 
          className="window-title-bar h-8 w-full flex items-center px-3 space-x-2 bg-gradient-to-b from-white/50 to-white/20 border-b border-white/10 select-none cursor-default"
          onDoubleClick={() => maximizeWindow(appId)}
        >
          <div className="flex space-x-2 group">
            {/* Close Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); closeWindow(appId); }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors"
            >
              <X size={8} strokeWidth={4} />
            </button>
            {/* Minimize Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); minimizeWindow(appId); }}
              className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors"
            >
               <Minus size={8} strokeWidth={4} />
            </button>
            {/* Maximize Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); maximizeWindow(appId); }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-black/0 hover:text-black/50 transition-colors"
            >
               <Maximize2 size={6} strokeWidth={4} />
            </button>
          </div>
          <div className="flex-1 text-center text-xs font-semibold text-gray-700/80 pointer-events-none">
            {title || defaultTitle || 'Application'}
          </div>
          <div className="w-14"></div> {/* Spacer to center title */}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-white/50 relative">
          <WrappedComponent {...props} />
        </div>
      </Rnd>
    );
  };
};

export default withWindow;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef, useEffect } from 'react';
import { useWindowStore } from '../../store/windowStore';
import WindowControls from './WindowControls';
import { useDraggable } from '../../hooks/useDraggable';

const Window = ({ windowId, title, children, isMinimized, isMaximized, zIndex, position: initialPos, size: initialSize }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition } = useWindowStore();
  
  const windowRef = useRef(null);
  const headerRef = useRef(null);
  
  // Use our custom draggable hook
  const { position, isDragging } = useDraggable(windowRef, headerRef, initialPos);

  // Sync position back to store when dragging stops (simplistic approach: effect on position change debounce or on unmount)
  // Ideally useDraggable would have onDragEnd. For now, we update store?
  // Updating store on every frame is bad. 
  // Let's just trust valid position usage or update later.
  
  // Handle Focus
  const handleMouseDown = () => {
    focusWindow(windowId);
  };

  if (isMinimized) return null;

  return (
    <div 
        ref={windowRef}
        className="absolute flex flex-col bg-mac-window-light dark:bg-mac-window-dark backdrop-blur-2xl rounded-lg shadow-2xl border border-gray-400/30 overflow-hidden pointer-events-auto transition-shadow duration-200"
        style={{ 
            width: isMaximized ? '100%' : initialSize.width, 
            height: isMaximized ? '100%' : initialSize.height,
            transform: isMaximized ? 'none' : `translate(${position.x}px, ${position.y}px)`,
            top: isMaximized ? 32 : 0, // content below menubar
            left: isMaximized ? 0 : 0,
            zIndex: zIndex,
            transition: isDragging ? 'none' : 'width 0.3s, height 0.3s, transform 0.1s' 
        }}
        onMouseDown={handleMouseDown}
    >
      {/* Window Header / Titlebar */}
      <div 
        ref={headerRef}
        className="h-8 bg-gray-200/50 dark:bg-gray-800/50 border-b border-gray-300/30 flex items-center px-4 select-none cursor-default justify-between"
        onDoubleClick={() => maximizeWindow(windowId)}
      >
          <WindowControls 
            onClose={() => closeWindow(windowId)}
            onMinimize={() => minimizeWindow(windowId)}
            onMaximize={() => maximizeWindow(windowId)}
          />
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex-1 text-center">{title}</div>
          <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white/50 dark:bg-black/20">
          {children}
      </div>
    </div>
  );
};

export default Window;

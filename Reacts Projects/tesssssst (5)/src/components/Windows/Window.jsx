/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Plus } from 'lucide-react';
import useWindowStore from '../../stores/windowStore';

const Window = ({ id, component: Content, title, isMinimized, isMaximized, isActive, zIndex, position, size, icon }) => {
  const { closeWindow, minimizeWindow, toggleMaximize, bringToFront, updateWindowPosition } = useWindowStore();
  const nodeRef = useRef(null);

  if (isMinimized) return null;

  const handleStop = (e, data) => {
      updateWindowPosition(id, { x: data.x, y: data.y });
  };

  return (
    <Draggable
        handle=".window-header"
        position={isMaximized ? {x: 0, y: 0} : position}
        onStart={() => bringToFront(id)}
        onStop={handleStop}
        disabled={isMaximized}
        nodeRef={nodeRef}
    >
      <div 
        ref={nodeRef}
        className={`fixed flex flex-col rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-[#1e1e2e]/95 backdrop-blur-xl transition-shadow duration-200
            ${isActive ? 'shadow-2xl ring-1 ring-white/10' : 'shadow-lg opacity-90'}
        `}
        style={{ 
            width: isMaximized ? '100vw' : size.width, 
            height: isMaximized ? 'calc(100vh - 32px)' : size.height,
            zIndex,
            top: isMaximized ? '32px' : 0, // Account for menubar if maximized, handled by draggable position usually but fixed ensures it.
            left: 0,
            transition: 'width 0.2s, height 0.2s, opacity 0.2s'
        }}
        onClick={() => bringToFront(id)}
      >
        {/* Window Header / Toolbar */}
        <div className="window-header h-10 bg-white/5 flex items-center px-4 justify-between select-none cursor-default active:cursor-grabbing border-b border-white/5">
            <div className="flex items-center gap-2 group">
                <button 
                    onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                    className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                    <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                    className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 transition-colors"
                >
                    <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
                    className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                    <Plus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </button>
            </div>
            
            <div className="font-medium text-sm text-gray-300 flex items-center gap-2">
               {icon && React.createElement(icon, {size: 14})} {title}
            </div>

            <div className="w-14"></div> {/* Spacer for centering title */}
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-auto p-4 text-gray-200 custom-scrollbar">
           {Content ? <Content /> : <div className="h-full flex items-center justify-center text-gray-500">Content loading...</div>}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;

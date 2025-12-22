/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { WindowState } from '../types';

interface WindowFrameProps {
  window: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  theme: 'dark' | 'light';
  children: React.ReactNode;
}

const WindowFrame: React.FC<WindowFrameProps> = ({ 
  window: win, onClose, onMinimize, onFocus, onMove, onResize, theme, children 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - win.x,
      y: e.clientY - win.y
    });
    onFocus(win.id);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setIsResizing(true);
      setResizeStart({
          x: e.clientX,
          y: e.clientY,
          width: win.width,
          height: win.height
      });
      onFocus(win.id);
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        onMove(win.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
      if (isResizing) {
          const deltaX = e.clientX - resizeStart.x;
          const deltaY = e.clientY - resizeStart.y;
          onResize(win.id, Math.max(400, resizeStart.width + deltaX), Math.max(300, resizeStart.height + deltaY));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, win.id, onMove, onResize]);

  if (win.isMinimized) return null;

  return (
    <div 
      className={`absolute flex flex-col rounded-xl overflow-hidden shadow-2xl transition-shadow duration-300 animate-in zoom-in-95
        ${theme === 'dark' 
            ? 'bg-chronos-dark/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
            : 'bg-white/90 border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'}
        backdrop-blur-xl
      `}
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      }}
      onMouseDown={() => onFocus(win.id)}
    >
      {/* Window Header */}
      <div 
        className={`h-10 flex items-center justify-between px-4 select-none cursor-default
            ${theme === 'dark' ? 'bg-white/5 border-b border-white/5' : 'bg-gray-100/50 border-b border-gray-200'}
        `}
        onMouseDown={handleMouseDown}
      >
        <div className="flex gap-2">
            <button onClick={(e) => { e.stopPropagation(); onClose(win.id); }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center group"><X size={8} className="opacity-0 group-hover:opacity-100 text-black/50" /></button>
            <button onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition flex items-center justify-center group"><Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/50" /></button>
            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition flex items-center justify-center group"><Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/50" /></button>
        </div>
        <div className={`text-xs font-medium font-space-grotesk tracking-widest uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {win.title}
        </div>
        <div className="w-10"></div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>

      {/* Resize Handle */}
      <div 
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 flex items-end justify-end p-0.5 opacity-50 hover:opacity-100"
        onMouseDown={handleResizeStart}
      >
          <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-sm"></div>
      </div>
    </div>
  );
};

export default WindowFrame;
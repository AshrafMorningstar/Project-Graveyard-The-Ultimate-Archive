/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useDockStore } from '@/stores/cosmos/dock-store';
import { motion, AnimatePresence } from 'framer-motion';

interface StarWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

export const StarWindow: React.FC<StarWindowProps> = ({ id, title, children, width = 800, height = 600 }) => {
  const nodeRef = useRef(null);
  const { setActiveApp } = useDockStore();

  const handleClose = () => {
    setActiveApp(id); // Using the store to toggle off
  };

  return (
    <Draggable handle=".window-header" nodeRef={nodeRef}>
      <motion.div
        ref={nodeRef}
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.15, ease: "easeIn" } }}
        transition={{ 
            type: "spring", 
            stiffness: 350, 
            damping: 25,
            mass: 0.8 
        }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 flex flex-col shadow-2xl"
        style={{ width, height }}
      >
        <div className="quantum-glass rounded-xl overflow-hidden flex flex-col h-full shadow-quantum border border-neuro-purple/30 backdrop-blur-2xl bg-chronos-dark/80">
          {/* Header */}
          <div className="window-header h-10 bg-white/5 flex items-center px-4 justify-between cursor-grab active:cursor-grabbing border-b border-white/5 select-none">
            <div className="flex items-center gap-2 group">
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveApp(null); }}
                className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <X className="w-2 h-2 text-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center hover:opacity-80 transition-opacity">
                <Minus className="w-2 h-2 text-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center hover:opacity-80 transition-opacity">
                <Maximize2 className="w-2 h-2 text-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
            
            <span className="text-sm font-medium font-space-grotesk text-white/80 flex items-center gap-2">
               {title}
            </span>
            
            <div className="w-14" /> {/* Spacer */}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            {children}
          </div>
        </div>
      </motion.div>
    </Draggable>
  );
};

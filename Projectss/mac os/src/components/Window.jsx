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
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import useStore from '../store/useStore';
import clsx from 'clsx';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const Window = ({ id, title, children }) => {
  const { windows, closeWindow, minimizeWindow, maxMinWindow, focusWindow, activeWindow } = useStore();
  const windowState = windows[id];
  const nodeRef = useRef(null);

  // We rely on AnimatePresence to handle exit, so we don't return null if !isOpen here.
  // Instead, we conditional render inside AnimatePresence.
  const isOpen = windowState?.isOpen;
  const isMinimized = windowState?.isMinimized;
  const isMaximized = windowState?.isMaximized;

  // However, if we don't return null, the component hooks run. 
  // If it's not open, we just render null inside AnimatePresence? 
  // No, apps.map renders this component. 
  // If not open, we want it to Unmount for AnimatePresence to trigger exit.
  // But apps.map keeps it mounted.
  // So we must use a local conditional inside AnimatePresence.

  const zIndex = useStore(state => state.zStack.indexOf(id)) + 20;

  return (
    <AnimatePresence>
      {(isOpen && !isMinimized) && (
        <Draggable
          handle=".window-header"
          nodeRef={nodeRef}
          onMouseDown={() => focusWindow(id)}
          disabled={isMaximized}
          bounds="parent"
        >
          <motion.div
            ref={nodeRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={clsx(
              "absolute shadow-2xl rounded-xl overflow-hidden bg-[#1e1e1ecc] backdrop-blur-xl border border-white/10 flex flex-col transition-all duration-200",
              isMaximized ? "w-full h-full top-8 left-0 rounded-none transform-none !translate-x-0 !translate-y-0" : "top-20 left-20"
            )}
            style={{ zIndex }}
          >
             <ResizableBox
               width={isMaximized ? window.innerWidth : 800} 
               height={isMaximized ? window.innerHeight - 32 : 600} 
               minConstraints={[300, 200]} 
               maxConstraints={[window.innerWidth, window.innerHeight - 32]}
               axis={isMaximized ? "none" : "both"}
               className="flex flex-col h-full w-full"
               handle={<span className="react-resizable-handle react-resizable-handle-se absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50" />}
            >
                {/* Header */}
                <div className="window-header h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 shrink-0 cursor-default select-none">
                  <div className="flex items-center gap-2 group">
                    <button
                      onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                      className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={8} className="text-black opacity-0 group-hover:opacity-50" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                      className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-600 transition-colors"
                    >
                       <Minus size={8} className="text-black opacity-0 group-hover:opacity-50" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); maxMinWindow(id); }}
                      className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                    >
                       <Maximize2 size={6} className="text-black opacity-0 group-hover:opacity-50" />
                    </button>
                  </div>
                  
                  <div className="text-white/80 font-medium text-sm flex-1 text-center pr-12">
                    {title}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto bg-white/80 dark:bg-black/40 text-black dark:text-white p-6 custom-scrollbar relative">
                  {children}
                </div>
            </ResizableBox>
          </motion.div>
        </Draggable>
      )}
    </AnimatePresence>
  );
};

export default Window;

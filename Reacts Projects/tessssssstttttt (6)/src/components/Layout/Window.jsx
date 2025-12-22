/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef, useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import { gsap } from 'gsap';

const Window = ({ app, onClose, onMinimize, onMaximize, isMaximized, isActive, zIndex }) => {
    const windowRef = useRef(null);
    const headerRef = useRef(null);
    const { updateWindowPosition, updateWindowSize, focusWindow, windowState } = useStore();
    
    // Local state for smoother dragging/resizing without frequent store updates
    const state = windowState[app.id];
    
    // We update local refs for performance, but sync with store on interaction end
    const position = useRef(state?.position || { x: 50, y: 50 });
    const size = useRef(state?.size || app.defaultSize);
    const isDragging = useRef(false);
    const isResizing = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Initial animation
        if (windowRef.current) {
            gsap.fromTo(windowRef.current, 
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.2)' }
            );
        }
    }, []);

    useEffect(() => {
        if (!state) return;
        
        // Update refs if store changes externally (e.g. from maximizing)
       if (state.position) {
             position.current = state.position;
       }
       // If minimized, we might handle visibility in parent or here with display: none
    }, [state]);

    const handleMouseDown = (e) => {
        focusWindow(app.id);
        
        if (isMaximized) return; // Can't drag if maximized

        if (e.target.closest('.window-header') && !e.target.closest('.window-controls')) {
            isDragging.current = true;
            dragOffset.current = {
                x: e.clientX - position.current.x,
                y: e.clientY - position.current.y
            };
            document.body.style.userSelect = 'none';
        }
    };

    const handleResizeDown = (e) => {
        e.stopPropagation();
        isResizing.current = true;
         dragOffset.current = {
            x: e.clientX,
            y: e.clientY
        };
        document.body.style.userSelect = 'none';
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging.current) {
                const newX = e.clientX - dragOffset.current.x;
                const newY = Math.max(44, e.clientY - dragOffset.current.y); // Keep below menu bar
                
                position.current = { x: newX, y: newY };
                if (windowRef.current) {
                    windowRef.current.style.left = `${newX}px`;
                    windowRef.current.style.top = `${newY}px`;
                }
            } else if (isResizing.current) {
                const deltaX = e.clientX - dragOffset.current.x;
                const deltaY = e.clientY - dragOffset.current.y;
                
                const newWidth = Math.max(400, size.current.width + deltaX);
                const newHeight = Math.max(300, size.current.height + deltaY);
                
                if (windowRef.current) {
                    windowRef.current.style.width = `${newWidth}px`;
                    windowRef.current.style.height = `${newHeight}px`;
                }
                
                // Update dragOffset for next frame to calculate delta correctly if needed
                // actually for simple resize we usually track start pos, but let's just update size ref
                // Wait, the logic above is incremental. For standard resize:
                // currentSize = startSize + (currMouse - startMouse)
                // My logic above is adding delta to CURRENT size, which means I need to reset dragOffset after applying
                size.current = { width: newWidth, height: newHeight };
                dragOffset.current = { x: e.clientX, y: e.clientY };
            }
        };

        const handleMouseUp = () => {
            if (isDragging.current) {
                isDragging.current = false;
                updateWindowPosition(app.id, position.current);
            }
            if (isResizing.current) {
                isResizing.current = false;
                updateWindowSize(app.id, size.current);
            }
            document.body.style.userSelect = '';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [app.id, updateWindowPosition, updateWindowSize]);

    // Render content dynamically
    const AppComponent = app.component;

    // Styles for maximization
    const style = isMaximized ? {
        top: '44px',
        left: '0',
        width: '100%',
        height: 'calc(100% - 44px - 80px)', // Minus menu bar and dock area
        zIndex: zIndex
    } : {
        top: `${position.current.y}px`,
        left: `${position.current.x}px`,
        width: `${size.current.width}px`,
        height: `${size.current.height}px`,
        zIndex: zIndex
    };

    return (
        <div
            ref={windowRef}
            id={`window-${app.id}`}
            className={`absolute flex flex-col rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-[#1a1a2e]/95 backdrop-blur-xl transition-shadow duration-300 ${isActive ? 'shadow-primary/20 ring-1 ring-white/10' : ''}`}
            style={style}
            onMouseDown={handleMouseDown}
        >
            {/* Window Header */}
            <div ref={headerRef} className="window-header h-10 flex items-center px-4 bg-gradient-to-b from-white/10 to-transparent border-b border-white/10 shrink-0 cursor-default">
                <div className="window-controls flex gap-2 group">
                    <button onClick={() => onClose(app.id)} className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF6B63] flex items-center justify-center text-[8px] text-black/50 opacity-0 group-hover:opacity-100 transition-all">✕</button>
                    <button onClick={() => onMinimize(app.id)} className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFD142] flex items-center justify-center text-[8px] text-black/50 opacity-0 group-hover:opacity-100 transition-all">−</button>
                    <button onClick={() => onMaximize(app.id)} className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#3DD651] flex items-center justify-center text-[8px] text-black/50 opacity-0 group-hover:opacity-100 transition-all">+</button>
                </div>
                <div className="flex-1 text-center text-sm font-semibold text-gray-300 pointer-events-none select-none">
                    {app.title}
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-hidden relative custom-scrollbar">
                <AppComponent />
                
                {/* Overlay to catch clicks when dragging/resizing iframes/interactive content */}
                {(isDragging.current || isResizing.current) && (
                    <div className="absolute inset-0 z-50 bg-transparent" />
                )}
            </div>

            {/* Resize Handle */}
            {!isMaximized && (
                <div 
                    className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-1 resize-handle z-50 hover:bg-white/10 rounded-tl-lg transition-colors"
                    onMouseDown={handleResizeDown}
                >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="opacity-50">
                        <path d="M10 0L0 10V10H10V0Z" fill="white"/>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default Window;

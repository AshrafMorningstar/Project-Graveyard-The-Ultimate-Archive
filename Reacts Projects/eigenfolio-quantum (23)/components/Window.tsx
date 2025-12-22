/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useSystemStore } from '../store';
import { WindowState } from '../types';

interface WindowProps {
    win: WindowState;
    children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ win, children }) => {
    const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, updateWindowPos, updateWindowSize, snapWindow, windows, minimizeWindow: minimizeOther } = useSystemStore();
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [shakeCount, setShakeCount] = useState(0);
    const [lastDragPos, setLastDragPos] = useState({ x: 0, y: 0 });
    const winRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        focusWindow(win.id);
    };

    const startDrag = (e: React.MouseEvent) => {
        if (win.isMaximized) return;
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - win.x,
            y: e.clientY - win.y
        });
        setLastDragPos({ x: e.clientX, y: e.clientY });
        setShakeCount(0);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newX = e.clientX - dragOffset.x;
                const newY = e.clientY - dragOffset.y;
                
                // Aero Shake detection
                const dx = e.clientX - lastDragPos.x;
                if (Math.abs(dx) > 15) {
                    setShakeCount(prev => prev + 1);
                }
                setLastDragPos({ x: e.clientX, y: e.clientY });

                // Window Snapping Preview / Logic
                if (e.clientX < 10) snapWindow(win.id, 'left');
                else if (e.clientX > window.innerWidth - 10) snapWindow(win.id, 'right');
                else snapWindow(win.id, 'none');

                updateWindowPos(win.id, newX, newY);
            }
        };
        const handleMouseUp = () => {
            setIsDragging(false);
            if (shakeCount > 5) {
                // Minimize all others
                windows.forEach(w => {
                    if (w.id !== win.id) minimizeOther(w.id);
                });
            }
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, win.id, updateWindowPos, lastDragPos, shakeCount]);

    if (win.isMinimized) return null;

    // Calculate Style based on State
    let style: React.CSSProperties = {
        zIndex: win.zIndex,
        transform: `scale(${isDragging ? 1.01 : 1})`,
        opacity: isDragging ? 0.95 : 1
    };

    if (win.isMaximized) {
        style = { ...style, left: 0, top: 32, width: '100%', height: 'calc(100vh - 32px - 80px)' };
    } else if (win.snapState === 'left') {
        style = { ...style, left: 0, top: 32, width: '50%', height: 'calc(100vh - 32px - 80px)' };
    } else if (win.snapState === 'right') {
        style = { ...style, left: '50%', top: 32, width: '50%', height: 'calc(100vh - 32px - 80px)' };
    } else {
        style = { ...style, left: win.x, top: win.y, width: win.width, height: win.height };
    }

    return (
        <div 
            ref={winRef}
            onMouseDown={handleMouseDown}
            className={`absolute flex flex-col rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-xl bg-glass-primary transition-all duration-150 ease-out`}
            style={style}
        >
            {/* Title Bar */}
            <div 
                className="h-9 bg-white/5 border-b border-white/5 flex items-center justify-between px-3 select-none cursor-default"
                onMouseDown={startDrag}
                onDoubleClick={() => maximizeWindow(win.id)}
            >
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 group">
                        <button onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center text-[8px] text-black opacity-80 hover:opacity-100 transition-opacity"><X size={8} className="hidden group-hover:block" /></button>
                        <button onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center text-[8px] text-black opacity-80 hover:opacity-100 transition-opacity"><Minus size={8} className="hidden group-hover:block" /></button>
                        <button onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center text-[8px] text-black opacity-80 hover:opacity-100 transition-opacity"><Maximize2 size={8} className="hidden group-hover:block" /></button>
                    </div>
                </div>
                <div className="text-xs font-medium text-white/70 font-space tracking-wide truncate max-w-[200px]">{win.title}</div>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            {/* Content */}
            <div className="flex-1 relative overflow-hidden bg-black/20">
                {children}
            </div>

            {/* Resize Handles */}
            {!win.isMaximized && win.snapState === 'none' && (
                <>
                    <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 hover:bg-white/10" onMouseDown={(e) => handleResize(e, 'se')} />
                    <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-50 hover:bg-white/10" onMouseDown={(e) => handleResize(e, 'sw')} />
                    <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-50 hover:bg-white/10" onMouseDown={(e) => handleResize(e, 'ne')} />
                    {/* Add standard resize listeners logic here, simplified for brevity in XML output. The existing one handles SE. */}
                </>
            )}
        </div>
    );
    
    function handleResize(e: React.MouseEvent, dir: string) {
        e.stopPropagation(); e.preventDefault();
        const startX = e.clientX; const startY = e.clientY;
        const startW = win.width; const startH = win.height; const startXPos = win.x; const startYPos = win.y;

        const onMove = (ev: MouseEvent) => {
            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;
            
            let newW = startW, newH = startH, newX = startXPos, newY = startYPos;

            if (dir.includes('e')) newW = Math.max(300, startW + dx);
            if (dir.includes('s')) newH = Math.max(200, startH + dy);
            if (dir.includes('w')) { newW = Math.max(300, startW - dx); newX = startXPos + dx; }
            if (dir.includes('n')) { newH = Math.max(200, startH - dy); newY = startYPos + dy; }

            updateWindowSize(win.id, newW, newH);
            if (dir.includes('w') || dir.includes('n')) updateWindowPos(win.id, newX, newY);
        };
        const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
        window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
    }
};

export default Window;

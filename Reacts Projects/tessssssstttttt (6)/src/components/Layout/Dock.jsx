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

import React, { useRef } from 'react';
import useStore from '../../store/useStore';
import { apps } from '../../config/apps';

const Dock = () => {
    const { openApp, activeWindow, openWindows, windowState } = useStore();
    const dockRef = useRef(null);

    const handleMouseMove = (e) => {
        const dock = dockRef.current;
        if (!dock) return;

        const htmlItems = dock.querySelectorAll('.dock-item');
        const items = Array.from(htmlItems);
        const mouseX = e.clientX;

        items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX - itemCenterX);
            
            // Calculate scale based on distance (max 150px range)
            let scale = 1;
            if (distance < 150) {
                 // Scale goes from 1.5 at center to 1 at edges
                scale = 1 + (0.5 * (1 - distance / 150));
            }

            item.style.transform = `scale(${scale})`;
            item.style.marginBottom = `${(scale - 1) * 20}px`; // Push up slightly
        });
    };

    const handleMouseLeave = () => {
        const dock = dockRef.current;
        if (!dock) return;
        const items = dock.querySelectorAll('.dock-item');
        items.forEach((item) => {
            item.style.transform = 'scale(1)';
            item.style.marginBottom = '0px';
        });
    };

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]">
            <div 
                ref={dockRef}
                className="flex items-end gap-3 px-4 py-3 bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl h-[70px]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {apps.map((app) => {
                    const isOpen = openWindows.includes(app.id);
                    const isActive = activeWindow === app.id && !windowState[app.id]?.isMinimized;

                    return (
                        <div 
                            key={app.id} 
                            className="dock-item relative group cursor-pointer transition-transform duration-100 ease-out origin-bottom"
                            onClick={() => openApp(app.id)}
                        >
                            <div className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center text-2xl shadow-lg backdrop-blur-sm transition-colors">
                                {app.icon}
                            </div>
                            
                            {/* Dot indicator for open apps */}
                            {isOpen && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                            )}

                             {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                                {app.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dock;

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

import React, { useEffect, useState } from 'react';
import useStore from '../store/useStore';

const ContextMenu = () => {
    const { setWallpaper } = useStore();
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleContextMenu = (e) => {
            // Only on desktop bg
            if (e.target.closest('.window') || e.target.closest('.dock') || e.target.closest('.menu-bar')) {
                setVisible(false);
                return;
            }
            e.preventDefault();
            setVisible(true);
            setCoords({ x: e.clientX, y: e.clientY });
        };

        const handleClick = () => setVisible(false);

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    if (!visible) return null;

    const wallpapers = [
        "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070",
        "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2070",
    ];

    return (
        <div 
            className="fixed z-[100] bg-white/20 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl py-1 w-48 text-sm text-black dark:text-white"
            style={{ top: coords.y, left: coords.x }}
        >
            <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer">New Folder</div>
            <div className="h-px bg-white/10 my-1"></div>
            <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer relative group">
                Change Wallpaper ›
                <div className="absolute left-full top-0 ml-1 bg-white/20 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/20 rounded-lg shadow-xl py-1 w-32 hidden group-hover:block">
                    {wallpapers.map((wp, i) => (
                         <div key={i} onClick={() => setWallpaper(wp)} className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer">Option {i + 1}</div>
                    ))}
                </div>
            </div>
            <div className="h-px bg-white/10 my-1"></div>
            <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer">Sort By</div>
            <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer">Clean Up</div>
        </div>
    );
};

export default ContextMenu;

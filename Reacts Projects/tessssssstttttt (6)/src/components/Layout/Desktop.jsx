/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useEffect } from 'react';
import useStore from '../../store/useStore';
import { apps } from '../../config/apps';
import MenuBar from './MenuBar';
import Dock from './Dock';
import Window from './Window';

const Desktop = () => {
    const { openWindows, windowState, closeApp, minimizeApp, maximizeApp, activeWindow, openApp } = useStore();

    useEffect(() => {
        // Open Welcome app on load
        const timer = setTimeout(() => {
            openApp('welcome');
        }, 500);
        return () => clearTimeout(timer);
    }, [openApp]);

    const wallpaperUrl = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="%231a1a2e"/><rect width="100" height="100" fill="url(%23grid)"/></svg>')`;

    return (
        <div 
            className="w-screen h-screen overflow-hidden flex flex-col relative bg-cover bg-center select-none"
            style={{ backgroundImage: wallpaperUrl }}
        >
             {/* Background gradient overlay for nicer look */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] -z-10 pointer-events-none" />
            
            <MenuBar />
            
            <div className="flex-1 relative z-0 mt-11 h-[calc(100vh-44px)]">
                {openWindows.map(appId => {
                    const app = apps.find(a => a.id === appId);
                    const state = windowState[appId];
                    
                    if (!app || !state || state.isMinimized) return null;

                    return (
                        <Window
                            key={appId}
                            app={app}
                            onClose={closeApp}
                            onMinimize={minimizeApp}
                            onMaximize={maximizeApp}
                            isMaximized={state.isMaximized}
                            isActive={activeWindow === appId}
                            zIndex={state.zIndex}
                        />
                    );
                })}
            </div>

            <Dock />
        </div>
    );
};

export default Desktop;

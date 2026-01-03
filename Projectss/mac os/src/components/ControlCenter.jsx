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

import React from 'react';
import useStore from '../store/useStore';
import { Wifi, Bluetooth, Sun, Volume2, Monitor } from 'lucide-react';

const ControlCenter = ({ onClose }) => {
    const { 
        wifi, toggleWifi, 
        bluetooth, toggleBluetooth,
        theme, toggleTheme,
        brightness, setBrightness,
        volume, setVolume
    } = useStore();

    return (
        <div 
            className="absolute top-10 right-4 w-80 bg-white/20 dark:bg-black/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-4 text-black dark:text-white z-[60]"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Connectivity */}
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 flex flex-col gap-3">
                    <div className="flex gap-3">
                        <button 
                             onClick={toggleWifi}
                             className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${wifi ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                            <Wifi size={16} />
                        </button>
                        <div className="text-sm font-medium pt-1">Wi-Fi</div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                             onClick={toggleBluetooth}
                             className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${bluetooth ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600'}`}
                        >
                            <Bluetooth size={16} />
                        </button>
                         <div className="text-sm font-medium pt-1">Bluetooth</div>
                    </div>
                </div>

                {/* Theme & Focus */}
                <div className="grid grid-rows-2 gap-4">
                     <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/60 dark:hover:bg-gray-700/50 transition-colors" onClick={toggleTheme}>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
                             {theme === 'dark' ? <Monitor size={16}/> : <Sun size={16}/>}
                         </div>
                         <div className="text-sm font-medium">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
                     </div>
                </div>
            </div>

            {/* Sliders */}
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 mb-4 space-y-4">
                <div className="flex flex-col gap-2">
                    <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Display</div>
                    <div className="flex items-center gap-2">
                        <Sun size={16} className="text-gray-500" />
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value={brightness} 
                            onChange={(e) => setBrightness(e.target.value)}
                            className="w-full accent-blue-500 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sound</div>
                    <div className="flex items-center gap-2">
                         <Volume2 size={16} className="text-gray-500" />
                         <input 
                            type="range" 
                            min="0" max="100" 
                            value={volume} 
                            onChange={(e) => setVolume(e.target.value)}
                            className="w-full accent-blue-500 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                         />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlCenter;

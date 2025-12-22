/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useRef, useEffect } from 'react';
import { Wifi, Bluetooth, Moon, Sun, Monitor, Volume2, Command, Search } from 'lucide-react';
import { useStore } from '../../store/useStore';
import gsap from 'gsap';

export const ControlCenter = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { theme, toggleTheme, wifi, toggleWifi, bluetooth, toggleBluetooth, brightness, setBrightness, volume, setVolume } = useStore();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(ref.current, 
                { opacity: 0, scale: 0.95, y: -20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out' }
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-[9998]" onClick={onClose} />
            <div ref={ref} className="fixed top-9 right-2 w-80 bg-white/70 dark:bg-black/70 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border border-white/20 dark:border-white/10 z-[9999] text-black dark:text-white flex flex-col gap-4 select-none">
                
                {/* Connectivity Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/50 dark:bg-gray-800/80 rounded-xl p-3 flex flex-col gap-3 shadow-sm transition-colors">
                        <div className="flex items-center gap-3">
                            <button onClick={toggleWifi} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${wifi ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'}`}>
                                <Wifi size={16} />
                            </button>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold">Wi-Fi</span>
                                <span className="text-[10px] opacity-60 leading-tight">{wifi ? 'Home_5G' : 'Off'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={toggleBluetooth} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${bluetooth ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'}`}>
                                <Bluetooth size={16} />
                            </button>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold">Bluetooth</span>
                                <span className="text-[10px] opacity-60 leading-tight">{bluetooth ? 'On' : 'Off'}</span>
                            </div>
                        </div>
                    </div>

                     <div className="bg-white/50 dark:bg-gray-800/80 rounded-xl p-3 grid grid-cols-2 gap-2">
                        <button onClick={toggleTheme} className={`col-span-2 flex items-center gap-3 p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-white/10' : ''}`}>
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-600 ${theme ==='dark' ? 'text-yellow-400' : 'text-gray-600'}`}>
                                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                             </div>
                             <span className="text-xs font-semibold">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                        </button>
                     </div>
                </div>

                {/* Display & Sound */}
                <div className="bg-white/50 dark:bg-gray-800/80 rounded-xl p-3 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-[10px] font-semibold tracking-wide opacity-50 uppercase pl-1">Display</div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full relative overflow-hidden group">
                           <div className="absolute inset-y-0 left-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-l-full" style={{ width: `${brightness}%` }} />
                           <input 
                            type="range" min="0" max="100" value={brightness} 
                            onChange={(e) => setBrightness(parseInt(e.target.value))}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer" 
                           />
                           <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 mix-blend-difference">
                               <Sun size={14} />
                           </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                         <div className="flex justify-between text-[10px] font-semibold tracking-wide opacity-50 uppercase pl-1">Sound</div>
                         <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full relative overflow-hidden group">
                           <div className="absolute inset-y-0 left-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-l-full" style={{ width: `${volume}%` }} />
                           <input 
                            type="range" min="0" max="100" value={volume} 
                            onChange={(e) => setVolume(parseInt(e.target.value))}
                            className="absolute inset-0 w-full opacity-0 cursor-pointer" 
                           />
                           <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 mix-blend-difference">
                               <Volume2 size={14} />
                           </div>
                        </div>
                    </div>
                </div>

                 {/* Now Playing (Fake) */}
                 <div className="bg-white/50 dark:bg-gray-800/80 rounded-xl p-3 flex items-center gap-3">
                     <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center shrink-0">
                         <span className="text-xl">🎵</span>
                     </div>
                     <div className="flex flex-col overflow-hidden">
                         <span className="text-xs font-semibold truncate">Coding Lofi</span>
                         <span className="text-[10px] opacity-60 truncate">Ashraf Morningstar</span>
                     </div>
                     <div className="ml-auto">
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-black dark:text-white">
                            ▶
                        </button>
                     </div>
                 </div>
            </div>
        </>
    );
};

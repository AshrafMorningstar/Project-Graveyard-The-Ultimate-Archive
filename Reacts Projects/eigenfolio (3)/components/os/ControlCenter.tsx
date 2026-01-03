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
import { useStore } from '../../store/useStore';
import { Wifi, Bluetooth, Plane, Moon, Sun, Volume2, Monitor } from 'lucide-react';

const ControlCenter: React.FC = () => {
    const { systemState, updateSystemState, settings, toggleTheme, isControlCenterOpen } = useStore();

    if (!isControlCenterOpen) return null;

    return (
        <div className="fixed top-10 right-4 w-80 bg-slate-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-4 z-[9999] animate-in fade-in slide-in-from-top-4 duration-200 text-white">
            {/* Connectivity Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/10 rounded-xl p-3 flex flex-col gap-3">
                    <button 
                        onClick={() => updateSystemState({ wifi: !systemState.wifi })}
                        className={`flex items-center gap-3 transition-colors`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${systemState.wifi ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                            <Wifi size={16} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">Wi-Fi</span>
                            <span className="text-[10px] opacity-60">{systemState.wifi ? 'Morningstar_5G' : 'Off'}</span>
                        </div>
                    </button>
                    <button 
                        onClick={() => updateSystemState({ bluetooth: !systemState.bluetooth })}
                        className={`flex items-center gap-3 transition-colors`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${systemState.bluetooth ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                            <Bluetooth size={16} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">Bluetooth</span>
                            <span className="text-[10px] opacity-60">{systemState.bluetooth ? 'On' : 'Off'}</span>
                        </div>
                    </button>
                    <button 
                        onClick={() => updateSystemState({ airplaneMode: !systemState.airplaneMode })}
                        className={`flex items-center gap-3 transition-colors`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${systemState.airplaneMode ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                            <Plane size={16} />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">AirDrop</span>
                            <span className="text-[10px] opacity-60">Contacts Only</span>
                        </div>
                    </button>
                </div>
                
                <div className="flex flex-col gap-3">
                    <div className="bg-white/10 rounded-xl p-4 flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/20 transition-colors" onClick={toggleTheme}>
                        {settings.darkMode ? <Moon size={24} className="text-purple-400" /> : <Sun size={24} className="text-yellow-400" />}
                        <span className="text-xs font-medium">{settings.darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                </div>
            </div>

            {/* Sliders */}
            <div className="bg-white/10 rounded-xl p-3 mb-3">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium opacity-70">Display</span>
                        <div className="flex items-center gap-3">
                            <Monitor size={16} className="text-gray-400" />
                            <input 
                                type="range" 
                                min="10" 
                                max="100" 
                                value={systemState.brightness} 
                                onChange={(e) => updateSystemState({ brightness: parseInt(e.target.value) })}
                                className="flex-1 accent-white h-1 bg-white/30 rounded-full appearance-none cursor-pointer" 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium opacity-70">Sound</span>
                        <div className="flex items-center gap-3">
                            <Volume2 size={16} className="text-gray-400" />
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={systemState.volume} 
                                onChange={(e) => updateSystemState({ volume: parseInt(e.target.value) })}
                                className="flex-1 accent-white h-1 bg-white/30 rounded-full appearance-none cursor-pointer" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Media Control Mock */}
            <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-md flex items-center justify-center">
                    <span className="text-xs font-bold">♫</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold">Cosmic Waves</span>
                    <span className="text-xs opacity-60">Neuro Beats</span>
                </div>
                <div className="flex-1" />
                <button className="text-xl hover:scale-110 transition-transform">⏯</button>
            </div>
        </div>
    );
};

export default ControlCenter;
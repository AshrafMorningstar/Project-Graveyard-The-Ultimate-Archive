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

/**
 * @file ClockApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Clock Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React, { useState, useEffect } from 'react';
import { Globe, Watch, Timer, AlarmClock } from 'lucide-react';

const ClockApp: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'world' | 'alarm' | 'stopwatch' | 'timer'>('world');
    const [time, setTime] = useState(new Date());
    
    // Stopwatch State
    const [stopwatchTime, setStopwatchTime] = useState(0);
    const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isStopwatchRunning) {
            interval = setInterval(() => {
                setStopwatchTime((prev) => prev + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isStopwatchRunning]);

    const formatStopwatch = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
            {/* Toolbar */}
            <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-white/10 gap-8">
                <button onClick={() => setActiveTab('world')} className={`flex flex-col items-center gap-1 ${activeTab === 'world' ? 'text-orange-500' : 'text-gray-400'}`}>
                    <Globe size={20} />
                    <span className="text-xs">World Clock</span>
                </button>
                <button onClick={() => setActiveTab('stopwatch')} className={`flex flex-col items-center gap-1 ${activeTab === 'stopwatch' ? 'text-orange-500' : 'text-gray-400'}`}>
                    <Watch size={20} />
                    <span className="text-xs">Stopwatch</span>
                </button>
                 <button onClick={() => setActiveTab('timer')} className={`flex flex-col items-center gap-1 ${activeTab === 'timer' ? 'text-orange-500' : 'text-gray-400'}`}>
                    <Timer size={20} />
                    <span className="text-xs">Timer</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'world' && (
                    <div className="space-y-4">
                         <div className="flex justify-between items-end border-b border-gray-100 dark:border-white/5 pb-4">
                            <div>
                                <div className="text-gray-400 text-sm">Local Time</div>
                                <div className="text-3xl font-light">Cupertino</div>
                            </div>
                            <div className="text-5xl font-thin tracking-wider">
                                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                         </div>
                         <div className="flex justify-between items-end border-b border-gray-100 dark:border-white/5 pb-4 opacity-50">
                            <div>
                                <div className="text-gray-400 text-sm">Today, +3HRS</div>
                                <div className="text-2xl font-light">New York</div>
                            </div>
                            <div className="text-4xl font-thin tracking-wider">
                                {new Date(time.getTime() + 3 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                         </div>
                         <div className="flex justify-between items-end border-b border-gray-100 dark:border-white/5 pb-4 opacity-50">
                            <div>
                                <div className="text-gray-400 text-sm">Tomorrow, +16HRS</div>
                                <div className="text-2xl font-light">Tokyo</div>
                            </div>
                            <div className="text-4xl font-thin tracking-wider">
                                {new Date(time.getTime() + 16 * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                         </div>
                    </div>
                )}

                {activeTab === 'stopwatch' && (
                    <div className="h-full flex flex-col items-center justify-center gap-12">
                        <div className="text-7xl font-mono tabular-nums tracking-wider text-gray-800 dark:text-gray-100">
                            {formatStopwatch(stopwatchTime)}
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
                                className={`w-20 h-20 rounded-full flex items-center justify-center text-lg font-medium transition-transform active:scale-95 ${isStopwatchRunning ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-green-500/20 text-green-500 border border-green-500/30'}`}
                            >
                                {isStopwatchRunning ? 'Stop' : 'Start'}
                            </button>
                            <button 
                                onClick={() => { setIsStopwatchRunning(false); setStopwatchTime(0); }}
                                className="w-20 h-20 rounded-full bg-gray-500/20 text-gray-500 border border-gray-500/30 flex items-center justify-center text-lg font-medium transition-transform active:scale-95"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                )}
                 {activeTab === 'timer' && (
                     <div className="h-full flex items-center justify-center text-gray-400">
                         Timer functionality is simulated.
                     </div>
                 )}
            </div>
        </div>
    );
};

export default ClockApp;

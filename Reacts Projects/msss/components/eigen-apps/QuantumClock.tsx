/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

export const QuantumClock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [stopwatch, setStopwatch] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => setStopwatch(prev => prev + 10), 10);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatStopwatch = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centis = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-full bg-[#1e1e1e] text-white flex flex-col p-8 items-center justify-around">
            {/* World Clock Section */}
            <div className="text-center">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Local Time</h2>
                <div className="text-6xl font-mono font-bold text-quantum-glow tabular-nums">
                    {time.toLocaleTimeString([], { hour12: false })}
                </div>
                <div className="text-gray-400 mt-2">
                    {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stopwatch Section */}
            <div className="w-full bg-[#252526] rounded-2xl p-6 flex flex-col items-center border border-white/5">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Quantum Chronometer</h2>
                <div className="text-4xl font-mono font-bold mb-6 tabular-nums">
                    {formatStopwatch(stopwatch)}
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={() => setIsRunning(!isRunning)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isRunning ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}
                    >
                        {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button 
                        onClick={() => { setIsRunning(false); setStopwatch(0); }}
                        className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mock World Times */}
            <div className="w-full grid grid-cols-2 gap-4 mt-4">
                 <div className="text-center">
                     <div className="text-xs text-gray-500">TOK</div>
                     <div className="text-sm font-mono text-gray-300">{(time.getHours() + 9) % 24}:00</div>
                 </div>
                 <div className="text-center">
                     <div className="text-xs text-gray-500">NYC</div>
                     <div className="text-sm font-mono text-gray-300">{(time.getHours() - 5 + 24) % 24}:00</div>
                 </div>
            </div>
        </div>
    );
};

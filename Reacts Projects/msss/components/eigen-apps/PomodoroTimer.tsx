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
import { Play, Pause, RefreshCw, Coffee, Brain } from 'lucide-react';

export const PomodoroTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Play notification sound here
        }
        return () => { if (interval) clearInterval(interval); };
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);
    
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const switchMode = (m: 'focus' | 'break') => {
        setMode(m);
        setIsActive(false);
        setTimeLeft(m === 'focus' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`h-full flex flex-col items-center justify-center text-white transition-colors duration-500 ${mode === 'focus' ? 'bg-[#ba4949]' : 'bg-[#38858a]'}`}>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl w-80 text-center shadow-xl">
                <div className="flex justify-center gap-4 mb-8">
                    <button 
                        onClick={() => switchMode('focus')}
                        className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${mode === 'focus' ? 'bg-black/20' : 'opacity-50 hover:bg-black/10'}`}
                    >
                        <Brain className="w-4 h-4 inline mr-1" /> Focus
                    </button>
                    <button 
                        onClick={() => switchMode('break')}
                        className={`px-4 py-1 rounded-full text-sm font-bold transition-all ${mode === 'break' ? 'bg-black/20' : 'opacity-50 hover:bg-black/10'}`}
                    >
                         <Coffee className="w-4 h-4 inline mr-1" /> Break
                    </button>
                </div>

                <div className="text-8xl font-bold font-mono tracking-tighter mb-8 tabular-nums">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex justify-center gap-4">
                    <button 
                        onClick={toggleTimer}
                        className="bg-white text-gray-800 px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
                    >
                        {isActive ? 'Pause' : 'Start'}
                    </button>
                     <button 
                        onClick={resetTimer}
                        className="bg-white/20 p-3 rounded-lg hover:bg-white/30 transition-colors"
                    >
                        <RefreshCw className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

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
import { Mic, Square, Play, Trash, MoreHorizontal } from 'lucide-react';

export const VoiceMemos: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState(0);
    const [memos, setMemos] = useState([
        { id: 1, name: 'Idea for Startup', date: 'Yesterday', duration: '0:42' },
        { id: 2, name: 'Grocery List', date: 'Monday', duration: '1:15' },
    ]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => setDuration(d => d + 1), 1000);
        } else {
            setDuration(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="h-full bg-black text-white flex flex-col">
            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <h1 className="text-3xl font-bold mb-6 px-2">Voice Memos</h1>
                {memos.map(memo => (
                    <div key={memo.id} className="bg-[#1c1c1e] p-4 rounded-xl flex items-center justify-between group active:scale-95 transition-transform">
                        <div>
                            <h3 className="font-semibold">{memo.name}</h3>
                            <p className="text-xs text-gray-500">{memo.date} • {memo.duration}</p>
                        </div>
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors"><Play className="w-4 h-4 fill-current" /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="h-48 bg-[#1c1c1e] border-t border-white/10 rounded-t-3xl p-6 flex flex-col items-center justify-between shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10 relative">
                
                {isRecording && (
                     <div className="w-full flex justify-center items-end gap-1 h-12 mb-4">
                         {/* Visualizer Mock */}
                         {Array.from({length: 30}).map((_, i) => (
                             <div 
                                key={i} 
                                className="w-1 bg-red-500 rounded-full animate-pulse"
                                style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.05}s` }}
                             />
                         ))}
                     </div>
                )}

                <div className="text-4xl font-mono font-thin tracking-wider mb-4">
                    {isRecording ? formatTime(duration) : '0:00'}
                </div>

                <button 
                    onClick={() => setIsRecording(!isRecording)}
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${
                        isRecording 
                        ? 'border-gray-500 bg-transparent' 
                        : 'border-red-500 bg-red-500 hover:scale-110 shadow-lg shadow-red-500/20'
                    }`}
                >
                    {isRecording ? (
                        <Square className="w-6 h-6 fill-red-500 text-red-500" />
                    ) : (
                        <div className="w-6 h-6 rounded-full bg-transparent" /> 
                    )}
                </button>
            </div>
        </div>
    );
};

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

import React, { useState, useEffect } from 'react';
import { Mic, Pause, Play, Trash2 } from 'lucide-react';

const VoiceMemos = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [memos, setMemos] = useState([
        { id: 1, name: "Idea for App", date: "Yesterday", duration: "0:45" },
        { id: 2, name: "Meeting Notes", date: "Monday", duration: "12:30" }
    ]);
    const [bars, setBars] = useState([]);

    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setBars(prev => {
                    const next = [...prev, Math.random() * 100];
                    if (next.length > 50) next.shift();
                    return next;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white">
            <div className="w-64 border-r border-white/10 flex flex-col bg-[#2c2c2e]">
                <div className="p-4 font-bold text-lg">All Recordings</div>
                <div className="flex-1 overflow-auto">
                    {memos.map(memo => (
                        <div key={memo.id} className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
                            <div className="font-bold text-sm">{memo.name}</div>
                            <div className="flex justify-between mt-1 text-xs text-gray-400">
                                <span>{memo.date}</span>
                                <span>{memo.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-12 bg-black relative overflow-hidden">
                <div className="flex items-center gap-1 h-32 mb-12 w-full justify-center">
                    {bars.map((h, i) => (
                        <div 
                           key={i} 
                           className="w-1 bg-red-500 rounded-full transition-all duration-75"
                           style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
                
                <div className="text-4xl font-light mb-8 tabular-nums">
                    {isRecording ? "00:04:12" : "00:00:00"}
                </div>

                <button 
                    onClick={() => setIsRecording(!isRecording)}
                    className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform"
                >
                    <div className={`rounded-full transition-all duration-300 ${isRecording ? 'w-8 h-8 rounded-sm bg-red-500' : 'w-16 h-16 bg-red-500'}`}></div>
                </button>
                <div className="mt-4 text-gray-400 font-medium">
                    {isRecording ? "Recording..." : "Click to Record"}
                </div>
            </div>
        </div>
    );
};

export default VoiceMemos;

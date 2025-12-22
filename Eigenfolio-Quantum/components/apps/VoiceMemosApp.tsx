/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file VoiceMemosApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - Voice Memos
 */

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Play, Pause, Trash2, MoreHorizontal } from 'lucide-react';

const VoiceMemosApp: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState([
        { id: 1, name: 'Quantum Design Ideas', date: 'Yesterday', duration: '0:42' },
        { id: 2, name: 'Note to Self: Buy Milk', date: 'Monday', duration: '0:05' },
    ]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Audio Visualizer Simulation
    useEffect(() => {
        if (!isRecording || !canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const bars = 30;
            const width = canvas.width / bars;
            
            ctx.fillStyle = '#ff0000';
            
            for (let i = 0; i < bars; i++) {
                // Random height based on simulated audio
                const height = Math.random() * canvas.height * 0.8;
                const x = i * width;
                const y = (canvas.height - height) / 2;
                
                // Rounded pill shape
                ctx.beginPath();
                ctx.roundRect(x + 2, y, width - 4, height, 10);
                ctx.fill();
            }
            
            animationId = requestAnimationFrame(draw);
        }
        
        draw();
        return () => cancelAnimationFrame(animationId);
    }, [isRecording]);

    return (
        <div className="h-full flex bg-white dark:bg-[#1e1e1e]">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 dark:border-white/10 flex flex-col bg-gray-50 dark:bg-black/20">
                <div className="p-4 border-b border-gray-200 dark:border-white/10 font-bold text-lg">All Recordings</div>
                <div className="flex-1 overflow-y-auto">
                    {recordings.map(rec => (
                        <div key={rec.id} className="p-4 border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-white/10">
                            <h3 className="font-bold">{rec.name}</h3>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{rec.date}</span>
                                <span>{rec.duration}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black">
                {/* Visualizer */}
                <div className="w-full h-48 mb-12 flex items-center justify-center relative">
                    <canvas ref={canvasRef} width={600} height={200} className="w-full h-full" />
                    {!isRecording && <div className="absolute text-gray-500">Ready to Record</div>}
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-4">
                    <div className="text-2xl font-mono text-white tracking-widest">
                        {isRecording ? "00:01:23" : "00:00:00"}
                    </div>
                    <button 
                        onClick={() => setIsRecording(!isRecording)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${isRecording ? 'bg-white' : 'bg-red-500 hover:bg-red-600'}`}
                    >
                        {isRecording ? <div className="w-6 h-6 bg-red-500 rounded-sm"></div> : <div className="w-6 h-6 bg-transparent rounded-full border-2 border-white"></div> /* Simple shapes for stop/rec */}
                    </button>
                    <div className="text-gray-400 text-sm mt-2">{isRecording ? "Recording..." : "New Recording"}</div>
                </div>
            </div>
        </div>
    );
};

export default VoiceMemosApp;

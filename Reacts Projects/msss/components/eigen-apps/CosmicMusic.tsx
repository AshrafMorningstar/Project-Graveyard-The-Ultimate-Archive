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

'use client';

import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, List, Heart } from 'lucide-react';

const TRACKS = [
    { title: "Quantum Dreams", artist: "Stellar Frequency", duration: "3:42", cover: "bg-neuro-purple" },
    { title: "Neural Networks", artist: "Cyber Sines", duration: "4:15", cover: "bg-quantum-glow" },
    { title: "Event Horizon", artist: "The Void", duration: "2:58", cover: "bg-chronos-blue" },
    { title: "Superposition", artist: "Wave Function", duration: "5:01", cover: "bg-neuro-pink" },
];

export const CosmicMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(80);

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-chronos-dark to-black text-white">
            {/* Album Art Area */}
            <div className={`
                flex-1 m-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] 
                flex items-center justify-center relative overflow-hidden group
                ${TRACKS[currentTrack].cover}
            `}>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
                <div className={`w-32 h-32 rounded-full border-4 border-white/20 shadow-xl flex items-center justify-center ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-chronos-dark" />
                </div>
                
                {/* Visualizer bars */}
                {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-1 pb-4 opacity-50">
                        {[...Array(20)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-2 bg-white rounded-t-sm animate-pulse"
                                style={{ 
                                    height: `${Math.random() * 100}%`,
                                    animationDuration: `${0.5 + Math.random()}s`
                                }} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Controls Area */}
            <div className="px-8 pb-8 space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold font-space-grotesk">{TRACKS[currentTrack].title}</h2>
                        <p className="text-white/50">{TRACKS[currentTrack].artist}</p>
                    </div>
                    <button className="text-quantum-glow hover:text-white transition-colors">
                        <Heart className="w-6 h-6" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group">
                        <div className="h-full w-1/3 bg-white group-hover:bg-quantum-glow transition-colors rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-white/40 font-mono">
                        <span>1:12</span>
                        <span>{TRACKS[currentTrack].duration}</span>
                    </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/50">
                        <Volume2 className="w-4 h-4" />
                        <div className="w-20 h-1 bg-white/10 rounded-full">
                            <div className="h-full bg-white rounded-full" style={{ width: `${volume}%` }} />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setCurrentTrack((prev) => prev > 0 ? prev - 1 : TRACKS.length - 1)}
                            className="hover:text-quantum-glow transition-colors"
                        >
                            <SkipBack className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                        </button>
                        <button 
                            onClick={() => setCurrentTrack((prev) => (prev + 1) % TRACKS.length)}
                            className="hover:text-quantum-glow transition-colors"
                        >
                            <SkipForward className="w-6 h-6" />
                        </button>
                    </div>

                    <button className="text-white/50 hover:text-white transition-colors">
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

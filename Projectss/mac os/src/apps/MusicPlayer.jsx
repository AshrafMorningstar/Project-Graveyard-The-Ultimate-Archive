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

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, List, Music as MusicIcon } from 'lucide-react';

const songs = [
    { title: "Quantum Dreams", artist: "Synthwave One", duration: "3:45", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80" },
    { title: "Neon Horizon", artist: "Cyber Runners", duration: "4:20", cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&q=80" },
    { title: "Deep Space", artist: "Stellar Drift", duration: "5:10", cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&q=80" },
    { title: "Binary Sunset", artist: "Code Masters", duration: "3:15", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80" },
];

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => (p >= 100 ? 0 : p + 1));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white">
            {/* Sidebar */}
            <div className="w-48 bg-[#171717] p-4 flex flex-col gap-4 border-r border-white/10 hidden md:flex">
                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Library</div>
                <div className="flex items-center gap-2 bg-white/10 p-2 rounded text-sm font-medium cursor-pointer">
                    <MusicIcon size={16} className="text-pink-500" /> Listen Now
                </div>
                <div className="flex items-center gap-2 hover:bg-white/5 p-2 rounded text-sm font-medium cursor-pointer text-gray-400 hover:text-white transition-colors">
                    <List size={16} /> Browse
                </div>
                
                <div className="mt-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Playlists</div>
                {['Chill Vibes', 'Coding Focus', 'Gym Hype'].map(p => (
                    <div key={p} className="text-sm text-gray-400 hover:text-white cursor-pointer px-2 py-1">{p}</div>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 p-8 flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-[#1e1e1e]">
                    <div className="w-64 h-64 shadow-2xl rounded-xl overflow-hidden mb-6 relative group">
                        <img src={songs[currentSong].cover} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-1">{songs[currentSong].title}</h2>
                        <p className="text-gray-400">{songs[currentSong].artist}</p>
                    </div>
                    
                    {/* Controls */}
                    <div className="w-full max-w-md space-y-4">
                        <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                            <span>1:20</span>
                            <span>{songs[currentSong].duration}</span>
                        </div>
                        <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
                            <div className="h-full bg-pink-500 w-1/3 relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-8 mt-4">
                            <button onClick={() => setCurrentSong(prev => prev > 0 ? prev - 1 : songs.length - 1)} className="text-gray-400 hover:text-white"><SkipBack size={24} fill="currentColor" /></button>
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform text-white shadow-lg shadow-pink-500/20"
                            >
                                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                            </button>
                            <button onClick={() => setCurrentSong(prev => (prev + 1) % songs.length)} className="text-gray-400 hover:text-white"><SkipForward size={24} fill="currentColor" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;

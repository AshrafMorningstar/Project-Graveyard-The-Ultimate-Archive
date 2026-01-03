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

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

const SONGS = [
    { title: "Quantum Dreams", artist: "Neuro Beats", duration: 184 },
    { title: "Stellar Drift", artist: "Cosmic Lofi", duration: 210 },
    { title: "Event Horizon", artist: "Singularity", duration: 195 },
    { title: "Cyberpunk City", artist: "Synthwave", duration: 240 },
];

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const { settings } = useStore();
    const barsRef = useRef<HTMLDivElement>(null);

    const currentSong = SONGS[currentSongIndex];

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= currentSong.duration) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return p + 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentSong]);

    // Enhanced Visualizer Animation
    useEffect(() => {
        if (!barsRef.current) return;
        const bars = Array.from(barsRef.current.children) as HTMLElement[];
        let animationId: number;
        
        const animate = () => {
            if (!isPlaying) {
                bars.forEach(bar => {
                    bar.style.height = '4px';
                    bar.style.opacity = '0.3';
                });
                return;
            }
            
            bars.forEach((bar, i) => {
                // Generate a wave-like pattern combined with randomness
                const time = Date.now() / 200;
                const wave = Math.sin(time + i * 0.5) * 20; 
                const random = Math.random() * 40;
                const height = Math.max(10, Math.min(100, 20 + wave + random));
                
                bar.style.height = `${height}%`;
                bar.style.opacity = '0.8';
            });
            
            animationId = requestAnimationFrame(animate);
        };

        if (isPlaying) animate();
        else {
             bars.forEach(bar => {
                bar.style.height = '4px';
                bar.style.opacity = '0.3';
            });
        }
        
        return () => cancelAnimationFrame(animationId);
    }, [isPlaying]);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s < 10 ? '0' + s : s}`;
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-b from-chronos-dark to-black p-6 text-white relative overflow-hidden">
            {/* Background Ambience */}
            <div className={`absolute inset-0 bg-gradient-to-tr from-neuro-purple/20 to-transparent transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-20'}`} />
            
            {/* Visualizer Container */}
            <div className="flex-1 bg-black/40 rounded-3xl mb-6 relative overflow-hidden border border-white/5 flex flex-col items-center justify-center group shadow-2xl z-10">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-lg transition-all duration-700 ${isPlaying ? 'scale-110 shadow-[0_0_30px_rgba(76,201,240,0.3)]' : ''}`}>
                    <Music size={40} className={`text-white/30 transition-all duration-500 ${isPlaying ? 'text-quantum-glow' : ''}`} />
                </div>
                
                {/* Visualizer Bars */}
                <div ref={barsRef} className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-1.5 px-8 pb-4">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i} 
                            className="w-2 bg-gradient-to-t from-neuro-purple to-quantum-cyan rounded-full transition-all duration-75"
                            style={{ height: '4px' }}
                        />
                    ))}
                </div>
            </div>

            {/* Track Info */}
            <div className="space-y-6 z-10">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="font-bold font-display text-2xl truncate mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{currentSong.title}</h3>
                        <p className="text-sm font-medium text-neuro-cyan tracking-wide uppercase text-[10px]">{currentSong.artist}</p>
                    </div>
                    <button className="text-gray-400 hover:text-white"><Volume2 size={18} /></button>
                </div>

                <div className="space-y-2">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group">
                        <div 
                            className="h-full relative group-hover:bg-quantum-glow transition-all duration-300"
                            style={{ width: `${(progress / currentSong.duration) * 100}%`, backgroundColor: settings.accentColor }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg scale-0 group-hover:scale-150 transition-transform" />
                        </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono tracking-wider">
                        <span>{formatTime(progress)}</span>

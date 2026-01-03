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

﻿/**
 * @file QuantumRadioApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * ðŸŒŒ Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

const QuantumRadioApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // Simulation of audio data since we can't auto-play audio reliably without user interaction in a mock environment
  // In a real app, this would use AudioContext analyserNode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bars = 64;
    const barWidth = canvas.width / bars;
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (isPlaying) {
            for (let i = 0; i < bars; i++) {
                // Generate pseudo-random heights based on sine waves to look like music
                const time = Date.now() / 200;
                const height = Math.abs(Math.sin(time + i * 0.2) * Math.cos(time * 0.5 + i * 0.1)) * canvas.height * 0.8;
                
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
                gradient.addColorStop(0, '#3A0CA3');
                gradient.addColorStop(0.5, '#4CC9F0');
                gradient.addColorStop(1, '#F72585');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height);
            }
        } else {
             // Idle line
             ctx.beginPath();
             ctx.moveTo(0, canvas.height / 2);
             ctx.lineTo(canvas.width, canvas.height / 2);
             ctx.strokeStyle = '#4CC9F0';
             ctx.lineWidth = 2;
             ctx.stroke();
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="h-full bg-black flex flex-col text-white">
        {/* Visualizer */}
        <div className="flex-1 relative bg-black/50">
             <canvas ref={canvasRef} width={400} height={300} className="w-full h-full" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
             <div className="absolute bottom-4 left-4">
                 <h3 className="text-xl font-bold font-space-grotesk text-quantum-glow">Stellar Drift</h3>
                 <p className="text-sm text-gray-400">Quantum Frequency â€¢ 432Hz</p>
             </div>
        </div>

        {/* Controls */}
        <div className="h-24 bg-chronos-dark border-t border-white/10 flex flex-col justify-center px-6 gap-2">
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full bg-quantum-matter relative ${isPlaying ? 'w-1/3 animate-pulse' : 'w-0'}`}></div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <button className="text-gray-400 hover:text-white"><SkipBack /></button>
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
                    >
                        {isPlaying ? <Pause fill="black" /> : <Play fill="black" className="ml-1" />}
                    </button>
                    <button className="text-gray-400 hover:text-white"><SkipForward /></button>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    <Volume2 size={16} />
                    <div className="w-20 h-1 bg-gray-600 rounded-full">
                        <div className="w-2/3 h-full bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default QuantumRadioApp;

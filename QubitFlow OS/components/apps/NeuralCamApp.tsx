/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file NeuralCamApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 QubitFlow OS - The Quantum Computing Interface
 * "The future is unwritten, but the code is compiled."
 */

import React, { useRef, useEffect, useState } from 'react';
import { Camera, Video, AlertCircle } from 'lucide-react';

const NeuralCamApp: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('none');

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            setError("Could not access Neural Sensor (Webcam). Permission denied or unavailable.");
        }
    };

    startCamera();

    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-black text-white relative overflow-hidden">
        {/* Viewfinder */}
        <div className="flex-1 relative flex items-center justify-center bg-gray-900">
            {error ? (
                <div className="text-center p-8">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-400 font-mono">{error}</p>
                </div>
            ) : (
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover transform scale-x-[-1]"
                    style={{ filter: filter }}
                />
            )}
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent">
                <div className="w-8 h-8 border-t-2 border-l-2 border-neuro-cyan absolute top-4 left-4"></div>
                <div className="w-8 h-8 border-t-2 border-r-2 border-neuro-cyan absolute top-4 right-4"></div>
                <div className="w-8 h-8 border-b-2 border-l-2 border-neuro-cyan absolute bottom-4 left-4"></div>
                <div className="w-8 h-8 border-b-2 border-r-2 border-neuro-cyan absolute bottom-4 right-4"></div>
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-neuro-cyan animate-pulse">
                    REC • {new Date().toLocaleTimeString()}
                </div>
            </div>
        </div>

        {/* Controls */}
        <div className="h-24 bg-black/80 backdrop-blur border-t border-white/10 flex items-center justify-center gap-8 z-10">
            <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setFilter('none')}>
                <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-transparent hover:border-white"></div>
                <span className="text-[10px] uppercase">Normal</span>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setFilter('sepia(100%) hue-rotate(190deg) saturate(300%)')}>
                <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-transparent hover:border-white"></div>
                <span className="text-[10px] uppercase">Cyber</span>
            </div>
            
            <button className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/10 transition active:scale-95">
                <div className="w-12 h-12 bg-white rounded-full"></div>
            </button>
            
             <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setFilter('grayscale(100%) contrast(120%)')}>
                <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-transparent hover:border-white"></div>
                <span className="text-[10px] uppercase">Noir</span>
            </div>
             <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setFilter('invert(100%)')}>
                <div className="w-10 h-10 rounded-full bg-white border-2 border-transparent hover:border-white"></div>
                <span className="text-[10px] uppercase">X-Ray</span>
            </div>
        </div>
    </div>
  );
};

export default NeuralCamApp;
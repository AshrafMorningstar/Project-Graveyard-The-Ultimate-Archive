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

import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, Video, Circle, Maximize2 } from 'lucide-react';

export const CosmicCamera: React.FC = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Attempt to access camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(s => setStream(s))
            .catch(err => {
                console.error("Camera access denied:", err);
                setError("Camera access denied or not available in this quantum sector.");
            });

        return () => {
             if (stream) {
                 stream.getTracks().forEach(track => track.stop());
             }
        };
    }, []);

    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
            {error ? (
                <div className="text-center p-8 text-white/50">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>{error}</p>
                </div>
            ) : (
                <div className="w-full h-full relative">
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-full h-full object-cover transform scale-x-[-1]"
                    />
                    
                    {/* Filter Overlay */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-overlay bg-gradient-to-tr from-purple-500/20 to-blue-500/20" />
                    
                    {/* UI Controls */}
                    <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8">
                        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                        <button className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform">
                            <div className="w-16 h-16 bg-white rounded-full" />
                        </button>
                        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                            <Video className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

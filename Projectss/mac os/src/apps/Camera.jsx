/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect, useRef } from 'react';

const WebcamApp = () => {
    const videoRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setHasPermission(true);
                }
            } catch (err) {
                console.error("Camera access denied", err);
            }
        };
        getMedia();
    }, []);

    return (
        <div className="h-full bg-black flex items-center justify-center relative overflow-hidden">
            {!hasPermission && (
                <div className="text-white/50">Camera access required</div>
            )}
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover transform scale-x-[-1]"
            />
            <div className="absolute bottom-6 w-16 h-16 rounded-full border-4 border-white bg-white/20 cursor-pointer hover:bg-white/40 transition-colors flex items-center justify-center">
                 <div className="w-12 h-12 bg-white rounded-full"></div>
            </div>
        </div>
    );
};

export default WebcamApp;

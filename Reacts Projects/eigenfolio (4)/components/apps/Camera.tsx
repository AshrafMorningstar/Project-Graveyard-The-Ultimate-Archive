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

import React, { useRef, useState, useCallback } from 'react';
import { Camera as CameraIcon, RotateCcw, Download } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Camera: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const { addNotification } = useStore();

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            addNotification({
                title: "Camera Error",
                message: "Could not access camera device.",
                appId: 'camera'
            });
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, 640, 480);
                const dataUrl = canvasRef.current.toDataURL('image/png');
                setPhoto(dataUrl);
            }
        }
    };

    const downloadPhoto = () => {
        if (photo) {
            const link = document.createElement('a');
            link.href = photo;
            link.download = 'holo-capture.png';
            link.click();
        }
    };

    React.useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    return (
        <div className="h-full flex flex-col bg-black relative overflow-hidden">
            {/* Viewfinder */}
            <div className="flex-1 relative flex items-center justify-center bg-black">
                {photo ? (
                    <img src={photo} alt="Capture" className="max-h-full max-w-full" />
                ) : (
                    <video ref={videoRef} autoPlay playsInline muted className="max-h-full max-w-full transform scale-x-[-1]" />
                )}
                
                {/* Hidden canvas for capture */}
                <canvas ref={canvasRef} width={640} height={480} className="hidden" />
            </div>

            {/* Controls */}
            <div className="h-24 bg-black/80 backdrop-blur-md flex items-center justify-center gap-12 z-10 border-t border-white/10">
                {photo ? (
                    <>
                        <button onClick={() => setPhoto(null)} className="flex flex-col items-center gap-1 text-white hover:text-blue-400">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <RotateCcw size={20} />
                            </div>
                            <span className="text-xs">Retake</span>
                        </button>
                        <button onClick={downloadPhoto} className="flex flex-col items-center gap-1 text-white hover:text-green-400">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                                <Download size={28} className="text-black" />
                            </div>
                            <span className="text-xs">Save</span>
                        </button>
                    </>
                ) : (
                    <button onClick={takePhoto} className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center p-1 hover:scale-105 transition-transform active:scale-95">
                        <div className="w-full h-full bg-white rounded-full" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Camera;
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

import React, { useRef, useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Eraser, Download, Trash2, Undo } from 'lucide-react';

const COLORS = ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#3A0CA3', '#F72585', '#4CC9F0'];

const Paint: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState(5);
    const [isDrawing, setIsDrawing] = useState(false);
    const { settings } = useStore();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.parentElement?.clientWidth || 800;
            canvas.height = canvas.parentElement?.clientHeight || 600;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, []);

    const startDrawing = (e: React.MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
         const canvas = canvasRef.current;
         const ctx = canvas?.getContext('2d');
         if (canvas && ctx) {
             ctx.fillStyle = '#ffffff';
             ctx.fillRect(0, 0, canvas.width, canvas.height);
         }
    };

    const downloadCanvas = () => {
        const link = document.createElement('a');
        link.download = 'quantum_art.png';
        link.href = canvasRef.current?.toDataURL() || '';
        link.click();
    };

    return (
        <div className="h-full flex flex-col bg-gray-100">
            <div className="p-2 border-b border-gray-300 bg-gray-200 flex items-center gap-4 text-black">
                <div className="flex gap-1">
                    {COLORS.map(c => (
                        <button 
                            key={c}
                            className={`w-6 h-6 rounded-full border border-gray-400 ${color === c ? 'ring-2 ring-blue-500 scale-110' : ''}`}
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                        />
                    ))}
                </div>
                <div className="w-px h-6 bg-gray-400" />
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">Size:</span>
                    <input 
                        type="range" 
                        min="1" 
                        max="50" 
                        value={size} 
                        onChange={(e) => setSize(Number(e.target.value))} 
                        className="w-24 accent-blue-600"
                    />
                </div>
                <div className="w-px h-6 bg-gray-400" />
                <button onClick={() => setColor('#ffffff')} className={`p-1.5 rounded hover:bg-gray-300 ${color === '#ffffff' ? 'bg-gray-300' : ''}`} title="Eraser">
                    <Eraser size={18} />
                </button>
                <button onClick={clearCanvas} className="p-1.5 rounded hover:bg-gray-300" title="Clear">
                    <Trash2 size={18} />
                </button>
                <div className="flex-1" />
                <button onClick={downloadCanvas} className="p-1.5 rounded hover:bg-gray-300 text-blue-600" title="Save">
                    <Download size={18} />
                </button>
            </div>
            
            <div className="flex-1 relative cursor-crosshair overflow-hidden">
                <canvas 
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>
        </div>
    );
};

export default Paint;
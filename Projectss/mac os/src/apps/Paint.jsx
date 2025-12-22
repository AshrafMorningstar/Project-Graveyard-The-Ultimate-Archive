/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useRef, useEffect } from 'react';
import { Eraser, Pencil, MousePointer } from 'lucide-react';

const Paint = () => {
    const canvasRef = useRef(null);
    const [color, setColor] = useState('#000000');
    const [tool, setTool] = useState('pencil');
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }, []);

    const startDraw = (e) => {
        setIsDrawing(true);
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        const rect = canvasRef.current.getBoundingClientRect();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current.getContext('2d');
        const rect = canvasRef.current.getBoundingClientRect();
        ctx.lineWidth = tool === 'eraser' ? 20 : 2;
        ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };

    const stopDraw = () => {
        setIsDrawing(false);
    };

    return (
        <div className="h-full flex flex-col bg-gray-100">
            {/* Toolbar */}
            <div className="h-12 bg-gray-200 border-b border-gray-300 flex items-center px-4 gap-4">
                 <button onClick={() => setTool('pencil')} className={`p-2 rounded ${tool === 'pencil' ? 'bg-white shadow' : ''}`}><Pencil size={20}/></button>
                 <button onClick={() => setTool('eraser')} className={`p-2 rounded ${tool === 'eraser' ? 'bg-white shadow' : ''}`}><Eraser size={20}/></button>
                 <div className="w-px h-6 bg-gray-300 mx-2"></div>
                 <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded border-none cursor-pointer" />
            </div>
            
            <div className="flex-1 relative cursor-crosshair">
                <canvas 
                    ref={canvasRef}
                    className="w-full h-full block bg-white"
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={stopDraw}
                    onMouseLeave={stopDraw}
                />
            </div>
        </div>
    );
};

export default Paint;

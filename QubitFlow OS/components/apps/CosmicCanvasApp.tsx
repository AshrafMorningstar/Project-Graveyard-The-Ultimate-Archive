/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file CosmicCanvasApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 QubitFlow OS - The Quantum Computing Interface
 * "The future is unwritten, but the code is compiled."
 */

import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pen, Download, Trash2, Palette, Undo } from 'lucide-react';

const CosmicCanvasApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#00F5FF');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set initial canvas size to match parent
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 600;
    
    // Default background
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#050510' : color;
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `cosmic-art-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-full flex flex-col bg-chronos-dark">
      {/* Toolbar */}
      <div className="h-14 bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <button 
             onClick={() => setTool('pen')}
             className={`p-2 rounded-lg transition ${tool === 'pen' ? 'bg-neuro-purple text-white' : 'text-gray-400 hover:bg-white/10'}`}
           >
             <Pen size={18} />
           </button>
           <button 
             onClick={() => setTool('eraser')}
             className={`p-2 rounded-lg transition ${tool === 'eraser' ? 'bg-neuro-purple text-white' : 'text-gray-400 hover:bg-white/10'}`}
           >
             <Eraser size={18} />
           </button>
           <div className="w-px h-6 bg-white/10 mx-2"></div>
           
           <input 
             type="color" 
             value={color} 
             onChange={(e) => setColor(e.target.value)}
             className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
           />
           
           <input 
             type="range" 
             min="1" 
             max="50" 
             value={brushSize} 
             onChange={(e) => setBrushSize(parseInt(e.target.value))}
             className="w-24 accent-neuro-cyan"
           />
        </div>

        <div className="flex items-center gap-2">
            <button onClick={clearCanvas} className="p-2 text-red-400 hover:bg-white/10 rounded-lg"><Trash2 size={18} /></button>
            <button onClick={downloadCanvas} className="p-2 text-green-400 hover:bg-white/10 rounded-lg"><Download size={18} /></button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-hidden relative cursor-crosshair">
        <canvas 
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default CosmicCanvasApp;
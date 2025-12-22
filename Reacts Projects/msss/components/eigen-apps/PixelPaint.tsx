/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState } from 'react';
import { Eraser, Download, Palette } from 'lucide-react';

export const PixelPaint: React.FC = () => {
    const GRID_SIZE = 16;
    const [pixels, setPixels] = useState(Array(GRID_SIZE * GRID_SIZE).fill('transparent'));
    const [color, setColor] = useState('#ec4899'); // Pink default

    const COLORS = [
        '#ec4899', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ffffff', '#000000'
    ];

    const handlePixelClick = (index: number) => {
        const newPixels = [...pixels];
        newPixels[index] = color;
        setPixels(newPixels);
    };

    return (
        <div className="h-full bg-stone-900 flex flex-col items-center justify-center p-4">
            <div className="mb-4 flex gap-2 p-2 bg-stone-800 rounded-lg border border-stone-700">
                {COLORS.map(c => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-6 h-6 rounded-full border-2 ${color === c ? 'border-white scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: c }}
                    />
                ))}
                <div className="w-px h-6 bg-stone-600 mx-1" />
                <button onClick={() => setPixels(Array(GRID_SIZE * GRID_SIZE).fill('transparent'))} className="text-stone-400 hover:text-white">
                    <Eraser className="w-5 h-5" />
                </button>
            </div>

            <div 
                className="grid gap-px bg-stone-700 border-4 border-stone-800 rounded shadow-2xl"
                style={{ 
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    width: '320px',
                    height: '320px'
                }}
            >
                {pixels.map((pixelColor, i) => (
                    <div 
                        key={i}
                        onClick={() => handlePixelClick(i)}
                        onMouseEnter={(e) => { if (e.buttons === 1) handlePixelClick(i); }}
                        className="w-full h-full cursor-pointer hover:opacity-80 transition-opacity duration-75 bg-stone-900"
                        style={{ backgroundColor: pixelColor }}
                    />
                ))}
            </div>
            
            <p className="mt-4 text-xs text-stone-500">Draw something cosmic. 16x16 Grid.</p>
        </div>
    );
};

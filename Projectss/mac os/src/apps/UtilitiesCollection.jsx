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

import React, { useState } from 'react';
import { BookA, Palette, Calculator, Type, PenTool } from 'lucide-react';

export const Dictionary = () => (
    <div className="h-full bg-[#f2f2f7] flex flex-col">
        <div className="bg-[#e5e5e5] p-2 border-b border-gray-300">
            <input className="w-full bg-white rounded-md px-3 py-1 text-sm" placeholder="Search" />
        </div>
        <div className="flex-1 p-8 bg-white m-4 rounded shadow-sm border border-gray-200">
            <h1 className="text-3xl font-serif font-bold mb-2">Apple</h1>
            <div className="text-gray-500 italic mb-4">noun</div>
            <p className="font-serif leading-relaxed">The round fruit of a tree of the rose family, which typically has thin red or green skin and crisp flesh. Many varieties have been developed as dessert or cooking fruit or for making cider.</p>
        </div>
    </div>
);

export const FontBook = () => (
    <div className="h-full bg-white flex text-black">
        <div className="w-48 bg-gray-100 border-r overflow-auto p-2 text-sm">
            {['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS'].map(f => (
                <div key={f} className="px-2 py-1 hover:bg-blue-500 hover:text-white cursor-pointer rounded">{f}</div>
            ))}
        </div>
        <div className="flex-1 flex items-center justify-center text-6xl">
            Aa Bb Cc
        </div>
    </div>
);

export const Grapher = () => (
    <div className="h-full bg-white flex flex-col">
        <div className="h-10 border-b flex items-center px-4 bg-gray-50">
            y = x^2
        </div>
        <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-black"></div>
                <div className="h-full w-px bg-black absolute"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="-10 -10 20 20" preserveAspectRatio="none">
                    <path d="M -10 100 Q 0 100 0 0 Q 0 100 10 100" stroke="blue" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>
            </div>
        </div>
    </div>
);

export const ColorMeter = () => (
    <div className="h-full bg-[#2d2d2d] text-white flex flex-col p-4 items-center justify-center gap-4">
        <div className="w-32 h-32 border-4 border-white rounded-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500"></div>
        <div className="text-mono">#FF00A2</div>
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-400">
            <div>R: 255</div>
            <div>G: 0</div>
            <div>B: 162</div>
        </div>
    </div>
);

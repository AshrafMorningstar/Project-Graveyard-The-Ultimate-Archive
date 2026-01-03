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
import { StickyNote, Type, PenTool } from 'lucide-react';

export const Freeform = () => (
    <div className="h-full bg-[#f0f0f0] relative overflow-hidden cursor-move" style={{ backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        <div className="absolute top-20 left-20 w-48 h-32 bg-yellow-100 shadow-xl p-4 transform -rotate-2 rounded">
            <h3 className="font-bold">Project Idea</h3>
            <p className="text-sm mt-2">Build a quantum OS...</p>
        </div>
        <div className="absolute top-60 left-80 w-64 h-48 bg-white shadow-xl p-4 rounded border border-gray-200">
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">Image</div>
        </div>
    </div>
);

export const Stickies = () => (
    <div className="h-full bg-transparent p-4 flex flex-wrap gap-4 content-start">
        <div className="w-40 h-40 bg-[#ffeb3b] shadow-lg p-2 flex flex-col rotate-1">
            <div className="h-4 bg-black/10 cursor-move mb-1"></div>
            <textarea className="flex-1 bg-transparent resize-none focus:outline-none text-sm font-handwriting" defaultValue="Buy milk"></textarea>
        </div>
        <div className="w-40 h-40 bg-[#ff80ab] shadow-lg p-2 flex flex-col -rotate-1">
             <div className="h-4 bg-black/10 cursor-move mb-1"></div>
             <textarea className="flex-1 bg-transparent resize-none focus:outline-none text-sm" defaultValue="Meeting at 2pm"></textarea>
        </div>
    </div>
);

export const TextEdit = () => (
    <div className="h-full bg-white flex flex-col text-black">
        <div className="h-8 border-b flex items-center px-2 gap-2 bg-[#f0f0f0] text-xs">
            <select><option>Helvetica</option></select>
            <select><option>12</option></select>
            <button className="font-bold text-lg">B</button>
            <button className="italic font-serif text-lg">I</button>
            <button className="underline text-lg">U</button>
        </div>
        <textarea className="flex-1 p-8 focus:outline-none resize-none" placeholder="Start typing..."></textarea>
    </div>
);

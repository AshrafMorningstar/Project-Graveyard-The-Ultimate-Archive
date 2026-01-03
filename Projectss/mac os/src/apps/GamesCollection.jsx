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
import { RefreshCw, Play, Trophy } from 'lucide-react';

export const Solitaire = () => (
    <div className="h-full bg-[#005c2d] flex items-center justify-center text-white flex-col">
        <h1 className="text-4xl font-serif font-bold mb-4 text-[#ffeb3b] drop-shadow-md">Solitaire</h1>
        <div className="flex gap-4 mb-8">
            {[...Array(7)].map((_, i) => (
                <div key={i} className="w-16 h-24 bg-white rounded shadow-lg border-2 border-gray-300"></div>
            ))}
        </div>
        <button className="bg-[#ffeb3b] text-black px-6 py-2 rounded-full font-bold shadow-lg">New Deal</button>
    </div>
);

export const Chess = () => (
    <div className="h-full bg-[#2d2d2d] flex items-center justify-center">
        <div className="w-96 h-96 bg-[#deb887] grid grid-cols-8 border-4 border-[#8b4513]">
            {[...Array(64)].map((_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const isBlack = (row + col) % 2 === 1;
                return <div key={i} className={`${isBlack ? 'bg-[#8b4513]' : 'bg-[#ffe4c4]'}`}></div>
            })}
        </div>
    </div>
);

export const Sudoku = () => (
    <div className="h-full bg-white flex items-center justify-center">
        <div className="grid grid-cols-9 border-2 border-black">
            {[...Array(81)].map((_, i) => (
                <div key={i} className="w-8 h-8 border border-gray-300 flex items-center justify-center text-sm">
                    {Math.random() > 0.7 ? Math.ceil(Math.random() * 9) : ''}
                </div>
            ))}
        </div>
    </div>
);

export const Minesweeper = () => (
    <div className="h-full bg-[#c0c0c0] p-4 border-t-4 border-l-4 border-white border-b-4 border-r-4 border-gray-500 flex flex-col items-center justify-center">
        <div className="bg-[#c0c0c0] border-2 border-gray-500 mb-4 px-4 py-2 font-mono font-bold text-red-600 text-2xl bg-black w-full text-center">000</div>
        <div className="grid grid-cols-10 gap-1 border-4 border-gray-400">
            {[...Array(100)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-500 hover:bg-gray-300 active:border-none"></div>
            ))}
        </div>
    </div>
);

export const Game2048 = () => (
    <div className="h-full bg-[#faf8ef] flex items-center justify-center flex-col text-[#776e65]">
        <h1 className="text-4xl font-bold mb-4">2048</h1>
        <div className="bg-[#bbada0] p-2 rounded-lg grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
                <div key={i} className="w-16 h-16 bg-[#cdc1b4] rounded flex items-center justify-center font-bold text-2xl text-[#f9f6f2]">
                    {i === 5 ? 2 : i === 8 ? 4 : ''}
                </div>
            ))}
        </div>
    </div>
);

export const DinoRun = () => (
    <div className="h-full bg-white flex flex-col items-center justify-center overflow-hidden relative">
        <div className="text-gray-500 mb-8">Press Space to Jump</div>
        <div className="w-full border-b border-gray-400 absolute bottom-1/3"></div>
        <div className="absolute bottom-1/3 left-20 w-8 h-10 bg-gray-700"></div>
        <div className="absolute bottom-1/3 left-96 w-4 h-8 bg-gray-500"></div>
    </div>
);

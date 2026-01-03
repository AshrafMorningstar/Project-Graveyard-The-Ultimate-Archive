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

/**
 * @file SolitaireApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Solitaire Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const SolitaireApp: React.FC = () => {
    // Simplified visual representation for the demo
    const Card = ({ suit, value, color, faceDown = false }: any) => (
        <div className={`w-16 h-24 bg-white rounded shadow-md border border-gray-200 flex flex-col items-center justify-center relative select-none hover:-translate-y-1 transition-transform ${faceDown ? 'bg-blue-800' : ''}`}>
             {!faceDown ? (
                 <>
                    <div className={`absolute top-1 left-1 text-xs font-bold ${color}`}>{value}{suit}</div>
                    <div className={`text-2xl ${color}`}>{suit}</div>
                    <div className={`absolute bottom-1 right-1 text-xs font-bold ${color} rotate-180`}>{value}{suit}</div>
                 </>
             ) : (
                 <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
             )}
        </div>
    );

    return (
        <div className="h-full bg-green-800 flex flex-col items-center justify-between p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#166534_0%,_#14532d_100%)]"></div>
            
            {/* Top Bar */}
            <div className="relative z-10 w-full flex justify-between items-center text-white/80 mb-8">
                <h1 className="text-xl font-bold font-serif italic">Solitaire</h1>
                <div className="flex gap-4 text-sm font-mono">
                    <span>Score: 0</span>
                    <span>Time: 00:00</span>
                    <button className="flex items-center gap-1 hover:text-white"><RefreshCw size={14}/> Restart</button>
                </div>
            </div>

            {/* Game Area */}
            <div className="relative z-10 flex-1 w-full max-w-4xl flex flex-col gap-12">
                {/* Top Row: Stock & Foundation */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                        <Card faceDown />
                        <div className="w-16 h-24 border-2 border-white/20 rounded-lg flex items-center justify-center text-white/20">↺</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-16 h-24 border-2 border-white/20 rounded-lg flex items-center justify-center text-xl text-white/20">♠</div>
                        <div className="w-16 h-24 border-2 border-white/20 rounded-lg flex items-center justify-center text-xl text-white/20">♥</div>
                        <div className="w-16 h-24 border-2 border-white/20 rounded-lg flex items-center justify-center text-xl text-white/20">♣</div>
                        <div className="w-16 h-24 border-2 border-white/20 rounded-lg flex items-center justify-center text-xl text-white/20">♦</div>
                    </div>
                </div>

                {/* Tableau */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col -space-y-20">
                         <Card suit="♠" value="A" color="text-black" />
                    </div>
                    <div className="flex flex-col -space-y-20">
                         <Card faceDown />
                         <Card suit="♥" value="K" color="text-red-600" />
                    </div>
                    <div className="flex flex-col -space-y-20">
                         <Card faceDown />
                         <Card faceDown />
                         <Card suit="♣" value="8" color="text-black" />
                    </div>
                    <div className="flex flex-col -space-y-20">
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card suit="♦" value="Q" color="text-red-600" />
                    </div>
                     <div className="flex flex-col -space-y-20">
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card suit="♠" value="5" color="text-black" />
                    </div>
                     <div className="flex flex-col -space-y-20">
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card suit="♥" value="10" color="text-red-600" />
                    </div>
                     <div className="flex flex-col -space-y-20">
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card faceDown />
                         <Card suit="♣" value="3" color="text-black" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolitaireApp;

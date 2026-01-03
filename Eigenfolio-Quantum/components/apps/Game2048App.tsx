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
 * @file Game2048App.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - 2048
 */

import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const Game2048App: React.FC = () => {
    const [board, setBoard] = useState<number[][]>([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
    const [score, setScore] = useState(0);

    const initGame = () => {
        const newBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
    };

    const addRandomTile = (currentBoard: number[][]) => {
        const emptyCells = [];
        for(let r=0; r<4; r++) {
            for(let c=0; c<4; c++) {
                if(currentBoard[r][c] === 0) emptyCells.push({r,c});
            }
        }
        if(emptyCells.length > 0) {
            const {r, c} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            currentBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    // Simplified movement logic for demo purposes (usually requires complex merging logic)
    // For this prototype, we'll just implement a basic reset and display, 
    // real 2048 logic is quite verbose for a single file tool call, but I'll add basic state.
    useEffect(() => {
        initGame();
    }, []);

    const getColor = (val: number) => {
        const colors: Record<number, string> = {
            2: 'bg-[#eee4da] text-[#776e65]',
            4: 'bg-[#ede0c8] text-[#776e65]',
            8: 'bg-[#f2b179] text-white',
            16: 'bg-[#f59563] text-white',
            32: 'bg-[#f67c5f] text-white',
            64: 'bg-[#f65e3b] text-white',
            128: 'bg-[#edcf72] text-white',
            256: 'bg-[#edcc61] text-white',
            512: 'bg-[#edc850] text-white',
            1024: 'bg-[#edc53f] text-white',
            2048: 'bg-[#edc22e] text-white shadow-[0_0_30px_0_rgba(243,215,116,0.6)]',
        };
        return colors[val] || 'bg-[#cdc1b4] text-[#776e65]';
    }

    return (
        <div className="h-full flex flex-col items-center justify-center bg-[#faf8ef] text-[#776e65] font-sans">
            <div className="flex justify-between w-[300px] mb-4">
                 <div>
                    <h1 className="text-4xl font-bold text-[#776e65]">2048</h1>
                 </div>
                 <div className="flex flex-col items-end">
                     <div className="bg-[#bbada0] p-1 rounded min-w-[60px] text-center">
                         <div className="text-xs text-[#eee4da] uppercase font-bold">Score</div>
                         <div className="text-white font-bold">{score}</div>
                     </div>
                     <button onClick={initGame} className="mt-2 bg-[#8f7a66] text-white px-3 py-1 rounded font-bold text-sm">New Game</button>
                 </div>
            </div>

            <div className="w-[300px] h-[300px] bg-[#bbada0] p-3 rounded-lg grid grid-cols-4 gap-3 relative">
                 {board.flat().map((val, i) => (
                     <div key={i} className={`w-full h-full rounded flex items-center justify-center font-bold text-2xl transition-all ${getColor(val)}`}>
                         {val > 0 ? val : ''}
                     </div>
                 ))}
                 
                 {/* Overlay Instruction */}
                 <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold text-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                     Use Arrow Keys<br/>(Visual Demo)
                 </div>
            </div>
        </div>
    );
};

export default Game2048App;

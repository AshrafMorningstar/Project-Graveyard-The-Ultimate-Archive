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
 * @file ChessApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - Chess
 */

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const ChessApp: React.FC = () => {
    // Simple visual representation of a chess board
    const initialBoard = [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ];

    const [board, setBoard] = useState(initialBoard);
    const [selected, setSelected] = useState<{r: number, c: number} | null>(null);

    const handleSquareClick = (r: number, c: number) => {
        if (selected) {
            // Move piece (super basic, no validation)
            const newBoard = [...board.map(row => [...row])];
            newBoard[r][c] = newBoard[selected.r][selected.c];
            newBoard[selected.r][selected.c] = '';
            setBoard(newBoard);
            setSelected(null);
        } else {
            if (board[r][c]) {
                setSelected({ r, c });
            }
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center bg-[#2c2c2e] text-white">
            <div className="mb-4 flex gap-4">
                <h1 className="text-2xl font-bold font-serif">Quantum Chess</h1>
                <button onClick={() => { setBoard(initialBoard); setSelected(null); }} className="bg-white/10 p-2 rounded hover:bg-white/20"><RefreshCw size={20}/></button>
            </div>
            
            <div className="grid grid-cols-8 border-4 border-[#4a4a4c] shadow-2xl">
                {board.map((row, r) => (
                    row.map((piece, c) => {
                        const isBlack = (r + c) % 2 === 1;
                        const isSelected = selected?.r === r && selected?.c === c;
                        return (
                            <div 
                                key={`${r}-${c}`}
                                onClick={() => handleSquareClick(r, c)}
                                className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-3xl md:text-5xl cursor-pointer select-none transition-colors
                                    ${isBlack ? 'bg-[#769656]' : 'bg-[#eeeed2]'}
                                    ${isSelected ? 'ring-inset ring-4 ring-yellow-400' : ''}
                                    ${piece ? 'hover:scale-110 active:scale-95 transition-transform' : ''}
                                `}
                                style={{ color: piece ? (['♜','♞','♝','♛','♚','♟'].includes(piece) ? 'black' : 'white') : 'transparent', textShadow: piece && !['♜','♞','♝','♛','♚','♟'].includes(piece) ? '0 2px 2px rgba(0,0,0,0.5)' : 'none' }} 
                            >
                                {piece}
                            </div>
                        );
                    })
                ))}
            </div>
             <div className="mt-4 text-gray-400 text-sm">Select a piece, then select a target square to move.</div>
        </div>
    );
};

export default ChessApp;

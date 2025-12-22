/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, MapPin } from 'lucide-react';

export const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);

    const checkWinner = (squares: any[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i: number) => {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXisNext(!xIsNext);
        setWinner(checkWinner(newBoard));
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setXisNext(true);
    };

    // AI Move
    useEffect(() => {
        if (!xIsNext && !winner && board.includes(null)) {
            // Simple random AI
            const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
            if (emptyIndices.length > 0) {
                const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                setTimeout(() => handleClick(randomIdx as number), 500);
            }
        }
    }, [xIsNext, winner, board]);

    return (
        <div className="h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold mb-8 tracking-widest uppercase">Quantum Tic-Tac-Toe</h1>
            
            <div className="grid grid-cols-3 gap-2 bg-white/20 p-2 rounded-xl backdrop-blur-xl">
                {board.map((val, i) => (
                    <button 
                        key={i}
                        onClick={() => handleClick(i)}
                        className={`w-20 h-20 rounded-lg text-4xl font-bold flex items-center justify-center transition-all duration-300
                            ${val === 'X' ? 'bg-cyan-500 text-black' : val === 'O' ? 'bg-pink-500 text-white' : 'bg-white/10 hover:bg-white/20'}
                        `}
                    >
                        {val}
                    </button>
                ))}
            </div>

            <div className="mt-8 h-12 flex items-center justify-center">
                 {winner ? (
                     <div className="text-2xl font-bold animate-bounce text-yellow-400">
                         {winner === 'X' ? 'YOU WIN!' : 'SYSTEM WINS!'}
                     </div>
                 ) : (
                     <div className="text-white/50">{xIsNext ? "Your Turn (X)" : "Computing..."}</div>
                 )}
            </div>

            <button onClick={reset} className="mt-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <RefreshCw className="w-5 h-5" />
            </button>
        </div>
    );
};

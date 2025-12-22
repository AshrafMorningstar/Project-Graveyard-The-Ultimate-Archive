/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (i) => {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
        setWinner(calculateWinner(newBoard));
    };

    const reset = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setWinner(null);
    };

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] flex flex-col items-center justify-center text-black dark:text-white">
             <div className="mb-4 text-2xl font-bold">
                 {winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}
             </div>

             <div className="grid grid-cols-3 gap-2 bg-gray-300 dark:bg-gray-700 p-2 rounded-lg">
                 {board.map((sq, i) => (
                     <button
                        key={i}
                        onClick={() => handleClick(i)}
                        className={`w-20 h-20 text-4xl font-bold bg-white dark:bg-[#2d2d2d] rounded flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#3d3d3d] transition-colors ${sq === 'X' ? 'text-blue-500' : 'text-red-500'}`}
                     >
                         {sq}
                     </button>
                 ))}
             </div>

             <button onClick={reset} className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                 <RotateCcw size={16} /> Reset Game
             </button>
        </div>
    );
};

export default TicTacToe;

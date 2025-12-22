/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file SudokuApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - Sudoku
 */

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const SudokuApp: React.FC = () => {
    // Very basic hardcoded grid for demo
    const initialGrid = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    const [grid, setGrid] = useState(initialGrid);

    const handleCellChange = (r: number, c: number, val: string) => {
        if (!/^[1-9]?$/.test(val)) return;
        const newGrid = [...grid.map(row => [...row])];
        newGrid[r][c] = val === '' ? 0 : parseInt(val);
        setGrid(newGrid);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
            <h1 className="text-3xl font-light mb-6">Sudoku</h1>
            
            <div className="grid grid-cols-9 border-2 border-black dark:border-white">
                {grid.map((row, r) => (
                    row.map((cell, c) => (
                        <input
                            key={`${r}-${c}`}
                            type="text"
                            maxLength={1}
                            value={cell === 0 ? '' : cell}
                            onChange={(e) => handleCellChange(r, c, e.target.value)}
                            className={`w-10 h-10 text-center text-lg border border-gray-300 dark:border-white/20 focus:bg-blue-100 dark:focus:bg-blue-900/50 outline-none
                                ${(c + 1) % 3 === 0 && c !== 8 ? 'border-r-2 border-r-black dark:border-r-white' : ''}
                                ${(r + 1) % 3 === 0 && r !== 8 ? 'border-b-2 border-b-black dark:border-b-white' : ''}
                                ${initialGrid[r][c] !== 0 ? 'font-bold bg-gray-100 dark:bg-white/10' : 'text-blue-600 dark:text-blue-400'}
                                bg-transparent
                            `}
                            readOnly={initialGrid[r][c] !== 0}
                        />
                    ))
                ))}
            </div>

            <div className="mt-8 flex gap-4">
                 <button onClick={() => setGrid(initialGrid)} className="px-4 py-2 bg-gray-200 dark:bg-white/10 rounded-lg hover:bg-gray-300 transition flex items-center gap-2">
                     <RefreshCw size={16}/> Reset
                 </button>
            </div>
        </div>
    );
};

export default SudokuApp;

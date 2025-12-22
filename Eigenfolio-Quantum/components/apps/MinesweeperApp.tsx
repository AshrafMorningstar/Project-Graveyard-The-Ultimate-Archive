/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file MinesweeperApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - Minesweeper
 */

import React, { useState, useEffect } from 'react';
import { RefreshCw, Flag, Bomb } from 'lucide-react';

interface Cell {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
}

const MinesweeperApp: React.FC = () => {
    const ROWS = 10;
    const COLS = 10;
    const MINES = 15;

    const [grid, setGrid] = useState<Cell[][]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        // Init Empty Grid
        let newGrid: Cell[][] = Array(ROWS).fill(null).map(() => 
            Array(COLS).fill(null).map(() => ({
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0
            }))
        );

        // Place Mines
        let minesPlaced = 0;
        while (minesPlaced < MINES) {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            if (!newGrid[r][c].isMine) {
                newGrid[r][c].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate Neighbors
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!newGrid[r][c].isMine) {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (r + i >= 0 && r + i < ROWS && c + j >= 0 && c + j < COLS && newGrid[r + i][c + j].isMine) {
                                count++;
                            }
                        }
                    }
                    newGrid[r][c].neighborMines = count;
                }
            }
        }

        setGrid(newGrid);
        setGameOver(false);
        setWin(false);
    };

    const revealCell = (r: number, c: number) => {
        if (gameOver || win || grid[r][c].isFlagged || grid[r][c].isRevealed) return;

        const newGrid = [...grid.map(row => [...row])];
        
        if (newGrid[r][c].isMine) {
            newGrid[r][c].isRevealed = true;
            setGrid(newGrid);
            setGameOver(true);
            return;
        }

        // Flood Fill
        const reveal = (row: number, col: number) => {
            if (row < 0 || row >= ROWS || col < 0 || col >= COLS || newGrid[row][col].isRevealed || newGrid[row][col].isFlagged) return;
            newGrid[row][col].isRevealed = true;
            if (newGrid[row][col].neighborMines === 0) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        reveal(row + i, col + j);
                    }
                }
            }
        };

        reveal(r, c);
        setGrid(newGrid);
        checkWin(newGrid);
    };

    const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
        e.preventDefault();
        if (gameOver || win || grid[r][c].isRevealed) return;
        const newGrid = [...grid.map(row => [...row])];
        newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
        setGrid(newGrid);
    };

    const checkWin = (currentGrid: Cell[][]) => {
        let revealed = 0;
        currentGrid.forEach(row => row.forEach(cell => {
            if (cell.isRevealed) revealed++;
        }));
        if (revealed === ROWS * COLS - MINES) {
            setWin(true);
            setGameOver(true);
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center bg-[#c0c0c0] border-4 border-white border-b-[#808080] border-r-[#808080] text-black font-mono select-none">
            {/* Header */}
            <div className="w-[340px] bg-[#c0c0c0] border-4 border-[#808080] border-b-white border-r-white mb-4 p-2 flex justify-between items-center">
                <div className="bg-black text-red-600 font-bold text-2xl px-2 py-1 border border-[#808080]">{MINES}</div>
                <button onClick={resetGame} className="border-2 border-white border-b-[#808080] border-r-[#808080] active:border-[#808080] active:border-b-white active:border-r-white p-1">
                    {gameOver ? (win ? '😎' : '😵') : '🙂'}
                </button>
                <div className="bg-black text-red-600 font-bold text-2xl px-2 py-1 border border-[#808080]">000</div>
            </div>

            {/* Grid */}
            <div className="border-4 border-[#808080] border-b-white border-r-white bg-[#c0c0c0]">
                {grid.map((row, r) => (
                    <div key={r} className="flex">
                        {row.map((cell, c) => (
                            <div 
                                key={c} 
                                onClick={() => revealCell(r, c)}
                                onContextMenu={(e) => toggleFlag(e, r, c)}
                                className={`w-8 h-8 flex items-center justify-center font-bold text-sm cursor-default border-2
                                    ${cell.isRevealed 
                                        ? 'border-[#808080] border-opacity-20 bg-[#c0c0c0]' 
                                        : 'border-white border-b-[#808080] border-r-[#808080] bg-[#c0c0c0]'}
                                `}
                            >
                                {cell.isRevealed && cell.isMine && <Bomb size={16}/>}
                                {cell.isRevealed && !cell.isMine && cell.neighborMines > 0 && <span style={{ color: ['blue', 'green', 'red', 'darkblue', 'brown', 'cyan', 'black', 'gray'][cell.neighborMines - 1] }}>{cell.neighborMines}</span>}
                                {!cell.isRevealed && cell.isFlagged && <Flag size={14} className="text-red-500"/>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MinesweeperApp;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file TicTacToeApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy } from 'lucide-react';

type Player = 'X' | 'O';
type CellValue = Player | null;

const TicTacToeApp: React.FC = () => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [winLine, setWinLine] = useState<number[] | null>(null);

  const checkWinner = (squares: CellValue[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a] as Player, line };
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinLine(result.line);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    } else {
      setIsXNext(!isXNext);
      // Simple AI Move
      if (isXNext) { 
          // (Actually wait, standard TTT is usually PvP locally unless I implement MiniMax. PvP is fine for now.)
      }
    }
  };
  
  const resetGame = () => {
      setBoard(Array(9).fill(null));
      setWinner(null);
      setWinLine(null);
      setIsXNext(true);
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center p-4 text-white">
      <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold font-space-grotesk tracking-wide uppercase flex items-center gap-2 justify-center text-neuro-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]">
              <Trophy size={28} /> Quantum Tic-Tac-Toe
          </h2>
          <p className="text-sm text-gray-300 mt-2 font-mono">
              {winner ? (winner === 'Draw' ? "Quantum Stalemate!" : `Player ${winner} Wins!`) : `Player ${isXNext ? 'X' : 'O'}'s Turn`}
          </p>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-md shadow-2xl border border-white/20">
          {board.map((cell, i) => {
              const isWinningCell = winLine?.includes(i);
              return (
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl md:text-5xl font-bold rounded-lg transition-all duration-300 
                        ${cell ? 'scale-100 opacity-100' : 'hover:bg-white/5 active:scale-95'}
                        ${isWinningCell ? 'bg-neuro-cyan/20 ring-2 ring-neuro-cyan shadow-[0_0_20px_rgba(0,245,255,0.4)]' : 'bg-black/30 border border-white/5'}
                    `}
                >
                    <span className={`${cell === 'X' ? 'text-neuro-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]' : 'text-neuro-purple drop-shadow-[0_0_10px_rgba(176,38,255,0.8)]'} transform transition-transform duration-300 ${cell ? 'scale-100 rotate-0' : 'scale-0 rotate-45'}`}>
                        {cell}
                    </span>
                </button>
              );
          })}
      </div>

      <button 
        onClick={resetGame}
        className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center gap-2 transition hover:scale-105 active:scale-95 text-sm uppercase tracking-widest font-bold"
      >
          <RefreshCw size={16} /> Reset Matrix
      </button>
    </div>
  );
};

export default TicTacToeApp;

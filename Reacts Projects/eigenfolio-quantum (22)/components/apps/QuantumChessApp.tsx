/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';

const QuantumChessApp: React.FC = () => {
  // A simplified visual mock of the board
  const [board] = useState<string[][]>([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]);

  const getPieceIcon = (piece: string) => {
    const icons: any = {
      'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
      'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };
    return icons[piece] || '';
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-chronos-dark/90 text-gray-800 dark:text-white p-8">
      <h2 className="text-2xl font-space-grotesk text-neuro-purple dark:text-neuro-cyan mb-6 tracking-[0.2em] uppercase font-bold">Quantum Superposition Chess</h2>
      
      <div className="relative">
        {/* Glow effect under board */}
        <div className="absolute inset-0 bg-neuro-purple/20 dark:bg-neuro-purple/30 blur-3xl rounded-full"></div>
        
        <div className="relative grid grid-cols-8 border-4 border-neuro-purple/30 dark:border-neuro-purple/50 rounded-lg overflow-hidden shadow-2xl">
          {board.map((row, rIndex) => (
            row.map((cell, cIndex) => {
              const isBlack = (rIndex + cIndex) % 2 === 1;
              return (
                <div 
                  key={`${rIndex}-${cIndex}`}
                  className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-3xl md:text-4xl cursor-pointer hover:bg-quantum-glow/20 transition-colors
                    ${isBlack ? 'bg-indigo-100 dark:bg-chronos-blue' : 'bg-white dark:bg-white/10'}
                  `}
                >
                  <span className={`
                     ${cell === cell.toUpperCase() ? 'text-blue-500 dark:text-quantum-glow drop-shadow-sm' : 'text-pink-600 dark:text-neuro-pink drop-shadow-sm'}
                  `}>
                    {getPieceIcon(cell)}
                  </span>
                </div>
              );
            })
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex gap-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 dark:bg-quantum-glow rounded-full animate-pulse"></div>
            <span>White Probability: 50%</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-600 dark:bg-neuro-pink rounded-full animate-pulse"></div>
            <span>Black Probability: 50%</span>
        </div>
      </div>
    </div>
  );
};

export default QuantumChessApp;
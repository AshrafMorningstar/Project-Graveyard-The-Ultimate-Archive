/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { RefreshCw, Zap } from 'lucide-react';

const BOARD_SIZE = 8;
const INITIAL_SETUP = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const QuantumChess: React.FC = () => {
  const [board, setBoard] = useState(INITIAL_SETUP);
  const [superpositions, setSuperpositions] = useState<{[key: string]: boolean}>({});

  const handleSquareClick = (row: number, col: number) => {
    const key = `${row}-${col}`;
    const piece = board[row][col];
    if (!piece) return;

    // Simulate creating a superposition
    setSuperpositions(prev => ({
      ...prev,
      [key]: !prev[key] // Toggle superposition visualization
    }));
  };

  const resetBoard = () => {
    setBoard(INITIAL_SETUP);
    setSuperpositions({});
  };

  const renderPiece = (piece: string | null, row: number, col: number) => {
    if (!piece) return null;
    const isWhite = piece === piece.toUpperCase();
    const isSuper = superpositions[`${row}-${col}`];

    return (
      <div 
        className={`
          text-3xl font-bold select-none transition-all duration-500
          ${isWhite ? 'text-quantum-glow' : 'text-neuro-pink'}
          ${isSuper ? 'animate-pulse blur-[1px] scale-110' : ''}
        `}
        style={{
          textShadow: isSuper 
            ? `0 0 10px ${isWhite ? '#4CC9F0' : '#FF00FF'}, 4px 0 2px rgba(255,0,0,0.5), -4px 0 2px rgba(0,0,255,0.5)`
            : 'none'
        }}
      >
        {getChessSymbol(piece)}
      </div>
    );
  };

  const getChessSymbol = (p: string) => {
    const map: {[key: string]: string} = {
      'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
      'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
    };
    return map[p] || '';
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-chronos-blue/30 rounded-3xl border border-neuro-purple/30 backdrop-blur-xl">
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <h2 className="text-3xl font-space text-white">Quantum Chess</h2>
          <p className="text-quantum-glow opacity-80 text-sm">Click pieces to induce superposition state</p>
        </div>
        <button onClick={resetBoard} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="relative border-4 border-neuro-purple/50 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(58,12,163,0.5)]">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="flex">
            {row.map((cell, cIdx) => {
              const isDark = (rIdx + cIdx) % 2 === 1;
              return (
                <div 
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleSquareClick(rIdx, cIdx)}
                  className={`
                    w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer
                    ${isDark ? 'bg-chronos-dark/80' : 'bg-chronos-blue/60'}
                    hover:bg-quantum-energy/30 transition-colors
                  `}
                >
                  {renderPiece(cell, rIdx, cIdx)}
                </div>
              );
            })}
          </div>
        ))}
        {/* Quantum Interference Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="mt-6 flex gap-4 text-xs text-white/50 font-space">
        <span className="flex items-center gap-1"><Zap size={14} className="text-quantum-glow"/> Entangled</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-neuro-pink"/> Collapsed</span>
      </div>
    </div>
  );
};

export default QuantumChess;

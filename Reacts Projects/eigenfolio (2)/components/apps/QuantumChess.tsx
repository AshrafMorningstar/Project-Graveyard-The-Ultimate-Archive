/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { useStore } from '../../store/useStore';
import { Crown, AlertCircle } from 'lucide-react';

const QuantumChess: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const { settings } = useStore();

  function makeMove(move: any) {
    try {
      const result = game.move(move);
      if (result) {
        setFen(game.fen());
        setSelectedSquare(null);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  function onSquareClick(square: string) {
    if (selectedSquare) {
      const move = {
        from: selectedSquare,
        to: square,
        promotion: 'q', // always promote to queen for simplicity
      };

      if (makeMove(move)) {
        // AI Move (Random/Quantum for now)
        setTimeout(() => {
           const moves = game.moves();
           if (moves.length > 0) {
               const randomMove = moves[Math.floor(Math.random() * moves.length)];
               game.move(randomMove);
               setFen(game.fen());
           }
        }, 500);
      } else {
        setSelectedSquare(square);
      }
    } else {
      setSelectedSquare(square);
    }
  }

  const board = [];
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const square = `${files[c]}${ranks[r]}`;
      const isDark = (r + c) % 2 === 1;
      const piece = game.get(square as any);
      const isSelected = selectedSquare === square;

      board.push(
        <div
          key={square}
          onClick={() => onSquareClick(square)}
          className={`
            w-full h-full flex items-center justify-center cursor-pointer relative
            ${isDark ? 'bg-chronos-dark/50' : 'bg-chronos-blue/20'}
            ${isSelected ? 'ring-2 ring-quantum-glow ring-inset' : ''}
          `}
        >
          {piece && (
             <span className={`text-3xl md:text-4xl select-none transition-all duration-300 ${isSelected ? 'scale-110 drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]' : ''} ${piece.color === 'w' ? 'text-white drop-shadow-md' : 'text-neuro-purple drop-shadow-md'}`}>
                 {getPieceIcon(piece.type)}
             </span>
          )}
          
          {/* Superposition effect mock */}
          {piece && Math.random() > 0.95 && (
              <div className="absolute inset-0 bg-quantum-glow/20 animate-pulse rounded-full blur-xl pointer-events-none" />
          )}
        </div>
      );
    }
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-chronos-dark p-4">
      <div className="flex justify-between w-full max-w-[400px] mb-4 items-center">
          <div>
            <h2 className="text-xl font-display text-quantum-glow">Quantum Chess</h2>
            <p className="text-xs text-neuro-purple">Observation collapses state</p>
          </div>
          <button 
            onClick={() => { const g = new Chess(); setGame(g); setFen(g.fen()); }}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-xs border border-white/10"
          >
            Reset Timeline
          </button>
      </div>

      <div className="w-full max-w-[400px] aspect-square grid grid-cols-8 grid-rows-8 border-2 border-neuro-purple/50 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(58,12,163,0.3)]">
        {board}
      </div>

      <div className="mt-6 flex gap-4 text-xs text-gray-400">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" /> White (You)
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neuro-purple" /> Black (Quantum AI)
         </div>
      </div>
    </div>
  );
};

function getPieceIcon(type: string) {
    const icons: Record<string, string> = {
        p: '♟',
        r: '♜',
        n: '♞',
        b: '♝',
        q: '♛',
        k: '♚'
    };
    return icons[type] || '';
}

export default QuantumChess;
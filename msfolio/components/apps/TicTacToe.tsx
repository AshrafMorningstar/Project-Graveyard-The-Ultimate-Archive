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
 * @file TicTacToe.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';

type SquareValue = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: SquareValue[]) => {
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

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  const handleClick = (i: number) => {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 p-4">
      <h2 className="text-2xl font-display font-bold text-white mb-6">Tic Tac Toe</h2>
      
      <div className="grid grid-cols-3 gap-2 mb-6">
        {squares.map((square, i) => (
          <button
            key={i}
            className={`w-20 h-20 rounded-lg text-4xl font-bold flex items-center justify-center transition-all duration-200 
                ${square === 'X' ? 'bg-blue-500/20 text-blue-400' : square === 'O' ? 'bg-pink-500/20 text-pink-400' : 'bg-white/5 hover:bg-white/10'}
                ${winner ? 'opacity-50' : 'opacity-100'}
            `}
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>

      <div className="h-10 text-center">
        {winner ? (
          <div className="text-green-400 font-bold text-xl animate-bounce">Winner: {winner}!</div>
        ) : isDraw ? (
          <div className="text-os-muted font-bold text-xl">It's a Draw!</div>
        ) : (
          <div className="text-white/80">Next Player: <span className={xIsNext ? 'text-blue-400' : 'text-pink-400'}>{xIsNext ? 'X' : 'O'}</span></div>
        )}
      </div>

      <button 
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;

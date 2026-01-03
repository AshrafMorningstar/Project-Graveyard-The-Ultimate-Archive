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
 * @file QuantumChess.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 LMSFolio Quantum - The Future of Learning
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Chess } from 'chess.js';
import { useSpring, animated } from '@react-spring/web';
import { 
  Crown, 
  Zap, 
  Target, 
  GitBranch,
  Split,
  Merge
} from 'lucide-react';

// Piece Icons Map
const PieceIcon = ({ type, color }: { type: string, color: string }) => {
    const className = `w-8 h-8 ${color === 'w' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-gray-900 dark:text-black drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]'}`;
    switch(type) {
        case 'k': return <Crown className={className} />;
        case 'q': return <Crown className={className} />; // Reuse crown for now or find queen
        case 'r': return <GitBranch className={className} />;
        case 'b': return <Target className={className} />;
        case 'n': return <Zap className={className} />;
        case 'p': return <div className={`w-4 h-4 rounded-full ${color === 'w' ? 'bg-white' : 'bg-gray-900'} shadow-[0_0_5px_currentColor]`} />;
        default: return null;
    }
};

type QuantumPiece = {
  id: string;
  type: string;
  color: 'w' | 'b';
  position: string;
  superposition: string[]; 
  collapsed: boolean;
  probability: number;
};

const QuantumChess: React.FC = () => {
  const [chess] = useState(new Chess());
  const [quantumPieces, setQuantumPieces] = useState<QuantumPiece[]>([]);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [superpositionMode, setSuperpositionMode] = useState(false);
  
  // Initialize quantum chess
  useEffect(() => {
    updateBoardState();
  }, [chess]);

  const updateBoardState = () => {
    const newPieces: QuantumPiece[] = [];
    chess.board().forEach((row, rowIndex) => {
        row.forEach((piece, colIndex) => {
            if (piece) {
                const position = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
                // Try to find existing piece to maintain state or create new
                newPieces.push({
                    id: `${piece.type}-${piece.color}-${position}`, // Unique ID for this moment
                    type: piece.type,
                    color: piece.color,
                    position,
                    superposition: [position],
                    collapsed: true,
                    probability: 1
                });
            }
        });
    });
    setQuantumPieces(newPieces);
  };
  
  const handlePieceClick = (piece: QuantumPiece) => {
    if (superpositionMode) {
      // Enter quantum superposition logic (simulation)
        const newSuperposition = [
          piece.position,
          getRandomPosition(),
          getRandomPosition()
        ];
        
        setQuantumPieces(prev => prev.map(p => 
          p.id === piece.id ? {
            ...p,
            superposition: newSuperposition,
            collapsed: false,
            probability: 1 / newSuperposition.length
          } : p
        ));
      
    } else {
      setSelectedPieceId(piece.id);
      
      // Animate selection
      const element = document.getElementById(`piece-${piece.id}`);
      if (element) {
        gsap.to(element, {
          scale: 1.2,
          boxShadow: '0 0 30px rgba(76, 201, 240, 0.8)',
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      }
    }
  };
  
  const handleSquareClick = (position: string) => {
      if (!selectedPieceId) return;
      
      const piece = quantumPieces.find(p => p.id === selectedPieceId);
      if (!piece) return;

      try {
          const move = chess.move({
              from: piece.position,
              to: position,
              promotion: 'q'
          });

          if (move) {
              // Animate
              const element = document.getElementById(`piece-${piece.id}`);
              if (element) {
                   const toCol = position.charCodeAt(0) - 97;
                   const toRow = 8 - parseInt(position[1]);
                   const x = toCol * 100 + '%'; // Relative move logic is complex with absolute, just refreshing board for now
              }
              
              updateBoardState();
              setSelectedPieceId(null);
          }
      } catch (e) {
          // Invalid move
          console.log("Invalid move");
          setSelectedPieceId(null);
      }
  };

  const getRandomPosition = () => {
    const col = String.fromCharCode(97 + Math.floor(Math.random() * 8));
    const row = Math.floor(Math.random() * 8) + 1;
    return `${col}${row}`;
  };
  
  const renderBoard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isDark = (row + col) % 2 === 1;
        const position = String.fromCharCode(97 + col) + (8 - row);
        
        squares.push(
          <div
            key={position}
            onClick={() => handleSquareClick(position)}
            className={`
              w-full h-full flex items-center justify-center
              ${isDark ? 'bg-chronos-blue/40 dark:bg-chronos-blue/60' : 'bg-white/10 dark:bg-chronos-space/30'}
              border border-white/5
              hover:bg-neuro-purple/20 transition-colors duration-300
              cursor-pointer relative
            `}
          >
             {/* Coordinate labels */}
             {col === 0 && <span className="absolute top-1 left-1 text-[10px] text-white/30">{8-row}</span>}
             {row === 7 && <span className="absolute bottom-1 right-1 text-[10px] text-white/30">{String.fromCharCode(97+col)}</span>}
          </div>
        );
      }
    }
    return squares;
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 bg-glass-primary rounded-3xl border border-neuro-purple/30 shadow-quantum max-w-4xl mx-auto w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-space text-neuro-cyan mb-1 hologram-text">
            Quantum Chess
          </h2>
          <p className="text-neuro-purple/70 font-quantum text-sm">
            Pieces exist in superposition until observed
          </p>
        </div>
        
        <button
            className={`px-6 py-3 rounded-xl font-space transition-all duration-300 flex items-center gap-2
              ${superpositionMode 
                ? 'bg-neuro-purple text-white shadow-neuro' 
                : 'bg-chronos-blue/50 text-neuro-cyan border border-neuro-purple/30'
              }`}
            onClick={() => setSuperpositionMode(!superpositionMode)}
          >
            {superpositionMode ? (
               <> <Merge size={16} /> Collapse State </>
            ) : (
               <> <Split size={16} /> Enter Superposition </>
            )}
        </button>
      </div>
      
      {/* Game Board Container */}
      <div className="relative w-full max-w-[600px] aspect-square">
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full border-4 border-neuro-purple/30 rounded-lg overflow-hidden shadow-2xl bg-chronos-dark/50">
          {renderBoard()}
        </div>
        
        {/* Pieces Overlay */}
        {quantumPieces.map((piece) => {
            const col = piece.position.charCodeAt(0) - 97;
            const row = 8 - parseInt(piece.position[1]);
            
            return (
                <div
                    key={piece.id}
                    id={`piece-${piece.id}`}
                    onClick={(e) => { e.stopPropagation(); handlePieceClick(piece); }}
                    className={`absolute w-[12.5%] h-[12.5%] flex items-center justify-center transition-all duration-500 cursor-pointer
                        ${selectedPieceId === piece.id ? 'z-20' : 'z-10'}
                    `}
                    style={{ left: `${col * 12.5}%`, top: `${row * 12.5}%` }}
                >
                    <div className={`
                        w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full
                        ${piece.color === 'w' ? 'bg-white/10 backdrop-blur-sm border-white/30' : 'bg-black/40 backdrop-blur-sm border-neuro-purple/30'}
                        border shadow-lg hover:scale-110 transition-transform
                        ${!piece.collapsed ? 'animate-pulse blur-[1px]' : ''}
                    `}>
                        <PieceIcon type={piece.type} color={piece.color} />
                    </div>
                    {/* Superposition Badge */}
                    {!piece.collapsed && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-neuro-pink rounded-full flex items-center justify-center animate-bounce">
                            <Split size={8} className="text-white"/>
                        </div>
                    )}
                </div>
            )
        })}
      </div>
      
      {/* Footer Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
         <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-quantum-glow text-xs font-bold mb-2">QUANTUM STATE</h4>
            <div className="text-2xl font-quantum">{superpositionMode ? 'ENTANGLED' : 'STABLE'}</div>
         </div>
         <div className="p-4 rounded-xl bg-white/5 border border-white/10">
             <h4 className="text-quantum-glow text-xs font-bold mb-2">TIMELINE BRANCH</h4>
             <div className="text-2xl font-quantum">ALPHA-7</div>
         </div>
         <div className="p-4 rounded-xl bg-white/5 border border-white/10">
             <h4 className="text-quantum-glow text-xs font-bold mb-2">WIN PROBABILITY</h4>
             <div className="text-2xl font-quantum text-neuro-cyan">50.0%</div>
         </div>
      </div>
    </div>
  );
};

export default QuantumChess;

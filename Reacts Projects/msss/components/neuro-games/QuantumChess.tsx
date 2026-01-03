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

'use client';

import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import gsap from 'gsap';
import { useSpring, animated } from '@react-spring/web';
import { 
  Crown, 
  Zap, 
  Target, 
  GitBranch,
  Split,
  Merge
} from 'lucide-react';

type QuantumPiece = {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'w' | 'b';
  position: string;
  superposition: string[]; // Multiple possible positions
  collapsed: boolean;
  probability: number;
};

export const QuantumChess: React.FC = () => {
  const [chess] = useState(new Chess());
  const [quantumPieces, setQuantumPieces] = useState<QuantumPiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [superpositionMode, setSuperpositionMode] = useState(false);
  
  // Initialize quantum chess
  useEffect(() => {
    const initialPieces: QuantumPiece[] = [];
    
    // Create quantum pieces with superposition
    chess.board().forEach((row, rowIndex) => {
      row.forEach((piece, colIndex) => {
        if (piece) {
          const position = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
          
          initialPieces.push({
            type: piece.type,
            color: piece.color,
            position,
            superposition: [position], // Start with one position
            collapsed: true,
            probability: 1
          });
        }
      });
    });
    
    setQuantumPieces(initialPieces);
  }, [chess]);
  
  const getRandomPosition = () => {
    const col = String.fromCharCode(97 + Math.floor(Math.random() * 8));
    const row = Math.floor(Math.random() * 8) + 1;
    return `${col}${row}`;
  };

  const handlePieceClick = (pieceId: string) => {
    if (superpositionMode) {
      // Enter quantum superposition
      const piece = quantumPieces.find(p => 
        `${p.type}-${p.color}-${p.position}` === pieceId
      );
      
      if (piece) {
        const newSuperposition = [
          piece.position,
          getRandomPosition(),
          getRandomPosition()
        ];
        
        setQuantumPieces(prev => prev.map(p => 
          p === piece ? {
            ...p,
            superposition: newSuperposition,
            collapsed: false,
            probability: 1 / newSuperposition.length
          } : p
        ));
      }
    } else {
      setSelectedPiece(pieceId);
      
      // Animate selection
      const element = document.getElementById(`piece-${pieceId}`);
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
  
  const createTeleportEffect = (position: string) => {
    const x = (position.charCodeAt(0) - 97) * 80 + 40;
    const y = (8 - parseInt(position[1])) * 80 + 40;
    
    const effect = document.createElement('div');
    effect.className = 'fixed w-20 h-20 rounded-full border-2 border-quantum-glow pointer-events-none z-50';
    // Position relative to board would be better but fixed works effectively for overlay
    // The previous code used fixed with offsets relative to board, but here we don't know board offset.
    // Let's rely on CSS stacking context if it was in the board, but 'fixed' escapes it.
    // Actually, let's append to the board element which is relative.
    effect.style.position = 'absolute'; 
    effect.style.left = `${(position.charCodeAt(0) - 97) * 80 + 40}px`;
    effect.style.top = `${(8 - parseInt(position[1])) * 80 + 40}px`;
    effect.style.transform = 'translate(-50%, -50%)';
    
    const board = document.getElementById('quantum-chess-board');
    if (board) board.appendChild(effect);
    
    gsap.to(effect, {
      scale: 3,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => effect.remove()
    });
  };

  const handleMove = (toPosition: string) => {
    if (!selectedPiece) return;
    
    // Collapse superposition if in quantum mode
    setQuantumPieces(prev => prev.map(piece => {
        if (`${piece.type}-${piece.color}-${piece.position}` === selectedPiece) {
            return {
                ...piece,
                superposition: [toPosition],
                position: toPosition, // Update actual position
                collapsed: true,
                probability: 1
            };
        }
        return piece;
    }));
    
    // Animate move
    const element = document.getElementById(`piece-${selectedPiece}`);
    
    if (element) {
      const toX = (toPosition.charCodeAt(0) - 97) * 80 + 12;
      const toY = (8 - parseInt(toPosition[1])) * 80 + 12;
      
      gsap.to(element, {
        left: toX,
        top: toY,
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          // Quantum teleport effect
          createTeleportEffect(toPosition);
        }
      });
    }
    
    setSelectedPiece(null);
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
            className={`
              w-20 h-20 flex items-center justify-center
              ${isDark ? 'bg-chronos-blue/50' : 'bg-chronos-space/30'}
              border border-neuro-purple/20
              hover:bg-neuro-purple/10 transition-colors duration-300
              cursor-pointer
            `}
            onClick={() => handleMove(position)}
          >
            {position === 'e4' && (
              <div className="absolute w-4 h-4 bg-quantum-glow/30 rounded-full 
                animate-ping" />
            )}
          </div>
        );
      }
    }
    
    return squares;
  };
  
  const renderQuantumPieces = () => {
    return quantumPieces.map((piece, i) => {
      const [col, row] = [piece.position.charCodeAt(0) - 97, 8 - parseInt(piece.position[1])];
      
      return (
        <animated.div
          key={`${piece.type}-${piece.color}-${piece.position}-${i}`}
          id={`piece-${piece.type}-${piece.color}-${piece.position}`}
          className={`
            absolute w-16 h-16 flex items-center justify-center
            rounded-lg cursor-pointer transition-all duration-300
            ${piece.color === 'w' ? 'bg-white/90 text-chronos-dark' : 'bg-chronos-dark/90 text-white'}
            border-2 ${piece.color === 'w' ? 'border-neuro-cyan' : 'border-neuro-purple'}
            shadow-lg hover:shadow-neuro
          `}
          style={{
            left: col * 80 + 12,
            top: row * 80 + 12,
          }}
          onClick={() => handlePieceClick(`${piece.type}-${piece.color}-${piece.position}`)}
        >
          {/* Piece Icon */}
          <div className="relative">
            {piece.type === 'king' && <Crown />}
            {piece.type === 'queen' && <Crown className="rotate-45" />}
            {piece.type === 'rook' && <GitBranch />}
            {piece.type === 'bishop' && <Target />}
            {piece.type === 'knight' && <Zap />}
            {piece.type === 'pawn' && <div className="w-4 h-4 rounded-full bg-current" />}
            
            {/* Superposition Indicator */}
            {!piece.collapsed && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-neuro-purple 
                rounded-full flex items-center justify-center">
                <Split className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          {/* Probability Cloud */}
          {!piece.collapsed && piece.superposition.length > 1 && (
            <div className="absolute -inset-4 border-2 border-dashed 
              border-neuro-purple/50 rounded-xl animate-pulse" />
          )}
        </animated.div>
      );
    });
  };
  
  return (
    <div className="relative p-8 bg-chronos-dark/50 rounded-3xl border 
      border-neuro-purple/30 shadow-quantum max-w-[800px] mx-auto overflow-hidden">
      
      {/* Quantum Chess Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-space-grotesk text-neuro-cyan mb-2">
            Quantum Chess
          </h2>
          <p className="text-neuro-purple/70 font-quantum">
            Pieces exist in superposition until observed
          </p>
        </div>
        
        <div className="flex gap-4">
          <button
            className={`px-6 py-3 rounded-xl font-space-grotesk transition-all duration-300
              ${superpositionMode 
                ? 'bg-neuro-purple text-white shadow-neuro' 
                : 'bg-chronos-blue/50 text-neuro-cyan border border-neuro-purple/30'
              }`}
            onClick={() => setSuperpositionMode(!superpositionMode)}
          >
            {superpositionMode ? (
              <span className="flex items-center gap-2">
                <Merge className="w-4 h-4" />
                Collapse
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Split className="w-4 h-4" />
                Superposition
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Game Board */}
      <div className="relative flex justify-center">
        <div 
          id="quantum-chess-board"
          className="grid grid-cols-8 grid-rows-8 relative 
            border-2 border-neuro-purple/50 rounded-lg overflow-hidden
            shadow-2xl bg-chronos-space/50"
          style={{ width: '640px', height: '640px' }}
        >
          {renderBoard()}
          {renderQuantumPieces()}
        </div>
        
        {/* Quantum Field Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b 
                from-transparent via-neuro-purple/20 to-transparent"
              style={{ left: `${(i * 40) % 640}px` }}
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r 
                from-transparent via-neuro-purple/20 to-transparent"
              style={{ top: `${(i * 40) % 640}px` }}
            />
          ))}
        </div>
      </div>
      
      {/* Quantum Controls */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="bg-chronos-blue/30 p-6 rounded-2xl border 
          border-neuro-purple/20">
          <h3 className="text-neuro-cyan font-space-grotesk mb-3">
            Quantum State
          </h3>
          <div className="space-y-2 h-32 overflow-y-auto">
            {quantumPieces.filter(p => !p.collapsed).map(piece => (
              <div key={piece.position} className="flex items-center justify-between text-sm">
                <span className="text-white/80">{piece.type}</span>
                <span className="text-quantum-glow font-quantum">
                  {piece.probability.toFixed(2)} prob
                </span>
              </div>
            ))}
            {quantumPieces.every(p => p.collapsed) && <div className="text-white/50 text-sm">System stable.</div>}
          </div>
        </div>
        
        <div className="bg-chronos-blue/30 p-6 rounded-2xl border 
          border-neuro-cyan/20">
          <h3 className="text-neuro-cyan font-space-grotesk mb-3">
            Entanglement
          </h3>
          <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-quantum-glow rounded-full animate-pulse" />
                <span className="text-white/70">
                  Global Coherence
                </span>
                <span className="ml-auto text-quantum-glow/70">
                  98.2%
                </span>
              </div>
          </div>
        </div>
        
        <div className="bg-chronos-blue/30 p-6 rounded-2xl border 
          border-quantum-energy/20">
          <h3 className="text-neuro-cyan font-space-grotesk mb-3">
            Timeline
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Branch</span>
              <span className="text-quantum-glow font-quantum">Alpha-7</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Dilation</span>
              <span className="text-quantum-glow font-quantum">1.0x</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

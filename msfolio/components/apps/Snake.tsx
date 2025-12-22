/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file Snake.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Play, RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const SPEED = 100;

const Snake: React.FC = () => {
    const { settings } = useStore();
    const [snake, setSnake] = useState<{x: number, y: number}[]>([{x: 10, y: 10}]);
    const [food, setFood] = useState({x: 15, y: 15});
    const [direction, setDirection] = useState<'UP'|'DOWN'|'LEFT'|'RIGHT'>('RIGHT');
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const generateFood = () => {
        return {
            x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
            y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1
        };
    };

    useEffect(() => {
        if (!isPlaying) return;

        const moveSnake = setInterval(() => {
            setSnake(prev => {
                const head = { ...prev[0] };
                switch (direction) {
                    case 'UP': head.y -= 1; break;
                    case 'DOWN': head.y += 1; break;
                    case 'LEFT': head.x -= 1; break;
                    case 'RIGHT': head.x += 1; break;
                }

                // Collision Detection
                if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || prev.some(seg => seg.x === head.x && seg.y === head.y)) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return prev;
                }

                const newSnake = [head, ...prev];
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    setFood(generateFood());
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, SPEED);

        return () => clearInterval(moveSnake);
    }, [isPlaying, direction, food]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch(e.key) {
            case 'ArrowUp': if(direction !== 'DOWN') setDirection('UP'); break;
            case 'ArrowDown': if(direction !== 'UP') setDirection('DOWN'); break;
            case 'ArrowLeft': if(direction !== 'RIGHT') setDirection('LEFT'); break;
            case 'ArrowRight': if(direction !== 'LEFT') setDirection('RIGHT'); break;
        }
    };

    const startGame = () => {
        setSnake([{x: 10, y: 10}]);
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        setDirection('RIGHT');
        if(gameAreaRef.current) gameAreaRef.current.focus();
    };

    return (
        <div 
            className="h-full bg-black flex flex-col items-center justify-center p-4 outline-none" 
            onKeyDown={handleKeyDown} 
            tabIndex={0}
            ref={gameAreaRef}
        >
            <div className="flex justify-between w-full max-w-[400px] mb-4 text-white font-mono">
                <h2 className="text-xl font-bold text-green-400">SERPENT_V1.exe</h2>
                <span>SCORE: {score.toString().padStart(4, '0')}</span>
            </div>

            <div 
                className="relative bg-[#111] border-2 border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.2)]"
                style={{ width: 400, height: 400 }}
            >
                {/* Grid Lines (Optional visual) */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

                {snake.map((segment, i) => (
                    <div 
                        key={i}
                        className="absolute bg-green-500 shadow-[0_0_5px_rgba(0,255,0,0.8)]"
                        style={{
                            left: segment.x * 20,
                            top: segment.y * 20,
                            width: 20,
                            height: 20,
                            borderRadius: i === 0 ? 4 : 0,
                            opacity: 1 - (i / snake.length) * 0.5
                        }}
                    />
                ))}
                
                <div 
                    className="absolute bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                    style={{
                        left: food.x * 20 + 2,
                        top: food.y * 20 + 2,
                        width: 16,
                        height: 16
                    }}
                />

                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-red-500 font-mono">
                        <h3 className="text-4xl font-bold mb-4">GAME OVER</h3>
                        <p className="text-white mb-6">FINAL SCORE: {score}</p>
                        <button onClick={startGame} className="px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors">
                            RESTART SYSTEM
                        </button>
                    </div>
                )}
                
                {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <button onClick={startGame} className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded shadow-lg flex items-center gap-2">
                            <Play size={20} fill="black" /> START GAME
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-4 text-xs text-gray-500 font-mono text-center">
                USE ARROW KEYS TO NAVIGATE QUANTUM FIELD
            </div>
        </div>
    );
};

export default Snake;
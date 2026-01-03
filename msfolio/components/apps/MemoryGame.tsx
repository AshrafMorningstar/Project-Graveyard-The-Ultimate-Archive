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
 * @file MemoryGame.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

const EMOJIS = ['🚀', '💻', '🎨', '🎮', '🎵', '📷', '🍕', '⚡'];

interface Card {
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const MemoryGame: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const { settings } = useStore();

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        const shuffled = [...EMOJIS, ...EMOJIS]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({
                id: index,
                emoji,
                isFlipped: false,
                isMatched: false
            }));
        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
    };

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2) return;
        if (cards[id].isMatched || cards[id].isFlipped) return;

        const newCards = [...cards];
        newCards[id].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [first, second] = newFlipped;
            if (cards[first].emoji === cards[second].emoji) {
                // Match
                setTimeout(() => {
                    const matchedCards = [...cards];
                    matchedCards[first].isMatched = true;
                    matchedCards[second].isMatched = true;
                    // Keep flipped
                    matchedCards[first].isFlipped = true;
                    matchedCards[second].isFlipped = true; 
                    setCards(matchedCards);
                    setFlippedCards([]);
                }, 500);
            } else {
                // No Match
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[first].isFlipped = false;
                    resetCards[second].isFlipped = false;
                    setCards(resetCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    const isWin = cards.length > 0 && cards.every(c => c.isMatched);

    return (
        <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-4">
            <div className="flex justify-between w-full max-w-sm mb-4 text-white">
                <span className="font-bold">Memory Match</span>
                <span className="text-gray-400">Moves: {moves}</span>
            </div>

            <div className="grid grid-cols-4 gap-3">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl flex items-center justify-center transition-all duration-300 transform ${card.isFlipped ? 'rotate-y-180 bg-white text-black' : 'bg-white/10 text-transparent hover:bg-white/20'}`}
                        style={{ 
                            transformStyle: 'preserve-3d',
                            borderColor: card.isMatched ? settings.accentColor : 'transparent',
                            borderWidth: card.isMatched ? 2 : 0
                        }}
                    >
                        {card.isFlipped ? card.emoji : '?'}
                    </button>
                ))}
            </div>

            {isWin && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 backdrop-blur-sm">
                    <h2 className="text-3xl font-bold text-white mb-4 animate-bounce">You Won! 🎉</h2>
                    <button 
                        onClick={resetGame}
                        className="px-6 py-2 rounded-full font-bold text-white transition-transform hover:scale-105"
                        style={{ backgroundColor: settings.accentColor }}
                    >
                        Play Again
                    </button>
                </div>
            )}

            <button onClick={resetGame} className="mt-8 text-xs text-gray-500 hover:text-white underline">Restart Game</button>
        </div>
    );
};

export default MemoryGame;

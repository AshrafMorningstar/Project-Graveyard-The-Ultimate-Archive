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

import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Copy } from 'lucide-react';

export const NebulaTranslate: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleTranslate = () => {
        // Mock translation logic - just random "Alien" text or reverse
        if (!input) return;
        const alienWords = ['kla', 'bar', 'ada', 'nik', 'to', 'fer', 'zod'];
        const translated = input.split(' ').map(() => alienWords[Math.floor(Math.random() * alienWords.length)]).join(' ');
        setOutput(translated);
    };

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] flex flex-col text-gray-800 dark:text-white">
            {/* Header */}
            <div className="h-14 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 bg-gray-50 dark:bg-white/5">
                <div className="flex items-center gap-2 text-blue-500 font-medium">
                    <span>English</span>
                </div>
                <div className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer">
                    <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-2 text-purple-500 font-medium">
                    <span>Cosmic Standard</span>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 p-6 border-b border-gray-200 dark:border-white/10 relative">
                    <textarea 
                        className="w-full h-full bg-transparent border-none outline-none resize-none text-2xl font-light placeholder-gray-300"
                        placeholder="Type text to translate..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {input && (
                        <button 
                             onClick={handleTranslate}
                             className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-colors"
                        >
                            Translate
                        </button>
                    )}
                </div>
                <div className="flex-1 p-6 bg-gray-50 dark:bg-[#18181b] relative">
                     <p className="text-2xl font-light text-gray-600 dark:text-gray-300">
                         {output || <span className="text-gray-300 dark:text-white/20 italic">Translation will appear here...</span>}
                     </p>
                     
                     {output && (
                         <button className="absolute bottom-6 right-6 p-2 text-gray-400 hover:text-blue-500 transition-colors">
                             <Copy className="w-5 h-5" />
                         </button>
                     )}
                </div>
            </div>
        </div>
    );
};

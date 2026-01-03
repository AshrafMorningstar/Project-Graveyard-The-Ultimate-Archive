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

import React, { useState } from 'react';
import { Languages, Volume2, ArrowRight } from 'lucide-react';

const Translate = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');

    const handleTranslate = () => {
        // Just mock translation for now
        const mockTranslations = {
            "hello": "hola",
            "world": "mundo",
            "computer": "computadora",
            "os": "sistema operativo"
        };
        const words = text.toLowerCase().split(' ');
        const translated = words.map(w => mockTranslations[w] || w).join(' ');
        setResult(text ? `Translated: ${translated} (Simulated)` : '');
    };

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] flex flex-col p-6 text-black dark:text-white">
            <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Languages className="text-blue-500" /> Translate
            </h1>

            <div className="flex gap-4 flex-1">
                 <div className="flex-1 flex flex-col gap-2">
                     <div className="flex justify-between text-sm font-medium text-blue-500">
                         <span>English</span>
                         <Volume2 size={16} className="cursor-pointer" />
                     </div>
                     <textarea 
                        className="flex-1 bg-gray-100 dark:bg-black/20 rounded-xl p-4 resize-none text-2xl focus:outline-none"
                        placeholder="Enter text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                     />
                 </div>

                 <div className="flex items-center justify-center">
                     <button onClick={handleTranslate} className="p-2 bg-blue-500 text-white rounded-full hover:scale-110 transition-transform">
                         <ArrowRight />
                     </button>
                 </div>

                 <div className="flex-1 flex flex-col gap-2">
                     <div className="flex justify-between text-sm font-medium text-blue-500">
                         <span>Spanish</span>
                         <Volume2 size={16} className="cursor-pointer" />
                     </div>
                     <div className="flex-1 bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 text-2xl text-blue-800 dark:text-blue-200">
                         {result}
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default Translate;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef, useEffect, useState } from 'react';
import useStore from '../store/useStore';

const BootScreen = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Simulate boot
        const interval = setInterval(() => {
           setProgress(p => {
               if (p >= 100) {
                   clearInterval(interval);
                   setTimeout(() => setIsComplete(true), 500);
                   return 100;
               }
               return p + Math.random() * 5;
           });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    if (isComplete) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white">
            <svg viewBox="0 0 32 32" className="w-24 h-24 mb-12 fill-white">
                <path d="M22.25 1c1.25 0 2.5 0.5 3.375 1.375s1.375 2.125 1.375 3.375c0 0.25-0.031 0.5-0.094 0.75-0.625-0.375-1.375-0.625-2.125-0.625-2.25 0-4.063 1.844-4.063 4.094 0 0.125 0.031 0.25 0.031 0.406-3.75 0-6.75 3.031-6.75 6.75v0.125c0 3.75 3.031 6.75 6.75 6.75s6.75-3.031 6.75-6.75c0-0.125 0-0.25-0.031-0.344 1.5-0.219 2.656-1.5 2.656-3.063 0-1.625-1.25-2.969-2.844-3.094 0.094-0.469 0.125-0.969 0.125-1.469 0-3.906-3.156-7.094-7.063-7.094-2.5 0-4.688 1.344-5.969 3.375-1.281-2.031-3.469-3.375-5.969-3.375-3.906 0-7.063 3.188-7.063 7.094 0 0.5 0.031 1 0.094 1.469-1.563 0.125-2.813 1.438-2.813 3.094 0 1.563 1.156 2.813 2.656 3.063-0.031 0.125-0.031 0.219-0.031 0.344 0 3.75 3.031 6.75 6.75 6.75s6.75-3.031 6.75-6.75v-0.125c0-3.75-3.031-6.75-6.75-6.75 0.031-0.156 0.031-0.281 0.031-0.406 0-2.25-1.813-4.094-4.063-4.094-0.75 0-1.469 0.25-2.125 0.625-0.031-0.219-0.094-0.5-0.094-0.75 0-1.25 0.531-2.5 1.406-3.375s2.125-1.375 3.375-1.375z" />
            </svg>
            <div className="w-48 h-1.5 bg-[#424242] rounded-full overflow-hidden">
                <div 
                    className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default BootScreen;

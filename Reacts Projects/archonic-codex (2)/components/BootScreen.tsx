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

import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';

export const BootScreen: React.FC = () => {
    const setBooting = useStore(state => state.setBooting);
    const [lines, setLines] = useState<string[]>([]);
    const [showLogo, setShowLogo] = useState(false);

    const bootSequence = [
        "Initializing ARCHONIC BIOS v4.2.0...",
        "Checking Memory... 64GB OK",
        "Loading Neural Engine... OK",
        "Mounting Virtual File System...",
        "Establishing Quantum Link...",
        "Decrypting User Data...",
        "Starting Window Manager...",
        "System Ready."
    ];

    useEffect(() => {
        let delay = 0;
        bootSequence.forEach((line, index) => {
            delay += Math.random() * 300 + 100;
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (index === bootSequence.length - 1) {
                    setTimeout(() => setShowLogo(true), 500);
                }
            }, delay);
        });
    }, []);

    useEffect(() => {
        if (showLogo) {
            setTimeout(() => {
                setBooting(false);
            }, 2500);
        }
    }, [showLogo, setBooting]);

    return (
        <div className="fixed inset-0 z-[10000] bg-black text-white font-mono flex flex-col items-center justify-center p-8 cursor-none">
            {!showLogo ? (
                <div className="w-full max-w-2xl">
                    {lines.map((line, i) => (
                        <div key={i} className="text-green-500 mb-1 text-sm">{`> ${line}`}</div>
                    ))}
                    <div className="text-green-500 animate-pulse">_</div>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-8 shadow-[0_0_100px_rgba(79,70,229,0.5)]">
                        <span className="text-6xl font-display font-bold">A</span>
                    </div>
                    <h1 className="text-3xl font-display font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        ASHRAF OS
                    </h1>
                    <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2 }}
                        />
                    </div>
                </motion.div>
            )}
        </div>
    );
};
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
        "Initializing ARCHONIC BIOS v5.0.0...",
        "Validating Quantum Signatures...",
        "Loading Neural Engine... 100%",
        "Mounting Archonic File System...",
        "Establishing Secure Uplink...",
        "Decrypting User Identity...",
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
            }, 3000);
        }
    }, [showLogo, setBooting]);

    return (
        <div className="fixed inset-0 z-[10000] bg-[#050510] text-white font-mono flex flex-col items-center justify-center p-8 cursor-none overflow-hidden">
            {!showLogo ? (
                <div className="w-full max-w-2xl relative z-10">
                    {lines.map((line, i) => (
                        <div key={i} className="text-cyan-500 mb-1 text-sm tracking-wide shadow-cyan-500/50">{`> ${line}`}</div>
                    ))}
                    <div className="text-cyan-500 animate-pulse">_</div>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center relative z-20"
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8 relative"
                    >
                        <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20 rounded-full"></div>
                        <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-[#0A0C27] to-[#1e1e24] border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.3)] relative z-10">
                            <span className="text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">A</span>
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-5xl md:text-6xl font-display font-bold tracking-[0.2em] text-white mb-4 text-center"
                    >
                        ARCHONIC CODEX
                    </motion.h1>
                    
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "200px" }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                        className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-6"
                    />

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="text-sm font-mono tracking-widest text-cyan-300 uppercase"
                    >
                        by Ashraf Morningstar
                    </motion.p>
                </motion.div>
            )}
            
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                 <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse"></div>
                 <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
        </div>
    );
};
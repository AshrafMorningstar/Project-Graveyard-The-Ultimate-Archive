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
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Lock, Unlock, ArrowRight } from 'lucide-react';
import { useSystemStore } from '@/stores/system/system-store';

export const LockScreen: React.FC = () => {
    const { setIsLocked } = useSystemStore();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = (e?: React.FormEvent) => {
        e?.preventDefault();
        // Just a mock login, accept anything or empty
        setIsLocked(false);
    };

    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -1000, transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-3xl flex flex-col items-center justify-center text-white"
        >
            {/* Background Animation */}
            <div className="absolute inset-0 z-[-1] overflow-hidden">
                 <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-10 animate-[spin_10s_linear_infinite]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            </div>

            {/* Time */}
            <div className="flex flex-col items-center mb-16">
                <h1 className="text-8xl font-bold font-space-grotesk tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </h1>
                <p className="text-xl text-white/60 font-medium">
                    {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Login Box */}
            <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-80 shadow-2xl">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-neuro-purple to-quantum-glow">
                             <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl font-bold overflow-hidden relative">
                                <span className="z-10">AM</span>
                                <div className="absolute inset-0 bg-gradient-to-tr from-neuro-purple/20 to-transparent" />
                             </div>
                        </div>
                        <div className="absolute bottom-0 right-0 p-1.5 bg-green-500 rounded-full border-4 border-black" />
                    </div>

                    <h2 className="text-xl font-bold">Ashraf Morningstar</h2>

                    <form onSubmit={handleLogin} className="w-full relative group">
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-4 text-center text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20 group-hover:bg-white/10"
                            autoFocus
                        />
                        <button 
                            type="submit"
                            className="absolute right-1 top-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-quantum-glow hover:text-black transition-colors"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <button 
                        onClick={() => handleLogin()}
                        className="flex items-center gap-2 text-xs text-white/40 hover:text-quantum-glow transition-colors mt-2"
                    >
                        <Fingerprint className="w-4 h-4" />
                        <span>Touch ID or Enter to unlock</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

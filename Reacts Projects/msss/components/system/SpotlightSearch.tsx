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

import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, AppWindow, File, Calculator, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSystemStore } from '@/stores/system/system-store';
import { useDockStore } from '@/stores/cosmos/dock-store';

export const SpotlightSearch: React.FC = () => {
    const { isSpotlightOpen, toggleSpotlight } = useSystemStore();
    const { setActiveApp } = useDockStore();
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                toggleSpotlight();
            }
            if (e.key === 'Escape' && isSpotlightOpen) {
                toggleSpotlight();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSpotlightOpen, toggleSpotlight]);

    useEffect(() => {
        if (isSpotlightOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery('');
        }
    }, [isSpotlightOpen]);

    if (!isSpotlightOpen) return null;

    const handleLaunch = (appId: string) => {
        setActiveApp(appId);
        toggleSpotlight();
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[20vh]" onClick={toggleSpotlight}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-[600px] bg-chronos-dark/80 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="h-16 flex items-center px-6 gap-4 border-b border-white/10">
                    <Search className="w-6 h-6 text-white/50" />
                    <input 
                        ref={inputRef}
                        className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-white/20 font-light"
                        placeholder="Spotlight Search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className="px-2 py-1 bg-white/10 rounded text-xs text-white/40 font-mono">ESC</div>
                </div>

                {/* Results (Mocked) */}
                <div className="p-2 max-h-[400px] overflow-y-auto">
                    {query && (
                        <>
                            <div className="px-4 py-2 text-xs font-bold text-white/30 uppercase tracking-wider">Top Hit</div>
                            
                            <button 
                                onClick={() => handleLaunch('ai')}
                                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-neuro-purple/20 group transition-colors text-left"
                            >
                                <div className="w-8 h-8 rounded bg-neuro-pink/20 flex items-center justify-center text-neuro-pink">
                                    <AppWindow className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium group-hover:text-quantum-glow">Neuro AI</h4>
                                    <p className="text-xs text-white/40">Application</p>
                                </div>
                                <span className="text-xs text-white/20">Open</span>
                            </button>

                            <div className="px-4 py-2 text-xs font-bold text-white/30 uppercase tracking-wider mt-2">Applications</div>
                            
                            <button 
                                onClick={() => handleLaunch('projects')}
                                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                            >
                                <AppWindow className="w-4 h-4 text-neuro-cyan" />
                                <span className="text-sm text-white/80">Project Nebula</span>
                            </button>
                            <button 
                                onClick={() => handleLaunch('calc')}
                                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                            >
                                <Calculator className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm text-white/80">Quantum Calculator</span>
                            </button>
                             <button 
                                onClick={() => handleLaunch('calendar')}
                                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
                            >
                                <Calendar className="w-4 h-4 text-red-400" />
                                <span className="text-sm text-white/80">Chronos Calendar</span>
                            </button>

                             <div className="px-4 py-2 text-xs font-bold text-white/30 uppercase tracking-wider mt-2">Files</div>
                             <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 text-left transition-colors">
                                <File className="w-4 h-4 text-white/50" />
                                <span className="text-sm text-white/80">notes_from_future.txt</span>
                            </button>
                        </>
                    )}
                    {!query && (
                        <div className="p-8 text-center text-white/20 text-sm">
                            Type to search apps, quantum files, or timeline events...
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

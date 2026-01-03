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

import React, { useState, useEffect, useRef } from 'react';
import { Search, Command } from 'lucide-react';
import useStore, { APPS } from '../store/useStore';
import { apps } from '../configs/apps';

const Spotlight = () => {
    const { isSpotlightOpen, toggleSpotlight, openWindow, toggleTheme } = useStore();
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.metaKey && e.code === 'Space') {
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
        if (isSpotlightOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSpotlightOpen]);

    if (!isSpotlightOpen) return null;

    const filteredApps = apps.filter(app => 
        app.title.toLowerCase().includes(query.toLowerCase())
    );

    const handleExecute = (appId) => {
        openWindow(appId);
        toggleSpotlight();
        setQuery('');
    };

    const handleSpecial = (cmd) => {
        if (cmd === 'toggle_theme') toggleTheme();
        toggleSpotlight();
        setQuery('');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm" onClick={toggleSpotlight}>
            <div 
                className="w-full max-w-xl bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
                animate={{ scale: isSpotlightOpen ? 1 : 0.95, opacity: isSpotlightOpen ? 1 : 0 }}
            >
                <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-white/10">
                    <Search className="text-gray-500 w-6 h-6" />
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Spotlight Search"
                        className="flex-1 bg-transparent text-xl outline-none text-black dark:text-white placeholder-gray-400"
                    />
                </div>
                
                <div className="max-h-[300px] overflow-auto">
                    {query && filteredApps.map(app => (
                        <div 
                            key={app.id} 
                            onClick={() => handleExecute(app.id)}
                            className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white cursor-pointer group px-4 transition-colors"
                        >
                            <app.icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white" />
                            <span className="font-medium">{app.title}</span>
                            <span className="ml-auto text-xs opacity-50">Application</span>
                        </div>
                    ))}
                    {query && "dark mode".includes(query.toLowerCase()) && (
                         <div 
                            onClick={() => handleSpecial('toggle_theme')}
                            className="flex items-center gap-3 p-3 hover:bg-blue-500 hover:text-white cursor-pointer group px-4 transition-colors"
                        >
                            <Command className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white" />
                            <span className="font-medium">Toggle Dark Mode</span>
                            <span className="ml-auto text-xs opacity-50">System</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Spotlight;

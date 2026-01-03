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
 * @file Spotlight.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { Search, ArrowRight } from 'lucide-react';
import { APP_TITLES } from '../../constants';

const Spotlight: React.FC = () => {
    const { isSpotlightOpen, toggleSpotlight, openApp, fileSystem } = useStore();
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
        if (isSpotlightOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setQuery('');
        }
    }, [isSpotlightOpen]);

    if (!isSpotlightOpen) return null;

    // Search Logic
    const apps = Object.entries(APP_TITLES).map(([id, title]) => ({ id, title, type: 'App' }));
    
    // Flatten filesystem for search
    const getAllFiles = (nodes: any[]): any[] => {
        let files: any[] = [];
        nodes.forEach(node => {
            files.push({ id: node.id, title: node.name, type: node.type === 'folder' ? 'Folder' : 'File', parentId: node.parentId });
            if (node.children) {
                files = [...files, ...getAllFiles(node.children)];
            }
        });
        return files;
    };
    const files = getAllFiles(fileSystem);

    const filtered = [...apps, ...files].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);

    const handleSelect = (item: any) => {
        if (item.type === 'App') {
            openApp(item.id);
        } else {
            // Logic to open file location or file itself
            openApp('files'); 
        }
        toggleSpotlight();
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[20vh]" onClick={toggleSpotlight}>
            <div 
                className="w-full max-w-xl bg-slate-900/60 backdrop-blur-2xl rounded-xl border border-white/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center px-4 py-4 border-b border-white/10">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Spotlight Search"
                        className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-gray-500"
                    />
                </div>
                
                {query && (
                    <div className="p-2">
                        {filtered.length > 0 ? (
                            filtered.map((item, i) => (
                                <button
                                    key={`${item.type}-${item.id}`}
                                    onClick={() => handleSelect(item)}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between group hover:bg-blue-600 transition-colors ${i === 0 ? 'bg-white/5' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Icon based on type */}
                                        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-white/70 uppercase">
                                            {item.type.slice(0, 2)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{item.title}</div>
                                            <div className="text-xs text-gray-400 group-hover:text-blue-200">{item.type}</div>
                                        </div>
                                    </div>
                                    {i === 0 && <ArrowRight className="w-4 h-4 text-white opacity-50" />}
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">No results found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Spotlight;
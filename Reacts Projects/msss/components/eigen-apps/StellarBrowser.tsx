/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search, Lock, Star, Globe, X } from 'lucide-react';

export const StellarBrowser: React.FC = () => {
    const [url, setUrl] = useState('https://www.wikipedia.org');
    const [input, setInput] = useState('https://www.wikipedia.org');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<string[]>(['https://www.google.com']);
    const [favorites, setFavorites] = useState([
        { name: 'GitHub', url: 'https://github.com/AshrafMorningstar' },
        { name: 'Google', url: 'https://www.google.com/webhp?igu=1' },
        { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
        { name: 'Bing', url: 'https://www.bing.com' },
    ]);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleNavigate = (e?: React.FormEvent) => {
        e?.preventDefault();
        setIsLoading(true);
        
        let target = input;
        if (!target.startsWith('http')) {
            if (target.includes('.')) {
                target = `https://${target}`;
            } else {
                target = `https://www.bing.com/search?q=${encodeURIComponent(target)}`;
            }
        }
        
        setUrl(target);
        setHistory(prev => [...prev, target]);
        
        // Simulate load delay for UX
        setTimeout(() => setIsLoading(false), 1500);
    };

    const goHome = () => {
        setUrl('about:blank');
        setInput('');
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-white">
            {/* Toolbar */}
            <div className="h-14 flex items-center gap-3 px-4 bg-gray-100 dark:bg-[#252526] border-b border-gray-200 dark:border-white/10">
                <div className="flex gap-2 text-gray-500">
                    <button onClick={() => {}} className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors"><ArrowLeft className="w-4 h-4" /></button>
                    <button onClick={() => {}} className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors"><ArrowRight className="w-4 h-4" /></button>
                    <button onClick={() => setIsLoading(true)} className={`p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors ${isLoading ? 'animate-spin' : ''}`}><RotateCw className="w-4 h-4" /></button>
                </div>

                <form onSubmit={handleNavigate} className="flex-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Lock className="w-3 h-3 text-green-500" />
                        </div>
                        <input 
                            className="w-full bg-white dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                </form>

                <div className="flex gap-2 text-gray-500">
                    <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full"><Star className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Bookmarks Bar */}
            <div className="h-8 flex items-center gap-2 px-4 bg-gray-50 dark:bg-[#2d2d2e] border-b border-gray-200 dark:border-white/10 overflow-x-auto">
                {favorites.map(fav => (
                    <button 
                        key={fav.name}
                        onClick={() => { setInput(fav.url); setUrl(fav.url); }}
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap transition-colors"
                    >
                        <Globe className="w-3 h-3" />
                        {fav.name}
                    </button>
                ))}
            </div>

            {/* Browser Content */}
            <div className="flex-1 relative bg-white dark:bg-[#1e1e1e] overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-blue-500/20">
                        <div className="h-full bg-blue-500 animate-progress" style={{ width: '60%' }} />
                    </div>
                )}
                
                {url === 'about:blank' ? (
                    <div className="h-full flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Stellar Search</h1>
                        <form onSubmit={handleNavigate} className="w-full max-w-lg mb-8">
                             <div className="relative shadow-xl hover:shadow-2xl transition-shadow rounded-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    className="w-full rounded-full border border-gray-200 dark:border-white/10 py-3 pl-12 pr-6 text-lg focus:outline-none dark:bg-white/5"
                                    placeholder="Search the quantum web..."
                                    onChange={(e) => setInput(e.target.value)}
                                />
                             </div>
                        </form>
                        <div className="grid grid-cols-4 gap-6">
                            {favorites.map(fav => (
                                <button key={fav.name} onClick={() => { setInput(fav.url); setUrl(fav.url); }} className="flex flex-col items-center gap-2 group">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                                        <Globe className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-500" />
                                    </div>
                                    <span className="text-xs font-medium">{fav.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <iframe 
                        ref={iframeRef}
                        src={url}
                        className="w-full h-full border-none bg-white"
                        sandbox="allow-same-origin allow-scripts allow-forms"
                        onError={() => setUrl('about:error')}
                        title="browser-frame"
                    />
                )}
            </div>
        </div>
    );
};

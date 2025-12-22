/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useRef, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';
import { apps } from '../../config/apps';

export const Spotlight = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { openApp } = useStore();
    const [query, setQuery] = useState('');
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredApps = apps.filter(app => app.title.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        if (isOpen) {
             gsap.fromTo(ref.current, 
                { opacity: 0, scale: 0.95, y: -50 },
                { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out' }
            );
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
             setQuery('');
        }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'Enter' && filteredApps.length > 0) {
            openApp(filteredApps[0].id);
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-[9999]" onClick={onClose} />
            <div ref={ref} className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[600px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 dark:border-white/10 z-[10000] overflow-hidden flex flex-col">
                <div className="h-16 flex items-center px-4 gap-4">
                    <Search size={24} className="text-gray-500" />
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Spotlight Search" 
                        className="flex-1 bg-transparent border-none outline-none text-2xl text-gray-800 dark:text-gray-100 placeholder-gray-400 font-light"
                    />
                </div>
                
                {query && (
                    <div className="border-t border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto p-2">
                        {filteredApps.length > 0 ? filteredApps.map((app, i) => (
                            <button 
                                key={app.id}
                                onClick={() => { openApp(app.id); onClose(); }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${i === 0 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                            >
                                <app.icon size={20} />
                                <span className="text-md font-medium">{app.title}</span>
                                {i === 0 && <span className="text-xs opacity-70 ml-auto">Return</span>}
                            </button>
                        )) : (
                            <div className="p-4 text-center text-gray-500">No results found</div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

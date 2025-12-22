/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file LaunchpadApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - Launchpad
 */

import React, { useState } from 'react';
import { Search, Grid, X } from 'lucide-react';
import { AppId, AppConfig } from '../../types';

interface LaunchpadProps {
    apps: AppConfig[];
    onOpenApp: (id: AppId) => void;
    onClose: () => void;
}

const LaunchpadApp: React.FC<LaunchpadProps> = ({ apps, onOpenApp, onClose }) => {
    const [search, setSearch] = useState('');

    const filteredApps = apps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl z-[900] flex flex-col items-center animate-in zoom-in-95 duration-300" onClick={onClose}>
            {/* Search Bar */}
            <div className="mt-16 w-96 relative" onClick={e => e.stopPropagation()}>
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neuro-cyan/50 focus:bg-white/20 transition-all font-space-grotesk"
                    autoFocus
                />
            </div>

            {/* App Grid */}
            <div className="flex-1 w-full max-w-6xl p-10 grid grid-cols-4 md:grid-cols-7 gap-8 overflow-y-auto content-start justify-items-center" onClick={e => e.stopPropagation()}>
                {filteredApps.map(app => (
                    <div 
                        key={app.id} 
                        onClick={() => { onOpenApp(app.id); onClose(); }}
                        className="flex flex-col items-center gap-3 group cursor-pointer w-24"
                    >
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${app.color ? app.color.replace('text-', 'bg-').replace('500', '500/20') : 'bg-white/10'} border border-white/10 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-neuro-cyan/20`}>
                            <app.icon size={32} className={app.color} />
                        </div>
                        <span className="text-white text-xs font-medium tracking-wide drop-shadow-md text-center">{app.name}</span>
                    </div>
                ))}
            </div>

             {/* Close Hint */}
             <div className="mb-10 text-white/30 text-sm font-mono tracking-widest uppercase">Click anywhere to close</div>
        </div>
    );
};

export default LaunchpadApp;

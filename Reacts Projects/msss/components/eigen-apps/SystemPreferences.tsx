/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React from 'react';
import { Monitor, Cpu, PaintBucket, Wifi } from 'lucide-react';

export const SystemPreferences: React.FC = () => {
    return (
        <div className="grid grid-cols-[200px_1fr] h-full">
            {/* Sidebar */}
            <div className="bg-black/20 border-r border-white/5 p-4 space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg bg-white/10 text-white font-medium text-sm flex items-center gap-3">
                    <Monitor className="w-4 h-4" />
                    Display
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-white/60 font-medium text-sm flex items-center gap-3 transition-colors">
                    <PaintBucket className="w-4 h-4" />
                    Appearance
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-white/60 font-medium text-sm flex items-center gap-3 transition-colors">
                    <Cpu className="w-4 h-4" />
                    performance
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-white/60 font-medium text-sm flex items-center gap-3 transition-colors">
                    <Wifi className="w-4 h-4" />
                    Network
                </button>
            </div>

            {/* Content */}
            <div className="p-8">
                 <h2 className="text-2xl font-bold text-white mb-6">Display Settings</h2>
                 
                 <div className="space-y-6">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                         <div className="flex justify-between items-center mb-4">
                             <div>
                                 <h3 className="text-white font-medium">Wallpaper</h3>
                                 <p className="text-white/40 text-sm">Choose your cosmic background</p>
                             </div>
                         </div>
                         <div className="flex gap-4 overflow-x-auto pb-2">
                             {[1, 2, 3, 4].map(i => (
                                 <div key={i} className="w-32 h-20 rounded-lg bg-gradient-to-br from-chronos-blue to-black border-2 border-transparent hover:border-quantum-glow cursor-pointer relative overflow-hidden group">
                                     <div className={`absolute inset-0 bg-gradient-to-br ${i === 1 ? 'from-purple-900 to-black' : i === 2 ? 'from-blue-900 to-black' : 'from-gray-900 to-black'}`} />
                                     {i === 1 && <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow-md">Default</div>}
                                 </div>
                             ))}
                         </div>
                     </div>

                     <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                         <div>
                             <h3 className="text-white font-medium">Quantum Particles</h3>
                             <p className="text-white/40 text-sm">Enable background neural simulation</p>
                         </div>
                         {/* Toggle Switch */}
                         <div className="w-12 h-6 rounded-full bg-quantum-glow p-1 flex justify-end cursor-pointer">
                             <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                         </div>
                     </div>
                     
                     <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                         <h3 className="text-white font-medium mb-3">Accent Color</h3>
                         <div className="flex gap-3">
                             {['bg-neuro-purple', 'bg-quantum-glow', 'bg-neuro-pink', 'bg-neuro-cyan', 'bg-green-500', 'bg-orange-500'].map(color => (
                                 <div key={color} className={`w-8 h-8 rounded-full ${color} cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-white/10`} />
                             ))}
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

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

import React from 'react';
import { Ratio, Image, Download } from 'lucide-react';

export const MatterShaper: React.FC = () => {
    return (
        <div className="h-full grid grid-cols-[300px_1fr] gap-0">
             {/* Controls */}
             <div className="bg-black/20 border-r border-white/10 p-6 space-y-6 overflow-y-auto">
                 <div>
                     <label className="block text-xs font-bold text-white/50 uppercase mb-2">Prompt</label>
                     <textarea 
                        className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-neuro-purple/50 focus:outline-none resize-none"
                        placeholder="Describe the matter to shape..."
                     />
                 </div>
                 
                 <div>
                     <label className="block text-xs font-bold text-white/50 uppercase mb-2">Aspect Ratio</label>
                     <div className="grid grid-cols-3 gap-2">
                         <button className="p-2 rounded-lg bg-neuro-purple/20 border border-neuro-purple/30 text-white text-xs hover:bg-neuro-purple/30 transition-colors">1:1</button>
                         <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 transition-colors">16:9</button>
                         <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 transition-colors">9:16</button>
                     </div>
                 </div>

                 <div>
                     <label className="block text-xs font-bold text-white/50 uppercase mb-2">Dimensions</label>
                     <div className="grid grid-cols-2 gap-2">
                         <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 transition-colors">1024x1024</button>
                         <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 transition-colors">512x512</button>
                     </div>
                 </div>

                 <button className="w-full py-3 bg-gradient-to-r from-neuro-purple to-quantum-energy rounded-xl text-white font-bold shadow-neuro hover:shadow-quantum transition-all hover:scale-[1.02]">
                     Shape Matter
                 </button>
             </div>

             {/* Canvas/Preview */}
             <div className="relative bg-grid-pattern p-8 flex items-center justify-center bg-gray-900/50">
                 <div className="w-[512px] h-[512px] border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-white/20">
                     <Image className="w-16 h-16 mb-4 opacity-50" />
                     <p>Waiting for query...</p>
                 </div>
             </div>
        </div>
    );
};

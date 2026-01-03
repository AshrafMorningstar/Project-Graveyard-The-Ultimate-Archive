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

import React, { useState } from 'react';
import { Layers, Wand2, Download } from 'lucide-react';

const MatterShaper = () => {
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [resolution, setResolution] = useState('1080p');

    const ratios = ['1:1', '4:3', '16:9', '9:16'];
    const resOptions = ['720p', '1080p', '4K'];

    return (
        <div className="h-full p-6 flex flex-col md:flex-row gap-6">
            {/* Controls */}
            <div className="w-full md:w-80 space-y-6">
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Dimensions</h3>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {ratios.map(r => (
                            <button 
                                key={r}
                                onClick={() => setAspectRatio(r)}
                                className={`py-2 text-sm rounded border transition-all ${
                                    aspectRatio === r 
                                        ? 'bg-blue-600 border-blue-500 text-white' 
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {resOptions.map(r => (
                            <button 
                                key={r}
                                onClick={() => setResolution(r)}
                                className={`py-2 text-sm rounded border transition-all ${
                                    resolution === r 
                                        ? 'bg-purple-600 border-purple-500 text-white' 
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                     <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Prompt</h3>
                     <textarea 
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-blue-500 resize-none mb-2"
                        placeholder="Describe the matter you wish to shape..."
                     />
                     <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                         <Wand2 size={18} /> Shape Matter
                     </button>
                </div>
            </div>

            {/* Preview */}
            <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://c4.wallpaperflare.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-preview.jpg')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                
                <div className="relative z-10 text-center">
                     <Layers size={48} className="mx-auto mb-4 text-white/30" />
                     <p className="text-white/50">Preview Area</p>
                     <div className="text-xs text-white/30 mt-2">{aspectRatio} • {resolution}</div>
                </div>

                <button className="absolute bottom-4 right-4 p-2 bg-white/10 backdrop-blur rounded hover:bg-white/20 transition-colors">
                     <Download size={20} />
                </button>
            </div>
        </div>
    );
};

export default MatterShaper;

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
import { Image as ImageIcon, Heart } from 'lucide-react';

const IMAGES = [
    { title: "Cosmic Nebula", color: "from-purple-500 to-blue-500" },
    { title: "Quantum Field", color: "from-green-400 to-blue-600" },
    { title: "Event Horizon", color: "from-orange-500 to-red-800" },
    { title: "Neural Synapse", color: "from-pink-500 to-purple-800" },
    { title: "Dark Matter", color: "from-gray-800 to-black" },
    { title: "Stellar Dust", color: "from-yellow-200 to-orange-400" },
    { title: "Wormhole", color: "from-indigo-500 to-cyan-500" },
    { title: "Supernova", color: "from-red-500 to-yellow-500" },
];

export const HoloGallery: React.FC = () => {
    return (
        <div className="h-full bg-chronos-dark p-6 overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-2xl font-bold font-space-grotesk text-white">Quantum Memories</h2>
                    <p className="text-white/40">stored in crystalized glass</p>
                 </div>
                 <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20">
                     Upload
                 </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {IMAGES.map((img, i) => (
                    <div key={i} className="aspect-square relative group rounded-xl overflow-hidden cursor-pointer">
                        <div className={`absolute inset-0 bg-gradient-to-br ${img.color} transition-transform duration-700 group-hover:scale-110`} />
                        
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <span className="text-white font-bold">{img.title}</span>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-white/60">2.4 MB</span>
                                <Heart className="w-4 h-4 text-white hover:text-red-500 transition-colors" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

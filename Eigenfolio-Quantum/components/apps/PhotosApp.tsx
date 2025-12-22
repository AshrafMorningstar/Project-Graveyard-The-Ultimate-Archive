/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file PhotosApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Photos Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React from 'react';
import { Image, Heart, Share, Maximize2 } from 'lucide-react';

const PhotosApp: React.FC = () => {
    // Curated Unsplash Images for high-quality visuals
    const photos = [
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80", // Mountains
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", // City
        "https://images.unsplash.com/photo-1534081333815-ae5019106622?w=800&q=80", // Sea
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80", // Landscape
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80", // Abstract
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", // Cyberpunk
        "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80", // Neon
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", // Tech
    ];

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur sticky top-0 z-10">
                <div className="flex gap-4 text-sm font-medium">
                    <button className="text-black dark:text-white">Library</button>
                    <button className="text-gray-400 hover:text-gray-600">For You</button>
                    <button className="text-gray-400 hover:text-gray-600">Albums</button>
                </div>
                <div className="text-xs text-gray-500 font-medium">8 Photos • 2 Videos</div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                    {photos.map((src, i) => (
                        <div key={i} className="aspect-square relative group overflow-hidden bg-gray-100 dark:bg-white/5 cursor-pointer">
                            <img src={src} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                                <button className="p-2 hover:bg-white/20 rounded-full"><Heart size={20} /></button>
                                <button className="p-2 hover:bg-white/20 rounded-full"><Maximize2 size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 text-center text-gray-400 text-sm pb-8">
                    <p>Synced with Quantum Cloud</p>
                    <div className="w-full h-1 bg-gray-100 dark:border-white/5 mt-2 rounded overflow-hidden max-w-xs mx-auto">
                        <div className="w-3/4 h-full bg-blue-500"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotosApp;

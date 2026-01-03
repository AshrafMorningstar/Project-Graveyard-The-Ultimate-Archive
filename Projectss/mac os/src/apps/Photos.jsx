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

import React from 'react';
import { Heart, Maximize2 } from 'lucide-react';

const Photos = () => {
    const photos = [
        "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=500&q=80",
        "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=500&q=80",
        "https://images.unsplash.com/photo-1707345512638-997d31a10eaa?w=500&q=80",
        "https://images.unsplash.com/photo-1707327259268-2741b50ef5e5?w=500&q=80",
        "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?w=500&q=80",
        "https://images.unsplash.com/photo-1707343844152-30220d6fe9cd?w=500&q=80"
    ];

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] flex flex-col">
            <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center justify-center font-bold text-black dark:text-white">
                Library
            </div>
            <div className="flex-1 overflow-auto p-1">
                <div className="grid grid-cols-3 gap-1">
                    {photos.map((src, i) => (
                        <div key={i} className="aspect-square relative group overflow-hidden cursor-pointer">
                            <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                                <Heart className="text-white hover:text-red-500" size={18} />
                                <Maximize2 className="text-white" size={18} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-10 border-t border-gray-200 dark:border-white/10 flex items-center justify-center text-xs text-gray-500">
                {photos.length} Photos • 1 Video
            </div>
        </div>
    );
};

export default Photos;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file MapsApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Maps Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React, { useState } from 'react';
import { Search, Navigation, Map as MapIcon, Layers, Loader2 } from 'lucide-react';

const MapsApp: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white relative">
            {/* Search Bar Overlay */}
            <div className="absolute top-4 left-4 z-10 w-80 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-lg shadow-xl p-2 flex items-center gap-2 border border-gray-200 dark:border-white/10">
                <Search size={18} className="text-gray-400" />
                <input 
                    placeholder="Search Maps"
                    className="bg-transparent border-none focus:outline-none flex-1 text-sm"
                />
                <div className="w-px h-6 bg-gray-300 dark:bg-white/20"></div>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded"><Navigation size={18} className="text-blue-500" /></button>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                 <button className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50">
                    <MapIcon size={20} />
                 </button>
                 <button className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50">
                    <Layers size={20} />
                 </button>
            </div>

            {/* Map View (Iframe for OpenStreetMap) */}
            <div className="flex-1 w-full h-full relative bg-blue-50">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-[#1e1e1e] z-0">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="animate-spin text-blue-500" size={32} />
                            <span className="text-sm font-medium">Loading World Data...</span>
                        </div>
                    </div>
                )}
                <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5630,37.3000,-121.8000,37.8000&layer=mapnik&marker=37.3318,-122.0312" 
                    onLoad={() => setIsLoading(false)}
                    className="relative z-1"
                ></iframe>
            </div>

            {/* Simulated Location Marker Label */}
             <div className="absolute bottom-6 left-6 z-10 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow border border-gray-200 dark:border-white/10">
                📍 Cupertino, CA (Simulated)
            </div>
        </div>
    );
};

export default MapsApp;

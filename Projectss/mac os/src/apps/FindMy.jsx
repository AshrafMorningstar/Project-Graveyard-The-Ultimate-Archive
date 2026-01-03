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
import { MapPin, Smartphone, Laptop, Watch, Headphones } from 'lucide-react';

const FindMy = () => {
    return (
        <div className="flex h-full bg-[#f2f2f7] dark:bg-[#1e1e1e] text-black dark:text-white">
             {/* Sidebar List */}
             <div className="w-80 bg-white dark:bg-[#2c2c2e] flex flex-col border-r border-gray-200 dark:border-white/10">
                 <div className="p-4 border-b border-gray-200 dark:border-white/10">
                     <h1 className="text-2xl font-bold">Devices</h1>
                 </div>
                 <div className="flex-1 overflow-auto">
                     {[
                         { name: "Ashraf's iPhone", icon: Smartphone, loc: "With You", bat: "84%" },
                         { name: "MacBook Pro", icon: Laptop, loc: "Home • 1 min ago", bat: "100%" },
                         { name: "Apple Watch", icon: Watch, loc: "Home", bat: "Charging" },
                         { name: "AirPods Pro", icon: Headphones, loc: "0.2 mi away", bat: "L: 50% R: 45%" }
                     ].map((dev, i) => (
                         <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                             <div className="w-10 h-10 bg-gray-100 dark:bg-black/20 rounded-full flex items-center justify-center text-gray-500">
                                 <dev.icon size={20} />
                             </div>
                             <div>
                                 <div className="font-bold text-sm">{dev.name}</div>
                                 <div className="text-xs text-gray-500">{dev.loc}</div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
             
             {/* Map Area (Mock) */}
             <div className="flex-1 relative bg-[#e5e3df]">
                 <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none text-4xl font-bold text-gray-400 select-none">
                     MAP VIEW
                 </div>
                 {/* Mock Locations */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                     <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-ping absolute"></div>
                     <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg relative z-10"></div>
                     <div className="mt-2 bg-white/90 px-2 py-1 rounded shadow-md text-xs font-bold">You</div>
                 </div>
             </div>
        </div>
    );
};

export default FindMy;

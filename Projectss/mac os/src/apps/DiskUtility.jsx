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
import { HardDrive, Circle } from 'lucide-react';

const DiskUtility = () => {
    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
            <div className="w-64 border-r border-gray-200 dark:border-white/10 bg-[#f3f3f3] dark:bg-[#2d2d2d] p-4">
                <div className="text-xs font-bold text-gray-500 mb-2 uppercase">Internal</div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded cursor-pointer">
                    <HardDrive size={16} /> Macintosh HD
                </div>
                <div className="flex items-center gap-2 px-3 py-1 pl-8 text-sm opacity-80 cursor-pointer">
                     Data
                </div>
                
                <div className="text-xs font-bold text-gray-500 mt-6 mb-2 uppercase">External</div>
                <div className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded">
                    <HardDrive size={16} className="text-orange-500"/> Backup Drive
                </div>
            </div>

            <div className="flex-1 p-8 flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                    <HardDrive size={64} className="text-gray-400" />
                    <div>
                        <h1 className="text-2xl font-bold">Macintosh HD</h1>
                        <p className="text-sm text-gray-500">APFS Volume • 2TB Total</p>
                    </div>
                </div>

                <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-6 mb-8 flex-1">
                    <div className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden flex mb-4">
                        <div className="w-[40%] bg-blue-500"></div>
                        <div className="w-[20%] bg-purple-500"></div>
                        <div className="w-[15%] bg-yellow-500"></div>
                        <div className="w-[5%] bg-green-500"></div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-xs font-medium">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Apps: 400 GB</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Docs: 200 GB</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> System: 150 GB</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Other: 50 GB</div>
                    </div>
                </div>
                
                <div className="text-right text-sm text-gray-500">
                    1.2 TB Available
                </div>
            </div>
        </div>
    );
};

export default DiskUtility;

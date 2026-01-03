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

/**
 * @file DiskUtilityApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Disk Utility Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React from 'react';
import { HardDrive, Server, Database, PieChart } from 'lucide-react';

const DiskUtilityApp: React.FC = () => {
    return (
        <div className="h-full flex bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
            {/* Sidebar */}
            <div className="w-56 bg-gray-50 dark:bg-black/20 border-r border-gray-200 dark:border-white/10 p-2 text-xs">
                <div className="font-bold text-gray-500 uppercase px-2 mb-1">Internal</div>
                <div className="bg-blue-500 text-white rounded px-2 py-1.5 flex items-center gap-2 mb-1">
                    <HardDrive size={14} />
                    <span>Quantum SSD</span>
                </div>
                 <div className="px-2 py-1.5 flex items-center gap-2 text-gray-600 dark:text-gray-400 pl-6">
                    <Database size={12} />
                    <span>Container disk1</span>
                </div>
                 <div className="px-2 py-1.5 flex items-center gap-2 text-gray-600 dark:text-gray-400 pl-10 border-l-2 border-gray-300 dark:border-white/10 ml-4">
                    <span>Macintosh HD</span>
                </div>
                
                <div className="font-bold text-gray-500 uppercase px-2 mb-1 mt-4">External</div>
                <div className="px-2 py-1.5 flex items-center gap-2 text-gray-600 dark:text-gray-400 opacity-50">
                    <Server size={14} />
                    <span>Not Connected</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <div className="h-16 border-b border-gray-200 dark:border-white/10 flex items-center px-6 bg-gray-50 dark:bg-[#252525]">
                     <HardDrive size={32} className="text-blue-500 mr-4" />
                     <div>
                         <h1 className="text-lg font-bold">Quantum SSD</h1>
                         <div className="text-xs text-gray-500">PCI-Express Internal Physical Volume • GUID Partition Map</div>
                     </div>
                </div>

                <div className="flex-1 p-8">
                     {/* Storage Bar */}
                     <div className="mb-8">
                        <div className="flex justify-between text-xs mb-2">
                             <span>Used: 420 GB</span>
                             <span>Free: 580 GB</span>
                        </div>
                        <div className="h-8 w-full bg-gray-200 dark:bg-white/10 rounded-md overflow-hidden flex">
                             <div className="w-[40%] bg-blue-500" title="Apps"></div>
                             <div className="w-[15%] bg-purple-500" title="Documents"></div>
                             <div className="w-[10%] bg-green-500" title="System"></div>
                             <div className="w-[5%] bg-yellow-500" title="Other"></div>
                        </div>
                        <div className="flex gap-4 mt-2 text-xs">
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Apps</div>
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Docs</div>
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> System</div>
                             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Other</div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-8 text-sm">
                         <div>
                             <div className="py-2 border-b border-gray-100 dark:border-white/5 flex justify-between">
                                 <span className="text-gray-500">Location</span>
                                 <span>Internal</span>
                             </div>
                             <div className="py-2 border-b border-gray-100 dark:border-white/5 flex justify-between">
                                 <span className="text-gray-500">Connection</span>
                                 <span>PCI-Express</span>
                             </div>
                             <div className="py-2 border-b border-gray-100 dark:border-white/5 flex justify-between">
                                 <span className="text-gray-500">Capacity</span>
                                 <span>1.02 TB</span>
                             </div>
                         </div>
                         <div>
                             <div className="py-2 border-b border-gray-100 dark:border-white/5 flex justify-between">
                                 <span className="text-gray-500">Type</span>
                                 <span>Solid State</span>
                             </div>
                             <div className="py-2 border-b border-gray-100 dark:border-white/5 flex justify-between">
                                 <span className="text-gray-500">S.M.A.R.T. Status</span>
                                 <span className="text-green-500 font-bold">Verified</span>
                             </div>
                             <div className="py-2 border-b border-gray-100 dark:border-white/5 flex justify-between">
                                 <span className="text-gray-500">Writable</span>
                                 <span>Yes</span>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default DiskUtilityApp;

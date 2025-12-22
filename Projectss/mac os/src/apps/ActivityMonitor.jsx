/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { Activity, Cpu, HardDrive, Wifi, Battery } from 'lucide-react';

const ActivityMonitor = () => {
    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-black dark:text-white font-mono text-xs">
            {/* Toolbar */}
            <div className="h-10 bg-[#f0f0f0] dark:bg-[#2d2d2d] border-b border-gray-300 dark:border-white/10 flex items-center px-4 gap-4">
                <div className="flex bg-gray-300 dark:bg-black/20 p-1 rounded-md">
                    <div className="px-3 py-0.5 bg-white dark:bg-[#3d3d3d] rounded-sm shadow-sm">CPU</div>
                    <div className="px-3 py-0.5">Memory</div>
                    <div className="px-3 py-0.5">Energy</div>
                    <div className="px-3 py-0.5">Disk</div>
                    <div className="px-3 py-0.5">Network</div>
                </div>
            </div>

            {/* Graphs */}
            <div className="h-24 bg-black border-b border-white/10 flex">
                 <div className="flex-1 border-r border-white/10 p-2 relative overflow-hidden">
                     <div className="absolute top-2 left-2 text-white font-bold z-10">System Load</div>
                     <div className="absolute inset-x-0 bottom-0 h-16 flex items-end gap-0.5 px-1 opacity-50">
                         {[...Array(40)].map((_, i) => (
                             <div key={i} className="flex-1 bg-blue-500" style={{ height: `${Math.random() * 100}%` }}></div>
                         ))}
                     </div>
                 </div>
                 <div className="w-48 bg-[#0d0d0d] p-2">
                     <div className="flex justify-between mb-1"><span>Sys:</span> <span className="text-blue-400">12%</span></div>
                     <div className="flex justify-between mb-1"><span>User:</span> <span className="text-green-400">24%</span></div>
                     <div className="flex justify-between mb-1"><span>Idle:</span> <span className="text-gray-500">64%</span></div>
                     <div className="mt-2 text-xl font-bold">Threads: 4,021</div>
                 </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-auto">
                 <table className="w-full text-left border-collapse">
                     <thead className="bg-[#f0f0f0] dark:bg-[#2d2d2d] sticky top-0">
                         <tr>
                             <th className="p-2 border-b border-r border-gray-300 dark:border-white/10 w-8"></th>
                             <th className="p-2 border-b border-r border-gray-300 dark:border-white/10">Process Name</th>
                             <th className="p-2 border-b border-r border-gray-300 dark:border-white/10 w-16">% CPU</th>
                             <th className="p-2 border-b border-r border-gray-300 dark:border-white/10 w-24">Memory</th>
                             <th className="p-2 border-b border-r border-gray-300 dark:border-white/10 w-16">User</th>
                         </tr>
                     </thead>
                     <tbody>
                         {[
                             { name: "kernel_task", cpu: "12.4", mem: "820 MB", user: "root" },
                             { name: "WindowServer", cpu: "8.2", mem: "412 MB", user: "_window" },
                             { name: "Google Chrome", cpu: "14.5", mem: "2.1 GB", user: "ashraf" },
                             { name: "Code Helper", cpu: "0.1", mem: "150 MB", user: "ashraf" },
                             { name: "Spotify", cpu: "2.1", mem: "300 MB", user: "ashraf" },
                             { name: "mds_stores", cpu: "0.5", mem: "80 MB", user: "root" },
                             { name: "docker", cpu: "4.2", mem: "4.5 GB", user: "ashraf" },
                             { name: "electron", cpu: "0.0", mem: "89 MB", user: "ashraf" },
                         ].map((proc, i) => (
                             <tr key={i} className="hover:bg-blue-500 hover:text-white odd:bg-gray-50 dark:odd:bg-[#252525]">
                                 <td className="p-1 border-b border-gray-200 dark:border-white/5 text-center"><Activity size={12}/></td>
                                 <td className="p-1 border-b border-gray-200 dark:border-white/5 font-medium">{proc.name}</td>
                                 <td className="p-1 border-b border-gray-200 dark:border-white/5">{proc.cpu}</td>
                                 <td className="p-1 border-b border-gray-200 dark:border-white/5">{proc.mem}</td>
                                 <td className="p-1 border-b border-gray-200 dark:border-white/5">{proc.user}</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
            </div>
        </div>
    );
};

export default ActivityMonitor;

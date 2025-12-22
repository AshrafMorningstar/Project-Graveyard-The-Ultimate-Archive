/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file TaskManager.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Activity, Cpu, HardDrive, XCircle } from 'lucide-react';
import { AppConfig, Process, WindowState } from '../../types';

const TaskManager: React.FC = () => {
    const { windows, closeApp, settings } = useStore();
    const [processes, setProcesses] = useState<Process[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const activeWindows = (Object.values(windows) as WindowState[]).filter(w => w.isOpen);
            const newProcesses = activeWindows.map((w, index) => ({
                id: index + 100,
                appId: w.id,
                name: w.id.charAt(0).toUpperCase() + w.id.slice(1),
                cpu: Math.floor(Math.random() * 15) + 1,
                memory: Math.floor(Math.random() * 200) + 50
            }));
            setProcesses(newProcesses);
        }, 2000);
        return () => clearInterval(interval);
    }, [windows]);

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] text-white p-4 font-mono">
             <div className="grid grid-cols-3 gap-4 mb-6">
                 <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                     <div className="flex items-center gap-2 text-blue-400 mb-2">
                         <Cpu size={18} /> <span className="text-sm font-bold">CPU Load</span>
                     </div>
                     <div className="text-2xl font-bold">{processes.reduce((acc, p) => acc + p.cpu, 0)}%</div>
                     <div className="w-full bg-black/30 h-1.5 mt-2 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${processes.reduce((acc, p) => acc + p.cpu, 0)}%` }} />
                     </div>
                 </div>
                 <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                     <div className="flex items-center gap-2 text-purple-400 mb-2">
                         <Activity size={18} /> <span className="text-sm font-bold">Memory</span>
                     </div>
                     <div className="text-2xl font-bold">{processes.reduce((acc, p) => acc + p.memory, 0)} MB</div>
                      <div className="w-full bg-black/30 h-1.5 mt-2 rounded-full overflow-hidden">
                         <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${processes.reduce((acc, p) => acc + p.memory, 0) / 20}%` }} />
                     </div>
                 </div>
                 <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                     <div className="flex items-center gap-2 text-green-400 mb-2">
                         <HardDrive size={18} /> <span className="text-sm font-bold">Processes</span>
                     </div>
                     <div className="text-2xl font-bold">{processes.length}</div>
                 </div>
             </div>

             <div className="flex-1 bg-black/20 rounded-xl border border-white/10 overflow-hidden flex flex-col">
                 <div className="flex bg-white/5 p-3 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-white/10">
                     <div className="w-1/3">Application</div>
                     <div className="w-1/4 text-center">CPU</div>
                     <div className="w-1/4 text-center">Memory</div>
                     <div className="w-1/6 text-right">Action</div>
                 </div>
                 <div className="flex-1 overflow-y-auto">
                     {processes.map(proc => (
                         <div key={proc.id} className="flex items-center p-3 border-b border-white/5 hover:bg-white/5 transition-colors text-sm">
                             <div className="w-1/3 font-bold flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                 {proc.name}
                             </div>
                             <div className="w-1/4 text-center text-gray-300">{proc.cpu}%</div>
                             <div className="w-1/4 text-center text-gray-300">{proc.memory} MB</div>
                             <div className="w-1/6 text-right">
                                 <button 
                                    onClick={() => closeApp(proc.appId)}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                 >
                                     <span className="text-xs font-bold border border-red-500/30 px-2 py-1 rounded hover:bg-red-500/10">KILL</span>
                                 </button>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    );
};

export default TaskManager;
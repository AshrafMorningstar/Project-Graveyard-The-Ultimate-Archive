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
 * @file ActivityMonitorApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Activity Monitor Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Wifi, Zap } from 'lucide-react';

const ActivityMonitorApp: React.FC = () => {
    const [activeTab, setActiveTab] = useState('cpu');
    const [cpuHistory, setCpuHistory] = useState<number[]>(new Array(40).fill(10));
    
    // Process Data Simulation
    const processes = [
        { name: 'Quantum Kernel', cpu: 12.5, mem: '1.2 GB', energy: 'High' },
        { name: 'Chrome Helper', cpu: 45.2, mem: '800 MB', energy: 'High' },
        { name: 'WindowServer', cpu: 8.1, mem: '450 MB', energy: 'Medium' },
        { name: 'Neuro AI Engine', cpu: 0.5, mem: '4.5 GB', energy: 'Low' },
        { name: 'Spotlight', cpu: 0.1, mem: '120 MB', energy: 'Low' },
        { name: 'Music', cpu: 0.0, mem: '85 MB', energy: 'Low' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCpuHistory(prev => {
                const newData = [...prev.slice(1), Math.random() * 60 + 10]; // Random CPU load
                return newData;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const TabButton = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
        <button 
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-1 px-4 text-xs font-medium border-r border-gray-300 dark:border-white/10 last:border-0 flex items-center justify-center gap-2 ${activeTab === id ? 'bg-gray-200 dark:bg-white/20' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
        >
            <Icon size={12} /> {label}
        </button>
    );

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
            {/* Toolbar */}
            <div className="flex border-b border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-[#2d2d2d]">
                <TabButton id="cpu" label="CPU" icon={Cpu} />
                <TabButton id="memory" label="Memory" icon={HardDrive} />
                <TabButton id="energy" label="Energy" icon={Zap} />
                <TabButton id="network" label="Network" icon={Wifi} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Graph Area */}
                <div className="h-32 bg-black/5 dark:bg-black/40 border-b border-gray-300 dark:border-white/10 p-4 relative overflow-hidden">
                     <div className="absolute inset-0 flex items-end justify-between px-1">
                        {cpuHistory.map((load, i) => (
                            <div 
                                key={i} 
                                className="w-2 bg-blue-500/50 rounded-t-sm transition-all duration-300"
                                style={{ height: `${load}%` }}
                            ></div>
                        ))}
                     </div>
                     <div className="absolute top-2 left-2 text-xs font-mono text-gray-500">System Load</div>
                </div>

                {/* Process List */}
                <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 dark:bg-white/5 sticky top-0 z-10 border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="p-2 font-medium">Process Name</th>
                                <th className="p-2 font-medium text-right">% CPU</th>
                                <th className="p-2 font-medium text-right">Memory</th>
                                <th className="p-2 font-medium">Energy Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processes.map((proc, i) => (
                                <tr key={i} className="border-b border-gray-100 dark:border-white/5 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-default">
                                    <td className="p-2 flex items-center gap-2">
                                        <Activity size={12} className="text-gray-400" />
                                        {proc.name}
                                    </td>
                                    <td className="p-2 text-right font-mono">{proc.cpu.toFixed(1)}</td>
                                    <td className="p-2 text-right text-gray-500 dark:text-gray-400">{proc.mem}</td>
                                    <td className="p-2">
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${proc.energy === 'High' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                            {proc.energy}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Status Bar */}
            <div className="bg-gray-100 dark:bg-[#2d2d2d] border-t border-gray-300 dark:border-white/10 p-1 text-[10px] text-center text-gray-500">
                Processes: 142 | Threads: 892 | Uptime: 4d 12h 32m
            </div>
        </div>
    );
};

export default ActivityMonitorApp;

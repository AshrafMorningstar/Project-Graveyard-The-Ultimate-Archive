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

﻿/**
 * @file TaskManagerApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * ðŸŒŒ Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Activity, XCircle, Cpu, Zap } from 'lucide-react';
import { AppId, WindowState } from '../../types';

interface TaskManagerProps {
    windows: WindowState[];
    onCloseApp: (id: string) => void;
}

const TaskManagerApp: React.FC<TaskManagerProps> = ({ windows, onCloseApp }) => {
    const [processes, setProcesses] = useState<any[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProcesses(windows.map(w => ({
                id: w.id,
                name: w.title,
                cpu: Math.floor(Math.random() * 15),
                mem: Math.floor(Math.random() * 200) + 50
            })));
        }, 1000);
        return () => clearInterval(interval);
    }, [windows]);

    return (
        <div className="h-full bg-gray-100 dark:bg-chronos-dark flex flex-col text-gray-800 dark:text-white font-mono text-xs">
            <div className="h-10 bg-gray-200 dark:bg-white/5 border-b border-gray-300 dark:border-white/10 flex items-center px-4 font-bold gap-4">
                <Activity size={16} className="text-green-500" /> System Monitor
            </div>
            
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-200 dark:bg-white/5 sticky top-0">
                        <tr>
                            <th className="p-3">Process Name</th>
                            <th className="p-3">CPU %</th>
                            <th className="p-3">Memory (MB)</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processes.map(p => (
                            <tr key={p.id} className="border-b border-gray-300 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5">
                                <td className="p-3 font-bold">{p.name}</td>
                                <td className="p-3 text-green-600 dark:text-green-400">{p.cpu}%</td>
                                <td className="p-3 text-blue-600 dark:text-blue-400">{p.mem} MB</td>
                                <td className="p-3">
                                    <button 
                                        onClick={() => onCloseApp(p.id)}
                                        className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition flex items-center gap-1"
                                    >
                                        <XCircle size={12} /> End Task
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* System Processes Mock */}
                        <tr className="opacity-50">
                            <td className="p-3">kernel.sys</td>
                            <td className="p-3">1.2%</td>
                            <td className="p-3">1024 MB</td>
                            <td className="p-3">System</td>
                        </tr>
                         <tr className="opacity-50">
                            <td className="p-3">neuro_engine.exe</td>
                            <td className="p-3">0.5%</td>
                            <td className="p-3">512 MB</td>
                            <td className="p-3">System</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="h-12 bg-gray-200 dark:bg-white/5 border-t border-gray-300 dark:border-white/10 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <Cpu size={16} /> <span className="font-bold">{processes.reduce((acc, p) => acc + p.cpu, 2)}% Total CPU</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap size={16} /> <span className="font-bold">{processes.reduce((acc, p) => acc + p.mem, 1536)} MB Used</span>
                </div>
            </div>
        </div>
    );
}

export default TaskManagerApp;

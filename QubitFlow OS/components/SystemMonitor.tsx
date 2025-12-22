/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file SystemMonitor.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 QubitFlow OS - The Quantum Computing Interface
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useState } from 'react';
import { Cpu, Activity, Zap, Wifi } from 'lucide-react';

const SystemMonitor: React.FC = () => {
  const [stats, setStats] = useState({ cpu: 12, mem: 45, net: 80 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 30) + 10,
        mem: Math.floor(Math.random() * 10) + 40,
        net: Math.floor(Math.random() * 20) + 70,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-20 right-8 w-64 glass-panel rounded-2xl p-4 hidden md:block animate-in slide-in-from-right-10 duration-700 delay-500">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
        <Activity size={14} className="text-neuro-cyan" /> System Coherence
      </h3>
      
      <div className="space-y-4">
        {/* CPU */}
        <div>
            <div className="flex justify-between text-xs mb-1 text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-1"><Cpu size={12}/> QPU Load</span>
                <span>{stats.cpu}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neuro-purple transition-all duration-1000 ease-out" style={{ width: `${stats.cpu}%` }}></div>
            </div>
        </div>

        {/* Memory */}
        <div>
            <div className="flex justify-between text-xs mb-1 text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-1"><Zap size={12}/> Synaptic Memory</span>
                <span>{stats.mem}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-quantum-matter transition-all duration-1000 ease-out" style={{ width: `${stats.mem}%` }}></div>
            </div>
        </div>

         {/* Network */}
         <div>
            <div className="flex justify-between text-xs mb-1 text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-1"><Wifi size={12}/> Quantum Link</span>
                <span>{stats.net} TB/s</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-1000 ease-out" style={{ width: `${stats.net}%` }}></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
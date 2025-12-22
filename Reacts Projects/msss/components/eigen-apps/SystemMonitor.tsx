/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Wifi, Zap } from 'lucide-react';

export const SystemMonitor: React.FC = () => {
    const [cpuLoad, setCpuLoad] = useState<number[]>(Array(20).fill(0));
    const [memory, setMemory] = useState(42);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCpuLoad(prev => [...prev.slice(1), Math.random() * 100]);
            setMemory(prev => Math.min(100, Math.max(20, prev + (Math.random() - 0.5) * 10)));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full p-6 space-y-6 text-white overflow-y-auto custom-scrollbar">
            
            {/* CPU Graph */}
            <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                            <Cpu className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-bold">Quantum Processor</h3>
                            <p className="text-sm text-white/50">128-Qubit Core</p>
                        </div>
                    </div>
                    <span className="text-2xl font-mono text-orange-400 font-bold">
                        {cpuLoad[cpuLoad.length - 1].toFixed(0)}%
                    </span>
                </div>
                
                <div className="h-40 flex items-end gap-1">
                    {cpuLoad.map((load, i) => (
                        <div 
                            key={i} 
                            className="flex-1 bg-gradient-to-t from-orange-500/10 to-orange-500 rounded-t-sm transition-all duration-300"
                            style={{ height: `${load}%` }}
                        />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Memory */}
                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <HardDrive className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-bold">Neural Memory</h3>
                            <p className="text-sm text-white/50">{memory.toFixed(1)} PB Used</p>
                        </div>
                    </div>
                    <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${memory}%` }}
                        />
                    </div>
                </div>

                {/* Network */}
                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <Wifi className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h3 className="font-bold">Subspace Link</h3>
                            <p className="text-sm text-white/50">Connected</p>
                        </div>
                    </div>
                    <div className="flex items-end gap-1 h-10">
                         {Array(10).fill(0).map((_, i) => (
                             <div 
                                key={i}
                                className="flex-1 bg-green-500/50 rounded-sm animate-pulse"
                                style={{ 
                                    height: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.1}s` 
                                }}
                             />
                         ))}
                    </div>
                </div>
            </div>

            {/* Neural Activity */}
            <div className="bg-black/20 rounded-2xl p-6 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Activity className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                          <h3 className="font-bold">Synaptic Activity</h3>
                          <p className="text-sm text-white/50">Quantum Coherence Stable</p>
                      </div>
                  </div>
                  <div className="flex gap-1">
                      <span className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
            </div>
        </div>
    );
};

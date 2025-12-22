/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState } from 'react';
import { Plus, GripVertical, CheckCircle, Circle } from 'lucide-react';

const COLUMNS = [
    { id: 'todo', title: 'To Do', color: 'bg-red-500' },
    { id: 'progress', title: 'In Progress', color: 'bg-yellow-500' },
    { id: 'done', title: 'Done', color: 'bg-green-500' }
];

export const TaskVortex: React.FC = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Calibrate Quantum Sensors', status: 'todo' },
        { id: 2, title: 'Update Neural Weights', status: 'progress' },
        { id: 3, title: 'Deploy to Nebula', status: 'done' },
    ]);

    return (
        <div className="h-full bg-chronos-dark flex flex-col p-6 overflow-x-auto">
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-quantum-glow animate-pulse" />
                Task Vortex
            </h1>

            <div className="flex gap-6 h-full min-w-[800px]">
                {COLUMNS.map(col => (
                    <div key={col.id} className="flex-1 bg-white/5 rounded-xl border border-white/10 flex flex-col">
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                                <h3 className="font-bold text-white">{col.title}</h3>
                            </div>
                            <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                                {tasks.filter(t => t.status === col.id).length}
                            </span>
                        </div>

                        {/* List */}
                        <div className="flex-1 p-3 overflow-y-auto space-y-3">
                            {tasks.filter(t => t.status === col.id).map(task => (
                                <div key={task.id} className="bg-[#2a2d2e] p-3 rounded-lg border border-white/5 group hover:border-quantum-glow/50 transition-colors shadow-sm cursor-grab active:cursor-grabbing">
                                    <div className="flex items-start gap-3">
                                        <button className="mt-0.5 text-white/20 group-hover:text-quantum-glow transition-colors">
                                            {task.status === 'done' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4" />}
                                        </button>
                                        <p className="text-sm text-gray-200 leading-relaxed">{task.title}</p>
                                    </div>
                                    <div className="mt-3 flex justify-end">
                                        <GripVertical className="w-4 h-4 text-white/10" />
                                    </div>
                                </div>
                            ))}
                            
                            <button className="w-full py-2 border border-dashed border-white/10 rounded-lg text-xs text-white/30 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2">
                                <Plus className="w-3 h-3" />
                                Add Task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

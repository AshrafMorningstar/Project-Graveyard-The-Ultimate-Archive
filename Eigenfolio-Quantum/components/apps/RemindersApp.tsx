/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file RemindersApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Reminders Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, List, Calendar, Flag } from 'lucide-react';

interface Reminder {
  id: string;
  text: string;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  listId: string;
}

const RemindersApp: React.FC = () => {
    const [reminders, setReminders] = useState<Reminder[]>([
        { id: '1', text: 'Deploy Quantum OS to Vercel', completed: false, priority: 'high', listId: '1' },
        { id: '2', text: 'Update GitHub README', completed: true, priority: 'medium', listId: '1' },
        { id: '3', text: 'Buy groceries', completed: false, listId: '2' },
        { id: '4', text: 'Call Mom', completed: false, listId: '2' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [activeList, setActiveList] = useState('1');

    const toggleReminder = (id: string) => {
        setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
    };

    const addReminder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        setReminders([...reminders, {
            id: Date.now().toString(),
            text: inputValue,
            completed: false,
            listId: activeList
        }]);
        setInputValue('');
    };

    const Lists = [
        { id: '1', name: 'Work', color: 'blue', icon: List },
        { id: '2', name: 'Personal', color: 'purple', icon: Calendar },
        { id: '3', name: 'Groceries', color: 'green', icon: List }
    ];

    return (
        <div className="h-full flex bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 dark:bg-black/20 border-r border-gray-200 dark:border-white/10 p-4 flex flex-col">
                <div className="mb-6 space-y-2">
                    <div className="flex gap-2">
                         <div className="flex-1 bg-white dark:bg-white/5 p-2 rounded-lg shadow-sm">
                             <div className="flex justify-between items-start mb-2">
                                 <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white"><Calendar size={16}/></div>
                                 <span className="text-xl font-bold">{reminders.filter(r => !r.completed).length}</span>
                             </div>
                             <div className="text-xs text-gray-500 font-bold">Today</div>
                         </div>
                         <div className="flex-1 bg-white dark:bg-white/5 p-2 rounded-lg shadow-sm">
                             <div className="flex justify-between items-start mb-2">
                                 <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white"><Flag size={16}/></div>
                                 <span className="text-xl font-bold">{reminders.filter(r => !r.completed && r.priority === 'high').length}</span>
                             </div>
                             <div className="text-xs text-gray-500 font-bold">Scheduled</div>
                         </div>
                    </div>
                </div>

                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 px-2">My Lists</div>
                {Lists.map(list => (
                    <button 
                        key={list.id}
                        onClick={() => setActiveList(list.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${activeList === list.id ? 'bg-gray-200 dark:bg-white/10' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full bg-${list.color}-500/20 text-${list.color}-500 flex items-center justify-center`}>
                                <list.icon size={14} />
                            </div>
                            <span>{list.name}</span>
                        </div>
                        <span className="text-gray-400">{reminders.filter(r => r.listId === list.id && !r.completed).length}</span>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-blue-500 mb-6">
                        {Lists.find(l => l.id === activeList)?.name}
                    </h1>
                    
                    <div className="space-y-2">
                        {reminders.filter(r => r.listId === activeList).map(reminder => (
                            <div key={reminder.id} className="group flex items-start gap-4 py-2 border-b border-gray-100 dark:border-white/5">
                                <button 
                                    onClick={() => toggleReminder(reminder.id)}
                                    className={`mt-1 transition-colors ${reminder.completed ? 'text-blue-500' : 'text-gray-300 hover:text-gray-400'}`}
                                >
                                    {reminder.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                </button>
                                <div className="flex-1">
                                    <input 
                                        value={reminder.text}
                                        readOnly
                                        className={`w-full bg-transparent focus:outline-none text-lg ${reminder.completed ? 'text-gray-400 line-through' : ''}`}
                                    />
                                    {reminder.priority && !reminder.completed && (
                                        <div className="text-xs text-red-400 mt-1 font-medium">{reminder.priority} Priority</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={addReminder} className="mt-4 flex items-center gap-4 group cursor-text" onClick={() => document.getElementById('new-reminder')?.focus()}>
                        <Plus size={24} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                        <input 
                            id="new-reminder"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="New Reminder"
                            className="bg-transparent text-lg focus:outline-none flex-1 placeholder-gray-300"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RemindersApp;

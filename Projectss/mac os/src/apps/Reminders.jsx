/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, List } from 'lucide-react';

const Reminders = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Finish the Quantum OS project", done: false },
        { id: 2, text: "Buy groceries", done: true },
        { id: 3, text: "Call mom", done: false },
    ]);
    const [input, setInput] = useState("");

    const toggle = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const add = (e) => {
        e.preventDefault();
        if (!input) return;
        setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
        setInput("");
    };

    return (
        <div className="h-full flex bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
            <div className="w-64 bg-[#f2f2f7] dark:bg-[#2c2c2e] p-4 flex flex-col gap-4">
                <div className="bg-white dark:bg-[#1c1c1e] p-3 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500 p-1.5 rounded-full text-white"><List size={16}/></div>
                        <span className="font-bold text-sm">Today</span>
                    </div>
                    <span className="font-bold text-xl">{tasks.filter(t => !t.done).length}</span>
                </div>
                <div className="bg-white dark:bg-[#1c1c1e] p-3 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                         <div className="bg-red-500 p-1.5 rounded-full text-white"><CheckCircle2 size={16}/></div>
                         <span className="font-bold text-sm">Scheduled</span>
                    </div>
                    <span className="font-bold text-xl">0</span>
                </div>
            </div>

            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6 text-blue-500">Reminders</h1>
                
                <div className="space-y-1">
                    {tasks.map(task => (
                        <div key={task.id} className="group flex items-center gap-3 py-2 border-b border-gray-100 dark:border-white/5">
                            <button onClick={() => toggle(task.id)} className={`text-gray-400 hover:text-blue-500 transition-colors`}>
                                {task.done ? <CheckCircle2 className="text-blue-500" /> : <Circle />}
                            </button>
                            <span className={`flex-1 text-lg ${task.done ? 'text-gray-400 dark:text-gray-500 line-through' : ''}`}>
                                {task.text}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={add} className="mt-4 flex items-center gap-2 text-gray-500">
                    <Plus />
                    <input 
                        className="bg-transparent focus:outline-none w-full text-lg" 
                        placeholder="New Reminder" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
};

export default Reminders;

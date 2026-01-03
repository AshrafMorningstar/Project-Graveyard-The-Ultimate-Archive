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

'use client';

import React, { useState } from 'react';
import { Search, Phone, Mail, Star, UserPlus } from 'lucide-react';

const INITIAL_CONTACTS = [
    { id: 1, name: 'Alice Neural', role: 'AI Architect', status: 'online' },
    { id: 2, name: 'Bob Quantum', role: 'Physicist', status: 'offline' },
    { id: 3, name: 'Charlie Cosmos', role: 'Astronomer', status: 'busy' },
    { id: 4, name: 'Dr. Strange', role: 'Sorcerer', status: 'online' },
];

export const CosmicContacts: React.FC = () => {
    const [search, setSearch] = useState('');
    
    const filtered = INITIAL_CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] flex text-gray-800 dark:text-white">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-gray-200 dark:border-white/10 flex flex-col">
                <div className="p-3 border-b border-gray-200 dark:border-white/10">
                    <div className="bg-gray-100 dark:bg-white/5 rounded-md flex items-center px-2 py-1.5 gap-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input 
                            className="bg-transparent border-none outline-none text-sm w-full"
                            placeholder="Search..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filtered.map(contact => (
                        <div key={contact.id} className="p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer border-b border-gray-100 dark:border-white/5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                {contact.name[0]}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold">{contact.name}</h4>
                                <p className="text-xs text-gray-500">{contact.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-white/10">
                     <button className="w-full py-1.5 flex items-center justify-center gap-2 text-sm text-blue-500 font-medium hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded">
                         <UserPlus className="w-4 h-4" /> Add Contact
                     </button>
                </div>
            </div>

            {/* Detail View */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-[#18181b]">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 mb-4 shadow-xl" />
                <h2 className="text-2xl font-bold">Alice Neural</h2>
                <p className="text-indigo-400 font-medium mb-8">AI Architect @ DeepMind</p>
                
                <div className="flex gap-4">
                    <button className="flex flex-col items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm w-20">
                        <Phone className="w-6 h-6" />
                        <span className="text-xs">Call</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm w-20">
                        <Mail className="w-6 h-6" />
                        <span className="text-xs">Email</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm w-20">
                        <Star className="w-6 h-6" />
                        <span className="text-xs">Fav</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

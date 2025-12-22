/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file ContactsApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - Contacts App
 */

import React, { useState } from 'react';
import { Search, Phone, Mail, MessageSquare, Star, Plus, MoreHorizontal } from 'lucide-react';

interface Contact {
    id: string;
    name: string;
    role: string;
    company: string;
    email: string;
    phone: string;
    avatar: string; // Initials or color
    favorite: boolean;
}

const ContactsApp: React.FC = () => {
    const [contacts] = useState<Contact[]>([
        { id: '1', name: 'Ashraf Morningstar', role: 'Creator', company: 'Quantum Systems', email: 'ashraf@example.com', phone: '+1 (555) 000-0000', avatar: 'AM', favorite: true },
        { id: '2', name: 'Elon Musk', role: 'CEO', company: 'SpaceX', email: 'elon@spacex.com', phone: '+1 (555) MARS-123', avatar: 'EM', favorite: true },
        { id: '3', name: 'Tim Cook', role: 'CEO', company: 'Apple', email: 'tcook@apple.com', phone: '+1 (555) MAC-1234', avatar: 'TC', favorite: false },
        { id: '4', name: 'Sam Altman', role: 'CEO', company: 'OpenAI', email: 'sam@openai.com', phone: '+1 (555) GPT-9000', avatar: 'SA', favorite: false },
    ]);

    const [selectedId, setSelectedId] = useState<string>(contacts[0].id);
    const selectedContact = contacts.find(c => c.id === selectedId) || contacts[0];

    return (
        <div className="h-full flex bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
            {/* Sidebar List */}
            <div className="w-64 border-r border-gray-200 dark:border-white/10 flex flex-col bg-gray-50 dark:bg-black/20">
                <div className="p-3 border-b border-gray-200 dark:border-white/10">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1.5 text-gray-400" size={14} />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-full bg-gray-200 dark:bg-white/10 pl-8 pr-3 py-1 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-neuro-blue"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.map(contact => (
                        <div 
                            key={contact.id}
                            onClick={() => setSelectedId(contact.id)}
                            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 ${selectedId === contact.id ? 'bg-blue-500 text-white dark:bg-blue-600' : ''}`}
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-400 to-gray-600 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-1 ring-white/20">
                                {contact.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={`font-medium text-sm truncate ${selectedId === contact.id ? 'text-white' : ''}`}>{contact.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail View */}
            <div className="flex-1 flex flex-col p-8 items-center bg-white dark:bg-[#1c1c1e]">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neuro-cyan to-neuro-purple flex items-center justify-center text-4xl font-bold text-white shadow-2xl mb-6 ring-4 ring-white/10">
                    {selectedContact.avatar}
                </div>
                <h1 className="text-3xl font-bold mb-1">{selectedContact.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">{selectedContact.role} at {selectedContact.company}</p>

                <div className="flex gap-8 mb-10 w-full max-w-lg justify-center">
                    <button className="flex flex-col items-center gap-2 text-blue-500 hover:text-blue-400 transition">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center"><MessageSquare size={20}/></div>
                        <span className="text-xs">message</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-blue-500 hover:text-blue-400 transition">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center"><Phone size={20}/></div>
                        <span className="text-xs">call</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 text-blue-500 hover:text-blue-400 transition">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center"><Mail size={20}/></div>
                        <span className="text-xs">mail</span>
                    </button>
                </div>

                <div className="w-full max-w-lg bg-gray-50 dark:bg-white/5 rounded-xl p-4 space-y-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">mobile</span>
                        <span className="text-blue-500">{selectedContact.phone}</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-white/5"></div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">home</span>
                        <span className="text-blue-500">{selectedContact.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsApp;

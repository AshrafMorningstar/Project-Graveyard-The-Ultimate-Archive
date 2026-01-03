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
import { Mail, Star, Trash2, Send, Inbox, RefreshCw, Paperclip } from 'lucide-react';

const EMAILS = [
    { id: 1, from: 'Chronos Operations', subject: 'Project Nebula Launch Timeline', time: '10:42 AM', read: false },
    { id: 2, from: 'Dr. Alice Neural', subject: 'Re: Quantum Entanglement Pattern', time: 'Yesterday', read: true },
    { id: 3, from: 'Galactic Newsletter', subject: 'Top 10 Solar Systems to Visit', time: 'Yesterday', read: true },
    { id: 4, from: 'System Alert', subject: 'Storage Optimization Recommended', time: 'Dec 12', read: true },
];

export const QuantumMail: React.FC = () => {
    const [emails, setEmails] = useState(EMAILS);
    const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] flex text-gray-800 dark:text-white">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 dark:bg-[#252526] border-r border-gray-200 dark:border-white/10 flex flex-col py-4">
                <button className="mx-4 mb-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow-md transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Compose
                </button>
                <nav className="flex-1 space-y-1 px-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 bg-gray-200 dark:bg-white/10 rounded-md font-medium text-sm">
                        <Inbox className="w-4 h-4" /> Inbox <span className="ml-auto text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full">2</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md font-medium text-sm transition-colors">
                        <Star className="w-4 h-4" /> Starred
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md font-medium text-sm transition-colors">
                        <Send className="w-4 h-4" /> Sent
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-md font-medium text-sm transition-colors">
                        <Trash2 className="w-4 h-4" /> Trash
                    </button>
                </nav>
            </div>

            {/* Email List */}
            <div className="w-72 border-r border-gray-200 dark:border-white/10 flex flex-col bg-white dark:bg-[#1e1e1e]">
                <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center px-4 justify-between">
                    <h3 className="font-bold">Inbox</h3>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {emails.map(email => (
                        <div 
                            key={email.id}
                            onClick={() => setSelectedEmail(email.id)}
                            className={`p-4 border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors
                                ${selectedEmail === email.id ? 'bg-blue-50 dark:bg-blue-500/10 border-l-2 border-l-blue-500' : ''}
                                ${!email.read ? 'font-semibold' : 'text-gray-500 dark:text-gray-400'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm truncate w-24">{email.from}</span>
                                <span className="text-xs opacity-70">{email.time}</span>
                            </div>
                            <h4 className="text-sm mb-1 truncate">{email.subject}</h4>
                            <p className="text-xs opacity-60 line-clamp-2">Lorm ipsum dolor sit amet quantum physics...</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reading Pane */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e]">
                {selectedEmail ? (
                    <>
                        <div className="h-24 border-b border-gray-200 dark:border-white/10 p-6">
                            <h2 className="text-xl font-bold mb-2">{emails.find(e => e.id === selectedEmail)?.subject}</h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                                    {emails.find(e => e.id === selectedEmail)?.from[0]}
                                </div>
                                <span className="font-medium text-gray-800 dark:text-gray-200">{emails.find(e => e.id === selectedEmail)?.from}</span>
                                <span className="opacity-50">&lt;user@cosmos.net&gt;</span>
                            </div>
                        </div>
                        <div className="flex-1 p-8 text-gray-700 dark:text-gray-300 leading-relaxed overflow-y-auto">
                            <p>Greetings Traveler,</p>
                            <br />
                            <p>The quantum alignment for the new nebula sector has been completed. We expect efficiency to increase by 400%.</p>
                            <br />
                            <p>Please review the attached schematics.</p>
                            <br />
                            <div className="mt-8 p-4 bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 w-64 flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                <div className="bg-red-500/20 p-2 rounded text-red-500"><Paperclip className="w-5 h-5" /></div>
                                <div>
                                    <div className="text-sm font-medium">schematics_v2.pdf</div>
                                    <div className="text-xs text-gray-500">2.4 MB</div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 dark:text-white/20">
                        <Mail className="w-16 h-16 mb-4 opacity-50" />
                        <p>Select an email to read</p>
                    </div>
                )}
            </div>
        </div>
    );
};

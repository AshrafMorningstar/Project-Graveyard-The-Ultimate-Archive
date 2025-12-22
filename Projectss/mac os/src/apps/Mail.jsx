/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { Inbox, Star, Send, File, Search, Trash2, Mail as MailIcon } from 'lucide-react';

const Mail = () => {
    const [selectedMail, setSelectedMail] = useState(0);
    const emails = [
        { id: 0, from: "Apple", subject: "Your new dev portfolio", time: "10:42 AM", body: "Congratulations on launching your new portfolio website. It looks stunning!" },
        { id: 1, from: "GitHub", subject: "Security Alert", time: "Yesterday", body: "We noticed a new login from a Quantum Computer." },
        { id: 2, from: "Newsletter", subject: "Weekly Tech Digest", time: "Monday", body: "Top stories: AI takes over toaster ovens." },
        { id: 3, from: "Mom", subject: "Dinner?", time: "Sunday", body: "Are you coming home for dinner this weekend?" },
    ];

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
            {/* Sidebar */}
            <div className="w-48 bg-gray-100 dark:bg-[#2d2d2d] flex flex-col pt-4 gap-1 text-sm font-medium">
                <div className="px-4 py-1 text-gray-500 text-xs font-bold uppercase">Mailboxes</div>
                <div className="flex items-center gap-2 px-4 py-1 bg-blue-500 text-white rounded mx-2"><Inbox size={16} /> Inbox</div>
                <div className="flex items-center gap-2 px-4 py-1 hover:bg-black/5 dark:hover:bg-white/5 rounded mx-2 cursor-pointer"><Star size={16} /> VIP</div>
                <div className="flex items-center gap-2 px-4 py-1 hover:bg-black/5 dark:hover:bg-white/5 rounded mx-2 cursor-pointer"><Send size={16} /> Sent</div>
                <div className="flex items-center gap-2 px-4 py-1 hover:bg-black/5 dark:hover:bg-white/5 rounded mx-2 cursor-pointer"><Trash2 size={16} /> Trash</div>
            </div>

            {/* List */}
            <div className="w-64 border-r border-gray-200 dark:border-white/10 flex flex-col bg-gray-50 dark:bg-[#252525]">
                <div className="p-3 border-b border-gray-200 dark:border-white/10">
                    <h2 className="font-bold text-lg mb-1">Inbox</h2>
                    <div className="relative">
                        <Search size={14} className="absolute left-2 top-2 text-gray-400"/>
                        <input className="w-full bg-gray-200 dark:bg-black/20 rounded pl-8 py-1 text-sm focus:outline-none" placeholder="Search"/>
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    {emails.map(email => (
                        <div 
                           key={email.id}
                           onClick={() => setSelectedMail(email.id)}
                           className={`p-3 border-b border-gray-200 dark:border-white/5 cursor-pointer ${selectedMail === email.id ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                        >
                            <div className="flex justify-between mb-1">
                                <span className="font-bold truncate">{email.from}</span>
                                <span className={`text-xs ${selectedMail === email.id ? 'text-blue-100' : 'text-gray-500'}`}>{email.time}</span>
                            </div>
                            <div className="text-sm truncate font-medium">{email.subject}</div>
                            <div className={`text-xs truncate ${selectedMail === email.id ? 'text-blue-100' : 'text-gray-500'}`}>{email.body}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 flex flex-col">
                <div className="border-b border-gray-200 dark:border-white/10 pb-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-2xl font-bold">{emails[selectedMail].subject}</h1>
                        <span className="text-gray-500 text-sm">{emails[selectedMail].time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                             {emails[selectedMail].from[0]}
                         </div>
                         <div>
                             <div className="font-bold text-sm">{emails[selectedMail].from}</div>
                             <div className="text-xs text-gray-500">to me</div>
                         </div>
                    </div>
                </div>
                <div className="flex-1 text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                    {emails[selectedMail].body}
                </div>
            </div>
        </div>
    );
};

export default Mail;

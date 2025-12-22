/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file MailApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Mail Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React, { useState } from 'react';
import { Mail, Inbox, Send, Trash2, Star, Search, Menu, RefreshCw, AlertTriangle, Paperclip } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  content?: string;
}

const MailApp: React.FC = () => {
    const [selectedFolder, setSelectedFolder] = useState('inbox');
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

    const [emails] = useState<Email[]>([
        {
            id: '1',
            from: 'Elon Musk',
            subject: 'Mars Colonization Project',
            preview: 'Hey, I saw your portfolio. The quantum interface is impressive. We need...',
            date: '10:42 AM',
            read: false,
            starred: true,
            content: "Hey,\n\nI saw your portfolio. The quantum interface is impressive.\n\nWe need someone with your skills to architect the OS for the new Starship interface. It needs to be robust enough to handle interplanetary latency but fluid enough for human interaction.\n\nAre you free for a call at 3 AM?\n\n- Elon"
        },
        {
            id: '2',
            from: 'Tim Cook',
            subject: 'macOS Design Inspiration',
            preview: 'Just wanted to say that your web-based OS simulation is giving our design tea...',
            date: 'Yesterday',
            read: true,
            starred: false,
            content: "Hello,\n\nJust wanted to say that your web-based OS simulation is giving our design team some serious competition.\n\nThe fluid animations and the 'Nebula Dock' are quite innovative.\n\nKeep up the good work.\n\nSent from my iPhone"
        },
        {
            id: '3',
            from: 'Security Alert',
            subject: 'New login detected from Proxima Centauri',
            preview: 'We detected a login attempt to your Quantum Cloud account from an unknown dev...',
            date: 'Yesterday',
            read: true,
            starred: false,
            content: "SECURITY ALERT\n\nWe detected a login attempt to your Quantum Cloud account from an unknown device located in the Proxima Centauri system.\n\nIf this wasn't you, please reset your neural link immediately."
        },
        {
            id: '4',
            from: 'Mom',
            subject: 'Dinner on Sunday?',
            preview: 'Are you coming over for dinner? Dad is making his famous Lasagna code...',
            date: 'Fri',
            read: true,
            starred: true,
            content: "Hi Honey,\n\nAre you coming over for dinner? Dad is making his famous Lasagna (code).\n\nLet me know!\n\nLove, Mom"
        }
    ]);

    const SidebarItem = ({ icon: Icon, label, id, count }: { icon: any, label: string, id: string, count?: number }) => (
        <button 
            onClick={() => { setSelectedFolder(id); setSelectedEmail(null); }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${selectedFolder === id ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'}`}
        >
            <div className="flex items-center gap-3">
                <Icon size={16} />
                <span>{label}</span>
            </div>
            {count !== undefined && <span className="opacity-70 text-xs">{count}</span>}
        </button>
    );

    return (
        <div className="h-full flex bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 dark:bg-black/20 border-r border-gray-200 dark:border-white/10 p-2 flex flex-col">
                <div className="p-2 mb-2 text-gray-400 text-xs font-bold uppercase tracking-wider">Mailboxes</div>
                <SidebarItem icon={Inbox} label="Inbox" id="inbox" count={2} />
                <SidebarItem icon={Star} label="VIP" id="vip" />
                <SidebarItem icon={Send} label="Sent" id="sent" />
                <SidebarItem icon={Trash2} label="Trash" id="trash" />
            </div>

            {/* Email List */}
            <div className={`${selectedEmail ? 'hidden md:block' : 'block'} w-full md:w-80 border-r border-gray-200 dark:border-white/10 flex flex-col`}>
                <div className="p-3 border-b border-gray-200 dark:border-white/10">
                    <div className="relative">
                        <Search className="absolute left-2 top-1.5 text-gray-400" size={14} />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-full bg-gray-100 dark:bg-white/10 pl-8 pr-3 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {emails.map(email => (
                        <div 
                            key={email.id}
                            onClick={() => setSelectedEmail(email)}
                            className={`p-4 border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 ${selectedEmail?.id === email.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-l-blue-500' : ''} ${!email.read ? 'font-bold' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm truncate">{email.from}</span>
                                <span className="text-xs text-gray-400 font-normal">{email.date}</span>
                            </div>
                            <div className="text-sm mb-1 truncate">{email.subject}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate font-normal">{email.preview}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reading Pane */}
            <div className={`${!selectedEmail ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white dark:bg-[#1e1e1e]`}>
                {selectedEmail ? (
                    <>
                        {/* Toolbar */}
                        <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4">
                             <div className="flex gap-4 text-gray-500 dark:text-gray-400">
                                 <button onClick={() => setSelectedEmail(null)} className="md:hidden"><Menu/></button>
                                 <Trash2 size={18} className="cursor-pointer hover:text-red-500" />
                                 <Paperclip size={18} className="cursor-pointer hover:text-blue-500" />
                             </div>
                             <div className="flex gap-4 text-gray-500 dark:text-gray-400">
                                 <RefreshCw size={16} />
                             </div>
                        </div>
                        
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 dark:border-white/5">
                            <h2 className="text-xl font-bold mb-4">{selectedEmail.subject}</h2>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                        {selectedEmail.from[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{selectedEmail.from}</div>
                                        <div className="text-xs text-gray-500">To: Ashraf Morningstar</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400">{selectedEmail.date}</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-8 overflow-y-auto whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedEmail.content}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 dark:text-gray-600">
                        <Mail size={48} className="mb-4 opacity-50" />
                        <p>No Message Selected</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MailApp;

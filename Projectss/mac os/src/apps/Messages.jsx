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

import React, { useState } from 'react';
import { Send, Search, Video, Phone, Info } from 'lucide-react';

const Messages = () => {
    const [chats] = useState([
        { id: 1, name: "Elon Musk", last: "Rocket launch in 5 mins!", time: "10:05 AM", avatar: "E" },
        { id: 2, name: "Tim Cook", last: "Check out the new M4 chip.", time: "Yesterday", avatar: "T" },
        { id: 3, name: "Sam Altman", last: "AGI achieved internally.", time: "Friday", avatar: "S" },
    ]);
    const [activeChat, setActiveChat] = useState(1);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState({
        1: [{ from: 'them', text: 'Rocket launch in 5 mins!' }],
        2: [{ from: 'them', text: 'Check out the new M4 chip.' }],
        3: [{ from: 'them', text: 'AGI achieved internally.' }]
    });

    const handleSend = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setMessages({
            ...messages,
            [activeChat]: [...(messages[activeChat] || []), { from: 'me', text }]
        });
        setText("");
    };

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
             {/* Sidebar */}
             <div className="w-80 border-r border-gray-200 dark:border-white/10 flex flex-col">
                 <div className="p-3 border-b border-gray-200 dark:border-white/10">
                     <div className="relative">
                         <Search size={14} className="absolute left-3 top-2 text-gray-500" />
                         <input type="text" placeholder="Search" className="w-full bg-gray-100 dark:bg-white/10 rounded-lg pl-8 py-1 text-sm focus:outline-none" />
                     </div>
                 </div>
                 <div className="flex-1 overflow-auto">
                     {chats.map(chat => (
                         <div 
                            key={chat.id} 
                            onClick={() => setActiveChat(chat.id)}
                            className={`flex gap-3 p-3 items-center cursor-pointer ${activeChat === chat.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
                         >
                             <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-lg">
                                 {chat.avatar}
                             </div>
                             <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-baseline">
                                     <span className="font-semibold truncate">{chat.name}</span>
                                     <span className={`text-xs ${activeChat === chat.id ? 'text-blue-100' : 'text-gray-500'}`}>{chat.time}</span>
                                 </div>
                                 <div className={`text-sm truncate ${activeChat === chat.id ? 'text-blue-100' : 'text-gray-500'}`}>{chat.last}</div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Chat Area */}
             <div className="flex-1 flex flex-col">
                 <div className="h-14 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4">
                      <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                              {chats.find(c => c.id === activeChat)?.avatar}
                          </div>
                          <span className="font-bold">{chats.find(c => c.id === activeChat)?.name}</span>
                      </div>
                      <div className="flex gap-4 text-blue-500">
                          <Video size={20}/>
                          <Phone size={20}/>
                          <Info size={20}/>
                      </div>
                 </div>

                 <div className="flex-1 overflow-auto p-4 space-y-2">
                     {messages[activeChat]?.map((msg, i) => (
                         <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`p-2 px-4 rounded-2xl max-w-[70%] ${
                                  msg.from === 'me' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-200 dark:bg-[#333]'
                              }`}>
                                  {msg.text}
                              </div>
                         </div>
                     ))}
                 </div>

                 <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-white/10">
                     <div className="relative">
                         <input 
                            type="text" 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="iMessage"
                            className="w-full bg-transparent border border-gray-300 dark:border-white/20 rounded-full py-1 px-4 pr-10 focus:outline-none focus:border-blue-500"
                         />
                         <button className={`absolute right-1 top-1 p-0.5 rounded-full ${text ? 'bg-blue-500 text-white' : 'text-gray-400'}`}>
                             <Send size={16} />
                         </button>
                     </div>
                 </form>
             </div>
        </div>
    );
};

export default Messages;

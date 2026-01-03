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

import React from 'react';
import { User, Phone, Mail, Star } from 'lucide-react';

const Contacts = () => {
    const contacts = [
        { name: "Ashraf Morningstar", phone: "+1 (555) 012-3456", email: "ashraf@example.com", role: "Me" },
        { name: "Tim Cook", phone: "+1 (408) 996-1010", email: "tcook@apple.com", role: "CEO" },
        { name: "Elon Musk", phone: "+1 (800) 613-8840", email: "elon@tesla.com", role: "Visionary" },
        { name: "Sam Altman", phone: "+1 (650) 555-0199", email: "sam@openai.com", role: "AI" },
    ].sort((a,b) => a.name.localeCompare(b.name));

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
            <div className="w-64 border-r border-gray-200 dark:border-white/10 flex flex-col bg-gray-50 dark:bg-[#2c2c2e]">
                <div className="p-4 border-b border-gray-200 dark:border-white/10">
                    <input className="w-full bg-gray-200 dark:bg-black/20 rounded px-3 py-1 text-sm focus:outline-none" placeholder="Search" />
                </div>
                <div className="flex-1 overflow-auto">
                    {contacts.map((c, i) => (
                        <div key={i} className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer flex gap-3 items-center group">
                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-xs">{c.name[0]}</div>
                            <span className="font-semibold text-sm">{c.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 p-12 flex flex-col items-center">
                 <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-6 text-4xl text-gray-500">
                     <User size={64} />
                 </div>
                 <h1 className="text-3xl font-bold mb-2">Ashraf Morningstar</h1>
                 <p className="text-gray-500 mb-8">Full Stack Developer</p>

                 <div className="grid grid-cols-4 gap-4 w-full max-w-lg mb-8">
                     <div className="flex flex-col items-center gap-2 p-3 bg-gray-100 dark:bg-white/5 rounded-lg cursor-pointer hover:bg-gray-200">
                         <Phone className="text-blue-500"/>
                         <span className="text-xs">call</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 p-3 bg-gray-100 dark:bg-white/5 rounded-lg cursor-pointer hover:bg-gray-200">
                         <Mail className="text-blue-500"/>
                         <span className="text-xs">mail</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 p-3 bg-gray-100 dark:bg-white/5 rounded-lg cursor-pointer hover:bg-gray-200">
                         <Star className="text-blue-500"/>
                         <span className="text-xs">favorite</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 p-3 bg-gray-100 dark:bg-white/5 rounded-lg cursor-pointer hover:bg-gray-200">
                         <User className="text-blue-500"/>
                         <span className="text-xs">profile</span>
                     </div>
                 </div>

                 <div className="w-full max-w-lg space-y-4 bg-gray-50 dark:bg-white/5 p-6 rounded-xl">
                      <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                          <span className="text-gray-500">mobile</span>
                          <span className="text-blue-500">+1 (555) 012-3456</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                          <span className="text-gray-500">home</span>
                          <span className="text-blue-500">ashraf@example.com</span>
                      </div>
                      <div className="flex justify-between">
                          <span className="text-gray-500">address</span>
                          <span className="text-right">1 Infinite Loop<br/>Cupertino, CA 95014</span>
                      </div>
                 </div>
            </div>
        </div>
    );
};

export default Contacts;

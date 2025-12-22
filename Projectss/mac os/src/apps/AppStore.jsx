/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { Download, Search } from 'lucide-react';

const AppStore = () => {
    return (
        <div className="flex h-full bg-[#1e1e1e] text-white">
            <div className="w-56 border-r border-white/10 p-4 flex flex-col gap-4">
                 <div className="relative">
                     <Search size={14} className="absolute left-2 top-2 text-gray-400"/>
                     <input className="w-full bg-[#2c2c2e] rounded pl-8 py-1 text-sm focus:outline-none" placeholder="Search"/>
                 </div>
                 <div className="space-y-1">
                     <div className="px-3 py-1.5 bg-white/10 text-blue-400 rounded cursor-pointer font-bold">Discover</div>
                     <div className="px-3 py-1.5 hover:bg-white/5 rounded cursor-pointer">Arcade</div>
                     <div className="px-3 py-1.5 hover:bg-white/5 rounded cursor-pointer">Create</div>
                     <div className="px-3 py-1.5 hover:bg-white/5 rounded cursor-pointer">Work</div>
                     <div className="px-3 py-1.5 hover:bg-white/5 rounded cursor-pointer">Play</div>
                     <div className="px-3 py-1.5 hover:bg-white/5 rounded cursor-pointer">Develop</div>
                     <div className="px-3 py-1.5 hover:bg-white/5 rounded cursor-pointer">Updates <span className="float-right bg-red-500 text-white text-[10px] px-1.5 rounded-full">2</span></div>
                 </div>
            </div>

            <div className="flex-1 overflow-auto p-8">
                {/* Feature Banner */}
                <div className="h-64 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-8 mb-8 relative overflow-hidden shadow-lg cursor-pointer hover:scale-[1.01] transition-transform">
                    <div className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest opacity-70">New Release</div>
                    <div className="mt-8 max-w-md">
                        <h1 className="text-4xl font-bold mb-2">Quantum OS Pro</h1>
                        <p className="text-lg opacity-90 mb-6">Experience the future of web-based operating systems tailored for developers.</p>
                        <button className="bg-white text-black font-bold px-6 py-2 rounded-full">Get Started</button>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4">Essential Apps</h2>
                <div className="space-y-4">
                    {[
                        { title: "Xcode", cat: "Developer Tools", icon: "bg-blue-600" },
                        { title: "Final Cut Pro", cat: "Video Editing", icon: "bg-purple-600" },
                        { title: "Logic Pro", cat: "Music Creation", icon: "bg-gray-800" },
                        { title: "Slack", cat: "Business", icon: "bg-green-600" },
                        { title: "Figma", cat: "Design", icon: "bg-black" }
                    ].map((app, i) => (
                        <div key={i} className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl cursor-pointer">
                            <div className={`w-16 h-16 rounded-2xl ${app.icon} shadow-lg`}></div>
                            <div className="flex-1">
                                <div className="font-bold">{app.title}</div>
                                <div className="text-sm text-gray-400">{app.cat}</div>
                            </div>
                            <button className="bg-[#2c2c2e] text-blue-400 font-bold px-4 py-1 rounded-full text-sm">GET</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppStore;

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

/**
 * @file LifestyleApps.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - Lifestyle Suite (Home, Find My, Podcasts, Dictionary, Translate)
 */

import React from 'react';
import { Home, Lightbulb, Thermometer, MapPin, Search, Languages, Headphones } from 'lucide-react';

export const HomeApp: React.FC = () => (
    <div className="h-full bg-[#f5f5f7] dark:bg-[#1e1e1e] p-6 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-6">Home</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-white/10 p-4 rounded-xl aspect-square flex flex-col justify-between cursor-pointer hover:scale-105 transition shadow-sm">
                <div className="flex justify-between">
                    <Lightbulb className="text-yellow-500" fill="currentColor" />
                    <span className="text-xs font-bold text-gray-400">On</span>
                </div>
                <div>
                     <div className="font-bold">Living Room</div>
                     <div className="text-xs opacity-60">80% Brightness</div>
                </div>
            </div>
            <div className="bg-white dark:bg-white/10 p-4 rounded-xl aspect-square flex flex-col justify-between cursor-pointer hover:scale-105 transition shadow-sm">
                <div className="flex justify-between">
                    <Thermometer className="text-orange-500" />
                    <span className="text-xs font-bold text-gray-400">72°F</span>
                </div>
                <div>
                     <div className="font-bold">Thermostat</div>
                     <div className="text-xs opacity-60">Heating to 74°</div>
                </div>
            </div>
        </div>
    </div>
);

export const FindMyApp: React.FC = () => (
    <div className="h-full flex bg-gray-100">
        <div className="w-64 bg-white dark:bg-[#1e1e1e] border-r dark:border-white/10 p-4">
            <h2 className="font-bold mb-4 dark:text-white">Devices</h2>
            <div className="space-y-4">
                <div className="flex items-center gap-3 p-2 bg-gray-100 dark:bg-white/10 rounded-lg">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                        <div className="text-sm font-bold dark:text-white">MacBook Pro</div>
                        <div className="text-xs text-gray-500">With You</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                        <div className="text-sm font-bold dark:text-white">iPhone 15 Pro</div>
                        <div className="text-xs text-gray-500">0.5 mi away</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-blue-50 relative flex items-center justify-center">
             <div className="text-blue-300 font-bold text-4xl select-none">MAP VIEW</div>
             <MapPin className="absolute text-red-500 drop-shadow-xl" size={48} fill="currentColor" />
        </div>
    </div>
);

export const PodcastsApp: React.FC = () => (
    <div className="h-full bg-white dark:bg-[#1e1e1e] p-6 text-gray-900 dark:text-white overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Listen Now</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['The Daily', 'Syntax', 'Lex Fridman', 'Huberman Lab'].map((pod, i) => (
                <div key={i} className="group cursor-pointer">
                    <div className={`aspect-square rounded-lg shadow-lg mb-2 bg-gradient-to-br ${['from-purple-500 to-blue-500', 'from-yellow-400 to-orange-500', 'from-black to-gray-700', 'from-green-500 to-teal-500'][i]} flex items-center justify-center group-hover:scale-105 transition`}>
                        <Headphones className="text-white opacity-50" size={48} />
                    </div>
                    <div className="font-bold text-sm">{pod}</div>
                    <div className="text-xs text-gray-500">Updated Today</div>
                </div>
            ))}
        </div>
    </div>
);

export const DictionaryApp: React.FC = () => (
    <div className="h-full bg-[#f5f5f7] dark:bg-[#1e1e1e] p-6 text-gray-900 dark:text-white flex flex-col">
         <div className="relative mb-8">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input type="text" placeholder="Search Dictionary" className="w-full bg-white dark:bg-white/10 pl-10 pr-4 py-2 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="flex-1">
             <h2 className="text-4xl font-serif font-bold mb-2">Quantum</h2>
             <span className="text-gray-500 italic">noun</span>
             <p className="mt-4 text-lg leading-relaxed">
                 A discrete quantity of energy proportional in magnitude to the frequency of the radiation it represents.
             </p>
             <p className="mt-4 text-gray-600 dark:text-gray-400">
                 "Quantum mechanics is the branch of physics relating to the very small."
             </p>
         </div>
    </div>
);

export const TranslateApp: React.FC = () => (
    <div className="h-full bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white flex flex-col">
        <div className="flex-1 p-6 border-b border-gray-200 dark:border-white/10 flex flex-col">
            <div className="mb-2 font-bold text-blue-500 flex items-center gap-2"><Languages size={16}/> English</div>
            <textarea className="w-full flex-1 bg-transparent resize-none outline-none text-2xl placeholder-gray-300" placeholder="Enter text" defaultValue="Hello, world!"></textarea>
        </div>
        <div className="flex-1 p-6 bg-gray-50 dark:bg-white/5 flex flex-col">
            <div className="mb-2 font-bold text-blue-500">Spanish</div>
             <div className="text-2xl">¡Hola, mundo!</div>
        </div>
    </div>
);

export const AppStoreApp: React.FC = () => (
    <div className="h-full bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white overflow-y-auto">
         {/* Hero */}
         <div className="h-64 bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white mb-8 flex flex-col justify-end">
             <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Check this out</div>
             <h1 className="text-4xl font-bold mb-2">Prototyping Reimagined</h1>
             <p className="opacity-80">Design the future with these powerful tools.</p>
         </div>

         <div className="px-8 pb-8">
             <h2 className="text-xl font-bold mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Popular Apps</h2>
             <div className="flex flex-col gap-4">
                 {[1,2,3,4,5].map(i => (
                     <div key={i} className="flex items-center gap-4">
                         <div className="w-16 h-16 bg-gray-200 dark:bg-white/10 rounded-2xl"></div>
                         <div className="flex-1">
                             <div className="font-bold">App Name {i}</div>
                             <div className="text-xs text-gray-500">Productivity</div>
                         </div>
                         <button className="px-4 py-1 bg-gray-100 dark:bg-white/20 text-blue-500 font-bold rounded-full text-sm">GET</button>
                     </div>
                 ))}
             </div>
         </div>
    </div>
);

export const FacetimeApp: React.FC = () => (
    <div className="h-full bg-[#1c1c1e] text-white flex">
        <div className="w-64 border-r border-white/10 p-4">
             <div className="text-2xl font-bold mb-4">FaceTime</div>
             <button className="w-full bg-green-600 hover:bg-green-500 py-2 rounded-lg font-bold mb-4">New FaceTime</button>
             <div className="text-xs font-bold text-gray-500 uppercase">Recent</div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
             {/* Simulated Camera Feed */}
             <div className="text-gray-500">Camera Off</div>
             
             {/* Self View */}
             <div className="absolute bottom-4 right-4 w-32 h-48 bg-gray-800 rounded-lg border border-white/20 shadow-2xl"></div>
        </div>
    </div>
);

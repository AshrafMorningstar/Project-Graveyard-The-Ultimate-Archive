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
import { Video, CreditCard, Command, Mic, History, Bug, MessageSquare, Terminal } from 'lucide-react';

export const FaceTime = () => (
    <div className="h-full bg-[#1c1c1e] text-white flex">
        <div className="w-64 border-r border-[#38383a] p-4 flex flex-col gap-4">
             <div className="bg-[#2c2c2e] p-2 rounded-lg flex items-center gap-3">
                 <button className="flex-1 bg-green-600 py-1 rounded text-sm font-semibold">New FaceTime</button>
             </div>
             <div className="text-sm font-bold opacity-50">Recent</div>
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">AM</div>
                 <div>
                     <div className="text-sm font-bold">Ashraf</div>
                     <div className="text-xs opacity-50">FaceTime Video</div>
                 </div>
             </div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-black relative">
            <div className="absolute top-4 right-4 w-32 h-48 bg-gray-800 rounded-lg border border-white/20"></div>
            <div className="text-center">
                <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">AM</div>
                <h2 className="text-2xl font-bold">Ashraf Morningstar</h2>
                <div className="text-green-500 mt-2">Calling...</div>
            </div>
        </div>
    </div>
);

export const Wallet = () => (
    <div className="h-full bg-[#1c1c1e] text-white flex flex-col items-center pt-8">
        <h1 className="text-3xl font-bold mb-8">Wallet</h1>
        <div className="relative w-80 h-48">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl shadow-2xl border-t border-white/20 transform hover:-translate-y-12 transition-transform cursor-pointer z-10 p-6 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                     <span className="font-bold tracking-widest">VISA</span>
                     <span className="text-xs opacity-70">Debit</span>
                 </div>
                 <div className="font-mono text-xl tracking-widest">**** **** **** 4242</div>
            </div>
            <div className="absolute top-12 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-2xl border-t border-white/20 transform hover:-translate-y-24 transition-transform cursor-pointer z-20 p-6 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                     <span className="font-bold tracking-widest">Amex</span>
                     <span className="text-xs opacity-70">Platinum</span>
                 </div>
            </div>
            <div className="absolute top-24 left-0 w-full h-full bg-black rounded-xl shadow-2xl border-t border-white/20 transform hover:-translate-y-36 transition-transform cursor-pointer z-30 p-6 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                     <span className="font-bold tracking-widest text-white"> Pay</span>
                     <span className="text-xs opacity-70">Cash</span>
                 </div>
                 <div className="text-3xl font-bold">$1,240.50</div>
            </div>
        </div>
    </div>
);

export const Shortcuts = () => (
    <div className="h-full bg-[#1e1e1e] text-white p-4 grid grid-cols-4 gap-4 overflow-auto content-start">
        {['Stand Goal', 'Music Quiz', 'Directions Home', 'Shazam', 'QR Code', 'Timer', 'Dark Mode'].map(s => (
            <div key={s} className="aspect-square bg-[#2c2c2e] rounded-xl p-4 flex flex-col justify-between hover:bg-[#3a3a3c] cursor-pointer">
                <Command size={24} className="text-blue-500"/>
                <span className="font-bold text-sm">{s}</span>
            </div>
        ))}
    </div>
);

export const TimeMachine = () => (
    <div className="h-full bg-black relative overflow-hidden flex items-center justify-center perspective-[1000px]">
        {/* Infinite stack effect simulated */}
        {[...Array(5)].map((_, i) => (
            <div 
                key={i} 
                className="absolute w-[80%] h-[80%] bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-2xl transform"
                style={{ 
                    transform: `translateZ(-${i * 100}px) translateY(-${i * 20}px)`,
                    opacity: 1 - (i * 0.15),
                    zIndex: 5-i 
                }}
            >
                <div className="h-8 bg-[#2d2d2d] border-b border-gray-700 flex items-center px-4 text-white text-xs">
                    Finder - {['Now', 'Yesterday', 'Last Week', 'October', 'September'][i]}
                </div>
            </div>
        ))}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50">
            {['Now', '10:00', 'Yesterday', 'Monday', '2023'].map(t => (
                <div key={t} className="text-right text-gray-400 text-xs font-bold hover:text-white cursor-pointer">{t}</div>
            ))}
        </div>
    </div>
);

export const DevTools = () => (
    <div className="h-full bg-[#0d1117] text-green-400 font-mono p-4 text-xs overflow-auto">
        <div>$ npm install quantum-os</div>
        <div className="text-gray-500">Installing packages...</div>
        <div className="text-gray-500">
            [====================] 100%
        </div>
        <div>$ start-system</div>
        <div className="text-blue-400">System initialized in 0.05ms</div>
        <div className="text-white">Ready for input...</div>
        <div className="mt-2 animate-pulse">_</div>
    </div>
);

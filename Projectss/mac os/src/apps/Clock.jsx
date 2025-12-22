/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { Clock as ClockIcon, Timer, Hourglass, Globe } from 'lucide-react';

const Clock = () => {
    const [activeTab, setActiveTab] = useState('world');
    const [time, setTime] = useState(new Date());

    React.useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const cities = [
        { name: "Cupertino", offset: -7 },
        { name: "New York", offset: -4 },
        { name: "London", offset: 1 },
        { name: "Tokyo", offset: 9 },
    ];

    return (
        <div className="h-full bg-black text-white flex flex-col">
            <div className="flex-1 p-6 overflow-auto">
                {activeTab === 'world' && (
                    <div className="grid grid-cols-1 gap-4">
                        <div className="text-center py-8">
                            <div className="text-6xl font-light">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            <div className="text-gray-400 mt-2">{time.toLocaleDateString([], {weekday: 'long', month: 'long', day: 'numeric'})}</div>
                        </div>
                        <div className="space-y-4">
                            {cities.map(c => (
                                <div key={c.name} className="flex justify-between items-center border-b border-white/10 pb-4">
                                    <div>
                                        <div className="text-gray-400 text-xs">Today, {c.offset > 0 ? '+' : ''}{c.offset}HRS</div>
                                        <div className="text-xl">{c.name}</div>
                                    </div>
                                    <div className="text-2xl font-light">
                                        {new Date(time.getTime() + c.offset * 3600000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'stopwatch' && (
                     <div className="h-full flex flex-col items-center justify-center">
                         <div className="text-7xl font-mono mb-12">00:00.00</div>
                         <div className="flex gap-4">
                             <button className="w-20 h-20 rounded-full bg-green-900/50 text-green-400 border-2 border-green-900 flex items-center justify-center">Start</button>
                             <button className="w-20 h-20 rounded-full bg-gray-800 text-gray-400 border-2 border-gray-700 flex items-center justify-center">Reset</button>
                         </div>
                     </div>
                )}
            </div>

            <div className="h-16 bg-[#1e1e1e] flex items-center justify-around border-t border-white/10">
                <button onClick={() => setActiveTab('world')} className={`flex flex-col items-center gap-1 text-xs ${activeTab === 'world' ? 'text-orange-400' : 'text-gray-400'}`}>
                    <Globe size={20} /> World Clock
                </button>
                <button onClick={() => setActiveTab('alarm')} className={`flex flex-col items-center gap-1 text-xs ${activeTab === 'alarm' ? 'text-orange-400' : 'text-gray-400'}`}>
                    <ClockIcon size={20} /> Alarm
                </button>
                <button onClick={() => setActiveTab('stopwatch')} className={`flex flex-col items-center gap-1 text-xs ${activeTab === 'stopwatch' ? 'text-orange-400' : 'text-gray-400'}`}>
                    <Timer size={20} /> Stopwatch
                </button>
                <button onClick={() => setActiveTab('timer')} className={`flex flex-col items-center gap-1 text-xs ${activeTab === 'timer' ? 'text-orange-400' : 'text-gray-400'}`}>
                    <Hourglass size={20} /> Timer
                </button>
            </div>
        </div>
    );
};

export default Clock;

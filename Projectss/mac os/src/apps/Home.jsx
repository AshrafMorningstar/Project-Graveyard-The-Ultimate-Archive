/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { Home as HomeIcon, Lightbulb, Thermometer, Lock, Wifi, Tv, Fan, Power } from 'lucide-react';

const Home = () => {
    return (
        <div className="h-full bg-[#f2f2f7] dark:bg-[#1e1e1e] text-black dark:text-white flex flex-col">
            <div className="p-6 pb-2 flex justify-between items-center">
                <h1 className="text-3xl font-bold flex items-center gap-2"><HomeIcon /> Home</h1>
                <div className="text-sm font-bold bg-white dark:bg-[#2c2c2e] px-3 py-1 rounded-full shadow-sm">
                    23.5°C • 48% Humidity
                </div>
            </div>

            <div className="flex-1 p-6 overflow-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-[#2c2c2e] p-4 rounded-2xl shadow-sm flex flex-col justify-between aspect-square cursor-pointer hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-colors group">
                        <div className="flex justify-between items-start">
                            <Lightbulb className="text-yellow-500" />
                            <Power size={16} className="text-gray-400 group-hover:text-black dark:group-hover:text-white" />
                        </div>
                        <div>
                            <div className="font-bold">Living Room</div>
                            <div className="text-xs text-yellow-600 font-medium">On • 80%</div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#2c2c2e] p-4 rounded-2xl shadow-sm flex flex-col justify-between aspect-square cursor-pointer">
                        <div className="flex justify-between items-start">
                            <Thermometer className="text-orange-500" />
                            <div className="text-xs font-bold">21°</div>
                        </div>
                        <div>
                            <div className="font-bold">Thermostat</div>
                            <div className="text-xs text-gray-500">Heating to 22°</div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#2c2c2e] p-4 rounded-2xl shadow-sm flex flex-col justify-between aspect-square cursor-pointer">
                        <div className="flex justify-between items-start">
                             <Lock className="text-green-500" />
                             <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <div>
                            <div className="font-bold">Front Door</div>
                            <div className="text-xs text-green-600 font-medium">Locked</div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#2c2c2e] p-4 rounded-2xl shadow-sm flex flex-col justify-between aspect-square cursor-pointer">
                        <div className="flex justify-between items-start">
                             <Wifi className="text-blue-500" />
                        </div>
                        <div>
                            <div className="font-bold">Wi-Fi</div>
                            <div className="text-xs text-gray-500">Online</div>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4">Scenes</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                     {['Good Morning', 'Movie Night', 'Away', 'Arriving Home'].map((scene, i) => (
                         <div key={i} className="min-w-[150px] bg-white/50 dark:bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-white/10 font-medium shadow-sm border border-black/5">
                             {scene}
                         </div>
                     ))}
                </div>
                
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white shadow-lg flex items-center gap-4">
                     <Tv size={32} />
                     <div>
                         <div className="font-bold text-lg">Apple TV</div>
                         <div className="text-sm opacity-80">Playing "Severance"</div>
                     </div>
                     <div className="ml-auto">
                         <Play fill="white" size={24} />
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

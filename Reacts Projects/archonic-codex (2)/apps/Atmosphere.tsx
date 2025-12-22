/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { CloudRain, Sun, Wind, Droplets, MapPin, Calendar } from 'lucide-react';

export const Atmosphere: React.FC = () => {
    return (
        <div className="h-full bg-gradient-to-br from-blue-900 to-black text-white p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10 flex flex-col h-full">
                 <div className="flex justify-between items-start mb-8">
                     <div>
                         <h2 className="text-3xl font-bold font-display">San Francisco</h2>
                         <div className="flex items-center gap-1 text-blue-200 text-sm">
                             <MapPin size={12} /> CA, United States
                         </div>
                     </div>
                     <div className="text-right">
                         <div className="text-5xl font-thin">72°</div>
                         <div className="text-blue-200">Partly Cloudy</div>
                     </div>
                 </div>

                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10">
                     <div className="grid grid-cols-3 gap-4 text-center">
                         <div className="flex flex-col items-center gap-2">
                             <Wind size={20} className="text-blue-300" />
                             <span className="text-xs text-gray-300">Wind</span>
                             <span className="font-bold">8 mph</span>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                             <Droplets size={20} className="text-blue-300" />
                             <span className="text-xs text-gray-300">Humidity</span>
                             <span className="font-bold">42%</span>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                             <CloudRain size={20} className="text-blue-300" />
                             <span className="text-xs text-gray-300">Precip</span>
                             <span className="font-bold">0%</span>
                         </div>
                     </div>
                 </div>

                 <div className="flex-1 overflow-y-auto">
                     <h3 className="font-bold mb-4 flex items-center gap-2"><Calendar size={16} /> 5-Day Forecast</h3>
                     <div className="space-y-3">
                         {[
                             { day: 'Today', icon: Sun, high: 72, low: 58 },
                             { day: 'Tue', icon: CloudRain, high: 65, low: 55 },
                             { day: 'Wed', icon: Sun, high: 68, low: 52 },
                             { day: 'Thu', icon: Wind, high: 62, low: 50 },
                             { day: 'Fri', icon: Sun, high: 70, low: 56 },
                         ].map((f, i) => (
                             <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                                 <span className="w-12 font-medium">{f.day}</span>
                                 <f.icon size={20} className="text-yellow-400" />
                                 <div className="flex gap-4 w-24 justify-end">
                                     <span className="font-bold">{f.high}°</span>
                                     <span className="text-gray-400">{f.low}°</span>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
        </div>
    );
};
/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { Mic, Play, FastForward, RotateCcw } from 'lucide-react';

const Podcasts = () => {
    return (
        <div className="h-full bg-purple-900 text-white flex flex-col">
            <div className="p-8 pb-4">
                <h1 className="text-3xl font-bold">Listen Now</h1>
            </div>
            
            <div className="flex-1 p-8 pt-0 overflow-auto">
                <div className="grid grid-cols-3 gap-6">
                    {[
                        { title: "The Daily", host: "New York Times", color: "bg-gray-800" },
                        { title: "Syntax", host: "Wes Bos & Scott Tolinski", color: "bg-yellow-600" },
                        { title: "Darknet Diaries", host: "Jack Rhysider", color: "bg-black" },
                        { title: "Lex Fridman", host: "Lex Fridman", color: "bg-gray-900" },
                        { title: "Radiolab", host: "WNYC Studios", color: "bg-orange-500" },
                        { title: "TED Radio Hour", host: "NPR", color: "bg-red-600" }
                    ].map((pod, i) => (
                        <div key={i} className="flex flex-col gap-2 cursor-pointer group">
                            <div className={`aspect-square rounded-lg shadow-xl ${pod.color} flex items-center justify-center relative overflow-hidden group-hover:-translate-y-2 transition-transform`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <span className="font-bold text-xl text-center px-4 relative z-10">{pod.title}</span>
                                <div className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play size={12} fill="currentColor"/>
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold text-sm truncate">{pod.title}</div>
                                <div className="text-xs text-purple-300">{pod.host}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Player Bar */}
            <div className="h-20 bg-[#1c1c1e] border-t border-white/10 flex items-center px-6 gap-6">
                <div className="w-12 h-12 bg-gray-700 rounded-md"></div>
                <div className="flex-1">
                    <div className="text-sm font-bold">Latest Episode</div>
                    <div className="text-xs text-gray-400">Podcast Name</div>
                </div>
                <div className="flex items-center gap-6">
                    <RotateCcw size={20} className="text-gray-400"/>
                    <Play size={24} fill="white" />
                    <FastForward size={20} className="text-gray-400"/>
                </div>
            </div>
        </div>
    );
};

export default Podcasts;

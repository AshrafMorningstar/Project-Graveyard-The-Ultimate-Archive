/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React from 'react';
import { Play, GitBranch, Settings, Search, FileCode } from 'lucide-react';

export const CodeCosmos: React.FC = () => {
    return (
        <div className="h-full bg-[#1e1e1e] flex text-gray-400 font-mono text-sm leading-6">
            {/* Sidebar */}
            <div className="w-12 border-r border-[#333] flex flex-col items-center py-4 gap-6 bg-[#252526]">
                <FileCode className="w-6 h-6 text-white" />
                <Search className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
                <GitBranch className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
                <div className="flex-1" />
                <Settings className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
            </div>

            {/* File Tree */}
            <div className="w-48 border-r border-[#333] bg-[#252526] flex flex-col">
                <div className="p-3 text-xs font-bold uppercase tracking-wider">Explorer</div>
                <div className="px-2">
                    <div className="flex items-center gap-1 text-white bg-[#37373d] px-2 py-1 rounded cursor-pointer">
                        <span className="text-blue-400">TS</span>
                        <span>quantum.ts</span>
                    </div>
                     <div className="flex items-center gap-1 px-2 py-1 rounded cursor-pointer hover:bg-[#2a2d2e]">
                        <span className="text-yellow-400">JS</span>
                        <span>neural.js</span>
                    </div>
                     <div className="flex items-center gap-1 px-2 py-1 rounded cursor-pointer hover:bg-[#2a2d2e]">
                        <span className="text-purple-400">CSS</span>
                        <span>cosmos.css</span>
                    </div>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {/* Tabs */}
                <div className="flex bg-[#252526]">
                    <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-quantum-glow text-white text-xs flex items-center gap-2">
                        <span>quantum.ts</span>
                        <span className="hover:bg-white/20 rounded-full p-0.5 pointer-events-auto">×</span>
                    </div>
                </div>

                {/* Code Area */}
                <div className="flex-1 p-4 overflow-auto relative">
                     <div className="absolute top-4 right-4 flex gap-2">
                        <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2 text-xs">
                            <Play className="w-3 h-3" /> Run
                        </button>
                     </div>

                     <div className="flex">
                         <div className="w-8 text-right pr-4 text-gray-600 select-none">
                             1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8
                         </div>
                         <div className="flex-1">
                             <span className="text-pink-400">interface</span> <span className="text-yellow-300">QuantumState</span> {'{'}<br/>
                             &nbsp;&nbsp;<span className="text-blue-300">entanglement</span>: <span className="text-green-400">number</span>;<br/>
                             &nbsp;&nbsp;<span className="text-blue-300">superposition</span>: <span className="text-green-400">boolean</span>;<br/>
                             {'}'}<br/><br/>
                             <span className="text-pink-400">export const</span> <span className="text-yellow-300">initUniverse</span> = () <span className="text-pink-400">=&gt;</span> {'{'}<br/>
                             &nbsp;&nbsp;<span className="text-blue-300">console</span>.<span className="text-yellow-300">log</span>(<span className="text-orange-300">"Hello Cosmos"</span>);<br/>
                             {'}'}
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

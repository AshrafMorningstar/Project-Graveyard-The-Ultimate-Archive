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
import { useStore } from '../../store/useStore';
import { Play, Save, Settings, FileCode } from 'lucide-react';

const CodeEditor: React.FC = () => {
    const [code, setCode] = useState(`// Welcome to Code Matrix
// Start building your reality...

function initializeQuantumField() {
    const state = "superposition";
    return state === "observed" ? collapse() : waveFunction();
}

console.log("System Ready.");`);

    const { settings } = useStore();

    // Simple syntax highlighting (mock)
    const renderCode = () => {
        return code.split('\n').map((line, i) => (
            <div key={i} className="leading-6 whitespace-pre">
                <span className="text-gray-500 w-8 inline-block text-right mr-4 select-none">{i + 1}</span>
                <span className="text-blue-300">{line}</span>
            </div>
        ));
    };

    return (
        <div className="h-full flex flex-col bg-[#1E1E1E] text-gray-300 font-mono text-sm">
            {/* Title Bar */}
            <div className="h-10 bg-[#252526] flex items-center justify-between px-4 border-b border-black/20">
                <div className="flex items-center gap-2">
                    <FileCode size={14} className="text-blue-400" />
                    <span className="text-xs">script.js</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-white/10 rounded text-green-400" title="Run">
                        <Play size={14} />
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded text-blue-400" title="Save">
                        <Save size={14} />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-[#252526] border-r border-black/20 hidden md:flex flex-col">
                    <div className="p-2 text-xs font-bold text-gray-500 uppercase">Explorer</div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#37373D] cursor-pointer">
                        <FileCode size={12} className="text-yellow-400" />
                        <span>script.js</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 hover:bg-[#2A2D2E] cursor-pointer opacity-70">
                        <FileCode size={12} className="text-blue-400" />
                        <span>styles.css</span>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 relative">
                    <textarea 
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white p-4 resize-none outline-none font-mono leading-6 z-10"
                        spellCheck={false}
                    />
                    <div className="absolute inset-0 w-full h-full p-4 pointer-events-none">
                        {renderCode()}
                    </div>
                </div>
            </div>
            
            {/* Status Bar */}
            <div className="h-6 bg-blue-600 text-white flex items-center px-4 text-xs gap-4">
                <span>master*</span>
                <span>Ln {code.split('\n').length}, Col 1</span>
                <span className="ml-auto">UTF-8</span>
                <span>JavaScript</span>
            </div>
        </div>
    );
};

export default CodeEditor;
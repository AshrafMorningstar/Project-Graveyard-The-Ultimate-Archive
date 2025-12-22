/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState } from 'react';
import { Bold, Italic, List, CheckSquare, Save } from 'lucide-react';

export const MarkdownEditor: React.FC = () => {
    const [content, setContent] = useState('# Project Ideas\n\n- Build a quantum computer\n- Solve P vs NP\n- **Deploy Eigenfolio**');
    
    return (
        <div className="h-full bg-[#1e1e1e] flex flex-col text-gray-300">
            {/* Toolbar */}
            <div className="h-10 bg-[#252526] border-b border-black flex items-center px-4 gap-2">
                <button className="p-1 hover:bg-[#333] rounded"><Bold className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-[#333] rounded"><Italic className="w-4 h-4" /></button>
                <div className="w-px h-4 bg-gray-600 mx-1" />
                <button className="p-1 hover:bg-[#333] rounded"><List className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-[#333] rounded"><CheckSquare className="w-4 h-4" /></button>
                <div className="flex-1" />
                <button className="text-xs flex items-center gap-2 hover:text-white">
                    <Save className="w-3 h-3" /> Save to Cloud
                </button>
            </div>

            <div className="flex-1 flex">
                <textarea 
                    className="flex-1 bg-[#1e1e1e] p-4 font-mono resize-none focus:outline-none border-r border-black"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                
                {/* Preview (Mock) */}
                <div className="flex-1 bg-[#1e1e1e] p-4 prose prose-invert prose-sm overflow-y-auto">
                    {/* Very basic render for demo */}
                    {content.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>
                        if (line.startsWith('- ')) return <li key={i} className="ml-4">{line.replace('- ', '')}</li>
                        if (line.trim() === '') return <br key={i} />
                        return <p key={i}>{line}</p>
                    })}
                </div>
            </div>
        </div>
    );
};

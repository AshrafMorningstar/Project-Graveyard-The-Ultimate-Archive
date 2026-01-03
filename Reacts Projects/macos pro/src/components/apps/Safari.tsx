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

import { ArrowLeft, ArrowRight, RotateCw, Globe } from 'lucide-react';
import { useState } from 'react';

const Safari = () => {
    const [url, setUrl] = useState('https://github.com/AshrafMorningstar');
    const [iframeUrl, setIframeUrl] = useState('https://github.com/AshrafMorningstar');

    const handleNavigate = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.startsWith('http')) {
            setIframeUrl(url);
        } else {
             setIframeUrl(`https://www.google.com/search?q=${url}&igu=1`); // &igu=1 allows google to be embedded sometimes, but largely blocked
        }
    };

    return (
         <div className="h-full bg-white flex flex-col">
            {/* Toolbar */}
            <div className="bg-[#f5f5f5] border-b border-[#e5e5e5] p-2 flex items-center gap-3">
                <div className="flex gap-1 text-gray-400">
                    <button className="p-1 hover:bg-gray-200 rounded"><ArrowLeft size={16} /></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><ArrowRight size={16} /></button>
                    <button onClick={() => setIframeUrl(url)} className="p-1 hover:bg-gray-200 rounded"><RotateCw size={14} /></button>
                </div>
                
                <form onSubmit={handleNavigate} className="flex-1 flex justify-center">
                    <div className="relative group w-full max-w-xl">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Globe size={14} className="text-gray-400 group-focus-within:text-blue-500" />
                        </div>
                        <input 
                            type="text" 
                            className="w-full bg-[#e5e5e5] hover:bg-[#dedede] focus:bg-white border-none rounded-lg py-1.5 pl-9 pr-3 text-sm text-center focus:text-left focus:ring-2 focus:ring-blue-400/50 transition-all outline-none text-gray-700 placeholder-gray-500"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                </form>
                <div className="w-10"></div> {/* Spacer to balance */}
            </div>

            {/* Content - Note: Many sites block iframes */}
            <iframe 
                src={iframeUrl} 
                className="flex-1 w-full border-0 bg-white" 
                title="Browser"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
            
            {/* Fallback/Explanation Overlay if needed or bottom bar */}
            <div className="text-[10px] text-gray-400 text-center py-1 bg-gray-50 border-t">
                Note: Many websites (like GitHub) allow embedding, but others may block it due to x-frame-options.
            </div>
        </div>
    );
};

export default Safari;

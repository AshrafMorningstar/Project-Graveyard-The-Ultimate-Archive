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
import { ArrowLeft, ArrowRight, RotateCw, Lock, Star, Plus, X, Globe } from 'lucide-react';

const Safari = () => {
    const [tabs, setTabs] = useState([
        { id: 1, title: 'Apple', url: 'https://www.apple.com' },
        { id: 2, title: 'Bing', url: 'https://www.bing.com' }
    ]);
    const [activeTab, setActiveTab] = useState(1);
    const [urlInput, setUrlInput] = useState('https://www.apple.com');
    const [iframeUrl, setIframeUrl] = useState('https://www.bing.com'); // Default that likely works

    const handleNavigate = (e) => {
        if (e.key === 'Enter') {
            let target = urlInput;
            if (!target.startsWith('http')) target = 'https://' + target;
            setIframeUrl(target);
            setTabs(tabs.map(t => t.id === activeTab ? { ...t, title: target.replace('https://www.', '').split('.')[0], url: target } : t));
        }
    };

    const closeTab = (e, id) => {
        e.stopPropagation();
        const newTabs = tabs.filter(t => t.id !== id);
        if (newTabs.length === 0) {
            setTabs([{ id: 1, title: 'New Tab', url: 'about:blank' }]);
            setActiveTab(1);
        } else {
            setTabs(newTabs);
            if (id === activeTab) setActiveTab(newTabs[newTabs.length - 1].id);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#363636] text-white">
            {/* Tab Bar */}
            <div className="flex items-end pl-2 pt-2 gap-1 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 mr-2">
                    <button className="p-1 hover:bg-white/10 rounded"><LayoutSidebar size={18} /></button>
                    <button className="p-1 hover:bg-white/10 rounded"><ChevronLeft size={18} /></button>
                    <button className="p-1 hover:bg-white/10 rounded"><ChevronRight size={18} /></button>
                </div>
                {tabs.map(tab => (
                    <div 
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setUrlInput(tab.url); setIframeUrl(tab.url); }}
                        className={`group relative flex items-center min-w-[150px] max-w-[240px] h-9 px-3 rounded-t-lg cursor-default text-xs ${activeTab === tab.id ? 'bg-[#5a5a5a] shadow-sm' : 'bg-[#2a2a2a] hover:bg-[#454545] text-gray-400'}`}
                    >
                         <img src={`https://www.google.com/s2/favicons?domain=${tab.url}`} className="w-3 h-3 mr-2 bg-white rounded-full" onError={(e) => e.target.style.display='none'} />
                         <span className="truncate flex-1 text-center">{tab.title}</span>
                         <button onClick={(e) => closeTab(e, tab.id)} className="ml-2 p-0.5 rounded-full hover:bg-white/20 opacity-0 group-hover:opacity-100">
                             <X size={10} />
                         </button>
                    </div>
                ))}
                <button 
                  onClick={() => {
                      const newId = Date.now();
                      setTabs([...tabs, { id: newId, title: 'New Tab', url: 'about:blank' }]);
                      setActiveTab(newId);
                  }}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg ml-1"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Address Bar */}
            <div className="bg-[#5a5a5a] p-2 flex items-center gap-4 transition-colors">
                <div className="flex-1 flex items-center bg-[#2a2a2a] rounded-lg px-3 py-1.5 focus-within:ring-2 ring-blue-500">
                    <Lock size={12} className="text-gray-400 mr-2" />
                    <input 
                        className="flex-1 bg-transparent border-none outline-none text-white text-sm text-center"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={handleNavigate}
                        onFocus={(e) => e.target.select()}
                    />
                    <RotateCw size={12} className="text-gray-400 ml-2 cursor-pointer hover:rotate-180 transition-transform" />
                </div>
            </div>

            {/* Content with Error Handling Overlay */}
            <div className="flex-1 relative bg-white">
                <iframe 
                    src={iframeUrl} 
                    className="w-full h-full border-0" 
                    title="browser"
                    sandbox="allow-scripts allow-active-downloads allow-pointer-lock allow-forms allow-same-origin"
                />
                
                {/* Fallback overlay for known blockers or just to make it look nicer when loading */}
                {iframeUrl === 'about:blank' && (
                    <div className="absolute inset-0 bg-[#363636] flex flex-col items-center justify-center text-gray-400">
                        <div className="text-4xl font-light mb-4 text-white">Safari</div>
                        <div className="grid grid-cols-4 gap-8">
                             {['Apple', 'iCloud', 'Google', 'Twitter'].map(bm => (
                                 <div key={bm} className="flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
                                     <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-2xl font-bold">{bm[0]}</div>
                                     <span className="text-xs">{bm}</span>
                                 </div>
                             ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Fix imports for icons not present
import { LayoutSidebar, ChevronLeft, ChevronRight } from 'lucide-react';

export default Safari;

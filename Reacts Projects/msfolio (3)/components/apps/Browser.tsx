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
import { ArrowLeft, ArrowRight, RotateCw, X, Plus, Star, Globe, Lock, Search, ExternalLink, Github, Layout, Terminal, ShieldAlert } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Tab {
    id: number;
    title: string;
    url: string;
    history: string[];
    historyIndex: number;
}

const DEFAULT_TABS: Tab[] = [
    { id: 1, title: 'New Tab', url: 'about:home', history: ['about:home'], historyIndex: 0 },
];

const SPEED_DIAL = [
    { title: "GitHub Profile", url: "https://github.com/AshrafMorningstar", icon: <Github size={24} />, color: "bg-gray-800" },
    { title: "Portfolio", url: "https://ashrafos.com", icon: <Layout size={24} />, color: "bg-blue-600" },
    { title: "Localhost", url: "http://localhost:3000", icon: <Terminal size={24} />, color: "bg-green-600" },
    { title: "Search", url: "https://www.bing.com", icon: <Search size={24} />, color: "bg-purple-600" },
];

const Browser: React.FC = () => {
    const [tabs, setTabs] = useState<Tab[]>(DEFAULT_TABS);
    const [activeTabId, setActiveTabId] = useState(1);
    const [urlInput, setUrlInput] = useState('');
    const { settings } = useStore();

    const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

    const updateTab = (id: number, updates: Partial<Tab>) => {
        setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const navigate = (url: string) => {
        let finalUrl = url;
        if (!url.startsWith('http') && !url.startsWith('about:')) {
            if (url.includes('.')) {
                finalUrl = 'https://' + url;
            } else {
                finalUrl = `https://www.bing.com/search?q=${encodeURIComponent(url)}`;
            }
        }
        
        const newHistory = [...activeTab.history.slice(0, activeTab.historyIndex + 1), finalUrl];
        updateTab(activeTabId, { 
            url: finalUrl, 
            history: newHistory,
            historyIndex: newHistory.length - 1,
            title: new URL(finalUrl.replace('about:home', 'http://NewTab')).hostname || 'New Tab'
        });
        setUrlInput(finalUrl === 'about:home' ? '' : finalUrl);
    };

    const goBack = () => {
        if (activeTab.historyIndex > 0) {
            const newIndex = activeTab.historyIndex - 1;
            const url = activeTab.history[newIndex];
            updateTab(activeTabId, { historyIndex: newIndex, url, title: new URL(url).hostname || 'New Tab' });
            setUrlInput(url === 'about:home' ? '' : url);
        }
    };

    const goForward = () => {
        if (activeTab.historyIndex < activeTab.history.length - 1) {
            const newIndex = activeTab.historyIndex + 1;
            const url = activeTab.history[newIndex];
            updateTab(activeTabId, { historyIndex: newIndex, url, title: new URL(url).hostname || 'New Tab' });
            setUrlInput(url === 'about:home' ? '' : url);
        }
    };

    const addTab = () => {
        const newId = Math.max(...tabs.map(t => t.id)) + 1;
        const newTab: Tab = { id: newId, title: 'New Tab', url: 'about:home', history: ['about:home'], historyIndex: 0 };
        setTabs([...tabs, newTab]);
        setActiveTabId(newId);
        setUrlInput('');
    };

    const closeTab = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (tabs.length === 1) {
            navigate('about:home');
            return;
        }
        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);
        if (activeTabId === id) setActiveTabId(newTabs[newTabs.length - 1].id);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(urlInput);
    };

    // Helper to determine if we should show the iframe or a redirect message
    // Many sites (GitHub, Google, etc.) block iframes via X-Frame-Options
    const isBlockedSite = (url: string) => {
        return url.includes('github.com') || url.includes('google.com') || url.includes('stackoverflow.com') || url.includes('twitter.com') || url.includes('x.com');
    };

    return (
        <div className="h-full flex flex-col bg-[#2D2D2D] text-white">
            {/* Tab Bar */}
            <div className="flex items-center bg-[#1E1E1E] pt-2 px-2 gap-1 overflow-x-auto no-scrollbar border-b border-black/20">
                {tabs.map(tab => (
                    <div 
                        key={tab.id}
                        onClick={() => { setActiveTabId(tab.id); setUrlInput(tab.url === 'about:home' ? '' : tab.url); }}
                        className={`
                            group relative flex items-center gap-2 px-3 py-2 rounded-t-lg text-xs min-w-[120px] max-w-[200px] cursor-pointer transition-colors border-t border-x
                            ${activeTabId === tab.id ? 'bg-[#2D2D2D] text-white border-white/10' : 'bg-transparent text-gray-400 hover:bg-[#252525] border-transparent'}
                        `}
                    >
                        <Globe size={12} className={activeTabId === tab.id ? 'text-blue-400' : 'opacity-50'} />
                        <span className="truncate flex-1">{tab.title === 'www.bing.com' ? 'Search' : tab.title}</span>
                        <button onClick={(e) => closeTab(tab.id, e)} className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded">
                            <X size={10} />
                        </button>
                    </div>
                ))}
                <button onClick={addTab} className="p-1 hover:bg-white/10 rounded text-gray-400">
                    <Plus size={16} />
                </button>
            </div>

            {/* Navigation Bar */}
            <div className="h-12 bg-[#2D2D2D] border-b border-black/20 flex items-center px-3 gap-3">
                <div className="flex gap-1">
                    <button onClick={goBack} disabled={activeTab.historyIndex === 0} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30">
                        <ArrowLeft size={16} />
                    </button>
                    <button onClick={goForward} disabled={activeTab.historyIndex >= activeTab.history.length - 1} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30">
                        <ArrowRight size={16} />
                    </button>
                    <button onClick={() => navigate(activeTab.url)} className="p-1.5 rounded hover:bg-white/10">
                        <RotateCw size={14} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex-1">
                    <div className="bg-[#1E1E1E] rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/5 focus-within:border-blue-500/50 transition-colors shadow-inner">
                        {activeTab.url.startsWith('https') ? <Lock size={12} className="text-green-500" /> : <Search size={12} className="text-gray-500" />}
                        <input 
                            type="text"
                            value={urlInput}
                            onChange={e => setUrlInput(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm"
                            placeholder="Search web or enter URL"
                        />
                        <Star size={14} className="text-gray-500 hover:text-yellow-400 cursor-pointer" />
                    </div>
                </form>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white relative">
                {activeTab.url === 'about:home' ? (
                    <div className="absolute inset-0 bg-[#1E1E1E] flex flex-col items-center justify-center text-gray-400 p-8">
                        <div className="mb-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                             <h1 className="text-4xl font-light text-white mb-2">Cyber Web</h1>
                             <p className="text-sm opacity-50">Secure • Fast • Private</p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
                            {SPEED_DIAL.map((site) => (
                                <button 
                                    key={site.title}
                                    onClick={() => navigate(site.url)}
                                    className="flex flex-col items-center gap-3 group p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1"
                                >
                                    <div className={`w-16 h-16 rounded-2xl ${site.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-2xl transition-all`}>
                                        {site.icon}
                                    </div>
                                    <span className="text-sm font-medium group-hover:text-white transition-colors">{site.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : isBlockedSite(activeTab.url) ? (
                    <div className="absolute inset-0 bg-[#0F0F1A] flex flex-col items-center justify-center text-gray-300 relative overflow-hidden">
                        {/* Matrix Background */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, .3) 25%, rgba(0, 255, 0, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .3) 75%, rgba(0, 255, 0, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>
                        
                        <div className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-xl max-w-md w-full text-center shadow-2xl z-10">
                            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldAlert size={32} className="text-yellow-500" />
                            </div>
                            
                            <h2 className="text-2xl font-bold mb-2 text-white">Security Protocol Engaged</h2>
                            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                                The destination <strong>{new URL(activeTab.url).hostname}</strong> prohibits embedded viewing within this neural interface due to X-Frame-Options headers.
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <a 
                                    href={activeTab.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg flex items-center justify-center gap-2 font-bold transition-all shadow-lg hover:shadow-blue-500/25"
                                >
                                    <ExternalLink size={18} /> Open in Quantum Tab
                                </a>
                                <button 
                                    onClick={goBack}
                                    className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
                                >
                                    Return to Safety
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <iframe 
                        src={activeTab.url}
                        className="w-full h-full border-none"
                        title="browser-frame"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                )}
            </div>
        </div>
    );
};

export default Browser;
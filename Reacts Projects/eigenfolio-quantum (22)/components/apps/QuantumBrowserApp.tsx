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
import { ArrowLeft, ArrowRight, RotateCw, Lock, Star, Globe, Search, Plus, X, Home, Shield, AlertTriangle } from 'lucide-react';

interface Tab {
    id: number;
    title: string;
    url: string;
    history: string[];
    historyIndex: number;
    isLoading: boolean;
}

const bookmarks = [
    { title: "GitHub", url: "https://github.com/AshrafMorningstar" },
    { title: "Google", url: "https://www.google.com/search?igu=1" }, // igu=1 trick for google
    { title: "Bing", url: "https://www.bing.com" },
    { title: "Wikipedia", url: "https://www.wikipedia.org" },
    { title: "HackerNews", url: "https://news.ycombinator.com" }
];

const QuantumBrowserApp: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
      { id: 1, title: 'New Tab', url: '', history: [''], historyIndex: 0, isLoading: false }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [inputUrl, setInputUrl] = useState('');
  const [proxyMode, setProxyMode] = useState(false); // Simulated proxy

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const updateTab = (id: number, updates: Partial<Tab>) => {
      setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
      if (id === activeTabId && updates.url !== undefined) setInputUrl(updates.url);
  };

  const handleNavigate = (e: React.FormEvent | string) => {
    if (typeof e !== 'string') e.preventDefault();
    const query = typeof e === 'string' ? e : inputUrl;
    
    let target = query;
    if (!target.includes('.') && !target.startsWith('http')) {
        // Search query
        target = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    } else if (!target.startsWith('http')) {
        target = `https://${target}`;
    }
    
    const newHistory = [...activeTab.history.slice(0, activeTab.historyIndex + 1), target];
    
    updateTab(activeTabId, {
        url: target,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        isLoading: true,
        title: target.replace('https://', '').split('/')[0]
    });

    setTimeout(() => updateTab(activeTabId, { isLoading: false }), 1500);
  };

  const addTab = () => {
      const newId = Date.now();
      const newTab: Tab = {
          id: newId,
          title: 'New Tab',
          url: '',
          history: [''],
          historyIndex: 0,
          isLoading: false
      };
      setTabs([...tabs, newTab]);
      setActiveTabId(newId);
      setInputUrl('');
  };

  const closeTab = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      const newTabs = tabs.filter(t => t.id !== id);
      if (newTabs.length === 0) {
          addTab();
      } else {
          setTabs(newTabs);
          if (activeTabId === id) setActiveTabId(newTabs[newTabs.length - 1].id);
      }
  };

  const handleBack = () => {
      if (activeTab.historyIndex > 0) {
          const newIndex = activeTab.historyIndex - 1;
          const url = activeTab.history[newIndex];
          updateTab(activeTabId, { historyIndex: newIndex, url });
          setInputUrl(url);
      }
  }

  const handleForward = () => {
      if (activeTab.historyIndex < activeTab.history.length - 1) {
          const newIndex = activeTab.historyIndex + 1;
          const url = activeTab.history[newIndex];
          updateTab(activeTabId, { historyIndex: newIndex, url });
          setInputUrl(url);
      }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-[#1a1a1a]">
      {/* Tab Bar */}
      <div className="flex items-center px-2 pt-2 gap-1 overflow-x-auto scrollbar-hide bg-gray-200 dark:bg-[#0f0f0f]">
          {tabs.map(tab => (
              <div 
                key={tab.id}
                onClick={() => { setActiveTabId(tab.id); setInputUrl(tab.url); }}
                className={`
                    group relative flex items-center gap-2 px-3 py-2 text-xs max-w-[200px] min-w-[120px] rounded-t-lg cursor-pointer transition select-none
                    ${activeTabId === tab.id ? 'bg-white dark:bg-[#2b2b2b] text-gray-800 dark:text-white shadow-sm' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'}
                `}
              >
                  {tab.isLoading ? <RotateCw size={12} className="animate-spin text-blue-500"/> : <Globe size={12} />}
                  <span className="truncate flex-1">{tab.title || 'New Tab'}</span>
                  <button 
                    onClick={(e) => closeTab(e, tab.id)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-200 dark:hover:bg-white/20 rounded-full"
                  >
                      <X size={10} />
                  </button>
              </div>
          ))}
          <button onClick={addTab} className="p-1 hover:bg-gray-300 dark:hover:bg-white/10 rounded-full text-gray-500">
              <Plus size={16} />
          </button>
      </div>

      {/* Browser Bar */}
      <div className="flex items-center gap-2 p-2 bg-white dark:bg-[#2b2b2b] border-b border-gray-200 dark:border-black/20 shadow-sm z-10">
        <button onClick={handleBack} disabled={activeTab.historyIndex <= 0} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 disabled:opacity-30"><ArrowLeft size={16} /></button>
        <button onClick={handleForward} disabled={activeTab.historyIndex >= activeTab.history.length - 1} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 disabled:opacity-30"><ArrowRight size={16} /></button>
        <button onClick={() => { updateTab(activeTabId, { isLoading: true }); setTimeout(() => updateTab(activeTabId, { isLoading: false }), 800); }} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400">
            <RotateCw size={16} className={activeTab.isLoading ? 'animate-spin' : ''} />
        </button>
        <button onClick={() => { updateTab(activeTabId, { url: '', title: 'New Tab' }); setInputUrl(''); }} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400"><Home size={16} /></button>

        {/* Address Bar */}
        <form onSubmit={handleNavigate} className="flex-1">
            <div className="flex items-center bg-gray-100 dark:bg-[#1a1a1a] rounded-full px-3 py-1.5 border border-transparent focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <Lock size={12} className="text-green-500 mr-2" />
                <input 
                    type="text" 
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Search with Quantum Net or enter address"
                    className="flex-1 bg-transparent text-sm outline-none text-gray-800 dark:text-white font-inter"
                />
                <Star size={14} className="text-gray-400 hover:text-yellow-400 cursor-pointer ml-2" />
            </div>
        </form>
        
        {/* Proxy Toggle */}
        <button 
            onClick={() => setProxyMode(!proxyMode)} 
            className={`p-1.5 rounded flex items-center gap-1 text-xs font-bold ${proxyMode ? 'bg-purple-500/20 text-purple-500' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}
            title="Toggle Proxy Mode (Bypass Restrictions)"
        >
            <Shield size={14} /> {proxyMode ? 'ON' : 'OFF'}
        </button>
      </div>
      
      {/* Bookmarks Bar */}
      <div className="flex items-center gap-4 px-4 py-1 bg-white dark:bg-[#2b2b2b] border-b border-gray-200 dark:border-black/10 overflow-x-auto text-xs">
          {bookmarks.map((bm, i) => (
              <button 
                key={i} 
                onClick={() => handleNavigate(bm.url)}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 px-2 py-0.5 rounded whitespace-nowrap"
              >
                  <Globe size={10} className="text-blue-400" /> {bm.title}
              </button>
          ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-white dark:bg-black overflow-hidden flex flex-col">
        {activeTab.isLoading ? (
             <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <Globe className="w-16 h-16 text-blue-500 animate-pulse" />
                <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-[shimmer_1s_infinite]"></div>
                </div>
                <p className="text-xs text-gray-500 font-mono">ESTABLISHING QUANTUM LINK...</p>
            </div>
        ) : activeTab.url ? (
            // Iframe or "Proxy" Message
            <div className="w-full h-full relative">
                <iframe 
                    src={activeTab.url} 
                    className="w-full h-full border-none bg-white" 
                    title="Browser Content"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
                {/* Fallback Overlay if likely to fail */}
                {(!activeTab.url.includes('google.com/search') && !activeTab.url.includes('bing.com') && !activeTab.url.includes('wikipedia.org') && !activeTab.url.includes('localhost') && !proxyMode) && (
                    <div className="absolute top-0 left-0 w-full p-2 bg-yellow-100 text-yellow-800 text-xs flex justify-between items-center opacity-90 hover:opacity-100 transition">
                        <span className="flex items-center gap-2"><AlertTriangle size={14}/> Site may not load due to X-Frame-Options.</span>
                        <div className="flex gap-2">
                            <button onClick={() => setProxyMode(true)} className="underline font-bold">Enable Proxy Sim</button>
                            <button onClick={() => window.open(activeTab.url, '_blank')} className="underline">Open Externally</button>
                        </div>
                    </div>
                )}
                
                {/* Proxy Simulator */}
                {proxyMode && (
                    <div className="absolute inset-0 bg-gray-900 text-white flex flex-col items-center justify-center font-mono p-8 text-center">
                        <Shield size={64} className="text-green-500 mb-4 animate-pulse" />
                        <h2 className="text-2xl font-bold text-green-400">SECURE PROXY ACTIVE</h2>
                        <p className="text-gray-400 mt-2 max-w-lg">
                            Tunneling traffic through Quantum Node [Q-7X]. <br/>
                            External content from <span className="text-white">{activeTab.url}</span> is being rendered in safe mode.
                        </p>
                        <div className="mt-8 border border-green-500/30 bg-green-500/10 p-4 rounded text-left text-xs w-full max-w-md">
                            <p className="text-green-300"> GET {activeTab.url} HTTP/2.0</p>
                            <p className="text-green-300"> Host: quantum-proxy-net</p>
                            <p className="text-green-300"> Status: 200 OK</p>
                            <p className="mt-2 text-gray-400">// Rendering content...</p>
                        </div>
                        <button onClick={() => window.open(activeTab.url, '_blank')} className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-bold transition">
                            Launch in Real Browser
                        </button>
                    </div>
                )}
            </div>
        ) : (
            // New Tab Page
            <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-2xl mx-auto animate-in fade-in zoom-in-95">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text text-6xl font-bold font-space-grotesk mb-8 select-none">
                    Quantum Net
                </div>
                <form onSubmit={(e) => handleNavigate(e)} className="w-full relative mb-12">
                     <input 
                        type="text" 
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="Search the multiverse or enter URL..." 
                        className="w-full p-4 pl-6 pr-12 rounded-full border border-gray-200 dark:border-gray-700 shadow-xl dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-800 dark:text-white" 
                        autoFocus
                    />
                     <Search size={24} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => handleNavigate(inputUrl)} />
                </form>
                
                <div className="grid grid-cols-4 gap-8">
                    {bookmarks.slice(0, 4).map(site => (
                        <div 
                            key={site.title} 
                            onClick={() => handleNavigate(site.url)}
                            className="flex flex-col items-center gap-3 cursor-pointer group"
                        >
                             <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                                <Globe className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500" />
                             </div>
                             <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{site.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuantumBrowserApp;
/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Star, Globe, Search, Plus, X, Home } from 'lucide-react';

interface Tab {
    id: number;
    title: string;
    url: string;
    history: string[];
    historyIndex: number;
    isLoading: boolean;
}

const QuantumBrowserApp: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
      { id: 1, title: 'Quantum Search', url: 'https://www.bing.com', history: ['https://www.bing.com'], historyIndex: 0, isLoading: false }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [inputUrl, setInputUrl] = useState('');

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const updateTab = (id: number, updates: Partial<Tab>) => {
      setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
      if (id === activeTabId && updates.url) setInputUrl(updates.url);
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl;
    if (!target.startsWith('http')) target = `https://${target}`;
    
    // Simple logic to simulate navigation
    // Note: Most sites block iframes (X-Frame-Options). 
    // We can allow some, or default to a "Search" view for others.
    
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
        <button 
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400"
            onClick={() => { updateTab(activeTabId, { isLoading: true }); setTimeout(() => updateTab(activeTabId, { isLoading: false }), 800); }}
        >
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
        ) : activeTab.url.includes('google.com') || activeTab.url.includes('bing.com') || activeTab.url.includes('wikipedia.org') ? (
            <iframe 
                src={activeTab.url} 
                className="w-full h-full border-none bg-white" 
                title="Browser Content"
                sandbox="allow-scripts allow-same-origin allow-forms"
            />
        ) : activeTab.url ? (
             // Mock View for non-iframe sites
             <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                 <Lock size={48} className="mb-4 text-gray-300 dark:text-gray-700" />
                 <h2 className="text-xl font-bold mb-2">Security Protocol Active</h2>
                 <p className="max-w-md text-center">
                     Direct rendering of 3rd party quantum nodes ({activeTab.url}) is restricted in this simulation layer to prevent paradoxes (X-Frame-Options).
                 </p>
                 <button onClick={() => window.open(activeTab.url, '_blank')} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                     Open in External Reality
                 </button>
             </div>
        ) : (
            // New Tab Page
            <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-2xl mx-auto animate-in fade-in zoom-in-95">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text text-6xl font-bold font-space-grotesk mb-8">
                    Quantum Net
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleNavigate(e); }} className="w-full relative mb-12">
                     <input 
                        type="text" 
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="Search the multiverse..." 
                        className="w-full p-4 pl-6 pr-12 rounded-full border border-gray-200 dark:border-gray-700 shadow-xl dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-gray-800 dark:text-white" 
                    />
                     <Search size={24} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={handleNavigate} />
                </form>
                
                <div className="grid grid-cols-4 gap-8">
                    {[
                        { name: 'GitHub', url: 'https://github.com/AshrafMorningstar', icon: <Globe /> },
                        { name: 'Wikipedia', url: 'https://www.wikipedia.org', icon: <Globe /> },
                        { name: 'Bing', url: 'https://www.bing.com', icon: <Globe /> },
                        { name: 'Localhost', url: '', icon: <Globe /> }
                    ].map(site => (
                        <div 
                            key={site.name} 
                            onClick={() => { updateTab(activeTabId, { url: site.url, title: site.name }); setInputUrl(site.url); }}
                            className="flex flex-col items-center gap-3 cursor-pointer group"
                        >
                             <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                                <div className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500">{site.icon}</div>
                             </div>
                             <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{site.name}</span>
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
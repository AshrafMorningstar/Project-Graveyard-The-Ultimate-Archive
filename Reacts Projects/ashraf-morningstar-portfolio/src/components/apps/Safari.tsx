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

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw, Lock, Share, BookOpen, Plus, X, Globe, Star, Clock } from 'lucide-react'

// Simulated Browsing History
const INITIAL_HISTORY = [
  { url: 'https://apple.com', title: 'Apple', icon: '🍎' },
  { url: 'https://github.com/AshrafMorningstar', title: 'GitHub - Ashraf', icon: '🐙' },
  { url: 'https://nextjs.org', title: 'Next.js by Vercel', icon: '▲' },
]

export default function Safari() {
  const [tabs, setTabs] = useState([
    { id: 1, url: 'https://github.com/AshrafMorningstar', title: 'Ashraf Morningstar - GitHub', active: true }
  ])
  const [urlInput, setUrlInput] = useState('')
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const activeTab = tabs.find(t => t.active) || tabs[0]

  useEffect(() => {
    setUrlInput(activeTab?.url || '')
  }, [activeTab])

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault()
    let target = urlInput
    if (!target.includes('.') && !target.includes('://')) {
      target = `https://www.google.com/search?q=${encodeURIComponent(target)}`
    } else if (!target.startsWith('http')) {
      target = 'https://' + target
    }
    
    updateTab(activeTab.id, { url: target, title: target.replace('https://', '').split('/')[0] })
  }

  const activateTab = (id: number) => {
    setTabs(tabs.map(t => ({ ...t, active: t.id === id })))
  }

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const newTabs = tabs.filter(t => t.id !== id)
    if (newTabs.length === 0) {
      newTabs.push({ id: Date.now(), url: 'about:blank', title: 'Start Page', active: true })
    } else if (activeTab.id === id) {
      newTabs[newTabs.length - 1].active = true
    }
    setTabs(newTabs)
  }

  const addTab = () => {
    const newTab = { id: Date.now(), url: 'about:blank', title: 'Start Page', active: true }
    setTabs(tabs.map(t => ({ ...t, active: false })).concat(newTab))
  }

  const updateTab = (id: number, updates: Partial<typeof tabs[0]>) => {
    setTabs(tabs.map(t => t.id === id ? { ...t, ...updates } : t))
  }

  return (
    <div className="flex bg-[#f5f5f7] dark:bg-[#1e1e1e] h-full w-full">
      {/* Sidebar (optional) */}
      <div className={`transition-all duration-300 bg-[#e8e8ed] dark:bg-[#282828] flex flex-col border-r border-slate-200 dark:border-black/20 overflow-hidden ${sidebarOpen ? 'w-48' : 'w-0'}`}>
         <div className="p-2 space-y-1">
           <div className="text-xs font-semibold text-slate-500 px-2 py-1">Favorites</div>
           {INITIAL_HISTORY.map((h, i) => (
             <button key={i} onClick={() => updateTab(activeTab.id, { url: h.url, title: h.title })} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-left text-sm truncate">
               <span>{h.icon}</span> <span className="truncate">{h.title}</span>
             </button>
           ))}
         </div>
      </div>

      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Safari Toolbar */}
        <div className="h-10 flex bg-[#e8e8ed] dark:bg-[#282828] items-end px-2 gap-1 pt-2">
           <div className="flex gap-2 px-2 pb-2 mr-2">
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-black/5 rounded p-1 text-slate-500"><BookOpen size={16} /></button>
           </div>
           
           <div className="flex-1 flex gap-1 overflow-x-auto no-scrollbar">
             {tabs.map(tab => (
               <div 
                 key={tab.id}
                 onClick={() => activateTab(tab.id)}
                 className={`group flex items-center min-w-[120px] max-w-[200px] flex-1 h-8 px-3 text-xs rounded-t-md cursor-default select-none transition-all relative ${tab.active ? 'bg-white dark:bg-[#3a3a3c] shadow-sm z-10' : 'bg-transparent hover:bg-white/40 dark:hover:bg-white/5 text-slate-500'}`}
               >
                 <span className="truncate flex-1 text-center">{tab.title}</span>
                 <button onClick={(e) => closeTab(tab.id, e)} className="p-0.5 rounded-full hover:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <X size={10} />
                 </button>
               </div>
             ))}
             <button onClick={addTab} className="p-1 hover:bg-black/5 rounded mb-1 self-center"><Plus size={14} /></button>
           </div>
        </div>

        {/* Address Bar Area */}
        <div className="h-12 bg-white dark:bg-[#3a3a3c] flex items-center px-4 gap-4 border-b border-slate-200 dark:border-black/20 z-20">
          <div className="flex gap-4 text-slate-500 dark:text-slate-400">
             <ArrowLeft size={16} className={`hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors ${!activeTab?.url ? 'opacity-30' : ''}`} />
             <ArrowRight size={16} className="hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors opacity-30" />
             <RotateCcw size={14} className="hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors" onClick={() => iframeRef.current?.contentWindow?.location.reload()} />
          </div>
          
          <div className="flex-1 max-w-3xl mx-auto">
              <form onSubmit={handleNavigate} className="flex items-center bg-slate-100 dark:bg-[#1a1a1a] rounded-lg px-3 py-1.5 group focus-within:ring-2 ring-indigo-500/50 transition-all">
                 <Lock size={10} className="text-slate-400 mr-2 group-focus-within:text-green-500" />
                 <input 
                   className="flex-1 bg-transparent border-none outline-none text-xs text-center group-focus-within:text-left text-slate-700 dark:text-slate-200 placeholder-slate-400 font-medium"
                   value={urlInput}
                   onChange={(e) => setUrlInput(e.target.value)}
                   onFocus={(e) => e.target.select()}
                 />
                 <div className="w-4" /> {/* Spacer to center input visually */}
              </form>
          </div>

          <div className="flex gap-4 text-slate-500 dark:text-slate-400">
             <Share size={14} className="hover:text-slate-800 dark:hover:text-white cursor-pointer" />
             <Plus size={14} className="hover:text-slate-800 dark:hover:text-white cursor-pointer" onClick={addTab} />
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 relative bg-white dark:bg-[#1e1e1e] overflow-hidden">
           {activeTab.url === 'about:blank' ? (
             <div className="h-full flex flex-col items-center justify-center p-8 text-slate-300 dark:text-slate-600 space-y-8">
                <div className="text-6xl font-bold tracking-tighter text-slate-200 dark:text-white/10 select-none">Safari</div>
                <div className="grid grid-cols-4 gap-6 max-w-2xl">
                  {INITIAL_HISTORY.map((h, i) => (
                    <button key={i} onClick={() => updateTab(activeTab.id, { url: h.url, title: h.title })} className="flex flex-col items-center gap-3 group">
                       <div className="w-16 h-16 bg-slate-100 dark:bg-[#2d2d2d] rounded-xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                         {h.icon}
                       </div>
                       <span className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate w-full text-center">{h.title}</span>
                    </button>
                  ))}
                </div>
             </div>
           ) : (
             <>
               <iframe 
                 ref={iframeRef}
                 src={activeTab.url}
                 className="w-full h-full border-none"
                 title="Safari Browser"
                 sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
               />
               {/* Overlay for iframe interaction issues aka 'the click stealer' for dragging windows */}
               <div className="absolute top-0 left-0 right-0 h-2 bg-transparent" />
             </>
           )}
        </div>
      </div>
    </div>
  )
}

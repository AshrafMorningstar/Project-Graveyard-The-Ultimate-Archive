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

import { useState, useEffect, useRef } from 'react'
import { Search, Command, AppWindow, FileText, calculator, Terminal, Globe, Music, Cpu, Image } from 'lucide-react'
import { useWindowStore } from '@/lib/store'

const APPS_LIST = [
  { id: 'about', name: 'About', type: 'Application' },
  { id: 'projects', name: 'Projects', type: 'Application' },
  { id: 'skills', name: 'Skills', type: 'Application' },
  { id: 'contact', name: 'Contact', type: 'Application' },
  { id: 'terminal', name: 'Terminal', type: 'Application' },
  { id: 'music', name: 'Music', type: 'Application' },
  { id: 'neuroAI', name: 'Neuro AI', type: 'Application' },
  { id: 'matterShaper', name: 'Matter Shaper', type: 'Application' },
  { id: 'settings', name: 'Settings', type: 'Application' },
  { id: 'browser', name: 'Safari', type: 'Application' },
  { id: 'calculator', name: 'Calculator', type: 'Application' },
  { id: 'calendar', name: 'Calendar', type: 'Application' },
  { id: 'notes', name: 'Notes', type: 'Application' },
]

export default function Spotlight() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const openWindow = useWindowStore(state => state.openWindow)

  const filteredApps = APPS_LIST.filter(app => 
    app.name.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (!isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  const handleSelect = (id: string) => {
    openWindow(id)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev < filteredApps.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      if (filteredApps[selectedIndex]) {
        handleSelect(filteredApps[selectedIndex].id)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[1px]" onClick={() => setIsOpen(false)}>
      <div 
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 gap-3 border-b border-white/10">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-slate-500 font-light"
          />
        </div>

        {query && (
          <div className="max-h-[400px] overflow-y-auto py-2">
            {filteredApps.length > 0 ? (
              filteredApps.map((app, i) => (
                <div
                  key={app.id}
                  onClick={() => handleSelect(app.id)}
                  className={`px-4 py-2 flex items-center gap-3 cursor-pointer ${
                    i === selectedIndex ? 'bg-indigo-600/50 text-white' : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-lg">
                    {/* Simplified icon logic */}
                    <AppWindow size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{app.name}</div>
                    <div className="text-xs opacity-50">{app.type}</div>
                  </div>
                  {i === selectedIndex && <div className="text-xs text-indigo-200">↵ Open</div>}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-slate-500 text-sm">
                No results found
              </div>
            )}
          </div>
        )}
        
        {!query && (
           <div className="px-4 py-2 text-xs text-slate-500 flex justify-end items-center gap-1 border-t border-white/5">
              <span>Type to search</span>
           </div>
        )}
      </div>
    </div>
  )
}

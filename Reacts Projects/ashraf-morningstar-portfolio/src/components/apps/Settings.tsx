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

import { useState } from 'react'
import { Monitor, Keyboard, Palette, Bell, Volume2, Shield } from 'lucide-react'
import { useWindowStore } from '@/lib/store'

const WALLPAPERS = [
  'bg-gradient-to-br from-[#1b092c] via-[#090b1e] to-[#04060f]',
  'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900',
  'bg-[url("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&auto=format&fit=crop")]',
  'bg-[url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop")]',
]

const ACCENTS = [
  '#6366f1', // Indigo
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('display')
  const { settings, setWallpaper, setAccentColor } = useWindowStore()

  return (
    <div className="flex h-full bg-[#fcfeff] dark:bg-[#1c1c1e] text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <div className="w-56 bg-slate-50 dark:bg-[#282828]/50 border-r border-slate-200 dark:border-white/5 pt-4">
        <div className="px-4 mb-4">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-slate-200 dark:bg-[#3a3a3c] rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <nav className="space-y-0.5 px-2">
          {[
            { id: 'display', icon: Monitor, label: 'Wallpaper & Display' },
            { id: 'appearance', icon: Palette, label: 'Appearance' },
            { id: 'sound', icon: Volume2, label: 'Sound' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'keyboard', icon: Keyboard, label: 'Keyboard' },
            { id: 'privacy', icon: Shield, label: 'Privacy & Security' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-slate-200 dark:hover:bg-white/5'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto bg-[#f5f5f7] dark:bg-[#1c1c1e]">
        <h1 className="text-2xl font-bold mb-6 capitalize">{activeTab.replace('-', ' ')}</h1>

        {activeTab === 'display' && (
          <div className="space-y-8">
            <section className="bg-white dark:bg-[#2c2c2e] p-5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
              <h3 className="font-semibold mb-4">Desktop Wallpaper</h3>
              <div className="grid grid-cols-2 gap-4">
                {WALLPAPERS.map((wp, i) => (
                  <button
                    key={i}
                    onClick={() => setWallpaper(wp)}
                    className={`h-32 rounded-xl overflow-hidden border-4 transition-all ${
                      settings.wallpaper === wp ? 'border-blue-500 scale-105 shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                  >
                    <div className={`w-full h-full bg-cover bg-center ${wp.startsWith('bg-[url') ? wp : wp.replace('bg-', 'bg-')}`} />
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-8">
            <section className="bg-white dark:bg-[#2c2c2e] p-5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
              <h3 className="font-semibold mb-4">Accent Color</h3>
              <div className="flex gap-4">
                {ACCENTS.map(color => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform ${
                      settings.accentColor === color ? 'scale-125 ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-[#2c2c2e]' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'keyboard' && (
           <div className="space-y-8">
             <section className="bg-white dark:bg-[#2c2c2e] p-5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
               <h3 className="font-semibold mb-4">Shortcuts</h3>
               <div className="space-y-3">
                 {[
                   { label: 'Spotlight Search', keys: ['⌘', 'Space'] },
                   { label: 'Close Window', keys: ['⌘', 'W'] },
                   { label: 'Minimize Window', keys: ['⌘', 'M'] },
                   { label: 'Toggle Dark Mode', keys: ['⌘', 'D'] },
                 ].map(shortcut => (
                   <div key={shortcut.label} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 last:border-0">
                     <span className="text-sm">{shortcut.label}</span>
                     <div className="flex gap-1">
                       {shortcut.keys.map(k => (
                         <kbd key={k} className="px-2 py-1 bg-slate-100 dark:bg-white/10 rounded-md text-xs font-mono min-w-[24px] text-center">
                           {k}
                         </kbd>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </section>
           </div>
        )}
      </div>
    </div>
  )
}

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

import { useState, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useWindowStore } from '@/lib/store'

interface AppIconProps {
  id: string
  title: string
  icon: string | React.ComponentType<{ size?: number, className?: string }>
  onClick: () => void
}

function AppIcon({ id, title, icon, onClick }: AppIconProps) {
  return (
    <div 
      className="flex flex-col items-center gap-4 group cursor-pointer"
      onClick={onClick}
    >
      <div className="w-20 h-20 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg transition-transform group-active:scale-95 group-hover:bg-white/20">
        {typeof icon === 'string' ? (
          <span className="text-4xl select-none">{icon}</span>
        ) : (
          <div className="text-white">
             {/* Dynamic component rendering handling if passed as prop */}
          </div>
        )}
      </div>
      <span className="text-white text-sm font-medium drop-shadow-md text-center max-w-[100px] truncate">{title}</span>
    </div>
  )
}

export default function Launchpad({ apps, onClose }: { apps: any[], onClose: () => void }) {
  const [search, setSearch] = useState('')
  const openWindow = useWindowStore(state => state.openWindow)
  const [isClosing, setIsClosing] = useState(false)

  const handleAppClick = (id: string) => {
    setIsClosing(true)
    setTimeout(() => {
      openWindow(id)
      onClose()
    }, 200)
  }

  const filteredApps = apps.filter(app => app.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div 
      className={`fixed inset-0 z-[80] bg-slate-900/30 backdrop-blur-xl transition-opacity duration-300 flex flex-col items-center pt-20 ${isClosing ? 'opacity-0' : 'opacity-100 animate-in fade-in zoom-in-95'}`}
      onClick={() => { setIsClosing(true); setTimeout(onClose, 200); }}
    >
      <div className="w-full max-w-md mx-auto mb-16 relative" onClick={e => e.stopPropagation()}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
        <input 
          type="text" 
          placeholder="Search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/10 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 outline-none focus:bg-white/20 transition-all text-center focus:text-left focus:pl-10 focus:placeholder-transparent"
          autoFocus
        />
      </div>

      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-8 gap-y-12 px-8 max-w-6xl w-full" onClick={e => e.stopPropagation()}>
        {filteredApps.map((app) => (
          <div key={app.id} className="flex flex-col items-center gap-3 group cursor-pointer" onClick={() => handleAppClick(app.id)}>
             <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-[1.5rem] shadow-xl flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-200 border border-white/10">
               {typeof app.icon === 'string' ? app.icon : '📱'}
             </div>
             <span className="text-white font-medium text-sm tracking-wide text-shadow">{app.title}</span>
          </div>
        ))}
      </div>
      
      {/* Pagination dots (visual only for now) */}
      <div className="absolute bottom-8 flex gap-2">
         <div className="w-2 h-2 rounded-full bg-white opacity-100" />
         <div className="w-2 h-2 rounded-full bg-white opacity-30" />
      </div>
    </div>
  )
}

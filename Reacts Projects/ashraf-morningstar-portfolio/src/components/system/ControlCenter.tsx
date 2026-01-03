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
import { Wifi, Bluetooth, Zap, Moon, Sun, Volume2, Monitor } from 'lucide-react'
import { useWindowStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function ControlCenter({ onClose }: { onClose: () => void }) {
  const { 
    wifi, toggleWifi, 
    bluetooth, toggleBluetooth, 
    airdrop, toggleAirdrop,
    volume, setVolume,
    brightness, setBrightness,
    theme, toggleTheme
  } = useWindowStore()

  return (
    <div 
      className="fixed top-8 right-2 z-[60] w-80 bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-2xl border border-white/20 rounded-2xl p-3 shadow-2xl flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200 origin-top-right"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex gap-3 h-32">
        <div className="flex-1 bg-white/50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col justify-between shadow-sm">
           <div className="flex flex-col gap-3">
             <button onClick={toggleWifi} className="flex items-center gap-3 group">
               <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors", wifi ? "bg-blue-500" : "bg-slate-400 dark:bg-slate-600")}>
                 <Wifi size={16} />
               </div>
               <div className="text-left">
                 <div className="text-xs font-semibold dark:text-white">Wi-Fi</div>
                 <div className="text-[10px] text-slate-500 dark:text-slate-400">{wifi ? 'Home Ultra 5G' : 'Off'}</div>
               </div>
             </button>
             <button onClick={toggleBluetooth} className="flex items-center gap-3 group">
               <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors", bluetooth ? "bg-blue-500" : "bg-slate-400 dark:bg-slate-600")}>
                 <Bluetooth size={16} />
               </div>
               <div className="text-left">
                 <div className="text-xs font-semibold dark:text-white">Bluetooth</div>
                 <div className="text-[10px] text-slate-500 dark:text-slate-400">{bluetooth ? 'On' : 'Off'}</div>
               </div>
             </button>
             <button onClick={toggleAirdrop} className="flex items-center gap-3 group">
               <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors", airdrop ? "bg-blue-500" : "bg-slate-400 dark:bg-slate-600")}>
                 <Zap size={16} />
               </div>
               <div className="text-left">
                 <div className="text-xs font-semibold dark:text-white">AirDrop</div>
                 <div className="text-[10px] text-slate-500 dark:text-slate-400">{airdrop ? 'Contacts Only' : 'Off'}</div>
               </div>
             </button>
           </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex-1 bg-white/50 dark:bg-slate-800/50 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-white/60 dark:hover:bg-slate-800/70 transition-colors" onClick={toggleTheme}>
             <div className="w-8 h-8 rounded-full bg-slate-400 dark:bg-slate-600 text-white flex items-center justify-center">
               {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
             </div>
             <div className="text-left">
               <div className="text-xs font-semibold dark:text-white">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
               <div className="text-[10px] text-slate-500 dark:text-slate-400">{theme === 'dark' ? 'On' : 'Off'}</div>
             </div>
          </div>
          <div className="flex-1 bg-white/50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col justify-center items-center gap-1 cursor-pointer hover:bg-white/60 dark:hover:bg-slate-800/70 transition-colors">
              <div className="w-8 h-8 rounded-full bg-slate-400 dark:bg-slate-600 text-white flex items-center justify-center">
                <Monitor size={16} />
              </div>
              <div className="text-[10px] font-semibold dark:text-white">Screen Mirroring</div>
          </div>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Display</div>
          <div className="relative h-6 w-full bg-slate-300 dark:bg-slate-900/50 rounded-full overflow-hidden group">
             <div className="absolute top-0 left-0 h-full bg-white transition-all group-hover:bg-white" style={{ width: `${brightness}%` }} />
             <input 
               type="range" 
               min="0" max="100" 
               value={brightness} 
               onChange={(e) => setBrightness(parseInt(e.target.value))}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
             />
             <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
               <Sun size={12} />
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sound</div>
          <div className="relative h-6 w-full bg-slate-300 dark:bg-slate-900/50 rounded-full overflow-hidden group">
             <div className="absolute top-0 left-0 h-full bg-white transition-all group-hover:bg-white" style={{ width: `${volume}%` }} />
             <input 
               type="range" 
               min="0" max="100" 
               value={volume} 
               onChange={(e) => setVolume(parseInt(e.target.value))}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
             />
             <div className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
               <Volume2 size={12} />
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

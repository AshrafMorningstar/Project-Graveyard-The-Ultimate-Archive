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

'use client'

import { useWindowStore } from '@/lib/store'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'

interface App {
  id: string
  title: string
  icon: string
  Component: React.FC
}

interface DockProps {
  apps: App[]
}

export default function Dock({ apps }: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null)
  const openWindow = useWindowStore((state) => state.openWindow)
  const windows = useWindowStore((state) => state.windows)

  const handleAppClick = (id: string) => {
    openWindow(id)
  }

  return (
    <div
      ref={dockRef}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-slate-900/70 backdrop-blur-2xl border border-indigo-500/20 rounded-3xl p-3 shadow-2xl z-50"
    >
      {apps.map((app) => (
        <button
          key={app.id}
          onClick={() => handleAppClick(app.id)}
          className={`
            w-16 h-16 flex items-center justify-center text-2xl rounded-2xl
            transition-all duration-300 ease-out hover:scale-125 hover:-translate-y-3
            ${
              windows[app.id]?.open
                ? 'bg-gradient-to-br from-pink-500 to-red-500 shadow-lg shadow-pink-500/50'
                : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60'
            }
          `}
          title={app.title}
        >
          {app.icon}
        </button>
        {windows[app.id]?.open && (
           <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
        )}
        </div>
      ))}
    </div>
  )
}

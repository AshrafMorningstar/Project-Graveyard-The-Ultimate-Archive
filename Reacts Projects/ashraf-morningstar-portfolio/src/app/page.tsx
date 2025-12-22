/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client'

import { useEffect, useState } from 'react'
import Desktop from '@/components/ui/Desktop'
import Dock from '@/components/ui/Dock'
import Window from '@/components/ui/Window'
import TopBar from '@/components/ui/TopBar'
import { useWindowStore } from '@/lib/store'
import About from '@/components/apps/About'
import Projects from '@/components/apps/Projects'
import Skills from '@/components/apps/Skills'
import Contact from '@/components/apps/Contact'

const APPS = [
  { id: 'about', title: 'About.txt', icon: '👤', Component: About },
  { id: 'projects', title: 'Projects', icon: '📁', Component: Projects },
  { id: 'skills', title: 'Skills.txt', icon: '⚙️', Component: Skills },
  { id: 'contact', title: 'Contact.txt', icon: '✉️', Component: Contact },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const windows = useWindowStore((state) => state.windows)
  const openWindow = useWindowStore((state) => state.openWindow)

  useEffect(() => {
    setMounted(true)
    // Open About window on load
    setTimeout(() => openWindow('about'), 500)
  }, [openWindow])

  if (!mounted) return null

  return (
    <main className="w-screen h-screen bg-[#0a0e27] overflow-hidden">
      <Desktop />
      <TopBar />
      
      <div className="relative w-full h-full">
        {/* Windows */}
        {APPS.map((app) => (
          windows[app.id]?.open && (
            <Window
              key={app.id}
              id={app.id}
              title={app.title}
              icon={app.icon}
            >
              <app.Component />
            </Window>
          )
        ))}
      </div>

      <Dock apps={APPS} />
    </main>
  )
}

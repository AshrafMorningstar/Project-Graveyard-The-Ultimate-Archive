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

import { useEffect, useState } from 'react'
import Desktop from '@/components/ui/Desktop'
import Dock from '@/components/ui/Dock'
import Window from '@/components/ui/Window'
import TopBar from '@/components/ui/TopBar'
import { useWindowStore } from '@/lib/store'

// Apps
import About from '@/components/apps/About'
import Projects from '@/components/apps/Projects'
import Skills from '@/components/apps/Skills'
import Contact from '@/components/apps/Contact'
import Terminal from '@/components/apps/Terminal'
import Music from '@/components/apps/Music'
import NeuroAI from '@/components/apps/NeuroAI'
import MatterShaper from '@/components/apps/MatterShaper'
import Settings from '@/components/apps/Settings'
import VSCode from '@/components/apps/VSCode'
import Safari from '@/components/apps/Safari'
import Notes from '@/components/apps/Notes'
import Calendar from '@/components/apps/Calendar'
import Calculator from '@/components/apps/Calculator'
import Weather from '@/components/apps/Weather'
import Snake from '@/components/apps/Snake'
import Messages from '@/components/apps/Messages'
import Photos from '@/components/apps/Photos'

// System
import BootSequence from '@/components/system/BootSequence'
import LockScreen from '@/components/system/LockScreen'
import Spotlight from '@/components/system/Spotlight'
import ContextMenu from '@/components/system/ContextMenu'
import ControlCenter from '@/components/system/ControlCenter'
import Launchpad from '@/components/system/Launchpad'

const APPS = [
  { id: 'about', title: 'Cosmic Profile', icon: '🧑‍🚀', Component: About },
  { id: 'projects', title: 'Nebula Projects', icon: '🌌', Component: Projects },
  { id: 'neuroAI', title: 'Neuro AI', icon: '🧠', Component: NeuroAI },
  { id: 'matterShaper', title: 'Matter Shaper', icon: '🎨', Component: MatterShaper },
  { id: 'launchpad', title: 'Launchpad', icon: '🚀', Component: () => null }, // Special handling
  { id: 'vscode', title: 'VS Code', icon: '📝', Component: VSCode },
  { id: 'browser', title: 'Safari', icon: '🧭', Component: Safari },
  { id: 'messages', title: 'Messages', icon: '💬', Component: Messages },
  { id: 'photos', title: 'Photos', icon: '📸', Component: Photos },
  { id: 'notes', title: 'Notes', icon: '✏️', Component: Notes },
  { id: 'calendar', title: 'Calendar', icon: '📅', Component: Calendar },
  { id: 'calculator', title: 'Calculator', icon: '🔢', Component: Calculator },
  { id: 'weather', title: 'Weather', icon: '☀️', Component: Weather }, 
  { id: 'snake', title: 'Snake Game', icon: '🐍', Component: Snake },
  { id: 'terminal', title: 'Chronos Terminal', icon: '💻', Component: Terminal },
  { id: 'settings', title: 'System Preferences', icon: '⚙️', Component: Settings },
  { id: 'music', title: 'Sonic Wave', icon: '🎵', Component: Music },
  { id: 'skills', title: 'Arsenal', icon: '🛠️', Component: Skills },
  { id: 'contact', title: 'Subspace Comms', icon: '📡', Component: Contact },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const windows = useWindowStore((state) => state.windows)
  const openWindow = useWindowStore((state) => state.openWindow)
  const systemStatus = useWindowStore((state) => state.systemStatus)
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null)
  
  // System Overlay States
  const [showControlCenter, setShowControlCenter] = useState(false)
  const [showLaunchpad, setShowLaunchpad] = useState(false)

  // Subscribe to window store to catch special app launches (like Launchpad)
  useEffect(() => {
    const unsubscribe = useWindowStore.subscribe((state) => {
      // Check if launchpad "window" is requested to open
      if (state.windows['launchpad']?.open) {
         setShowLaunchpad(true)
         useWindowStore.getState().closeWindow('launchpad') // Reset state immediately
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    setMounted(true)
    // Add global click listener to close control center
    const handleClick = () => setShowControlCenter(false)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  if (!mounted) return null

  return (
    <main 
      className="w-screen h-screen bg-[#0a0e27] overflow-hidden select-none"
      onContextMenu={handleContextMenu}
    >
      {systemStatus === 'booting' && <BootSequence />}
      {systemStatus === 'locked' && <LockScreen />}

      <div className={`transition-opacity duration-1000 ${systemStatus === 'active' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Desktop />
        
        {/* Pass control center toggle to TopBar if needed, or overlay it */}
        <div onClick={e => e.stopPropagation()}>
           <TopBar onControlCenterClick={() => setShowControlCenter(!showControlCenter)} />
        </div>
        
        {showControlCenter && <ControlCenter onClose={() => setShowControlCenter(false)} />}
        {showLaunchpad && <Launchpad apps={APPS} onClose={() => setShowLaunchpad(false)} />}

        <div className="relative w-full h-full">
          {/* Windows */}
          {APPS.map((app) => (
             windows[app.id]?.open && app.id !== 'launchpad' && (
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
        <Spotlight />
        {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} />}
      </div>
    </main>
  )
}

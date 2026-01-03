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
import { Wifi, Battery, Search, Command, Moon, Sun, Bell, X, Sliders } from 'lucide-react'
import { useWindowStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'

export default function TopBar({ onControlCenterClick }: { onControlCenterClick?: () => void }) {
  const [time, setTime] = useState<string>('')
  const { theme, toggleTheme, notifications, clearNotifications, addNotification } = useWindowStore()
  const [mounted, setMounted] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => setTime(formatDate(new Date()))
    updateTime()
    const interval = setInterval(updateTime, 1000 * 60)
    
    // Simulate a system notification
    setTimeout(() => {
      addNotification({
        title: 'System Update',
        message: 'Quantum Core v2.0 is ready to install.',
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [theme])

  if (!mounted) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-slate-950/40 dark:bg-slate-950/40 bg-white/40 backdrop-blur-md border-b border-white/10 dark:border-white/10 flex items-center justify-between px-4 text-xs text-slate-800 dark:text-slate-200 z-50 transition-colors">
      <div className="flex items-center gap-4">
        <span className="font-bold text-sm cursor-pointer hover:opacity-80 transition-opacity"></span>
        <span className="font-semibold hidden sm:inline">Finder</span>
        <span className="hidden sm:inline">File</span>
        <span className="hidden sm:inline">Edit</span>
        <span className="hidden sm:inline">View</span>
        <span className="hidden sm:inline">Go</span>
        <span className="hidden sm:inline">Window</span>
        <span className="hidden sm:inline">Help</span>
      </div>

      <div className="flex items-center gap-3 relative">
         <div className="flex items-center gap-3 mr-2">
            <button 
              onClick={toggleTheme}
              className="p-1 hover:bg-white/10 rounded-md transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <Wifi size={14} />
            <Search size={14} />
            
            {/* Control Center Trigger */}
            <button onClick={onControlCenterClick} className="p-1 hover:bg-white/10 rounded-md transition-colors">
              <Sliders size={14} />
            </button>

            {/* Notification Center Trigger */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1 hover:bg-white/10 rounded-md transition-colors relative"
              >
                <Bell size={14} />
                {notifications.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>

              {/* Notification Center Dropdown */}
              {showNotifications && (
                <div className="absolute top-8 right-0 w-80 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 origin-top-right text-white">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    {notifications.length > 0 && (
                      <button onClick={clearNotifications} className="text-[10px] text-slate-400 hover:text-white transition-colors">
                        Clear All
                      </button>
                    )}
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-xs">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors relative group">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-indigo-300">{n.title}</span>
                            <span className="text-[10px] text-slate-500">{new Date(n.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                          <p className="text-slate-300 leading-tight">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs">100%</span>
              <Battery size={14} />
            </div>
         </div>
         <span className="font-medium">{time}</span>
      </div>
    </div>
  )
}

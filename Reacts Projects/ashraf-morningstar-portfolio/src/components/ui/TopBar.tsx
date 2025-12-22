/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client'

import { useState, useEffect } from 'react'

export default function TopBar() {
  const [time, setTime] = useState<string>('00:00')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-slate-950/40 backdrop-blur-md border-b border-indigo-500/10 flex items-center justify-between px-4 text-xs text-slate-400 z-50">
      <span className="font-medium">🍎 macOS Portfolio</span>
      <span className="font-semibold text-indigo-400">{time}</span>
    </div>
  )
}

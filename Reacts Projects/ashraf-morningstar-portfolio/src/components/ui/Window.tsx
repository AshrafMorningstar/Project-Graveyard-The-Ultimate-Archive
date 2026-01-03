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

import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import { useWindowStore } from '@/lib/store'
import { useDraggable } from '@/hooks/useDraggable'
import { useResizable } from '@/hooks/useResizable'

interface WindowProps {
  id: string
  title: string
  icon: string
  children: ReactNode
}

export default function Window({ id, title, icon, children }: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  
  const window = useWindowStore((state) => state.windows[id])
  const closeWindow = useWindowStore((state) => state.closeWindow)
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow)
  const maximizeWindow = useWindowStore((state) => state.maximizeWindow)
  const focusWindow = useWindowStore((state) => state.focusWindow)
  
  const { handleMouseDown: handleDragStart } = useDraggable(id)
  const { handleMouseDown: handleResizeStart } = useResizable(id)

  useEffect(() => {
    if (windowRef.current && window) {
      gsap.set(windowRef.current, {
        x: window.position.x,
        y: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      })
    }
  }, [window])

  if (!window || !window.open) return null

  return (
    <div
      ref={windowRef}
      className="fixed bg-[#15192c]/90 backdrop-blur-xl border border-indigo-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden group"
      style={{
        minWidth: '500px',
        minHeight: '400px',
      }}
      onClick={() => focusWindow(id)}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        onMouseDown={handleDragStart}
        className="h-12 bg-gradient-to-b from-indigo-500/10 to-indigo-500/0 border-b border-indigo-500/20 flex items-center px-4 gap-3 cursor-grab active:cursor-grabbing select-none"
      >
        {/* Window Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => closeWindow(id)}
            className="w-3 h-3 bg-red-500 rounded-full hover:scale-125 transition-transform"
            title="Close"
          />
          <button
            onClick={() => minimizeWindow(id)}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:scale-125 transition-transform"
            title="Minimize"
          />
          <button
            onClick={() => maximizeWindow(id)}
            className="w-3 h-3 bg-green-500 rounded-full hover:scale-125 transition-transform"
            title="Maximize"
          />
        </div>

        {/* Title */}
        <div className="flex-1 text-center text-sm font-semibold text-slate-300">
          {icon} {title}
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-y-auto p-6 text-slate-300">
        {children}
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleResizeStart}
        className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize bg-gradient-to-tl from-indigo-500/30 to-transparent rounded-tl-lg"
      />
    </div>
  )
}

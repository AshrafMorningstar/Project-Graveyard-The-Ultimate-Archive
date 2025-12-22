/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useEffect } from 'react'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  useEffect(() => {
    const handleClick = () => onClose()
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [onClose])

  const menuItems = [
    { label: 'New Folder', action: () => {} },
    { label: 'Get Info', action: () => {} },
    { type: 'separator' },
    { label: 'Change Desktop Background...', action: () => {} },
    { type: 'separator' },
    { label: 'Use Stacks', action: () => {} },
    { label: 'Sort By', action: () => {}, hasSubmenu: true },
    { label: 'Clean Up', action: () => {} },
    { label: 'Clean Up By', action: () => {}, hasSubmenu: true },
    { label: 'Show View Options', action: () => {} },
  ]

  return (
    <div 
      className="fixed z-[55] w-64 bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl py-1 transform scale-100 origin-top-left animate-in fade-in zoom-in-95 duration-100"
      style={{ left: x, top: y }}
      onClick={e => e.stopPropagation()}
    >
      {menuItems.map((item, i) => (
        item.type === 'separator' ? (
          <div key={i} className="h-[1px] bg-white/10 my-1 mx-3" />
        ) : (
          <button
            key={i}
            className="w-full px-3 py-1 text-sm text-left text-white hover:bg-indigo-600 rounded flex justify-between items-center group"
            onClick={item.action}
          >
            <span>{item.label}</span>
            {item.hasSubmenu && <span className="text-xs opacity-50">▶</span>}
          </button>
        )
      ))}
    </div>
  )
}

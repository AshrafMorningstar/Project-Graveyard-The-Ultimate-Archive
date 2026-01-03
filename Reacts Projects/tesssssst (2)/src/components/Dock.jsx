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

import { useStore } from '../store/useStore'

const apps = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'music', label: 'Music' },
]

export default function Dock() {
  const openWindow = useStore(s => s.openWindow)

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 px-6 py-3 bg-black/40 backdrop-blur rounded-2xl">
      {apps.map(app => (
        <button
          key={app.id}
          onClick={() => openWindow(app.id)}
          className="w-12 h-12 bg-neutral-700 rounded-xl hover:scale-125 transition-transform"
          aria-label={app.label}
        >
          {app.label[0]}
        </button>
      ))}
    </div>
  )
}

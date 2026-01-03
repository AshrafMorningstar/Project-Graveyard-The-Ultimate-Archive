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
import { motion, AnimatePresence } from 'framer-motion'
import { Apple } from 'lucide-react'
import { useWindowStore } from '@/lib/store'

export default function BootSequence() {
  const [progress, setProgress] = useState(0)
  const setSystemStatus = useWindowStore(state => state.setSystemStatus)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setSystemStatus('locked'), 500)
          return 100
        }
        return prev + Math.random() * 5
      })
    }, 100)
    return () => clearInterval(timer)
  }, [setSystemStatus])

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white">
      <div className="mb-16">
        <svg viewBox="0 0 24 24" fill="white" className="w-24 h-24">
          <path d="M17.338 12.06c.025 2.87 2.508 3.844 2.535 3.856-.02.068-.396 1.353-1.306 2.684-1.127 1.614-2.298 1.636-2.923 1.658-.888.022-2.333-.526-3.078-.526-.745 0-1.921.548-3.144.526-.647-.022-2.731-.22-4.832-3.23-2.99-4.28-2.52-10.74 2.227-12.726 1.168-.505 2.75-.417 3.66.526.603.623 1.608.623 2.156.526 2.05-.373 3.665 1.185 3.665 1.185.11.066-2.133 1.25-2.108 3.633.02 1.95 2.44 2.83 2.44 2.83M12.983 2.375c1.03-.79 1.76-2.06 1.545-3.32-1.46.066-2.73 1.515-3.35 2.196-.646.68-1.16 1.844-.925 3.052 1.63.13 3.28-1.163 2.73-1.928" />
        </svg>
      </div>
      <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

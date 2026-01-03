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

import { useState, useEffect } from 'react'
import { ArrowRight, Lock, User } from 'lucide-react'
import { useWindowStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'

export default function LockScreen() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const setSystemStatus = useWindowStore(state => state.setSystemStatus)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault()
    // Simulate login - accept any password for demo or specific one
    if (password.length > 0) {
      setSystemStatus('active')
    } else {
      setError(true)
      setTimeout(() => setError(false), 500)
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[90] bg-cover bg-center flex flex-col items-center justify-between py-20 text-white transition-all duration-1000"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&auto=format&fit=crop")' }}
    >
      <div className="text-center space-y-2 pt-20">
        <div className="text-6xl font-thin tracking-tight drop-shadow-lg">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div className="text-xl font-medium drop-shadow-md">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col items-center gap-6 w-full max-w-xs backdrop-blur-xl bg-black/20 p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white/20 shadow-xl">
             {/* Replace with actual avatar */}
             <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl">
               AM
             </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-shadow">Ashraf Morningstar</h2>
          <p className="text-sm text-white/60">Enter password to unlock</p>
        </div>

        <div className="relative w-full group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className={`w-full bg-white/20 border border-white/10 rounded-full px-4 py-2 pr-10 text-sm placeholder-white/50 focus:outline-none focus:bg-white/30 transition-all ${error ? 'animate-shake border-red-500' : ''}`}
            autoFocus
          />
          <button 
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {password.length > 0 ? <ArrowRight size={14} /> : <div className="w-3.5 h-3.5" />}
          </button>
        </div>
        
        <div className="text-xs text-white/40 mt-4 cursor-pointer hover:text-white transition-colors">
          Switch User
        </div>
      </form>

      <div className="text-xs text-white/50">
        Press Enter to unlock
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  )
}

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

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useWindowStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function Desktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wallpaper = useWindowStore(state => state.settings.wallpaper)

  useEffect(() => {
    // Create floating particles
    if (containerRef.current) {
      const particles = 50
      for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        
        containerRef.current.appendChild(particle)

        gsap.to(particle, {
          y: -window.innerHeight,
          opacity: 0,
          duration: 20 + Math.random() * 20,
          repeat: -1,
          delay: Math.random() * 10,
          ease: 'none'
        })
      }
    }
  }, [])

  const isGradient = wallpaper.startsWith('bg-gradient')
  const bgStyle = wallpaper.includes('url') ? { backgroundImage: wallpaper.replace('bg-[url("', 'url("').replace('")]', ')') } : {}

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 overflow-hidden -z-10 bg-cover bg-center transition-all duration-700 ease-in-out",
        !wallpaper.includes('url') && wallpaper !== 'default' ? wallpaper : "bg-[#0f111a]"
      )}
      style={bgStyle}
    >
      {/* Default / Fallback Background */}
      {(wallpaper === 'default' || !wallpaper) && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--macos-bg)] via-[var(--macos-surface)] to-[var(--macos-bg)] opacity-100" />
      )}

      {/* Mesh Overlay for texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
    </div>
  )
}

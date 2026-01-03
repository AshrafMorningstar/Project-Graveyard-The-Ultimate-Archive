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

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Desktop() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create floating particles
    if (containerRef.current) {
      const particles = 50
      for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-indigo-400/50 rounded-full'
        particle.style.left = Math.random() * 100 + '%'
        particle.style.top = Math.random() * 100 + '%'
        
        containerRef.current.appendChild(particle)

        gsap.to(particle, {
          y: -window.innerHeight,
          opacity: 0,
          duration: 15 + Math.random() * 10,
          repeat: -1,
          delay: Math.random() * 5,
        })
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/30 to-purple-900/20" />
      
      {/* Mesh Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-pink-500/10 animate-pulse" />
      </div>

      {/* Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
    </div>
  )
}

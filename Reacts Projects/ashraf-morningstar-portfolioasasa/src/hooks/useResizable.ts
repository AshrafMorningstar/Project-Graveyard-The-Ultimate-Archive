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

import { useCallback, useEffect, useRef, useState } from 'react'
import { useWindowStore } from '@/lib/store'

export function useResizable(id: string) {
  const [isResizing, setIsResizing] = useState(false)
  const windowState = useWindowStore((state) => state.windows[id])
  const setSize = useWindowStore((state) => state.setSize)
  const focusWindow = useWindowStore((state) => state.focusWindow)
  
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const initialSizeRef = useRef<{ width: number; height: number } | null>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    
    setIsResizing(true)
    focusWindow(id)
    
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    initialSizeRef.current = { width: windowState.size.width, height: windowState.size.height }
  }, [id, windowState?.size, focusWindow])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !dragStartRef.current || !initialSizeRef.current) return

      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y

      const newWidth = Math.max(300, initialSizeRef.current.width + dx)
      const newHeight = Math.max(200, initialSizeRef.current.height + dy)

      setSize(id, newWidth, newHeight)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      dragStartRef.current = null
      initialSizeRef.current = null
    }

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, id, setSize])

  return { handleMouseDown, isResizing }
}

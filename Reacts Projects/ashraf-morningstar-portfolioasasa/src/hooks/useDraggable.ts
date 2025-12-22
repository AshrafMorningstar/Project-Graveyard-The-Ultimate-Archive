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

export function useDraggable(id: string) {
  const [isDragging, setIsDragging] = useState(false)
  const windowState = useWindowStore((state) => state.windows[id])
  const setPosition = useWindowStore((state) => state.setPosition)
  const focusWindow = useWindowStore((state) => state.focusWindow)
  
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const initialPosRef = useRef<{ x: number; y: number } | null>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only left click
    if (e.button !== 0) return
    e.preventDefault()
    
    setIsDragging(true)
    focusWindow(id)
    
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    initialPosRef.current = { x: windowState.position.x, y: windowState.position.y }
  }, [id, windowState?.position, focusWindow])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragStartRef.current || !initialPosRef.current) return

      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y

      const newX = initialPosRef.current.x + dx
      const newY = initialPosRef.current.y + dy

      setPosition(id, newX, newY)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      dragStartRef.current = null
      initialPosRef.current = null
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, id, setPosition])

  return { handleMouseDown, isDragging }
}

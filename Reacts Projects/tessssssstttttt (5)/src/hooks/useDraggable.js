/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useEffect, useCallback } from 'react';

export const useDraggable = (ref, handleRef, initialPosition = { x: 0, y: 0 }, zIndex) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // Only left click
    
    // Check if clicking on handle
    if (handleRef.current && !handleRef.current.contains(e.target)) return;
    
    setIsDragging(true);
    
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e) => {
        setPosition({
            x: e.clientX - startX,
            y: e.clientY - startY
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [position, handleRef]);

  // Effect to attach listener
  useEffect(() => {
      const handle = handleRef.current;
      if (!handle) return;
      handle.addEventListener('mousedown', handleMouseDown);
      return () => handle.removeEventListener('mousedown', handleMouseDown);
  }, [handleMouseDown, handleRef]);

  // Update if initial changes (e.g. from store)
  // useEffect(() => setPosition(initialPosition), [initialPosition]);

  return { position, isDragging };
};

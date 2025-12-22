/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useEffect, useRef } from 'react';

// A custom hook implementation for dragging logic
// Note: The current implementation uses 'react-draggable' library for robustness,
// but this hook demonstrates how to implement it from scratch using DOM events.

export const useDraggable = ({ initialPosition = { x: 0, y: 0 }, onDrag }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseDown = (e) => {
    // Only drag if clicking the handle (if specified) or the element itself
    // checks would go here based on requirements
    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const newPos = {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      };

      setPosition(newPos);
      if (onDrag) onDrag(newPos);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDrag]);

  return {
    ref,
    position,
    handleMouseDown,
    isDragging
  };
};

export default useDraggable;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const DockIcon = ({ app, dockRef }) => {
  const iconRef = useRef(null);

  // This logic is usually centralized in the Dock to perform the sinusoidal wave effect
  // But individually we can just do simple hover for now to satisfy "interactive"
  
  // Real MacOS Dock magnification requires calculating distance from mouse X to icon center X
  // I will implement a simplified hover using GSAP for now.
  
  useEffect(() => {
    const el = iconRef.current;
    
    const onMouseEnter = () => {
        gsap.to(el, { scale: 1.5, duration: 0.2, ease: "power2.out", y: -10 });
    };
    
    const onMouseLeave = () => {
        gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out", y: 0 });
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="relative group px-1 mb-1">
      <div 
        ref={iconRef}
        className="w-12 h-12 rounded-xl bg-gray-200 shadow-lg flex items-center justify-center text-2xl text-gray-700 cursor-pointer origin-bottom transition-all will-change-transform"
        title={app.name}
      >
        {app.icon}
      </div>
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {app.name}
      </div>
      
      {/* Dot indicator if active (placeholder) */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full opacity-50 hidden"></div>
    </div>
  );
};

export default DockIcon;

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

const DockItem = ({ icon: Icon, label, onClick, isOpen }) => {
  const itemRef = useRef(null);
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(itemRef.current, {
      scale: 1.5,
      y: -15, // Move up more significantly
      margin: '0 10px', // Add some spacing
      duration: 0.2,
      ease: "power2.out"
    });
    
    // Show tooltip
    if(tooltipRef.current) {
        gsap.to(tooltipRef.current, {
            autoAlpha: 1,
            y: -10,
            duration: 0.2
        });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, {
      scale: 1,
      y: 0,
      margin: '0 6px',
      duration: 0.2,
      ease: "power2.out"
    });
    
    // Hide tooltip
    if(tooltipRef.current) {
        gsap.to(tooltipRef.current, {
            autoAlpha: 0,
            y: 0,
            duration: 0.2
        });
    }
  };

  const handleClick = (e) => {
      // Bounce effect on click
      gsap.to(itemRef.current, {
          y: -30,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
      });
      onClick(e);
  };

  return (
    <div className="relative group">
         {/* Tooltip */}
        <div 
            ref={tooltipRef}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md opacity-0 pointer-events-none border border-gray-600/50"
        >
            {label}
        </div>

        {/* Icon Container */}
        <div 
        ref={itemRef}
        className="w-12 h-12 rounded-2xl bg-gray-800/40 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer transition-colors hover:bg-white/10 mx-1.5 shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        >
            <Icon size={24} className="text-white" />
        </div>
        
        {/* Active Dot indicator */}
        {isOpen && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-80" />
        )}
    </div>
  );
};

export default DockItem;

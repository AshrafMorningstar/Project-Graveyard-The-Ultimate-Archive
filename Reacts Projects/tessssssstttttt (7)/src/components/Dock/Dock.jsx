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

// File: Dock.jsx
// Developed by Ashraf
// GitHub: https://github.com/AshrafMorningstar
// Created on: 2025-12-14

import React, { useRef, useEffect } from 'react';
import { useWindowStore } from '../../stores/useWindowStore';
import { Folder, Globe, FileText, Github, Layers, Mail, Music, Terminal as TerminalIcon } from 'lucide-react';
import gsap from 'gsap';

const dockItems = [
  { id: 'finder', label: 'Finder', icon: Folder, color: 'text-blue-500' },
  { id: 'safari', label: 'Safari', icon: Globe, color: 'text-blue-400' },
  { id: 'resume', label: 'Resume', icon: FileText, color: 'text-gray-500' },
  { id: 'github', label: 'GitHub', icon: Github, color: 'text-black' },
  { id: 'projects', label: 'Projects', icon: Layers, color: 'text-purple-500' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'text-green-500' },
  { id: 'music', label: 'Music', icon: Music, color: 'text-pink-500' },
  { id: 'terminal', label: 'Terminal', icon: TerminalIcon, color: 'text-gray-800' },
];

const Dock = () => {
  const { openWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  useEffect(() => {
    // Basic GSAP entry animation
    gsap.fromTo(dockRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const handleAppClick = (id) => {
    // Use stored config or defaults? 
    // For now we rely on store defaults or pass them here.
    // We should register components in Desktop, but here we just trigger open.
    openWindow(id, { title: dockItems.find(d => d.id === id).label });
    
    // Bounce animation on click
    const el = document.getElementById(`dock-icon-${id}`);
    if (el) {
       gsap.to(el, { y: -20, duration: 0.2, yoyo: true, repeat: 1 });
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        ref={dockRef}
        className="flex items-end space-x-2 px-4 py-2 bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 hover:px-6"
      >
        {dockItems.map((item) => (
          <button
            key={item.id}
            id={`dock-icon-${item.id}`}
            onClick={() => handleAppClick(item.id)}
            className="group relative flex flex-col items-center gap-1 transition-all duration-200 hover:-translate-y-2"
          >
            <div className={`w-12 h-12 rounded-xl bg-white/80 shadow-lg flex items-center justify-center transition-all duration-200 group-hover:scale-125 group-hover:mx-2 ${item.color}`}>
              <item.icon size={28} strokeWidth={1.5} />
            </div>
            {/* Tooltip */}
            <span className="absolute -top-10 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
            {/* Active Indicator */}
            {windows[item.id] && (
              <div className="w-1 h-1 rounded-full bg-black/50 mx-auto mt-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dock;

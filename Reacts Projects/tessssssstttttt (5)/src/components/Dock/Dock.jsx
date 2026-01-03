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

import React, { useRef } from 'react';
import gsap from 'gsap';
import DockIcon from './DockIcon';
import { useWindowStore } from '../../store/windowStore';
import { FaFinder, FaSafari, FaTerminal } from 'react-icons/fa'; // Placeholders
import { IoIosContact, IoMdImages } from 'react-icons/io';
import { RiSpotifyFill } from 'react-icons/ri';
import { AiFillGithub } from 'react-icons/ai';

const Dock = () => {
    const dockRef = useRef(null);
    // const { openWindow } = useWindowStore(); // To be connected

    const apps = [
        { id: 'finder', name: 'Finder', icon: <FaFinder /> },
        { id: 'safari', name: 'Safari', icon: <FaSafari /> },
        { id: 'photos', name: 'Photos', icon: <IoMdImages /> },
        { id: 'contacts', name: 'Contacts', icon: <IoIosContact /> },
        { id: 'terminal', name: 'Terminal', icon: <FaTerminal /> },
        { id: 'spotify', name: 'Music', icon: <RiSpotifyFill /> },
        { id: 'github', name: 'GitHub', icon: <AiFillGithub />, external: 'https://github.com/AshrafMorningstar' },
    ];

    // Mouse Move Logic for Magnification (Basic implementation)
    // For robust GSAP magnification, we'd calculate distance from cursor to each icon
    // and animate scale. For this MVP, we might rely on CSS hover or basic GSAP.
    // Let's try a ref-based approach in DockIcon or pass mouseX here.

  return (
    <div className="absolute bottom-2 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <div 
        ref={dockRef}
        className="flex items-end bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl px-2 pb-2 h-16 pointer-events-auto"
        style={{ boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}
      >
        {apps.map((app) => (
            <DockIcon key={app.id} app={app} dockRef={dockRef} />
        ))}
      </div>
    </div>
  );
};

export default Dock;

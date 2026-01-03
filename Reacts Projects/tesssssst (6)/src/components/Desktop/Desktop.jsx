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
import DesktopIcon from './DesktopIcon';
import { useWindowStore } from '../../store/windowStore';

const Desktop = () => {
  const { openWindow } = useWindowStore();
  const desktopRef = useRef(null);

  // Example Desktop Items
  const items = [
      { id: 'hd', label: 'Macintosh HD', icon: 'hard-drive', type: 'drive' },
      { id: 'portfolio', label: 'Ashraf Portfolio', icon: 'folder', type: 'folder' },
      { id: 'resume', label: 'Resume.pdf', icon: 'pdf', type: 'file' },
  ];

  const handleIconClick = (id) => {
     // Logic to open window based on ID
     console.log('Clicked desktop icon:', id);
     // openWindow(id, ...);
  };

  return (
    <div className="absolute inset-0 z-0 p-2" ref={desktopRef}>
      <div className="flex flex-col flex-wrap h-full content-start gap-4">
        {items.map((item) => (
            <DesktopIcon 
                key={item.id} 
                label={item.label} 
                icon={item.icon} 
                onDoubleClick={() => handleIconClick(item.id)}
            />
        ))}
      </div>
      
      {/* Context Menu Logic could go here */}
    </div>
  );
};

export default Desktop;

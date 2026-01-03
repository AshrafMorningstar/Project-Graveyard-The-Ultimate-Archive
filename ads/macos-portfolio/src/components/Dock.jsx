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

import React from 'react';
import { Folder, Terminal, Globe, Github, Mail, Linkedin } from 'lucide-react';

const DockItem = ({ icon: Icon, label, color, onClick }) => (
  <div 
    onClick={onClick}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      position: 'relative'
    }}
    className="dock-item"
  >
    <div style={{
      width: '50px',
      height: '50px',
      background: color,
      borderRadius: '15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
    }}>
      <Icon size={28} color="white" />
    </div>
    {/* Tooltip could go here */}
  </div>
);

const Dock = ({ onAppClick }) => {
  const apps = [
    { id: 'finder', label: 'Finder', icon: Folder, color: 'linear-gradient(180deg, #2980b9, #6dd5fa)' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: '#333' },
    { id: 'browser', label: 'Browser', icon: Globe, color: 'linear-gradient(180deg, #2980b9, #ffffff)' },
    { id: 'github', label: 'GitHub', icon: Github, color: '#24292e', link: 'https://github.com/AshrafMorningstar' },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'linear-gradient(180deg, #ff9966, #ff5e62)' },
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '15px',
      padding: '12px 20px',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(15px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      zIndex: 10000
    }}>
      {apps.map(app => (
        <DockItem 
          key={app.id} 
          {...app} 
          onClick={() => app.link ? window.open(app.link, '_blank') : onAppClick(app.id)} 
        />
      ))}
    </div>
  );
};

export default Dock;

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

// File: Desktop.jsx
// Developed by Ashraf
// GitHub: https://github.com/AshrafMorningstar
// Created on: 2025-12-14

import React from 'react';
import { useWindowStore } from '../../stores/useWindowStore';
import MenuBar from '../MenuBar/MenuBar';
import Dock from '../Dock/Dock';
import withWindow from '../HOC/withWindow';

// Import App Contents
import FinderContent from '../Apps/Finder';
import PlaceholderContent from '../Apps/Placeholder';

// Wrap them
const FinderApp = withWindow(FinderContent, 'finder', 'Finder');
const SafariApp = withWindow(PlaceholderContent, 'safari', 'Safari');
const ResumeApp = withWindow(PlaceholderContent, 'resume', 'Resume');
const GithubApp = withWindow(PlaceholderContent, 'github', 'GitHub');
const ProjectsApp = withWindow(PlaceholderContent, 'projects', 'Projects');
const ContactApp = withWindow(PlaceholderContent, 'contact', 'Contact');
const MusicApp = withWindow(PlaceholderContent, 'music', 'Music Player');
const TerminalApp = withWindow(PlaceholderContent, 'terminal', 'Terminal');

const APP_MAP = {
  finder: FinderApp,
  safari: SafariApp,
  resume: ResumeApp,
  github: GithubApp,
  projects: ProjectsApp,
  contact: ContactApp,
  music: MusicApp,
  terminal: TerminalApp,
};

const Desktop = () => {
  // We need to render all possible windows if they are open.
  // Actually, the HOC handles "if !isOpen return null".
  // So we can just render ALL of them?
  // Or we can map over Object.keys(APP_MAP) and render them.
  // This is better than mapping over store.windows because we need the Component.
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      <MenuBar />
      
      {/* Desktop Area */}
      <div className="absolute top-8 bottom-0 w-full">
        {Object.entries(APP_MAP).map(([id, Component]) => (
          <Component key={id} />
        ))}
      </div>

      <Dock />
    </div>
  );
};

export default Desktop;

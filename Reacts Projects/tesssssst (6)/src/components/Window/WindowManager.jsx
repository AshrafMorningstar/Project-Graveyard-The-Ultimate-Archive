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
import { useWindowStore } from '../../store/windowStore';
import Window from './Window';

// Import App Components (Placeholders for now)
const Finder = () => <div className="p-4">Finder Content</div>;
const Safari = () => <div className="p-4">Safari Content</div>;
const Apps = {
    finder: Finder,
    safari: Safari,
    // Add others
};

const WindowManager = () => {
  const { windows } = useWindowStore();

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {windows.map((win) => {
          const Content = Apps[win.component] || (() => <div className="p-4 text-center">App not found</div>);
          return (
            <Window key={win.id} windowId={win.id} {...win}>
                <Content />
            </Window>
          );
      })}
    </div>
  );
};

export default WindowManager;

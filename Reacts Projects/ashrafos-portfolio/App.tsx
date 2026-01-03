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
import { WALLPAPER_URL, ICONS } from './constants';
import { AppConfig } from './types';
import { useStore } from './store/useStore';

// Components
import MenuBar from './components/os/MenuBar';
import Dock from './components/os/Dock';
import Window from './components/os/Window';

// Apps
import Profile from './components/apps/Profile';
import Projects from './components/apps/Projects';
import AIChat from './components/apps/AIChat';
import TicTacToe from './components/apps/TicTacToe';

const apps: AppConfig[] = [
  { id: 'finder', title: 'Finder', icon: ICONS.finder, component: Profile, defaultWidth: 800, defaultHeight: 600 },
  { id: 'projects', title: 'Projects', icon: ICONS.projects, component: Projects, defaultWidth: 900, defaultHeight: 700 },
  { id: 'ai-chat', title: 'Gemini AI', icon: ICONS.ai, component: AIChat, defaultWidth: 450, defaultHeight: 600 },
  { id: 'tictactoe', title: 'Arcade', icon: ICONS.game, component: TicTacToe, defaultWidth: 400, defaultHeight: 520 },
  { id: 'browser', title: 'GitHub', icon: ICONS.github, component: () => <div className='flex items-center justify-center h-full text-white'>Opening GitHub...</div>, defaultWidth: 400, defaultHeight: 200 } // Placeholder, logic in click handler ideally but keeping simple
];

const App: React.FC = () => {
  const { openApp, activeAppId } = useStore();

  // Handle external link behavior for specific "apps"
  const handleAppOpen = (id: string) => {
    if (id === 'browser') {
       window.open('https://github.com/AshrafMorningstar', '_blank');
    } else {
       // @ts-ignore
       openApp(id);
    }
  };

  return (
    <div 
        className="w-screen h-screen overflow-hidden relative font-sans selection:bg-os-accent selection:text-white"
        style={{
            backgroundImage: `url(${WALLPAPER_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
    >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <MenuBar />

        {/* Desktop Area */}
        <div className="absolute top-8 left-0 w-full h-[calc(100vh-32px)] overflow-hidden">
            {/* Desktop Icons */}
            <div className="absolute top-4 right-4 flex flex-col gap-6 items-end z-0">
               {apps.map(app => (
                   <button 
                    key={app.id}
                    onClick={() => handleAppOpen(app.id)}
                    className="flex flex-col items-center gap-1 group w-20 text-center"
                   >
                       <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 backdrop-blur-sm group-hover:bg-white/20 transition-colors shadow-lg">
                           <img src={app.icon} alt={app.title} className="w-10 h-10 object-contain drop-shadow-md" />
                       </div>
                       <span className="text-white text-xs font-medium px-2 py-0.5 rounded bg-black/20 backdrop-blur-md group-hover:text-os-accent transition-colors shadow-sm">{app.title}</span>
                   </button>
               ))}
            </div>

            {/* Windows */}
            {apps.map(app => {
                if (app.id === 'browser') return null;
                return <Window key={app.id} app={app} />;
            })}
        </div>

        {/* Dock */}
        <Dock apps={apps} />
    </div>
  );
};

export default App;

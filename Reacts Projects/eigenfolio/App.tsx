/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useEffect } from 'react';
import { ICONS } from './constants';
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
import Terminal from './components/apps/Terminal';
import Mail from './components/apps/Mail';
import Settings from './components/apps/Settings';
import MemoryGame from './components/apps/MemoryGame';
import About from './components/apps/About';

const apps: AppConfig[] = [
  { id: 'finder', title: 'Finder', icon: ICONS.finder, component: Profile, defaultWidth: 800, defaultHeight: 600 },
  { id: 'projects', title: 'Projects', icon: ICONS.projects, component: Projects, defaultWidth: 900, defaultHeight: 700 },
  { id: 'ai-chat', title: 'Gemini AI', icon: ICONS.ai, component: AIChat, defaultWidth: 450, defaultHeight: 600 },
  { id: 'browser', title: 'GitHub', icon: ICONS.browser, component: () => null, defaultWidth: 0, defaultHeight: 0 }, 
  { id: 'mail', title: 'Mail', icon: ICONS.mail, component: Mail, defaultWidth: 800, defaultHeight: 550 },
  { id: 'terminal', title: 'Terminal', icon: ICONS.terminal, component: Terminal, defaultWidth: 600, defaultHeight: 400 },
  { id: 'tictactoe', title: 'Arcade', icon: ICONS.game, component: TicTacToe, defaultWidth: 400, defaultHeight: 520 },
  { id: 'memory', title: 'Memory', icon: ICONS.memory, component: MemoryGame, defaultWidth: 420, defaultHeight: 540 },
  { id: 'settings', title: 'Settings', icon: ICONS.settings, component: Settings, defaultWidth: 700, defaultHeight: 500 },
  { id: 'about', title: 'About', icon: ICONS.about, component: About, defaultWidth: 350, defaultHeight: 400 },
];

const App: React.FC = () => {
  const { openApp, settings, addNotification } = useStore();

  // Handle external link behavior for specific "apps"
  const handleAppOpen = (id: string) => {
    if (id === 'browser') {
       window.open('https://github.com/AshrafMorningstar', '_blank');
    } else {
       // @ts-ignore
       openApp(id);
    }
  };

  useEffect(() => {
    // Initial System Notification after a delay
    const timer = setTimeout(() => {
        addNotification({
            title: "System Update",
            message: "AshrafOS v2.0 is running smoothly. Check out the new Memory Game!",
            appId: 'memory'
        });
    }, 3000);
    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <div 
        className="w-screen h-screen overflow-hidden relative font-sans selection:bg-blue-500 selection:text-white"
        style={{
            backgroundImage: `url(${settings.wallpaper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.5s ease-in-out',
            // @ts-ignore
            '--os-accent': settings.accentColor,
        }}
    >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <MenuBar />

        {/* Desktop Area */}
        <div className="absolute top-8 left-0 w-full h-[calc(100vh-32px)] overflow-hidden">
            {/* Desktop Icons - Layout Grid */}
            <div className="absolute top-4 right-4 flex flex-col gap-6 items-end z-0 p-4">
               {apps.filter(a => a.id !== 'about').map(app => (
                   <button 
                    key={app.id}
                    onClick={() => handleAppOpen(app.id)}
                    className="flex flex-col items-center gap-1 group w-20 text-center transition-transform hover:scale-105 active:scale-95"
                   >
                       <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/5 backdrop-blur-sm group-hover:bg-white/20 transition-colors shadow-lg">
                           <img src={app.icon} alt={app.title} className="w-9 h-9 md:w-10 md:h-10 object-contain drop-shadow-md" />
                       </div>
                       <span 
                           className="text-white text-[10px] md:text-xs font-medium px-2 py-0.5 rounded bg-black/20 backdrop-blur-md group-hover:text-blue-400 transition-colors shadow-sm"
                           style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                       >
                           {app.title}
                       </span>
                   </button>
               ))}
            </div>

            {/* Windows */}
            {apps.map(app => {
                // Browser doesn't have a window in this OS, it opens a tab
                if (app.id === 'browser') return null;
                return <Window key={app.id} app={app} />;
            })}
        </div>

        {/* Dock */}
        <Dock apps={apps.filter(app => app.id !== 'about')} />
    </div>
  );
};

export default App;

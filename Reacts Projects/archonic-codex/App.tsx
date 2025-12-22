/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useEffect, useState } from 'react';
import { useStore } from './store';
import { TopBar } from './components/TopBar';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { NotificationCenter } from './components/NotificationCenter';
import { playSound } from './utils/sound';

// Apps
import { Finder } from './apps/Finder';
import { Browser } from './apps/Browser';
import { TicTacToe } from './apps/TicTacToe';
import { Settings } from './apps/Settings';
import { Terminal } from './apps/Terminal';
import { Mail } from './apps/Mail';
import { Snake } from './apps/Snake';
import { Memory } from './apps/Memory';
import { About } from './apps/About';
import { Calculator } from './apps/Calculator';
import { Paint } from './apps/Paint';

import { AppConfig, WALLPAPERS } from './types';
import { 
  FolderOpen, 
  Globe, 
  Gamepad2, 
  Settings as SettingsIcon, 
  Terminal as TerminalIcon, 
  Mail as MailIcon,
  PlayCircle,
  BrainCircuit,
  Info,
  Calculator as CalculatorIcon,
  Palette
} from 'lucide-react';

const APPS: AppConfig[] = [
  {
    id: 'finder',
    title: 'Finder',
    icon: FolderOpen,
    component: <Finder />,
    defaultX: 50,
    defaultY: 50,
  },
  {
    id: 'projects',
    title: 'Safari',
    icon: Globe,
    component: <Browser />,
    width: 1000,
    height: 700,
    isFull: true
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: TerminalIcon,
    component: <Terminal />,
    width: 600,
    height: 400
  },
  {
    id: 'mail',
    title: 'Mail',
    icon: MailIcon,
    component: <Mail />,
    width: 900,
    height: 600
  },
  {
    id: 'calculator',
    title: 'Calculator',
    icon: CalculatorIcon,
    component: <Calculator />,
    width: 300,
    height: 450
  },
  {
    id: 'paint',
    title: 'Paint',
    icon: Palette,
    component: <Paint />,
    width: 800,
    height: 600
  },
  {
    id: 'game',
    title: 'Tic Tac Toe',
    icon: Gamepad2,
    component: <TicTacToe />,
    width: 400,
    height: 500
  },
  {
    id: 'snake',
    title: 'Snake',
    icon: PlayCircle,
    component: <Snake />,
    width: 440,
    height: 520
  },
  {
    id: 'memory',
    title: 'Memory',
    icon: BrainCircuit,
    component: <Memory />,
    width: 500,
    height: 600
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: SettingsIcon,
    component: <Settings />,
    width: 800,
    height: 600
  },
  // Hidden System Apps
  {
    id: 'about',
    title: 'About AshrafOS',
    icon: Info,
    component: <About />,
    width: 400,
    height: 500
  }
];

const DOCK_APPS = APPS.filter(app => app.id !== 'about');

const App: React.FC = () => {
  const theme = useStore((state) => state.theme);
  const openWindow = useStore((state) => state.openWindow);
  const addNotification = useStore((state) => state.addNotification);
  
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    // Boot sequence
    const timer = setTimeout(() => {
        setBooted(true);
        playSound('open');
        setTimeout(() => openWindow('finder'), 500);
        setTimeout(() => {
            addNotification({
                title: 'Welcome to AshrafOS',
                message: 'System loaded successfully. Explore the portfolio via the Dock.',
            });
        }, 1500);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!booted) {
      return (
          <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white">
              <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 animate-pulse flex items-center justify-center shadow-2xl shadow-blue-500/50">
                     <span className="text-4xl font-display font-bold">A</span>
                  </div>
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-ping"></div>
              </div>
              
              <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white animate-[width_1.5s_ease-in-out_forwards]" style={{ width: '0%' }}></div>
              </div>
          </div>
      )
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative bg-cover bg-center transition-all duration-700 ease-in-out"
      style={{ backgroundImage: `url(${WALLPAPERS[theme]})` }}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <TopBar />
      <NotificationCenter />

      {/* Mobile-friendly Desktop Grid */}
      <div className="relative z-0 h-full w-full pt-12 pb-24 px-4 overflow-hidden">
         <div className="flex flex-col flex-wrap content-start gap-6 h-full w-full max-w-[200px]">
             {DOCK_APPS.slice(0, 6).map((app) => (
                 <button 
                    key={app.id}
                    onDoubleClick={() => openWindow(app.id)}
                    className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-colors w-20 sm:w-24 focus:bg-white/20 outline-none"
                 >
                     <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-700/50 to-gray-900/50 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-white border border-white/10 group-hover:scale-105 transition-transform">
                        <app.icon size={24} className="text-gray-200" />
                     </div>
                     <span className="text-[10px] sm:text-xs font-medium text-white drop-shadow-md px-2 py-0.5 rounded bg-black/20 group-hover:text-white transition-colors text-center w-full truncate">
                        {app.title}
                     </span>
                 </button>
             ))}
         </div>
      </div>

      {APPS.map((app) => (
        <Window key={app.id} app={app} />
      ))}

      <Dock apps={DOCK_APPS} />
    </div>
  );
};

export default App;
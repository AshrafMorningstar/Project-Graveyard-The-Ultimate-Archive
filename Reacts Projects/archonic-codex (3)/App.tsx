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
import { NeuralInterface } from './components/NeuralInterface';
import { LockScreen } from './components/LockScreen';
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
import { QuantumChess } from './apps/QuantumChess';
import { NeuroAI } from './apps/NeuroAI';
import { MatterShaper } from './apps/MatterShaper';
import { MusicPlayer } from './apps/MusicPlayer';
import { CodeEditor } from './apps/CodeEditor';
import { CalendarApp } from './apps/CalendarApp';
import { Notes } from './apps/Notes';

import { AppConfig, WALLPAPERS, Theme } from './types';
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
  Palette,
  Crown,
  Bot,
  Wand2,
  Music,
  Code,
  Calendar,
  StickyNote
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
    title: 'Project Nebula',
    icon: Globe,
    component: <Browser />,
    width: 1000,
    height: 700,
    isFull: true
  },
  {
    id: 'neuro-ai',
    title: 'Neuro AI',
    icon: Bot,
    component: <NeuroAI />,
    width: 900,
    height: 650
  },
  {
    id: 'matter-shaper',
    title: 'Matter Shaper',
    icon: Wand2,
    component: <MatterShaper />,
    width: 1000,
    height: 700
  },
  {
    id: 'music-player',
    title: 'Sonic Vibe',
    icon: Music,
    component: <MusicPlayer />,
    width: 800,
    height: 500
  },
  {
    id: 'code-editor',
    title: 'Code Matrix',
    icon: Code,
    component: <CodeEditor />,
    width: 900,
    height: 600
  },
  {
    id: 'calendar',
    title: 'Chronos',
    icon: Calendar,
    component: <CalendarApp />,
    width: 800,
    height: 600
  },
  {
    id: 'notes',
    title: 'Notes',
    icon: StickyNote,
    component: <Notes />,
    width: 700,
    height: 500
  },
  {
    id: 'terminal',
    title: 'Chronos Terminal',
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
    id: 'quantum-chess',
    title: 'Quantum Chess',
    icon: Crown,
    component: <QuantumChess />,
    width: 800,
    height: 700
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

const DOCK_APPS = APPS.filter(app => app.id !== 'about').slice(0, 14); // Limit dock items for cleaner look

const App: React.FC = () => {
  const theme = useStore((state) => state.theme);
  const openWindow = useStore((state) => state.openWindow);
  const addNotification = useStore((state) => state.addNotification);
  const isLocked = useStore((state) => state.isLocked);
  
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    document.body.className = theme === Theme.LIGHT ? 'light-theme' : 'dark-theme';
    if (theme === Theme.LIGHT) {
        document.body.style.backgroundColor = '#F0F4F8';
    } else if (theme === Theme.QUANTUM) {
        document.body.style.backgroundColor = '#0A0C27';
    }
  }, [theme]);

  useEffect(() => {
    // Boot sequence
    const timer = setTimeout(() => {
        setBooted(true);
        // We do NOT open windows automatically now, user lands on Lock Screen
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Effect to run when unlocked
  useEffect(() => {
    if (booted && !isLocked) {
        playSound('open');
        setTimeout(() => {
             // Only open finder if no windows are open (clean start)
             const hasOpenWindows = document.querySelectorAll('.glass').length > 0; // Simple check, ideally check store
             if (!hasOpenWindows) openWindow('finder');
        }, 500);
        setTimeout(() => {
            addNotification({
                title: 'Welcome to Eigenfolio',
                message: 'Quantum Core initialized. Neural interface active.',
            });
        }, 1500);
    }
  }, [booted, isLocked, openWindow, addNotification]);

  if (!booted) {
      return (
          <div className="h-screen w-screen bg-chronos-dark flex flex-col items-center justify-center text-white">
              <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neuro-purple to-quantum-energy animate-pulse flex items-center justify-center shadow-[0_0_50px_rgba(76,201,240,0.3)]">
                     <span className="text-4xl font-display font-bold text-white">E</span>
                  </div>
                  <div className="absolute inset-0 bg-quantum-glow/20 blur-xl rounded-full animate-ping"></div>
              </div>
              
              <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-neuro-purple to-quantum-glow animate-[width_1.5s_ease-in-out_forwards]" style={{ width: '0%' }}></div>
              </div>
              <p className="mt-4 text-xs font-mono text-quantum-glow animate-pulse">Initializing Chronos Engine...</p>
          </div>
      )
  }

  return (
    <div 
      className={`h-screen w-screen overflow-hidden relative bg-cover bg-center transition-all duration-700 ease-in-out ${
          theme === Theme.LIGHT ? 'bg-[#F0F4F8]' : 'bg-chronos-dark'
      }`}
      style={{ backgroundImage: (theme !== Theme.QUANTUM && theme !== Theme.LIGHT) ? `url(${WALLPAPERS[theme]})` : undefined }}
    >
      <LockScreen />
      
      {(theme === Theme.QUANTUM || theme === Theme.LIGHT) && <NeuralInterface />}
      <div className={`absolute inset-0 pointer-events-none ${theme === Theme.LIGHT ? 'bg-white/10' : 'bg-black/10'}`} />

      <TopBar />
      <NotificationCenter />

      {/* Mobile-friendly Desktop Grid */}
      <div className="relative z-0 h-full w-full pt-12 pb-24 px-4 overflow-hidden pointer-events-none">
         <div className="flex flex-col flex-wrap content-start gap-6 h-full w-full max-w-[200px] pointer-events-auto">
             {DOCK_APPS.slice(0, 6).map((app) => (
                 <button 
                    key={app.id}
                    onDoubleClick={() => openWindow(app.id)}
                    className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-colors w-20 sm:w-24 focus:bg-white/20 outline-none"
                 >
                     <div className={`w-12 h-12 sm:w-14 sm:h-14 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center border group-hover:scale-105 transition-transform ${
                         theme === Theme.LIGHT 
                         ? 'bg-white/70 border-white/40 text-blue-600' 
                         : 'bg-gradient-to-br from-chronos-blue/50 to-neuro-purple/30 border-white/10 text-white'
                     }`}>
                        <app.icon size={24} className={theme === Theme.LIGHT ? 'text-blue-600' : 'text-gray-200 group-hover:text-quantum-glow transition-colors'} />
                     </div>
                     <span className={`text-[10px] sm:text-xs font-medium drop-shadow-md px-2 py-0.5 rounded transition-colors text-center w-full truncate ${
                         theme === Theme.LIGHT ? 'text-gray-800 bg-white/50' : 'text-white bg-black/20'
                     }`}>
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
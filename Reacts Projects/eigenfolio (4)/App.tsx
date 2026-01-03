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

import React, { useEffect } from 'react';
import { ICONS } from './constants';
import { AppConfig } from './types';
import { useStore } from './store/useStore';

// Components
import MenuBar from './components/os/MenuBar';
import Dock from './components/os/Dock';
import Window from './components/os/Window';
import Desktop from './components/os/Desktop';
import LockScreen from './components/os/LockScreen';
import Spotlight from './components/os/Spotlight';
import ControlCenter from './components/os/ControlCenter';
import { NeuralInterface } from './components/os/NeuralInterface';
import BootSequence from './components/system/BootSequence';

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
import QuantumChess from './components/apps/QuantumChess';
import Calculator from './components/apps/Calculator';
import Notepad from './components/apps/Notepad';
import MusicPlayer from './components/apps/MusicPlayer';
import FileManager from './components/apps/FileManager';
import Paint from './components/apps/Paint';
import Snake from './components/apps/Snake';
import TaskManager from './components/apps/TaskManager';
import Camera from './components/apps/Camera';
import Browser from './components/apps/Browser';
import CodeEditor from './components/apps/CodeEditor';
import VideoPlayer from './components/apps/VideoPlayer';
import CalendarApp from './components/apps/CalendarApp.tsx';

// Mock Placeholders
const Weather = () => <div className="flex items-center justify-center h-full bg-gradient-to-b from-blue-400 to-blue-200 text-white font-bold text-2xl">72°F Sunny</div>;

const apps: AppConfig[] = [
  { id: 'finder', title: 'Cosmic Profile', icon: ICONS.finder, component: Profile, defaultWidth: 900, defaultHeight: 650 },
  { id: 'projects', title: 'Project Nebula', icon: ICONS.projects, component: Projects, defaultWidth: 1000, defaultHeight: 700 },
  { id: 'files', title: 'Data Bank', icon: ICONS.files, component: FileManager, defaultWidth: 800, defaultHeight: 550 },
  { id: 'browser', title: 'Cyber Web', icon: ICONS.browser, component: Browser, defaultWidth: 900, defaultHeight: 650 },
  { id: 'ai-chat', title: 'Neuro AI', icon: ICONS.ai, component: AIChat, defaultWidth: 450, defaultHeight: 600 },
  { id: 'terminal', title: 'Chronos Terminal', icon: ICONS.terminal, component: Terminal, defaultWidth: 700, defaultHeight: 450 },
  { id: 'code', title: 'Code Matrix', icon: ICONS.code, component: CodeEditor, defaultWidth: 800, defaultHeight: 600 },
  { id: 'tasks', title: 'Process Manager', icon: ICONS.tasks, component: TaskManager, defaultWidth: 500, defaultHeight: 600 },
  { id: 'mail', title: 'Comms Uplink', icon: ICONS.mail, component: Mail, defaultWidth: 800, defaultHeight: 550 },
  { id: 'paint', title: 'Quantum Canvas', icon: ICONS.paint, component: Paint, defaultWidth: 800, defaultHeight: 600 },
  { id: 'snake', title: 'Serpent Protocol', icon: ICONS.snake, component: Snake, defaultWidth: 420, defaultHeight: 500 },
  { id: 'calculator', title: 'Quantum Calc', icon: ICONS.calculator, component: Calculator, defaultWidth: 320, defaultHeight: 480 },
  { id: 'music', title: 'Cosmic Waves', icon: ICONS.music, component: MusicPlayer, defaultWidth: 400, defaultHeight: 500 },
  { id: 'video', title: 'HoloView', icon: ICONS.video, component: VideoPlayer, defaultWidth: 700, defaultHeight: 500 },
  { id: 'notepad', title: 'Star Notes', icon: ICONS.notepad, component: Notepad, defaultWidth: 550, defaultHeight: 450 },
  { id: 'calendar', title: 'Time Log', icon: ICONS.calendar, component: CalendarApp, defaultWidth: 700, defaultHeight: 600 },
  { id: 'tictactoe', title: 'Quantum Chess', icon: ICONS.chess, component: QuantumChess, defaultWidth: 500, defaultHeight: 650 },
  { id: 'memory', title: 'Neural Memory', icon: ICONS.memory, component: MemoryGame, defaultWidth: 460, defaultHeight: 580 },
  { id: 'settings', title: 'System Core', icon: ICONS.settings, component: Settings, defaultWidth: 800, defaultHeight: 600 },
  { id: 'camera', title: 'HoloLens', icon: ICONS.camera, component: Camera, defaultWidth: 640, defaultHeight: 520 },
  { id: 'weather', title: 'Atmosphere', icon: ICONS.weather, component: Weather, defaultWidth: 350, defaultHeight: 500 },
  { id: 'about', title: 'Manifest', icon: ICONS.about, component: About, defaultWidth: 350, defaultHeight: 400 },
];

const App: React.FC = () => {
  const { settings, addNotification, isBooting, isLocked, systemState } = useStore();

  useEffect(() => {
    if (!isBooting && !isLocked) {
        // Initial System Notification after boot
        const timer = setTimeout(() => {
            addNotification({
                title: "Neural Link Established",
                message: "Welcome to Eigenfolio Quantum v2.0. Press Cmd+K for Spotlight.",
                appId: 'files'
            });
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [addNotification, isBooting, isLocked]);

  return (
    <div 
        className={`w-screen h-screen overflow-hidden relative font-sans selection:bg-neuro-purple selection:text-neuro-cyan ${settings.darkMode ? 'text-white' : 'text-slate-900'}`}
        style={{
            backgroundColor: settings.darkMode ? '#050510' : '#f0f0f0',
        }}
    >
        {isBooting && <BootSequence />}
        {isLocked && !isBooting && <LockScreen />}

        {/* Global System Overlays (Brightness, etc) */}
        <div 
            className="fixed inset-0 pointer-events-none z-[99999] bg-black transition-opacity duration-300"
            style={{ opacity: (100 - systemState.brightness) / 100 }}
        />

        {/* Background Layers */}
        <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out pointer-events-none"
            style={{ 
                backgroundImage: `url(${settings.wallpaper})`,
                opacity: settings.darkMode ? 0.4 : 0.8,
                filter: settings.darkMode ? 'contrast(1.2)' : 'brightness(1.1)'
            }}
        />
        
        {/* Neural Interface (Particles) */}
        <div className={`transition-opacity duration-1000 ${settings.darkMode ? 'opacity-100' : 'opacity-30'}`}>
            <NeuralInterface />
        </div>

        {/* Scanline/CRT Effect */}
        <div className={`absolute inset-0 pointer-events-none z-[9999] ${settings.crtEffect ? 'opacity-20' : 'opacity-0'} transition-opacity duration-500`} 
             style={{ 
                 background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))',
                 backgroundSize: '100% 2px, 3px 100%' 
             }} 
        />

        {/* Desktop Environment */}
        {!isBooting && !isLocked && (
            <>
                <MenuBar />
                <Desktop apps={apps.filter(app => app.id !== 'about')} />
                
                {/* Windows Layer */}
                <div className="absolute top-8 left-0 w-full h-[calc(100vh-32px)] overflow-hidden z-20 pointer-events-none">
                    {apps.map(app => (
                        <div key={app.id} className="pointer-events-auto">
                            <Window app={app} />
                        </div>
                    ))}
                </div>

                <Dock apps={apps.filter(app => app.id !== 'about')} />
                
                {/* System Overlays */}
                <Spotlight />
                <ControlCenter />
            </>
        )}
    </div>
  );
};

export default App;
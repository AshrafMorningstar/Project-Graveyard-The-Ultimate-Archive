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

/**
 * @file App.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 QubitFlow OS - The Quantum Computing Interface
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import NeuralInterface from './components/NeuralInterface';
import NebulaDock, { apps as appConfigs } from './components/NebulaDock';
import WindowFrame from './components/WindowFrame';
import LockScreen from './components/LockScreen';
import SystemMonitor from './components/SystemMonitor';

// Apps
import ProfileApp from './components/apps/ProfileApp';
import ProjectsApp from './components/apps/ProjectsApp';
import NeuroAIApp from './components/apps/NeuroAIApp';
import MatterShaperApp from './components/apps/MatterShaperApp';
import QuantumChessApp from './components/apps/QuantumChessApp';
import SettingsApp from './components/apps/SettingsApp';
import TerminalApp from './components/apps/TerminalApp';
import HoloFilesApp from './components/apps/HoloFilesApp';
import CodeNexusApp from './components/apps/CodeNexusApp';
import QuantumRadioApp from './components/apps/QuantumRadioApp';
import QuantumBrowserApp from './components/apps/QuantumBrowserApp';
import CosmicCanvasApp from './components/apps/CosmicCanvasApp';
import CalculatorApp from './components/apps/CalculatorApp';
import NeuralCamApp from './components/apps/NeuralCamApp';
import WeatherApp from './components/apps/WeatherApp';
import StickyNotesApp from './components/apps/StickyNotesApp';
import TaskManagerApp from './components/apps/TaskManagerApp';

import { AppId, WindowState, VirtualFile, WallpaperId } from './types';
import { Bell, Wifi, Battery, Search, Mic, RefreshCw, LogOut, Terminal, Moon, Sun, Volume2, Bluetooth, Grid, FileText, Trash2, StickyNote, Folder, CloudSun, X, Clock, Atom } from 'lucide-react';
import { initialFileSystem, updateFileContent } from './utils/fileSystem';

// --- Types ---
interface Toast {
    id: number;
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
}

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>(['System: Quantum Core Initialized']);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [wallpaper, setWallpaper] = useState<WallpaperId>('quantum_void');
  const [isListening, setIsListening] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(75);
  const spotlightInputRef = useRef<HTMLInputElement>(null);
  
  // File System State
  const [fileSystem, setFileSystem] = useState<VirtualFile>(initialFileSystem);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, visible: boolean}>({ x: 0, y: 0, visible: false });

  // --- Initialization & Persistance ---

  useEffect(() => {
    // Simulate Boot
    const timer = setTimeout(() => {
        setIsBooting(false);
        setIsLocked(true);
        addToast('System Ready', 'Quantum Core is online.');
    }, 4000); // Extended slightly to show off the new animation

    // Load Settings
    const savedTheme = localStorage.getItem('eigen_theme');
    if (savedTheme) setTheme(savedTheme as any);

    // Load Window Session (Optional - enabled for realism)
    const savedSession = localStorage.getItem('eigen_session');
    if (savedSession) {
        try {
            // const parsedWindows = JSON.parse(savedSession);
            // setWindows(parsedWindows); // Uncomment to enable persistent windows
        } catch(e) {}
    }

    return () => clearTimeout(timer);
  }, []);

  // Save Session on change
  useEffect(() => {
      localStorage.setItem('eigen_session', JSON.stringify(windows));
  }, [windows]);

  // System Crash Listener
  useEffect(() => {
      const handleCrash = () => setIsCrashed(true);
      window.addEventListener('system-crash', handleCrash);
      return () => window.removeEventListener('system-crash', handleCrash);
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
              e.preventDefault();
              setShowSpotlight(prev => !prev);
              setTimeout(() => spotlightInputRef.current?.focus(), 100);
          }
          // Task Manager Shortcut
          if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'Escape') {
              e.preventDefault();
              openApp(AppId.TASK_MANAGER);
          }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Theme Handling
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-mode');
    }
    localStorage.setItem('eigen_theme', theme);
  }, [theme]);

  // --- Features ---

  const addToast = (title: string, message: string) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, title, message }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  const startVoiceControl = () => {
    if (!('webkitSpeechRecognition' in window)) {
        addToast("Error", "Neural Link (Speech Recognition) not supported.");
        return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    setIsListening(true);
    
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        addToast("Voice Command", transcript);
        
        if (transcript.includes('open terminal')) openApp(AppId.TERMINAL);
        else if (transcript.includes('open browser')) openApp(AppId.QUANTUM_BROWSER);
        else if (transcript.includes('close window')) {
             if (activeWindowId) closeWindow(activeWindowId);
        }
        else if (transcript.includes('toggle theme')) {
            setTheme(t => t === 'dark' ? 'light' : 'dark');
        }
        else if (transcript.includes('lock')) setIsLocked(true);
        
        setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // --- Window Manager ---

  const openApp = (appId: AppId, data?: any) => {
    setShowStartMenu(false);
    setShowSpotlight(false);
    const config = appConfigs.find(a => a.id === appId);
    if (!config && appId !== AppId.TASK_MANAGER) return; // Allow internal apps not in dock

    const title = config ? config.name : (appId === AppId.TASK_MANAGER ? 'Task Manager' : 'App');
    const defaultSize = config?.defaultSize || { width: 600, height: 400 };

    // Singleton check if needed, mostly allow multiple
    const existing = windows.find(w => w.appId === appId && !data);
    if (existing && !data) {
        focusWindow(existing.id);
        if (existing.isMinimized) {
            setWindows(prev => prev.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
        }
        return;
    }

    const newWindow: WindowState = {
        id: Date.now().toString() + Math.random(),
        appId,
        title: title,
        x: 100 + (windows.length * 30) % 300, 
        y: 100 + (windows.length * 30) % 200,
        width: defaultSize.width,
        height: defaultSize.height,
        zIndex: getMaxZIndex() + 1,
        isMinimized: false,
        isMaximized: false,
        data
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
    playSound('open');
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
    playSound('close');
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: getMaxZIndex() + 1 } : w));
  };

  const moveWindow = (id: string, x: number, y: number) => {
    // Window Snapping Logic
    let newX = x;
    let newY = y;
    let newWidth;
    let newHeight;
    const snapMargin = 10;

    // Snap to Top (Maximize)
    if (y < snapMargin) {
        newX = 0; newY = 0; newWidth = window.innerWidth; newHeight = window.innerHeight - 80;
    }
    // Snap to Left (Half)
    else if (x < snapMargin) {
        newX = 0; newY = 0; newWidth = window.innerWidth / 2; newHeight = window.innerHeight - 80;
    }
    // Snap to Right (Half)
    else if (x > window.innerWidth - snapMargin - 100) { // -100 to catch drag
        newX = window.innerWidth / 2; newY = 0; newWidth = window.innerWidth / 2; newHeight = window.innerHeight - 80;
    }

    if (newWidth) {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, x: newX, y: newY, width: newWidth, height: newHeight } : w));
    } else {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
    }
  };

  const resizeWindow = (id: string, width: number, height: number) => {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, width, height } : w));
  }

  const getMaxZIndex = () => {
    return windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 10;
  };

  const handleOpenFile = (file: VirtualFile) => {
      if (file.type === 'code') {
          openApp(AppId.CODE_NEXUS, file);
      }
  };

  const handleSaveFile = (fileId: string, content: string) => {
      setFileSystem(prev => updateFileContent(prev, fileId, content));
      addToast("File Saved", "Changes written to Quantum Core.");
  };

  const playSound = (type: 'open' | 'close' | 'hover') => {
      // Audio placeholder
  };

  // --- Renderers ---

  const renderAppContent = (win: WindowState) => {
    switch (win.appId) {
      case AppId.PROFILE: return <ProfileApp />;
      case AppId.PROJECTS: return <ProjectsApp />;
      case AppId.NEURO_AI: return <NeuroAIApp />;
      case AppId.MATTER_SHAPER: return <MatterShaperApp />;
      case AppId.QUANTUM_CHESS: return <QuantumChessApp />;
      case AppId.TERMINAL: return <TerminalApp fileSystem={fileSystem} onUpdateFileSystem={setFileSystem} />;
      case AppId.HOLO_FILES: return <HoloFilesApp fileSystem={fileSystem} onOpenFile={handleOpenFile} onNavigate={() => {}} onUpdateFileSystem={setFileSystem} />;
      case AppId.CODE_NEXUS: return <CodeNexusApp initialFile={win.data} onSave={handleSaveFile} />;
      case AppId.QUANTUM_RADIO: return <QuantumRadioApp />;
      case AppId.QUANTUM_BROWSER: return <QuantumBrowserApp />;
      case AppId.COSMIC_CANVAS: return <CosmicCanvasApp />;
      case AppId.CALCULATOR: return <CalculatorApp />;
      case AppId.NEURAL_CAM: return <NeuralCamApp />;
      case AppId.WEATHER: return <WeatherApp />;
      case AppId.SETTINGS: return <SettingsApp theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} currentWallpaper={wallpaper} setWallpaper={setWallpaper} />;
      case AppId.STICKY_NOTES: return <StickyNotesApp />;
      case AppId.TASK_MANAGER: return <TaskManagerApp windows={windows} onCloseApp={closeWindow} />;
      default: return null;
    }
  };

  const getWallpaperGradient = () => {
      switch (wallpaper) {
          case 'cyberpunk_city': return 'bg-gradient-to-br from-[#2b003e] via-[#0f0c29] to-[#302b63]';
          case 'nebula_drift': return 'bg-gradient-to-br from-[#432371] via-[#faae7b] to-[#c779d0]';
          case 'matrix_rain': return 'bg-black'; // Logic handled elsewhere if needed, or simple black
          case 'quantum_void': 
          default:
              return theme === 'dark' ? 'bg-gradient-to-br from-chronos-dark via-[#0a0a1a] to-black' : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50';
      }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, visible: true });
  }

  const closeOverlay = () => {
      if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false });
      if (showControlCenter) setShowControlCenter(false);
      if (showStartMenu) setShowStartMenu(false);
      if (showCalendar) setShowCalendar(false);
      if (showNotifications) setShowNotifications(false);
      if (showSpotlight) setShowSpotlight(false);
  }

  if (isCrashed) {
      return (
          <div className="w-screen h-screen bg-blue-900 text-white font-mono flex flex-col items-center justify-center p-8 select-none z-[99999]">
              <h1 className="text-9xl mb-4">:(</h1>
              <p className="text-2xl mb-8">Your quantum coherence has been lost.</p>
              <p>Error Code: QUANTUM_DECOHERENCE_EXCEPTION</p>
              <button onClick={() => window.location.reload()} className="mt-8 px-4 py-2 border border-white hover:bg-white hover:text-blue-900">REBOOT SYSTEM</button>
          </div>
      );
  }

  if (isBooting) {
      return (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center z-[9999] relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(58,12,163,0.15)_0%,_rgba(0,0,0,0)_70%)] animate-pulse"></div>
            
            <div className="z-10 flex flex-col items-center">
                {/* Visual Identity / Logo Animation */}
                <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 border-t-2 border-neuro-cyan rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-r-2 border-neuro-purple rounded-full animate-spin-slow"></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.9)]"></div>
                    <Atom size={32} className="text-neuro-cyan absolute animate-ping opacity-20" />
                </div>

                {/* Main Title with Gradient */}
                <h1 className="text-5xl md:text-7xl font-space-grotesk font-bold text-transparent bg-clip-text bg-gradient-to-r from-neuro-cyan via-white to-neuro-purple tracking-tight mb-3 select-none drop-shadow-2xl">
                    Eigenfolio Quantum
                </h1>
                
                {/* Author Credit - Styled Professionally */}
                <div className="flex items-center gap-4 text-gray-400 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-16 opacity-0 animate-[slide-up-fade_1s_ease-out_0.5s_forwards]">
                    <span className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-neuro-purple"></span>
                    <span className="text-neuro-purple dark:text-gray-300">by Ashraf Morningstar</span>
                    <span className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-neuro-purple"></span>
                </div>

                {/* Technical Loader */}
                <div className="w-64 h-[2px] bg-gray-900 rounded-full overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neuro-cyan to-transparent w-1/2 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                </div>
                
                {/* Status Text */}
                <div className="mt-4 font-mono text-[10px] text-neuro-cyan/60 flex flex-col items-center gap-1">
                    <span className="animate-pulse">ESTABLISHING NEURAL LINK...</span>
                    <span className="opacity-50">v2.0.0-singularity</span>
                </div>
            </div>
        </div>
      )
  }

  return (
    <div 
        className="relative w-screen h-screen overflow-hidden bg-black text-gray-900 dark:text-white selection:bg-neuro-purple selection:text-neuro-cyan font-inter"
        onContextMenu={handleContextMenu}
        onClick={closeOverlay}
    >
      
      {/* 1. Lock Screen */}
      {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}

      {/* 2. Background */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${getWallpaperGradient()}`}>
        <NeuralInterface theme={theme} />
      </div>

      {/* 2b. Brightness Overlay */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none bg-black transition-opacity duration-300"
        style={{ opacity: (100 - brightness) / 100 }}
      ></div>

      {/* 3. Toast Container */}
      <div className="absolute top-16 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
          {toasts.map(toast => (
              <div key={toast.id} className="bg-white/90 dark:bg-chronos-dark/90 backdrop-blur border border-white/20 p-4 rounded-xl shadow-2xl animate-in slide-in-from-right fade-in w-72 pointer-events-auto flex items-start justify-between">
                  <div>
                    <h5 className="font-bold text-sm text-neuro-purple dark:text-quantum-glow">{toast.title}</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{toast.message}</p>
                  </div>
                  <button onClick={() => setToasts(t => t.filter(x => x.id !== toast.id))} className="text-gray-400 hover:text-white"><X size={14}/></button>
              </div>
          ))}
      </div>

      {/* 4. Desktop Environment */}
      {!isLocked && (
        <>
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-1.5 bg-white/70 dark:bg-black/40 backdrop-blur-md border-b border-white/10 text-xs font-medium select-none text-gray-800 dark:text-gray-300 shadow-sm">
                <div className="flex items-center gap-4">
                    <button 
                        className="font-bold font-space-grotesk text-sm hover:text-neuro-cyan transition-colors cursor-pointer flex items-center gap-2"
                        onClick={(e) => { e.stopPropagation(); setShowStartMenu(!showStartMenu); }}
                    >
                        <Grid size={14} /> Eigenfolio
                    </button>
                    {activeWindowId && (
                        <span className="font-bold text-neuro-purple hidden md:inline animate-in fade-in slide-in-from-left-2">
                            {windows.find(w => w.id === activeWindowId)?.title}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <SystemMonitor /> 
                    
                    <button 
                        onClick={startVoiceControl}
                        className={`hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer flex items-center gap-2 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
                        title="Neural Voice Command"
                    >
                        <Mic size={14} />
                    </button>

                    <div 
                        className="flex items-center gap-3 hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); setShowControlCenter(!showControlCenter); }}
                    >
                        <Wifi size={14} /> 
                        <Battery size={14} />
                    </div>
                    
                    <div className="relative">
                        <div 
                            className="hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer flex items-center gap-2"
                            onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); }}
                        >
                            <Bell size={14} />
                            {notifications.length > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                        </div>
                    </div>

                    <div 
                        className="font-mono hover:bg-white/10 px-2 py-1 rounded cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); setShowCalendar(!showCalendar); }}
                    >
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>

            {/* Start Menu */}
            {showStartMenu && (
                <div className="absolute top-10 left-4 w-64 glass-panel rounded-xl p-4 z-[60] animate-in slide-in-from-top-2 fade-in" onClick={(e) => e.stopPropagation()}>
                    <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neuro-purple to-neuro-cyan"></div>
                        <span className="font-bold">Guest User</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {appConfigs.slice(0, 12).map(app => (
                            <button key={app.id} onClick={() => openApp(app.id)} className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition" title={app.name}>
                                <app.icon size={20} className={app.color} />
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setIsLocked(true)} className="w-full text-left px-3 py-2 hover:bg-white/10 rounded flex items-center gap-2 text-sm"><LogOut size={14}/> Sign Out</button>
                </div>
            )}

            {/* Control Center */}
            {showControlCenter && (
                <div className="absolute top-10 right-4 w-72 glass-panel rounded-xl p-4 z-[60] animate-in slide-in-from-top-2 fade-in flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/5 rounded-xl p-3 flex flex-col gap-2 hover:bg-white/10 cursor-pointer transition">
                            <Wifi className="text-blue-500" />
                            <span className="text-xs font-bold">Wi-Fi</span>
                            <span className="text-[10px] text-gray-400">Quantum Net</span>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 flex flex-col gap-2 hover:bg-white/10 cursor-pointer transition">
                            <Bluetooth className="text-blue-400" />
                            <span className="text-xs font-bold">Bluetooth</span>
                            <span className="text-[10px] text-gray-400">On</span>
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 space-y-3">
                        <div className="flex items-center gap-2">
                            <Sun size={14} className="text-gray-400" />
                            <input 
                                type="range" 
                                min="10" max="100" 
                                value={brightness} 
                                onChange={(e) => setBrightness(parseInt(e.target.value))} 
                                className="flex-1 accent-neuro-cyan h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Volume2 size={14} className="text-gray-400" />
                            <input 
                                type="range" 
                                min="0" max="100" 
                                value={volume} 
                                onChange={(e) => setVolume(parseInt(e.target.value))} 
                                className="flex-1 accent-neuro-purple h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="w-full py-2 bg-white/10 rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-white/20">
                        {theme === 'dark' ? <Moon size={14}/> : <Sun size={14}/>} Toggle Theme
                    </button>
                </div>
            )}

            {/* Spotlight Search (Cmd + K) */}
            {showSpotlight && (
                <div className="absolute inset-0 z-[80] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowSpotlight(false)}>
                    <div className="w-[500px] bg-white/80 dark:bg-chronos-dark/90 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                         <div className="flex items-center px-4 py-4 border-b border-gray-200 dark:border-white/10 gap-3">
                             <Search className="text-gray-400" size={24} />
                             <input 
                                ref={spotlightInputRef}
                                type="text" 
                                placeholder="Search apps, files, or quantum states..." 
                                className="flex-1 bg-transparent outline-none text-xl font-space-grotesk text-gray-800 dark:text-white placeholder-gray-400"
                             />
                             <div className="flex gap-1">
                                 <span className="text-[10px] bg-white/10 px-1 rounded border border-white/10 text-gray-400">ESC</span>
                             </div>
                         </div>
                         <div className="p-2">
                             <div className="text-xs font-bold text-gray-500 px-2 py-1 uppercase tracking-wider">Top Hits</div>
                             {appConfigs.slice(0, 3).map(app => (
                                 <div 
                                    key={app.id} 
                                    onClick={() => openApp(app.id)}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500/10 cursor-pointer group"
                                 >
                                     <app.icon className={`${app.color} group-hover:scale-110 transition-transform`} />
                                     <span className="font-medium text-gray-800 dark:text-white">{app.name}</span>
                                     <span className="text-xs text-gray-400 ml-auto">Application</span>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
            )}

            {/* Desktop Icons (Draggable Mock) */}
            <div className="absolute top-12 left-4 z-0 flex flex-col gap-4">
                 <div onClick={() => openApp(AppId.HOLO_FILES)} className="group flex flex-col items-center gap-1 cursor-pointer w-20 p-2 rounded hover:bg-white/10 transition active:scale-95 select-none">
                     <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30 group-hover:scale-105 transition"><FileText className="text-blue-400" /></div>
                     <span className="text-xs text-white drop-shadow-md text-center">My Files</span>
                 </div>
                 {/* Recycle Bin (Now redirects to Trash folder in HoloFiles) */}
                 <div onClick={() => openApp(AppId.HOLO_FILES)} className="group flex flex-col items-center gap-1 cursor-pointer w-20 p-2 rounded hover:bg-white/10 transition active:scale-95 select-none">
                     <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-400/30 group-hover:scale-105 transition"><Trash2 className="text-red-400" /></div>
                     <span className="text-xs text-white drop-shadow-md text-center">Recycle Bin</span>
                 </div>
                 <div onClick={() => openApp(AppId.STICKY_NOTES)} className="group flex flex-col items-center gap-1 cursor-pointer w-20 p-2 rounded hover:bg-white/10 transition active:scale-95 select-none">
                     <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-400/30 group-hover:scale-105 transition"><StickyNote className="text-yellow-400" /></div>
                     <span className="text-xs text-white drop-shadow-md text-center">Notes</span>
                 </div>
                 <div onClick={() => openApp(AppId.WEATHER)} className="group flex flex-col items-center gap-1 cursor-pointer w-20 p-2 rounded hover:bg-white/10 transition active:scale-95 select-none">
                     <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center border border-sky-400/30 group-hover:scale-105 transition"><CloudSun className="text-sky-400" /></div>
                     <span className="text-xs text-white drop-shadow-md text-center">Weather</span>
                 </div>
            </div>

            {/* Window Layer */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <div className="w-full h-full pointer-events-auto"> 
                    {windows.map(win => (
                        <WindowFrame
                            key={win.id}
                            window={win}
                            onClose={closeWindow}
                            onMinimize={minimizeWindow}
                            onFocus={focusWindow}
                            onMove={moveWindow}
                            onResize={resizeWindow}
                            theme={theme}
                        >
                            {renderAppContent(win)}
                        </WindowFrame>
                    ))}
                </div>
            </div>

            {/* Empty Desktop State (Clock) */}
            {windows.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <div className="text-center animate-in fade-in zoom-in-95 duration-1000">
                         <h1 className="text-9xl font-space-grotesk font-bold text-white/5 tracking-tighter select-none">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </h1>
                         <p className="text-neuro-cyan/20 font-mono tracking-[1em] mt-4 uppercase">Quantum Operating System</p>
                    </div>
                </div>
            )}

            {/* Dock */}
            <NebulaDock 
                openApps={windows.map(w => w.appId)} 
                onOpenApp={openApp} 
            />

            {/* Global Context Menu */}
            {contextMenu.visible && (
                <div 
                    className="absolute z-[200] w-48 bg-white/90 dark:bg-chronos-dark/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-lg shadow-2xl py-1 context-menu"
                    style={{ left: contextMenu.x, top: contextMenu.y }}
                >
                    <button onClick={() => openApp(AppId.TERMINAL)} className="w-full text-left px-4 py-2 hover:bg-neuro-purple/20 text-sm flex items-center gap-2"><Terminal size={14}/> Open Terminal</button>
                    <button onClick={() => window.location.reload()} className="w-full text-left px-4 py-2 hover:bg-neuro-purple/20 text-sm flex items-center gap-2"><RefreshCw size={14}/> Refresh System</button>
                    <div className="h-px bg-gray-200 dark:bg-white/10 my-1"></div>
                    <button onClick={() => openApp(AppId.HOLO_FILES)} className="w-full text-left px-4 py-2 hover:bg-neuro-purple/20 text-sm flex items-center gap-2"><Folder size={14}/> New Folder</button>
                    <button onClick={() => setIsLocked(true)} className="w-full text-left px-4 py-2 hover:bg-red-500/20 hover:text-red-500 text-sm flex items-center gap-2"><LogOut size={14}/> Lock Terminal</button>
                </div>
            )}
        </>
      )}
    </div>
  );
};

export default App;
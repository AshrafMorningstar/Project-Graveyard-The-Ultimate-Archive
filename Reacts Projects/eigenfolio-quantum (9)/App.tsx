/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
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

import { AppId, WindowState, VirtualFile, WallpaperId } from './types';
import { Bell, Wifi, Battery, Search, Mic, RefreshCw, LogOut, Terminal, Moon, Sun, Volume2, Bluetooth, Grid, FileText, Trash2, StickyNote, Folder } from 'lucide-react';
import { initialFileSystem, findFileById, updateFileContent } from './utils/fileSystem';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>(['System: Quantum Core Initialized']);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [wallpaper, setWallpaper] = useState<WallpaperId>('quantum_void');
  const [isListening, setIsListening] = useState(false);
  
  // File System State
  const [fileSystem, setFileSystem] = useState<VirtualFile>(initialFileSystem);

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, visible: boolean}>({ x: 0, y: 0, visible: false });

  // Initial Boot
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsBooting(false);
        setIsLocked(true);
    }, 2500); // 2.5s boot sequence
    return () => clearTimeout(timer);
  }, []);

  // System Crash Listener
  useEffect(() => {
      const handleCrash = () => setIsCrashed(true);
      window.addEventListener('system-crash', handleCrash);
      return () => window.removeEventListener('system-crash', handleCrash);
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

  // Load persisted settings
  useEffect(() => {
      const savedTheme = localStorage.getItem('eigen_theme');
      if (savedTheme) setTheme(savedTheme as any);
  }, []);

  // Voice Command Listener
  const startVoiceControl = () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Neural Link (Speech Recognition) not supported in this browser.");
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
        setNotifications(prev => [`Voice Command: "${transcript}"`, ...prev]);
        
        if (transcript.includes('open terminal')) openApp(AppId.TERMINAL);
        else if (transcript.includes('open browser') || transcript.includes('open internet')) openApp(AppId.QUANTUM_BROWSER);
        else if (transcript.includes('close window')) {
             if (activeWindowId) closeWindow(activeWindowId);
        }
        else if (transcript.includes('switch theme') || transcript.includes('toggle theme')) {
            setTheme(t => t === 'dark' ? 'light' : 'dark');
        }
        else if (transcript.includes('lock system')) setIsLocked(true);
        
        setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // --- Window Manager Logic ---

  const openApp = (appId: AppId, data?: any) => {
    setShowStartMenu(false); // Close start menu if open
    const config = appConfigs.find(a => a.id === appId);
    if (!config) return;

    const existing = windows.find(w => w.appId === appId && !data); // Simple singleton check unless opening specific file
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
        title: config.name,
        x: 100 + (windows.length * 30) % 300, 
        y: 100 + (windows.length * 30) % 200,
        width: config.defaultSize?.width || 800,
        height: config.defaultSize?.height || 600,
        zIndex: getMaxZIndex() + 1,
        isMinimized: false,
        isMaximized: false,
        data
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
    
    // Play sound
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
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  };

  const resizeWindow = (id: string, width: number, height: number) => {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, width, height } : w));
  }

  const getMaxZIndex = () => {
    return windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 10;
  };

  // --- File System Operations ---
  const handleOpenFile = (file: VirtualFile) => {
      if (file.type === 'code') {
          openApp(AppId.CODE_NEXUS, file);
      }
      // Add logic for image viewer or text editor
  };

  const handleSaveFile = (fileId: string, content: string) => {
      setFileSystem(prev => updateFileContent(prev, fileId, content));
      setNotifications(prev => ['System: File Saved to Quantum Core', ...prev]);
  };

  // --- Sound Engine (Mock) ---
  const playSound = (type: 'open' | 'close' | 'hover') => {
      // In a real app, use AudioContext. simple placeholder:
      // const audio = new Audio(`/sounds/${type}.mp3`); audio.play();
  };

  // Context Menu Handler
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
  }

  // --- Renderers ---

  const renderAppContent = (win: WindowState) => {
    switch (win.appId) {
      case AppId.PROFILE: return <ProfileApp />;
      case AppId.PROJECTS: return <ProjectsApp />;
      case AppId.NEURO_AI: return <NeuroAIApp />;
      case AppId.MATTER_SHAPER: return <MatterShaperApp />;
      case AppId.QUANTUM_CHESS: return <QuantumChessApp />;
      case AppId.TERMINAL: return <TerminalApp fileSystem={fileSystem} onUpdateFileSystem={setFileSystem} />;
      case AppId.HOLO_FILES: return <HoloFilesApp fileSystem={fileSystem} onOpenFile={handleOpenFile} onNavigate={() => {}} />;
      case AppId.CODE_NEXUS: return <CodeNexusApp initialFile={win.data} onSave={handleSaveFile} />;
      case AppId.QUANTUM_RADIO: return <QuantumRadioApp />;
      case AppId.QUANTUM_BROWSER: return <QuantumBrowserApp />;
      case AppId.COSMIC_CANVAS: return <CosmicCanvasApp />;
      case AppId.CALCULATOR: return <CalculatorApp />;
      case AppId.NEURAL_CAM: return <NeuralCamApp />;
      case AppId.SETTINGS: return <SettingsApp theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} currentWallpaper={wallpaper} setWallpaper={setWallpaper} />;
      case AppId.STICKY_NOTES: return <div className="p-4 h-full bg-yellow-100 text-black font-handwriting outline-none" contentEditable>Remember to synchronize the quantum entanglement arrays...</div>;
      default: return null;
    }
  };

  const getWallpaperGradient = () => {
      switch (wallpaper) {
          case 'cyberpunk_city': return 'bg-gradient-to-br from-[#2b003e] via-[#0f0c29] to-[#302b63]';
          case 'nebula_drift': return 'bg-gradient-to-br from-[#432371] via-[#faae7b] to-[#c779d0]';
          case 'quantum_void': 
          default:
              return theme === 'dark' ? 'bg-gradient-to-br from-chronos-dark via-[#0a0a1a] to-black' : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50';
      }
  }

  if (isCrashed) {
      return (
          <div className="w-screen h-screen bg-blue-900 text-white font-mono flex flex-col items-center justify-center p-8 select-none">
              <h1 className="text-9xl mb-4">:(</h1>
              <p className="text-2xl mb-8">Your quantum coherence has been lost.</p>
              <p>Error Code: QUANTUM_DECOHERENCE_EXCEPTION</p>
              <button onClick={() => window.location.reload()} className="mt-8 px-4 py-2 border border-white hover:bg-white hover:text-blue-900">REBOOT SYSTEM</button>
          </div>
      );
  }

  if (isBooting) {
      return (
          <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-neuro-cyan font-mono z-[9999]">
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-neuro-cyan animate-[shimmer_2s_infinite]"></div>
              </div>
              <p className="animate-pulse">INITIALIZING NEURAL KERNEL...</p>
              <div className="text-xs text-gray-500 mt-2">
                  <p>Loading modules...</p>
                  <p>Mounting VFS...</p>
                  <p>Establishing link...</p>
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
      
      {/* 1. Lock Screen Layer */}
      {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}

      {/* 2. Background Layer */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${getWallpaperGradient()}`}>
        <NeuralInterface theme={theme} />
      </div>

      {/* 3. Desktop Environment (Only visible if unlocked) */}
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
                    <SystemMonitor /> {/* Desktop Widget */}
                    
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
                <div className="absolute top-10 left-4 w-64 glass-panel rounded-xl p-4 z-[60] animate-in slide-in-from-top-2 fade-in">
                    <div className="mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neuro-purple to-neuro-cyan"></div>
                        <span className="font-bold">Guest User</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {appConfigs.slice(0, 8).map(app => (
                            <button key={app.id} onClick={() => openApp(app.id)} className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition" title={app.name}>
                                <app.icon size={20} className={app.color} />
                            </button>
                        ))}
                    </div>
                    <button className="w-full text-left px-3 py-2 hover:bg-white/10 rounded flex items-center gap-2 text-sm"><LogOut size={14}/> Sign Out</button>
                </div>
            )}

            {/* Control Center */}
            {showControlCenter && (
                <div className="absolute top-10 right-4 w-72 glass-panel rounded-xl p-4 z-[60] animate-in slide-in-from-top-2 fade-in flex flex-col gap-4">
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
                    <div className="bg-white/5 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <Sun size={14} className="text-gray-400" />
                            <div className="flex-1 h-1 bg-gray-600 rounded-full"><div className="w-3/4 h-full bg-white rounded-full"></div></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Volume2 size={14} className="text-gray-400" />
                            <div className="flex-1 h-1 bg-gray-600 rounded-full"><div className="w-1/2 h-full bg-white rounded-full"></div></div>
                        </div>
                    </div>
                    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="w-full py-2 bg-white/10 rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-white/20">
                        {theme === 'dark' ? <Moon size={14}/> : <Sun size={14}/>} Toggle Theme
                    </button>
                </div>
            )}

            {/* Calendar Popover */}
            {showCalendar && (
                <div className="absolute top-10 right-16 w-64 glass-panel rounded-xl p-4 z-[60] animate-in slide-in-from-top-2 fade-in">
                    <h3 className="text-center font-bold mb-4">{new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h3>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-gray-500">{d}</span>)}
                        {Array.from({length: 30}).map((_, i) => (
                            <span key={i} className={`p-1 rounded hover:bg-white/10 cursor-pointer ${i + 1 === new Date().getDate() ? 'bg-neuro-purple text-white' : ''}`}>{i+1}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Notification Center */}
            {showNotifications && (
                <div className="absolute top-10 right-12 mt-2 w-80 glass-panel rounded-xl p-4 animate-in fade-in zoom-in-95 z-50">
                    <h4 className="font-bold mb-2 pb-2 border-b border-white/10 flex justify-between">
                        Notifications
                        <span className="text-xs text-neuro-cyan cursor-pointer" onClick={() => setNotifications([])}>Clear</span>
                    </h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {notifications.map((n, i) => (
                            <div key={i} className="text-xs p-3 bg-white/5 rounded border-l-2 border-neuro-purple">
                                {n}
                            </div>
                        ))}
                        {notifications.length === 0 && <div className="text-center text-gray-500 py-4">No new notifications</div>}
                    </div>
                </div>
            )}

            {/* Desktop Icons */}
            <div className="absolute top-12 left-4 z-0 flex flex-col gap-4">
                 <div onClick={() => openApp(AppId.HOLO_FILES)} className="group flex flex-col items-center gap-1 cursor-pointer w-20 p-2 rounded hover:bg-white/10 transition">
                     <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30 group-hover:scale-105 transition"><FileText className="text-blue-400" /></div>
                     <span className="text-xs text-white drop-shadow-md text-center">My Files</span>
                 </div>
                 <div className="group flex flex-col items-center gap-1 cursor-pointer w-20 p-2 rounded hover:bg-white/10 transition">
                     <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-400/30 group-hover:scale-105 transition"><Trash2 className="text-red-400" /></div>
                     <span className="text-xs text-white drop-shadow-md text-center">Recycle Bin</span>
                 </div>
                 <div onClick={() => openApp(AppId.STICKY_NOTES)} className="group flex flex-col items-center gap-1 cursor-pointer w-20 p-2 rounded hover:bg-white/10 transition">
                     <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-400/30 group-hover:scale-105 transition"><StickyNote className="text-yellow-400" /></div>
                     <span className="text-xs text-white drop-shadow-md text-center">Notes</span>
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
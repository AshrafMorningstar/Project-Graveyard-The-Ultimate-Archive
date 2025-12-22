/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
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

import { AppId, WindowState, VirtualFile } from './types';
import { Bell, Wifi, Battery, Search } from 'lucide-react';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>(['System: Quantum Core Initialized']);
  const [showNotifications, setShowNotifications] = useState(false);

  // Theme Handling
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-mode');
    }
  }, [theme]);

  // --- Window Manager Logic ---

  const openApp = (appId: AppId, data?: any) => {
    const config = appConfigs.find(a => a.id === appId);
    if (!config) return;

    // Bring to front if already open (simple singleton for now, could allow multiple)
    // For this version, let's allow single instances per App ID to keep it clean, 
    // BUT CodeNexus can handle multiple if we wanted. Let's stick to singleton for simplicity UI.
    const existing = windows.find(w => w.appId === appId);
    if (existing) {
        focusWindow(existing.id);
        if (existing.isMinimized) {
            setWindows(prev => prev.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
        }
        // Update data if passed (e.g. opening a file in existing editor)
        if (data) {
             setWindows(prev => prev.map(w => w.id === existing.id ? { ...w, data } : w));
        }
        return;
    }

    const newWindow: WindowState = {
        id: Date.now().toString(),
        appId,
        title: config.name,
        x: 100 + windows.length * 30, // Cascade
        y: 100 + windows.length * 30,
        width: config.defaultSize?.width || 800,
        height: config.defaultSize?.height || 600,
        zIndex: getMaxZIndex() + 1,
        isMinimized: false,
        isMaximized: false,
        data
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
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

  const getMaxZIndex = () => {
    return windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 10;
  };

  const handleOpenFile = (file: VirtualFile) => {
      if (file.type === 'code') {
          openApp(AppId.CODE_NEXUS, file);
      }
      // Can add Image Viewer later
  };

  // --- Renderers ---

  const renderAppContent = (win: WindowState) => {
    const commonProps = { theme };
    switch (win.appId) {
      case AppId.PROFILE: return <ProfileApp />;
      case AppId.PROJECTS: return <ProjectsApp />;
      case AppId.NEURO_AI: return <NeuroAIApp />;
      case AppId.MATTER_SHAPER: return <MatterShaperApp />;
      case AppId.QUANTUM_CHESS: return <QuantumChessApp />;
      case AppId.TERMINAL: return <TerminalApp />;
      case AppId.HOLO_FILES: return <HoloFilesApp onOpenFile={handleOpenFile} />;
      case AppId.CODE_NEXUS: return <CodeNexusApp initialFile={win.data} />;
      case AppId.QUANTUM_RADIO: return <QuantumRadioApp />;
      case AppId.SETTINGS: return <SettingsApp theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />;
      default: return null;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-gray-900 dark:text-white selection:bg-neuro-purple selection:text-neuro-cyan font-inter">
      
      {/* 1. Lock Screen Layer */}
      {isLocked && <LockScreen onUnlock={() => setIsLocked(false)} />}

      {/* 2. Background Layer */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${theme === 'dark' ? 'bg-gradient-to-br from-chronos-dark via-[#0a0a1a] to-black' : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50'}`}>
        <NeuralInterface theme={theme} />
      </div>

      {/* 3. Desktop Environment (Only visible if unlocked) */}
      {!isLocked && (
        <>
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-1.5 bg-white/70 dark:bg-black/40 backdrop-blur-md border-b border-white/10 text-xs font-medium select-none text-gray-800 dark:text-gray-300 shadow-sm">
                <div className="flex items-center gap-4">
                    <span className="font-bold font-space-grotesk text-sm hover:text-neuro-cyan transition-colors cursor-pointer">⌘ Eigenfolio</span>
                    {activeWindowId && (
                        <span className="font-bold text-neuro-purple hidden md:inline animate-in fade-in slide-in-from-left-2">
                            {windows.find(w => w.id === activeWindowId)?.title}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <SystemMonitor /> {/* Desktop Widget */}
                    
                    <div className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer">
                        <Wifi size={14} /> 
                    </div>
                    <div className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer">
                        <Battery size={14} />
                    </div>
                    <div className="relative">
                        <div 
                            className="hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer flex items-center gap-2"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Bell size={14} />
                            {notifications.length > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                        </div>
                         {showNotifications && (
                            <div className="absolute top-full right-0 mt-2 w-64 glass-panel rounded-xl p-4 animate-in fade-in zoom-in-95 z-50">
                                <h4 className="font-bold mb-2 pb-2 border-b border-white/10">Notifications</h4>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {notifications.map((n, i) => (
                                        <div key={i} className="text-xs p-2 bg-white/5 rounded">
                                            {n}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <span className="font-mono">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Window Layer */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                {/* Pointer events auto enables interaction with windows, while inset-0 lets clicks pass through to desktop if no window */}
                <div className="w-full h-full pointer-events-auto"> 
                    {windows.map(win => (
                        <WindowFrame
                            key={win.id}
                            window={win}
                            onClose={closeWindow}
                            onMinimize={minimizeWindow}
                            onFocus={focusWindow}
                            onMove={moveWindow}
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
        </>
      )}
    </div>
  );
};

export default App;
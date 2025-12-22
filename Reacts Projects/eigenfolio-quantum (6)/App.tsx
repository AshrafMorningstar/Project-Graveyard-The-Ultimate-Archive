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
import NebulaDock from './components/NebulaDock';
import ProfileApp from './components/apps/ProfileApp';
import ProjectsApp from './components/apps/ProjectsApp';
import NeuroAIApp from './components/apps/NeuroAIApp';
import MatterShaperApp from './components/apps/MatterShaperApp';
import QuantumChessApp from './components/apps/QuantumChessApp';
import SettingsApp from './components/apps/SettingsApp';
import TerminalApp from './components/apps/TerminalApp';
import { AppId } from './types';
import { X, Minus, Square, Bell, Wifi, Battery, Search } from 'lucide-react';

const App: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [displayApp, setDisplayApp] = useState<AppId | null>(null);
  const [animationClass, setAnimationClass] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notifications, setNotifications] = useState<string[]>(['System: Quantum Core Initialized']);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Apply theme to html root
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-mode');
    }
  }, [theme]);

  // Handle window Open/Close animations
  useEffect(() => {
    if (activeApp) {
      setDisplayApp(activeApp);
      setIsMinimized(false);
      setAnimationClass('window-enter');
    } else {
      if (displayApp) {
        setAnimationClass('window-exit');
        // Wait for animation to finish before unmounting
        const timer = setTimeout(() => {
          setDisplayApp(null);
          setAnimationClass('');
        }, 300); // Matches .window-exit duration
        return () => clearTimeout(timer);
      }
    }
  }, [activeApp]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderAppContent = (appId: AppId) => {
    switch (appId) {
      case AppId.PROFILE: return <ProfileApp />;
      case AppId.PROJECTS: return <ProjectsApp />;
      case AppId.NEURO_AI: return <NeuroAIApp />;
      case AppId.MATTER_SHAPER: return <MatterShaperApp />;
      case AppId.QUANTUM_CHESS: return <QuantumChessApp />;
      case AppId.TERMINAL: return <TerminalApp />;
      case AppId.SETTINGS: return <SettingsApp theme={theme} toggleTheme={toggleTheme} />;
      default: return null;
    }
  };

  const closeApp = () => setActiveApp(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white dark:bg-chronos-dark text-gray-900 dark:text-white selection:bg-neuro-purple selection:text-neuro-cyan transition-colors duration-500">
      {/* Background Layer */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 ${theme === 'dark' ? 'bg-gradient-to-br from-chronos-dark via-chronos-blue to-chronos-space' : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50'}`}>
        <NeuralInterface theme={theme} />
      </div>

      {/* Top Menu Bar */}
      <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2 bg-white/80 dark:bg-chronos-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 text-xs font-medium select-none text-gray-800 dark:text-gray-300">
         <div className="flex items-center gap-6">
            <span className="font-bold font-space-grotesk text-sm">⌘ Eigenfolio</span>
            <span className="hidden md:inline hover:text-neuro-purple cursor-pointer transition">File</span>
            <span className="hidden md:inline hover:text-neuro-purple cursor-pointer transition">Edit</span>
            <span className="hidden md:inline hover:text-neuro-purple cursor-pointer transition">View</span>
            <span className="hidden md:inline hover:text-neuro-purple cursor-pointer transition">Window</span>
            <span className="hidden md:inline hover:text-neuro-purple cursor-pointer transition">Help</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer">
                <Battery size={14} /> 100%
            </div>
            <div className="flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer">
                <Wifi size={14} /> QuantumNet
            </div>
            <div className="hover:bg-black/5 dark:hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer">
                <Search size={14} />
            </div>
            <div className="relative">
                <div 
                    className="hover:bg-black/5 dark:hover:bg-white/10 px-2 py-1 rounded transition cursor-pointer flex items-center gap-2"
                    onClick={() => setShowNotifications(!showNotifications)}
                >
                    <Bell size={14} />
                    {notifications.length > 0 && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                </div>
                {/* Notification Dropdown */}
                {showNotifications && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-chronos-dark border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2">
                        <h4 className="font-bold mb-3 pb-2 border-b border-gray-100 dark:border-white/5 text-gray-900 dark:text-white">Notifications</h4>
                        <div className="space-y-2">
                            {notifications.map((n, i) => (
                                <div key={i} className="text-xs p-2 bg-gray-50 dark:bg-white/5 rounded hover:bg-gray-100 dark:hover:bg-white/10 cursor-default">
                                    {n}
                                </div>
                            ))}
                            {notifications.length === 0 && <div className="text-gray-400 text-center py-2">No new alerts</div>}
                        </div>
                    </div>
                )}
            </div>
            <span className="font-mono">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
         </div>
      </div>

      {/* Main Desktop Area / Window */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 md:p-8 pb-24 pointer-events-none pt-16">
        
        {/* Empty State / Desktop Clock */}
        {!activeApp && !displayApp && (
           <div className="text-center animate-float pointer-events-auto select-none">
             <h1 className={`text-6xl md:text-8xl font-space-grotesk font-bold text-transparent bg-clip-text tracking-tighter transition-all duration-500
               ${theme === 'dark' ? 'bg-gradient-to-b from-white to-white/10' : 'bg-gradient-to-b from-gray-800 to-gray-400'}
             `}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </h1>
             <p className={`font-mono tracking-[0.3em] mt-4 opacity-70 transition-colors duration-500 ${theme === 'dark' ? 'text-quantum-glow' : 'text-neuro-purple'}`}>
                SYSTEM: ONLINE // {theme === 'dark' ? 'QUANTUM' : 'SOLAR'} STABLE
             </p>
           </div>
        )}

        {/* The Window */}
        {displayApp && (
          <div className={`
             pointer-events-auto
             w-full max-w-6xl h-[80vh] 
             backdrop-blur-2xl 
             rounded-2xl shadow-2xl 
             flex flex-col overflow-hidden
             transition-all duration-500 ease-in-out
             ${isMinimized ? 'scale-0 opacity-0 translate-y-[500px]' : 'scale-100 opacity-100'}
             ${animationClass}
             ${theme === 'dark' ? 'bg-chronos-dark/60 border border-white/10' : 'bg-white/70 border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]'}
          `}>
            {/* Window Bar */}
            <div className={`flex items-center justify-between px-4 py-3 select-none border-b transition-colors
               ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white/50 border-gray-200'}
            `} onDoubleClick={() => {}}>
              <div className="flex gap-2">
                <button onClick={closeApp} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition shadow-sm" />
                <button onClick={() => setIsMinimized(true)} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition shadow-sm" />
                <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition shadow-sm" />
              </div>
              <div className={`text-xs font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                 {displayApp.replace('_', ' ')}
              </div>
              <div className="w-10"></div> {/* Spacer for center alignment */}
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-hidden relative">
               {renderAppContent(displayApp)}
            </div>
          </div>
        )}
      </main>

      {/* Dock */}
      <NebulaDock 
        activeApp={activeApp} 
        onOpenApp={(id) => {
          setActiveApp(id);
          setIsMinimized(false);
        }} 
      />

      {/* Decorative Overlay Vignette - Only in Dark Mode */}
      {theme === 'dark' && <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,16,0.8)_100%)] z-40"></div>}
    </div>
  );
};

export default App;
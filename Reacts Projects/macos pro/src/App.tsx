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

import { useEffect, useState } from 'react';
import { apps } from './config/apps';
import { useStore } from './store/useStore';
import Dock from './components/ui/Dock';
import Menubar from './components/ui/Menubar';
import Window from './components/ui/Window';
import LoginScreen from './components/ui/LoginScreen';
import { Spotlight } from './components/ui/Spotlight';
import { Apple } from 'lucide-react';

function App() {
  const { appStates, theme } = useStore();
  const [booting, setBooting] = useState(true);
  const [locked, setLocked] = useState(true);
  const [spotlightOpen, setSpotlightOpen] = useState(false);

  useEffect(() => {
    // Simulate boot up
    const timer = setTimeout(() => setBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setLocked(false);
    // Play sound potentially
  };

  if (booting) {
      return (
          <div className="h-screen w-screen bg-black flex items-center justify-center text-white flex-col gap-8 cursor-none">
              <Apple size={80} className="fill-white text-white mb-4" />
              <div className="w-48 h-1 bg-[#333] rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full animate-load"></div>
              </div>
          </div>
      )
  }

  return (
    <div className={`h-screen w-screen overflow-hidden bg-cover bg-center select-none relative font-sans transition-all duration-500 ${theme}`}>
      {/* Dynamic Wallpaper wrapper to handle brightness/theme nicely */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-[-1]"
        style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=3270&auto=format&fit=crop')",
            filter: theme === 'dark' ? 'brightness(0.7)' : 'brightness(1)'
        }} 
      />
      
      {/* Dim overlay when locked */}
      <div className={`absolute inset-0 bg-black/0 transition-all duration-1000 z-[9000] pointer-events-none ${locked ? 'backdrop-blur-xl bg-black/40 pointer-events-auto' : 'backdrop-blur-none'}`} />

      {locked && <LoginScreen onLogin={handleLogin} />}

      {!locked && (
        <div className="animate-in fade-in zoom-in duration-1000 h-full w-full relative">
            <Menubar onOpenSpotlight={() => setSpotlightOpen(true)} />

            <main className="absolute inset-0 top-[30px] z-0 overflow-hidden" id="desktop">
                {/* Windows Layer */}
                {apps.map(app => (
                    <Window 
                        key={app.id} 
                        config={app} 
                        state={appStates[app.id] || { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 }} 
                    />
                ))}
            </main>

            <Spotlight isOpen={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
            <Dock />
        </div>
      )}
      
      <style>{`
        @keyframes load {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        .animate-load {
            animation: load 2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default App

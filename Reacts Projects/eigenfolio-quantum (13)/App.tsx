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

import React, { useState, useEffect } from 'react';
import NeuralInterface from './components/NeuralInterface';
import NebulaDock from './components/NebulaDock';
import WindowManager from './components/WindowManager';
import Desktop from './components/Desktop';
import CosmicProfile from './components/CosmicProfile';
import NeuroAI from './components/NeuroAI';
import QuantumChess from './components/QuantumChess';
import { useSystemStore, audio } from './store';
import { 
  FileExplorer, TextEditor, WebBrowser, Calculator, SnakeGame,
  ChronosTerminal, SystemPreferences, CosmicCalendar, MatterShaper, MediaPlayer
} from './components/SystemApps';
import { 
  Atom, Wifi, Battery, Command, Bluetooth, Moon, Sun, Volume2, Search, Power, Lock
} from 'lucide-react';

// --- BOOT SEQUENCE ---
const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    
    useEffect(() => {
        const sequence = [
            "QUANTUM BIOS v4.0.2 - (C) 2045 EIGEN CORP",
            "CHECKING MEMORY... 128TB OK",
            "LOADING NEURAL KERNEL...",
            "INITIALIZING QPU CORES [0...1024] OK",
            "MOUNTING VFS... OK",
            "ESTABLISHING SECURE UPLINK...",
            "SYSTEM READY."
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if (i >= sequence.length) {
                clearInterval(interval);
                setTimeout(onComplete, 1000);
            } else {
                setLines(prev => [...prev, sequence[i]]);
                i++;
            }
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-black font-mono text-green-500 p-8 text-sm">
            <div className="mb-8">
                <pre>{`
  ___  __  ____  ____  _  _  ____  __   __    __  __  
 / __)(  )(  _ \\(  __)( \\/ )(  __)(  ) (  )  (  )(  ) 
( (__  )(  ) _ < ) _) / \\/ \\ ) _)  )(__ )(__  )(__)(  
 \\___)(__)(____/(____)\\_)(_/(__)  (____)(____)(______) 
                `}</pre>
            </div>
            {lines.map((l, i) => <div key={i}>{l}</div>)}
            <div className="animate-pulse mt-2">_</div>
        </div>
    );
};

// --- LOGIN SCREEN ---
const LoginScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
    const { user } = useSystemStore();
    const [password, setPassword] = useState("");
    
    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80')] bg-cover">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>
             <div className="relative z-10 flex flex-col items-center animate-scale-in">
                 <img src={user.avatar} className="w-32 h-32 rounded-full border-4 border-white/20 mb-6 shadow-2xl" />
                 <h2 className="text-3xl font-space font-bold text-white mb-2">{user.name}</h2>
                 <form onSubmit={(e) => { e.preventDefault(); audio.playOpen(); onUnlock(); }} className="flex flex-col gap-4 w-64">
                     <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-center text-white outline-none focus:border-cyan-400 transition-all backdrop-blur-md" autoFocus />
                     <button type="submit" className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/50 rounded-lg py-2 transition-all flex items-center justify-center gap-2 font-bold"><Lock size={16}/> UNLOCK</button>
                 </form>
             </div>
        </div>
    );
};

const App: React.FC = () => {
  const { bootStatus, setBootStatus, wallpaper, accentColor, systemStatus, updateSystemStatus, openWindow } = useSystemStore();
  const [showQuickSettings, setShowQuickSettings] = useState(false);

  // Status Bar Clock
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  // Registry
  const appComponents: Record<string, React.FC<any>> = {
      'profile': CosmicProfile,
      'ai-lab': NeuroAI,
      'games': QuantumChess,
      'terminal': ChronosTerminal,
      'settings': SystemPreferences,
      'explorer': FileExplorer,
      'editor': TextEditor,
      'browser': WebBrowser,
      'calculator': Calculator,
      'calendar': CosmicCalendar, 
      'draw': MatterShaper,
      'media': MediaPlayer
  };

  const wallpaperClass = wallpaper === 'nebula' 
    ? 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black'
    : 'bg-chronos-dark';

  if (bootStatus === 'booting') return <BootSequence onComplete={() => setBootStatus('login')} />;
  if (bootStatus === 'login') return <LoginScreen onUnlock={() => setBootStatus('active')} />;
  if (bootStatus === 'off') return <div className="fixed inset-0 bg-black flex items-center justify-center text-white font-mono">POWER OFF</div>;

  return (
    <div 
        className={`relative min-h-screen w-full overflow-hidden text-white font-inter transition-colors duration-1000 ${wallpaperClass}`}
        style={{ '--neuro-cyan': accentColor === 'cyan' ? '#00F5FF' : accentColor === 'purple' ? '#3A0CA3' : '#FF00FF' } as React.CSSProperties}
        onContextMenu={(e) => e.preventDefault()}
    >
      <NeuralInterface />
      <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 z-0 mix-blend-overlay" />
      
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-4 text-xs font-medium text-white/70 select-none">
          <div className="flex items-center gap-4">
              <span className="font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => openWindow('settings')}> Eigenfolio</span>
              <div className="flex gap-4">
                  <span className="hover:text-white cursor-pointer">File</span>
                  <span className="hover:text-white cursor-pointer">Edit</span>
                  <span className="hover:text-white cursor-pointer">View</span>
                  <span className="hover:text-white cursor-pointer">Go</span>
                  <span className="hover:text-white cursor-pointer">Window</span>
                  <span className="hover:text-white cursor-pointer">Help</span>
              </div>
          </div>
          <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition-colors" onClick={() => setShowQuickSettings(!showQuickSettings)}>
                  <Bluetooth size={12}/>
                  <Wifi size={12}/> 
                  <div className="flex items-center gap-1"><Battery size={12}/> <span>{systemStatus.battery}%</span></div>
                  <Search size={12}/>
                  <span className="ml-2 font-mono">{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
          </div>
      </div>

      {/* Quick Settings Panel */}
      {showQuickSettings && (
          <div className="fixed top-10 right-4 w-72 bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 z-[60] shadow-2xl animate-scale-in">
              <div className="grid grid-cols-2 gap-2 mb-4">
                  <button className="flex flex-col items-center gap-2 p-3 bg-cyan-500/20 rounded-xl text-cyan-400 border border-cyan-500/30 transition-all hover:bg-cyan-500/30"><Wifi size={20}/> <span className="text-xs font-bold">Wi-Fi</span></button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl text-white/50 border border-white/5 hover:bg-white/10 transition-all"><Bluetooth size={20}/> <span className="text-xs font-bold">Bluetooth</span></button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl text-white/50 border border-white/5 hover:bg-white/10 transition-all"><Moon size={20}/> <span className="text-xs font-bold">Focus</span></button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl text-white/50 border border-white/5 hover:bg-white/10 transition-all"><Command size={20}/> <span className="text-xs font-bold">AirDrop</span></button>
              </div>
              <div className="space-y-4 mb-2">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2 text-white/50 mb-1 px-1"><Sun size={14}/> <span className="text-[10px] uppercase font-bold">Display</span></div>
                      <input type="range" className="w-full h-1 bg-white/20 rounded-full appearance-none accent-white"/>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2 text-white/50 mb-1 px-1"><Volume2 size={14}/> <span className="text-[10px] uppercase font-bold">Sound</span></div>
                      <input type="range" className="w-full h-1 bg-white/20 rounded-full appearance-none accent-white"/>
                  </div>
              </div>
          </div>
      )}

      <Desktop />
      <WindowManager components={appComponents} />
      <NebulaDock />
    </div>
  );
};

export default App;

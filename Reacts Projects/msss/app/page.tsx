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

'use client';

import React from 'react';
import { NeuralInterface } from '@/components/quantum-core/NeuralInterface';
import { NebulaDock } from '@/components/cosmos-ui/NebulaDock';
import { useDockStore } from '@/stores/cosmos/dock-store';
import { useSystemStore } from '@/stores/system/system-store';
import { StarWindow } from '@/components/cosmos-ui/StarWindow';
import { QuantumChess } from '@/components/neuro-games/QuantumChess';
import { AnimatePresence } from 'framer-motion';
import { NotificationCenter } from '@/components/cosmos-ui/NotificationCenter';

// System Components
import { LockScreen } from '@/components/system/LockScreen';
import { DesktopIcons } from '@/components/system/DesktopIcons';
import { SpotlightSearch } from '@/components/system/SpotlightSearch';
import { Launchpad } from '@/components/system/Launchpad';
import { SystemTray } from '@/components/system/SystemTray';

// App Components
import { ChronosTerminal } from '@/components/eigen-apps/ChronosTerminal';
import { ProjectNebula } from '@/components/eigen-apps/ProjectNebula';
import { CosmicProfile } from '@/components/eigen-apps/CosmicProfile';
import { NeuroAI } from '@/components/eigen-apps/NeuroAI';
import { MatterShaper } from '@/components/eigen-apps/MatterShaper';
import { CosmicMusic } from '@/components/eigen-apps/CosmicMusic';
import { SystemMonitor } from '@/components/eigen-apps/SystemMonitor';
import { HoloGallery } from '@/components/eigen-apps/HoloGallery';
import { QuantumCalc } from '@/components/eigen-apps/QuantumCalc';
import { StellarBrowser } from '@/components/eigen-apps/StellarBrowser';
import { ChronosCalendar } from '@/components/eigen-apps/ChronosCalendar';
import { QuantumFiles } from '@/components/eigen-apps/QuantumFiles';
import { WeatherWarp } from '@/components/eigen-apps/WeatherWarp';
import { TaskVortex } from '@/components/eigen-apps/TaskVortex';
import { CodeCosmos } from '@/components/eigen-apps/CodeCosmos';
import { QuantumClock } from '@/components/eigen-apps/QuantumClock';
import { PixelPaint } from '@/components/eigen-apps/PixelPaint';
import { CosmicContacts } from '@/components/eigen-apps/CosmicContacts';
import { NebulaTranslate } from '@/components/eigen-apps/NebulaTranslate';
import { HelpDocs } from '@/components/eigen-apps/HelpDocs';
import { QuantumMail } from '@/components/eigen-apps/QuantumMail';
import { NebulaNews } from '@/components/eigen-apps/NebulaNews';
import { CryptoTicker } from '@/components/eigen-apps/CryptoTicker';
import { VoiceMemos } from '@/components/eigen-apps/VoiceMemos';
import { QuantumStore } from '@/components/eigen-apps/QuantumStore';
import { CosmicCamera } from '@/components/eigen-apps/CosmicCamera';
import { TicTacToe } from '@/components/eigen-apps/TicTacToe';
import { PomodoroTimer } from '@/components/eigen-apps/PomodoroTimer';
import { MarkdownEditor } from '@/components/eigen-apps/MarkdownEditor';
import { UnitConverter } from '@/components/eigen-apps/UnitConverter';
import { RecycleBin } from '@/components/eigen-apps/RecycleBin';
import { QuantumNotes } from '@/components/eigen-apps/QuantumNotes';

export default function Home() {
  const { activeApp } = useDockStore();
  const { isLocked } = useSystemStore();

  const renderApp = () => {
    switch (activeApp) {
      case 'profile':
        return <StarWindow id="profile" title="Cosmic Profile"><CosmicProfile /></StarWindow>;
      case 'games':
        return <StarWindow id="games" title="Neural Games Suite" width={900} height={800}><QuantumChess /></StarWindow>;
      case 'projects':
        return <StarWindow id="projects" title="Project Nebula Repository"><ProjectNebula /></StarWindow>;
      case 'terminal':
        return <StarWindow id="terminal" title="Chronos Terminal"><ChronosTerminal /></StarWindow>;
      case 'ai':
        return <StarWindow id="ai" title="Neuro AI Interface" width={700} height={600}><NeuroAI /></StarWindow>;
      case 'shaper':
        return <StarWindow id="shaper" title="Matter Shaper" width={900} height={600}><MatterShaper /></StarWindow>;
      case 'music':
        return <StarWindow id="music" title="Cosmic Music" width={400} height={500}><CosmicMusic /></StarWindow>;
      case 'monitor':
        return <StarWindow id="monitor" title="System Monitor" width={700} height={500}><SystemMonitor /></StarWindow>;
      case 'gallery':
        return <StarWindow id="gallery" title="Holographic Gallery" width={800} height={600}><HoloGallery /></StarWindow>;
      case 'calc':
        return <StarWindow id="calc" title="Quantum Calculator" width={320} height={500}><QuantumCalc /></StarWindow>;
      case 'browser':
        return <StarWindow id="browser" title="Stellar Browser" width={1000} height={700}><StellarBrowser /></StarWindow>;
      case 'calendar':
        return <StarWindow id="calendar" title="Chronos Calendar" width={800} height={600}><ChronosCalendar /></StarWindow>;
      case 'files':
        return <StarWindow id="files" title="Quantum Files" width={800} height={500}><QuantumFiles /></StarWindow>;
      case 'weather':
        return <StarWindow id="weather" title="Weather Warp" width={700} height={500}><WeatherWarp /></StarWindow>;
      case 'tasks':
        return <StarWindow id="tasks" title="Task Vortex" width={900} height={600}><TaskVortex /></StarWindow>;
      case 'code':
        return <StarWindow id="code" title="Code Cosmos" width={1000} height={700}><CodeCosmos /></StarWindow>;
      case 'clock':
        return <StarWindow id="clock" title="Quantum Clock" width={500} height={400}><QuantumClock /></StarWindow>;
      case 'paint':
        return <StarWindow id="paint" title="Pixel Paint" width={400} height={500}><PixelPaint /></StarWindow>;
      case 'contact':
      case 'contacts':
        return <StarWindow id="contacts" title="Cosmic Contacts" width={800} height={600}><CosmicContacts /></StarWindow>;
      case 'translate':
        return <StarWindow id="translate" title="Nebula Translate" width={600} height={400}><NebulaTranslate /></StarWindow>;
      case 'help':
        return <StarWindow id="help" title="Help & Docs" width={700} height={600}><HelpDocs /></StarWindow>;
      case 'mail':
        return <StarWindow id="mail" title="Quantum Mail" width={1000} height={700}><QuantumMail /></StarWindow>;
      case 'news':
        return <StarWindow id="news" title="Nebula News" width={900} height={700}><NebulaNews /></StarWindow>;
      case 'crypto':
        return <StarWindow id="crypto" title="Crypto Ticker" width={400} height={600}><CryptoTicker /></StarWindow>;
      case 'recorder':
        return <StarWindow id="recorder" title="Voice Memos" width={350} height={500}><VoiceMemos /></StarWindow>;
      case 'store':
        return <StarWindow id="store" title="Quantum Store" width={1000} height={700}><QuantumStore /></StarWindow>;
      case 'camera':
        return <StarWindow id="camera" title="Cosmic Camera" width={800} height={600}><CosmicCamera /></StarWindow>;
      case 'tictactoe':
        return <StarWindow id="tictactoe" title="Quantum Tic-Tac-Toe" width={400} height={500}><TicTacToe /></StarWindow>;
      case 'pomodoro':
        return <StarWindow id="pomodoro" title="Focus Timer" width={400} height={500}><PomodoroTimer /></StarWindow>;
      case 'editor':
        return <StarWindow id="editor" title="Markdown Editor" width={800} height={600}><MarkdownEditor /></StarWindow>;
      case 'converter':
        return <StarWindow id="converter" title="Unit Converter" width={400} height={500}><UnitConverter /></StarWindow>;
      case 'trash':
        return <StarWindow id="trash" title="Recycle Bin" width={600} height={400}><RecycleBin /></StarWindow>;
      case 'notes':
        return <StarWindow id="notes" title="Quantum Notes" width={800} height={600}><QuantumNotes /></StarWindow>;
      default:
        return null;
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-chronos-dark selection:bg-neuro-purple selection:text-neuro-cyan font-inter">
      {/* Lock Screen */ }
      <AnimatePresence>
        {isLocked && <LockScreen />}
      </AnimatePresence>

      {/* Background Neural Interface */}
      <NeuralInterface />
      
      {!isLocked && (
        <div className="relative z-10 w-full h-full pb-32">
          {/* Top Bar */ }
          <header className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md flex items-center px-4 justify-between z-50 pointer-events-auto border-b border-white/5 shadow-2xl">
              <div className="flex items-center gap-4 text-sm font-medium text-white/90">
                  <span className="font-bold"> Eigenfolio</span>
                  <span className="hidden md:inline hover:text-quantum-glow cursor-pointer transition-colors">File</span>
                  <span className="hidden md:inline hover:text-quantum-glow cursor-pointer transition-colors">Edit</span>
                  <span className="hidden md:inline hover:text-quantum-glow cursor-pointer transition-colors">View</span>
                  <span className="hidden md:inline hover:text-quantum-glow cursor-pointer transition-colors">Window</span>
                  <span className="hidden md:inline hover:text-quantum-glow cursor-pointer transition-colors">Help</span>
              </div>
              
              <div className="flex items-center gap-6">
                  <SystemTray />
                  <NotificationCenter />
                  <div className="flex items-center gap-4 text-sm text-white/90 font-quantum">
                      <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
              </div>
          </header>

          {/* Draggable Desktop Icons */}
          <DesktopIcons />

          {/* Launchpad Overlay */}
          <Launchpad />

          {/* Spotlight Search Overlay */}
          <SpotlightSearch />

          {/* Windows Rendering */}
          <AnimatePresence>
            {activeApp && <div className="pointer-events-auto">{renderApp()}</div>}
          </AnimatePresence>

          {/* Dock */}
          <NebulaDock />
        </div>
      )}
    </main>
  );
}

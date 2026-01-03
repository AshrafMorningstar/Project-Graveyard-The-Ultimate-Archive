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

import React from 'react';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Window from './components/Window';
import useStore, { APPS } from './store/useStore';
import { apps } from './configs/apps';

// App Contents
import Portfolio from './apps/Portfolio';
import Skills from './apps/Skills';
import Articles from './apps/Articles';
import Contact from './apps/Contact';
import Gallery from './apps/Gallery';
import Archive from './apps/Archive';
import Terminal from './apps/Terminal';
import Login from './components/Login';
import NeuroAI from './apps/NeuroAI';
import MatterShaper from './apps/MatterShaper';
import CosmicProfile from './apps/CosmicProfile';
import NotificationCenter from './components/NotificationCenter';
import SystemPreferences from './apps/SystemPreferences';

import MusicPlayer from './apps/MusicPlayer';
import Calculator from './apps/Calculator';
import Notepad from './apps/Notepad';
import Calendar from './apps/Calendar';

import Finder from './apps/Finder';
import Safari from './apps/Safari';
import Messages from './apps/Messages';
import VSCode from './apps/VSCode';
import Weather from './apps/Weather';
import CameraApp from './apps/Camera';
import Paint from './apps/Paint';
import TicTacToe from './apps/TicTacToe';

import Mail from './apps/Mail';
import Maps from './apps/Maps';
import Reminders from './apps/Reminders';
import Photos from './apps/Photos';
import Clock from './apps/Clock';
import Stocks from './apps/Stocks';
import VoiceMemos from './apps/VoiceMemos';
import Contacts from './apps/Contacts';
import Books from './apps/Books';
import Github from './apps/Github';
import { Pages, Numbers, Keynote } from './apps/Office';
import ActivityMonitor from './apps/ActivityMonitor';
import DiskUtility from './apps/DiskUtility';
import Podcasts from './apps/Podcasts';
import AppStore from './apps/AppStore';
import Translate from './apps/Translate';
import { Solitaire, Chess, Sudoku, Minesweeper, Game2048, DinoRun } from './apps/GamesCollection';
import { Dictionary, FontBook, Grapher, ColorMeter } from './apps/UtilitiesCollection';
import { Freeform, Stickies, TextEdit } from './apps/ProductivityCollection';
import { FaceTime, Wallet, Shortcuts, TimeMachine, DevTools } from './apps/SystemCollection';
import RecycleBin from './apps/RecycleBin';

import Home from './apps/Home';
import FindMy from './apps/FindMy';
import Spotlight from './components/Spotlight';

import BootScreen from './components/BootScreen';
import ContextMenu from './components/ContextMenu';
import Launchpad from './components/Launchpad';

const AppComponents = {
  [APPS.PORTFOLIO]: Portfolio,
  [APPS.SKILLS]: Skills,
  [APPS.ARTICLES]: Articles,
  [APPS.CONTACT]: Contact,
  [APPS.GALLERY]: Gallery,
  [APPS.ARCHIVE]: Archive,
  [APPS.TERMINAL]: Terminal,
  [APPS.NEURO_AI]: NeuroAI,
  [APPS.MATTER_SHAPER]: MatterShaper,
  [APPS.PROFILE]: CosmicProfile,
  [APPS.SETTINGS]: SystemPreferences,
  [APPS.MUSIC]: MusicPlayer,
  [APPS.CALCULATOR]: Calculator,
  [APPS.NOTEPAD]: Notepad,
  [APPS.CALENDAR]: Calendar,
  [APPS.FINDER]: Finder,
  [APPS.SAFARI]: Safari,
  [APPS.MESSAGES]: Messages,
  [APPS.VSCODE]: VSCode,
  [APPS.WEATHER]: Weather,
  [APPS.CAMERA]: CameraApp,
  [APPS.PAINT]: Paint,
  [APPS.TICTACTOE]: TicTacToe,
  [APPS.MAIL]: Mail,
  [APPS.MAPS]: Maps,
  [APPS.REMINDERS]: Reminders,
  [APPS.PHOTOS]: Photos,
  [APPS.CLOCK]: Clock,
  [APPS.STOCKS]: Stocks,
  [APPS.VOICEMEMOS]: VoiceMemos,
  [APPS.CONTACTS]: Contacts,
  [APPS.BOOKS]: Books,
  [APPS.GITHUB]: Github,
  [APPS.PAGES]: Pages,
  [APPS.NUMBERS]: Numbers,
  [APPS.KEYNOTE]: Keynote,
  [APPS.ACTIVITY]: ActivityMonitor,
  [APPS.DISK]: DiskUtility,
  [APPS.PODCASTS]: Podcasts,
  [APPS.APPSTORE]: AppStore,
  [APPS.TRANSLATE]: Translate,
  [APPS.HOME]: Home,
  [APPS.FINDMY]: FindMy,
  [APPS.SOLITAIRE]: Solitaire,
  [APPS.CHESS]: Chess,
  [APPS.SUDOKU]: Sudoku,
  [APPS.MINESWEEPER]: Minesweeper,
  [APPS.GAME2048]: Game2048,
  [APPS.DINORUN]: DinoRun,
  [APPS.DICTIONARY]: Dictionary,
  [APPS.FONTBOOK]: FontBook,
  [APPS.GRAPHER]: Grapher,
  [APPS.COLORMETER]: ColorMeter,
  [APPS.FREEFORM]: Freeform,
  [APPS.STICKIES]: Stickies,
  [APPS.TEXTEDIT]: TextEdit,
  [APPS.FACETIME]: FaceTime,
  [APPS.WALLET]: Wallet,
  [APPS.SHORTCUTS]: Shortcuts,
  [APPS.TIMEMACHINE]: TimeMachine,
  [APPS.DEVTOOLS]: DevTools,
  [APPS.RECYCLEBIN]: RecycleBin,
};

function App() {
  const { isLoggedIn, theme, wallpaper } = useStore();

  if (!isLoggedIn) {
      return <Login />;
  }

  return (
    <div className={`w-screen h-screen overflow-hidden bg-cover bg-center relative font-sans text-white selection:bg-blue-500/30 ${theme}`}
         style={{ backgroundImage: `url('${wallpaper}')` }}
    >
      <BootScreen />
      <ContextMenu />
      <Launchpad />

      <div className="absolute inset-0 bg-transparent dark:bg-black/20 pointer-events-none transition-colors duration-500" />
      
      {/* Menu Bar */}
      <MenuBar />
      
      {/* Notifications */}
      <NotificationCenter />
      
      {/* Spotlight */}
      <Spotlight />

      {/* Desktop Area / Windows */}
      <div className="absolute inset-0 pt-8 pb-20 z-0">
         {apps.map((app) => {
            const Component = AppComponents[app.id];
            if (!Component) return null;

            return (
              <Window key={app.id} id={app.id} title={app.title}>
                <Component />
              </Window>
            );
         })}
      </div>

      {/* Dock */}
      <Dock />

      {/* Boot overlay or loading could go here */}
    </div>
  );
}

export default App;

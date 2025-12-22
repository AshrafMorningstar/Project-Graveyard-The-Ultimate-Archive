/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

﻿/**
 * @file NebulaDock.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * ðŸŒŒ Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { AppId, AppConfig } from '../types';
import {
    Layout,
    Terminal,
    User,
    Folder,
    FolderOpen,
    Files,
    Cpu,
    Palette,
    Globe,
    Music,
    Camera,
    Cloud,
    CloudSun,
    StickyNote,
    Brain,
    Trash2,
    Calendar,
    Clock,
    Mail,
    List,
    Activity,
    HardDrive,
    Map as MapIcon,
    Image,
    TrendingUp,
    Gamepad2,
    Code2,
    PenTool,
    Radio,
    Calculator,
    Settings,
    FileText,
    LayoutGrid,
    Users,
    Book,
    Mic,
    Crown,
    Grid3x3,
    Bomb,
    BookA,
    Languages,
    Home,
    MapPin,
    Video,
    ShoppingBag,
    Headphones,
    MonitorPlay,
    Table,
    Github,
    Download,
    Rocket // Added for Launchpad if needed, or use LayoutGrid
} from 'lucide-react';

interface NebulaDockProps {
  openApps: AppId[];
  onOpenApp: (id: AppId) => void;
}

export const apps: AppConfig[] = [
  { id: AppId.LAUNCHPAD, name: 'Launchpad', icon: LayoutGrid, color: 'text-neuro-cyan', defaultSize: { width: 1000, height: 800 } },
  { id: AppId.PROFILE, name: 'Cosmic Profile', icon: User, color: 'text-neuro-purple', defaultSize: { width: 900, height: 700 } },
  { id: AppId.PROJECTS, name: 'Project Nebula', icon: Folder, color: 'text-quantum-energy', defaultSize: { width: 1000, height: 700 } },
  { id: AppId.QUANTUM_BROWSER, name: 'Quantum Net', icon: Globe, color: 'text-pink-500', defaultSize: { width: 1000, height: 750 } },
  { id: AppId.HOLO_FILES, name: 'HoloFiles', icon: Files, color: 'text-yellow-500', defaultSize: { width: 800, height: 600 } },
  { id: AppId.NOTES, name: 'Notes', icon: FileText, color: 'text-yellow-400', defaultSize: { width: 800, height: 600 } },
  { id: AppId.CODE_NEXUS, name: 'Code Nexus', icon: Code2, color: 'text-blue-400', defaultSize: { width: 900, height: 700 } },
  { id: AppId.NEURO_AI, name: 'Neuro AI', icon: Brain, color: 'text-neuro-cyan', defaultSize: { width: 500, height: 700 } },
  { id: AppId.COSMIC_CANVAS, name: 'Cosmic Canvas', icon: Palette, color: 'text-orange-500', defaultSize: { width: 800, height: 600 } },
  { id: AppId.NEURAL_CAM, name: 'Neural Cam', icon: Camera, color: 'text-red-400', defaultSize: { width: 640, height: 520 } },
  { id: AppId.WEATHER, name: 'Atmosphere', icon: CloudSun, color: 'text-sky-400', defaultSize: { width: 400, height: 600 } },
  { id: AppId.MATTER_SHAPER, name: 'Matter Shaper', icon: PenTool, color: 'text-quantum-matter', defaultSize: { width: 1000, height: 700 } },
  { id: AppId.QUANTUM_RADIO, name: 'Quantum Radio', icon: Radio, color: 'text-red-500', defaultSize: { width: 400, height: 500 } },
  { id: AppId.CALCULATOR, name: 'Calculator', icon: Calculator, color: 'text-green-400', defaultSize: { width: 320, height: 450 } },
  { id: AppId.TERMINAL, name: 'Chronos Terminal', icon: Terminal, color: 'text-green-500', defaultSize: { width: 700, height: 500 } },
  { id: AppId.STICKY_NOTES, name: 'Stickies', icon: StickyNote, color: 'text-yellow-300', defaultSize: { width: 300, height: 300 } },
  { id: AppId.SETTINGS, name: 'System Core', icon: Settings, color: 'text-gray-400', defaultSize: { width: 800, height: 600 } },
  { id: AppId.RECYCLE_BIN, icon: Trash2, name: 'Recycle Bin', defaultSize: { width: 800, height: 600 }, color: 'text-red-400' },
  // Productivity
  { id: AppId.MAIL, icon: Mail, name: 'Mail', defaultSize: { width: 900, height: 600 }, color: 'text-blue-500' },
  { id: AppId.CALENDAR, icon: Calendar, name: 'Calendar', defaultSize: { width: 800, height: 600 }, color: 'text-red-500' },
  { id: AppId.REMINDERS, icon: List, name: 'Reminders', defaultSize: { width: 400, height: 600 }, color: 'text-orange-500' },
  { id: AppId.CLOCK, icon: Clock, name: 'Clock', defaultSize: { width: 600, height: 400 }, color: 'text-white' },
  // System
  { id: AppId.ACTIVITY_MONITOR, icon: Activity, name: 'Activity Monitor', defaultSize: { width: 700, height: 500 }, color: 'text-green-500' },
  { id: AppId.DISK_UTILITY, icon: HardDrive, name: 'Disk Utility', defaultSize: { width: 800, height: 500 }, color: 'text-gray-500' },
  { id: AppId.MAPS, icon: MapIcon, name: 'Maps', defaultSize: { width: 900, height: 600 }, color: 'text-purple-500' },
  // Media & Lifestyle
  { id: AppId.PHOTOS, icon: Image, name: 'Photos', defaultSize: { width: 900, height: 600 }, color: 'text-pink-500' },
  { id: AppId.STOCKS, icon: TrendingUp, name: 'Stocks', defaultSize: { width: 900, height: 600 }, color: 'text-gray-200' },
  // Games
  { id: AppId.SOLITAIRE, icon: Gamepad2, name: 'Solitaire', defaultSize: { width: 800, height: 600 }, color: 'text-green-600' },
  { id: AppId.CHESS, icon: Crown, name: 'Chess', defaultSize: { width: 600, height: 600 }, color: 'text-white' },
  { id: AppId.SUDOKU, icon: Grid3x3, name: 'Sudoku', defaultSize: { width: 500, height: 600 }, color: 'text-blue-400' },
  { id: AppId.MINESWEEPER, icon: Bomb, name: 'Minesweeper', defaultSize: { width: 400, height: 500 }, color: 'text-red-600' },
  { id: AppId.GAME_2048, icon: LayoutGrid, name: '2048', defaultSize: { width: 400, height: 500 }, color: 'text-yellow-500' },
  // Lifestyle
  { id: AppId.HOME, icon: Home, name: 'Home', defaultSize: { width: 800, height: 600 }, color: 'text-yellow-500' },
  { id: AppId.FIND_MY, icon: MapPin, name: 'Find My', defaultSize: { width: 800, height: 600 }, color: 'text-green-500' },
  { id: AppId.PODCASTS, icon: Headphones, name: 'Podcasts', defaultSize: { width: 900, height: 600 }, color: 'text-purple-500' },
  { id: AppId.FACETIME, icon: Video, name: 'FaceTime', defaultSize: { width: 800, height: 600 }, color: 'text-green-500' },
  { id: AppId.APP_STORE, icon: ShoppingBag, name: 'App Store', defaultSize: { width: 1000, height: 700 }, color: 'text-blue-500' },
  // Utilities & Tools
  { id: AppId.CONTACTS, icon: Users, name: 'Contacts', defaultSize: { width: 800, height: 500 }, color: 'text-gray-500' },
  { id: AppId.BOOKS, icon: Book, name: 'Books', defaultSize: { width: 900, height: 700 }, color: 'text-orange-400' },
  { id: AppId.VOICE_MEMOS, icon: Mic, name: 'Voice Memos', defaultSize: { width: 800, height: 500 }, color: 'text-red-500' },
  { id: AppId.DICTIONARY, icon: BookA, name: 'Dictionary', defaultSize: { width: 800, height: 600 }, color: 'text-gray-500' },
  { id: AppId.TRANSLATE, icon: Languages, name: 'Translate', defaultSize: { width: 800, height: 600 }, color: 'text-blue-400' },
  // Office
  { id: AppId.PAGES, icon: FileText, name: 'Pages', defaultSize: { width: 900, height: 700 }, color: 'text-orange-500' },
  { id: AppId.NUMBERS, icon: Table, name: 'Numbers', defaultSize: { width: 900, height: 700 }, color: 'text-green-500' },
  { id: AppId.KEYNOTE, icon: MonitorPlay, name: 'Keynote', defaultSize: { width: 900, height: 700 }, color: 'text-blue-500' },
  { id: AppId.TICTACTOE, icon: Gamepad2, name: 'Tic Tac Toe', defaultSize: { width: 400, height: 500 }, color: 'text-cyan-400' },
  { id: AppId.GITHUB, icon: Github, name: 'GitHub Pro', defaultSize: { width: 1000, height: 800 }, color: 'text-white' },
];

const NebulaDock: React.FC<NebulaDockProps> = ({ openApps, onOpenApp }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-[95vw] overflow-x-auto overflow-y-hidden pb-4 pt-2 scrollbar-hide flex justify-center">
      <div className="glass-panel px-4 py-3 rounded-2xl flex gap-3 md:gap-4 items-end transition-all duration-300 hover:scale-[1.01] bg-white/20 dark:bg-chronos-dark/60 backdrop-blur-xl border border-white/20 shadow-2xl min-w-fit mx-auto">
        {apps.map((app) => (
          <div key={app.id} className="relative group flex flex-col items-center">
            {/* Tooltip */}
            <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 dark:bg-white/90 backdrop-blur text-white dark:text-black px-3 py-1 rounded-full text-xs font-bold font-space-grotesk tracking-wide pointer-events-none shadow-lg whitespace-nowrap z-50 transform translate-y-2 group-hover:translate-y-0">
              {app.name}
            </div>

            {/* Icon */}
            <button
              onClick={() => onOpenApp(app.id)}
              className={`p-2 md:p-2.5 rounded-xl transition-all duration-300 relative group-hover:-translate-y-3 group-hover:scale-110
                ${openApps.includes(app.id) 
                  ? 'bg-white/10 dark:bg-white/5 border-b-2 border-neuro-cyan shadow-[0_0_15px_rgba(0,245,255,0.2)]' 
                  : 'hover:bg-white/20 dark:hover:bg-white/10'}
              `}
            >
              <app.icon className={`w-6 h-6 md:w-8 md:h-8 ${app.color} drop-shadow-lg transition-transform`} />
              
              {/* Active Dot */}
              {openApps.includes(app.id) && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neuro-cyan shadow-[0_0_5px_#00F5FF]" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NebulaDock;

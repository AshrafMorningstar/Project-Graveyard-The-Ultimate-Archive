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

import { AppId, WindowState, VirtualFile, WallpaperId } from './types';
import { Bell, Wifi, Battery, Search, Mic, RefreshCw, LogOut, Terminal, Moon, Sun, Volume2, Bluetooth, Grid, FileText, Trash2, StickyNote, Folder, CloudSun, X } from 'lucide-react';
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
    }, 2500); 

    // Load Settings
    const savedTheme = localStorage.getItem('eigen_theme');
    if (savedTheme) setTheme(savedTheme as any);

    // Load Window Session (Optional - enabled for realism)
    const savedSession = localStorage.getItem('eigen_session');
    if (savedSession) {
        try {
            const parsedWindows = JSON.parse(savedSession);
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
      return () => window.remove
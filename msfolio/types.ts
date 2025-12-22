/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file types.ts
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';

export type AppId = 'finder' | 'projects' | 'ai-chat' | 'tictactoe' | 'memory' | 'settings' | 'browser' | 'terminal' | 'mail' | 'about' | 'calculator' | 'notepad' | 'music' | 'files' | 'paint' | 'snake' | 'tasks' | 'camera' | 'weather' | 'code' | 'video' | 'calendar';

export interface AppConfig {
  id: AppId;
  title: string;
  icon: string;
  component: React.ComponentType;
  defaultWidth: number;
  defaultHeight: number;
  mobileWidth?: string;
  mobileHeight?: string;
}

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  featured?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  appId?: AppId;
  read: boolean;
}

export interface SystemSettings {
  wallpaper: string;
  accentColor: string;
  darkMode: boolean;
  crtEffect: boolean;
  soundEnabled: boolean;
}

export interface SystemState {
    wifi: boolean;
    bluetooth: boolean;
    airplaneMode: boolean;
    volume: number;
    brightness: number;
    batteryLevel: number;
    isCharging: boolean;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  content?: string; // For text files
  image?: string; // For image files
  children?: FileNode[];
  parentId: string | null;
}

export interface Process {
  id: number;
  name: string;
  cpu: number;
  memory: number;
  appId: AppId;
}
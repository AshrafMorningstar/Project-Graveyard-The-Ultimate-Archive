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

export type AppId = 'finder' | 'projects' | 'ai-chat' | 'tictactoe' | 'memory' | 'settings' | 'browser' | 'terminal' | 'mail' | 'about';

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
}

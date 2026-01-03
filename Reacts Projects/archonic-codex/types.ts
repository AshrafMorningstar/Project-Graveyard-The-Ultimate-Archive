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
import { LucideIcon } from 'lucide-react';

export interface AppConfig {
  id: string;
  title: string;
  icon: LucideIcon;
  component: React.ReactNode;
  width?: number;
  height?: number;
  defaultX?: number;
  defaultY?: number;
  isFull?: boolean;
}

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export enum Theme {
  MIDNIGHT = 'midnight',
  COSMIC = 'cosmic',
  DESERT = 'desert',
  FOREST = 'forest',
  OCEAN = 'ocean',
  NEON = 'neon'
}

export const WALLPAPERS = {
  [Theme.MIDNIGHT]: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2068&auto=format&fit=crop',
  [Theme.COSMIC]: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
  [Theme.DESERT]: 'https://images.unsplash.com/photo-1663431261867-2157796d1911?q=80&w=2070&auto=format&fit=crop',
  [Theme.FOREST]: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2070&auto=format&fit=crop',
  [Theme.OCEAN]: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2070&auto=format&fit=crop',
  [Theme.NEON]: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop'
};
/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

export type Theme = 'dark' | 'light';

export type AppID = 'profile' | 'projects' | 'ai-lab' | 'games' | 'terminal' | 'settings' | 'monitor' | 'notes' | 'radio' | 'calendar' | 'draw' | 'explorer' | 'browser' | 'calculator' | 'editor' | 'media' | 'trash' | 'task-manager';

export interface WindowState {
  id: string;
  appId: AppID;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  data?: any;
  snapState?: 'left' | 'right' | 'none';
}

export interface UserProfile {
  name: string;
  avatar: string; // URL
  role: 'admin' | 'guest';
  githubUsername?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  image?: string; 
  timestamp: number;
  sources?: Array<{ title: string; url: string }>;
  suggestions?: string[];
}

export enum GeminiModelType {
  FAST = 'fast',
  THINKING = 'thinking',
  SEARCH = 'search',
  IMAGE_GEN = 'image-gen',
  VISION = 'vision'
}

export interface ImageGenConfig {
  size: '1K' | '2K' | '4K';
  aspectRatio: '1:1' | '16:9' | '4:3' | '9:16';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
  read: boolean;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'dir';
  content?: string;
  parentId: string | null;
  children?: string[];
  icon?: string;
  color?: string;
  createdAt: number;
  size: number; // in bytes
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'deadline' | 'reminder';
}

export interface DesktopItem {
  id: string;
  fileId: string; 
  x: number;
  y: number;
}

export interface SystemStatus {
  battery: number;
  isCharging: boolean;
  wifiStrength: number; // 0-4
  volume: number;
  brightness: number;
}

export interface BrowserTab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  loading: boolean;
  history: string[]; // Back stack
}

export interface SystemProcess {
  id: string;
  name: string;
  pid: number;
  cpu: number; // Percentage
  memory: number; // MB
  status: 'running' | 'sleeping' | 'zombie';
}

export interface ClipboardItem {
  id: string;
  text: string;
  timestamp: number;
}

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
 * 🌌 QubitFlow OS - The Quantum Computing Interface
 * "The future is unwritten, but the code is compiled."
 */

export enum AppId {
  PROFILE = 'profile',
  PROJECTS = 'projects',
  NEURO_AI = 'neuro_ai',
  MATTER_SHAPER = 'matter_shaper',
  QUANTUM_CHESS = 'quantum_chess',
  TERMINAL = 'terminal',
  SETTINGS = 'settings',
  HOLO_FILES = 'holo_files',
  CODE_NEXUS = 'code_nexus',
  QUANTUM_RADIO = 'quantum_radio',
  QUANTUM_BROWSER = 'quantum_browser',
  COSMIC_CANVAS = 'cosmic_canvas',
  CALCULATOR = 'calculator',
  NEURAL_CAM = 'neural_cam',
  STICKY_NOTES = 'sticky_notes',
  WEATHER = 'weather',
  TASK_MANAGER = 'task_manager'
}

export type WallpaperId = 'quantum_void' | 'cyberpunk_city' | 'nebula_drift' | 'matrix_rain';

export interface AppConfig {
  id: AppId;
  name: string;
  icon: any; // Lucide Icon type
  color: string;
  defaultSize?: { width: number; height: number };
}

export interface WindowState {
  id: string; // Unique instance ID
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  data?: any; // Extra data passed to the app (e.g., file to open)
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isLoading?: boolean;
  groundingMetadata?: any; 
  image?: string; 
}

export enum ModelType {
  FAST = 'fast',
  THINKING = 'thinking',
  CREATIVE = 'creative',
  IMAGE_GEN = 'image_gen'
}

export interface ImageGenerationConfig {
  prompt: string;
  aspectRatio: "1:1" | "3:4" | "4:3" | "16:9" | "9:16";
  size: "1K" | "2K" | "4K";
}

export interface VirtualFile {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'image' | 'code' | 'trash';
  language?: string;
  content?: string;
  children?: VirtualFile[];
  parentId?: string;
  createdAt: number;
}

export interface FileSystemState {
  root: VirtualFile;
  clipboard: VirtualFile | null;
  operation: 'copy' | 'cut' | null;
}

export interface SystemSettings {
    volume: number;
    brightness: number;
    wifiEnabled: boolean;
    bluetoothEnabled: boolean;
    airplaneMode: boolean;
    doNotDisturb: boolean;
    crtEffect: boolean;
    blueLightFilter: boolean;
    aiVoiceEnabled: boolean;
    aiPersona: 'helpful' | 'sarcastic' | 'robot';
}

export interface WeatherData {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    city: string;
}
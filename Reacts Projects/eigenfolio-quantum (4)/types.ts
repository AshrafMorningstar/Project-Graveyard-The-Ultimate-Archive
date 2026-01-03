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

export enum AppId {
  PROFILE = 'profile',
  PROJECTS = 'projects',
  NEURO_AI = 'neuro_ai',
  MATTER_SHAPER = 'matter_shaper',
  QUANTUM_CHESS = 'quantum_chess',
  TERMINAL = 'terminal',
  SETTINGS = 'settings'
}

export interface AppConfig {
  id: AppId;
  name: string;
  icon: any; // Lucide Icon type
  color: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isLoading?: boolean;
  groundingMetadata?: any; // For search grounding links
  image?: string; // Base64 for user uploads or generated images
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

export interface QuantumPiece {
  id: string;
  type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
  color: 'w' | 'b';
  position: string; // e.g., "e4"
  isSuperposition: boolean;
}
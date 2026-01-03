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

export type Theme = 'dark' | 'light';

export type AppSection = 'profile' | 'projects' | 'ai-lab' | 'games';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  image?: string; // For displayed images in chat
  timestamp: number;
  sources?: Array<{
    title: string;
    url: string;
  }>;
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
  aspectRatio: '1:1' | '16:9' | '4:3';
}

export interface QuantumParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

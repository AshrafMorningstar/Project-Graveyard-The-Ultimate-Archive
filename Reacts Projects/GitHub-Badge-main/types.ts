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

export enum BadgeType {
  EARNABLE = 'Earnable',
  HIGHLIGHT = 'Highlight',
  RETIRED = 'Retired'
}

export type BadgeRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

export type BadgeCategory = 'Contribution' | 'Collaboration' | 'Community' | 'Special';

export interface Badge {
  id: string;
  icon: string;
  name: string;
  description: string;
  howToEarn: string;
  type: BadgeType;
  rarity: BadgeRarity;
  category: BadgeCategory;
  tiers?: string[];
  tips?: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface AchievementGuide {
  id: string;
  title: string;
  steps: string[];
}

export interface UserStats {
  username: string;
  avatarUrl: string;
  totalStars: number;
  mergedPRs: number;
}

export type SortOption = 'name' | 'type' | 'rarity' | 'category';
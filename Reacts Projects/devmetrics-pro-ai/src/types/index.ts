/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// Created by AshrafMorningstar
// GitHub: https://github.com/AshrafMorningstar

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface Week {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

export interface UserData {
  contributionsCollection: ContributionsCollection;
}

export interface AnalyticsData {
  contributions: ContributionsCollection;
  startDate: string;
  endDate: string;
  skills?: any[];
  timeline?: any[];
  achievements?: any[];
}

export interface RPGStats {
  level: number;
  class: "Code Wizard" | "Bug Hunter" | "Architect" | "Speedster" | "Paladin";
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  experience: {
    current: number;
    nextLevel: number;
    progress: number;
  };
}

export interface DeveloperData {
  username: string;
  contributions: ContributionsCollection;
  repositories: Repository[];
  startDate: string;
  endDate: string;
  rpgStats?: RPGStats;
  skills?: any[];
  achievements?: any[];
}

export interface Repository {
  name: string;
  languages: string[];
  stargazersCount: number;
  features: string[];
}

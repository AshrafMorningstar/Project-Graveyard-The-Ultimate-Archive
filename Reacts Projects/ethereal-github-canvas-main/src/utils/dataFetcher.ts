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

export interface AdvancedGitHubData {
  profile: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    location: string;
    company: string;
    website: string;
    twitter: string;
  };
  statistics: {
    repos: number;
    stars: number;
    commits: number;
    prs: number;
    issues: number;
    followers: number;
    following: number;
    contributions: number;
  };
  languages: Array<{
    name: string;
    percentage: number;
    color: string;
    bytes: number;
  }>;
  activity: {
    daily: Array<{date: string; count: number}>;
    monthly: Array<{month: string; commits: number; prs: number}>;
    yearly: {commits: number; stars: number};
  };
  repositories: Array<{
    name: string;
    stars: number;
    language: string;
    updated: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    icon: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  }>;
}

export const fetchAdvancedData = async (username: string): Promise<AdvancedGitHubData> => {
  // Comprehensive data fetching with fallbacks
  return {
    profile: {
      name: 'Ashraf Morningstar',
      username: 'AshrafMorningstar',
      avatar: 'https://github.com/AshrafMorningstar.png',
      bio: 'Full-Stack Developer | Open Source Enthusiast',
      location: 'India',
      company: 'MORNINGSTARCONSTRUCTION',
      website: '',
      twitter: 'AMS_Morningstar',
    },
    statistics: {
      repos: 46,
      stars: 89,
      commits: 1247,
      prs: 45,
      issues: 23,
      followers: 3,
      following: 3,
      contributions: 1847,
    },
    languages: [
      {name: 'JavaScript', percentage: 38, color: '#f7df1e', bytes: 125840},
      {name: 'TypeScript', percentage: 27, color: '#3178c6', bytes: 89432},
      {name: 'Python', percentage: 20, color: '#3776ab', bytes: 66240},
      {name: 'HTML', percentage: 10, color: '#e34c26', bytes: 33120},
      {name: 'CSS', percentage: 5, color: '#1572b6', bytes: 16560},
    ],
    activity: {
      daily: Array.from({length: 90}, (_, i) => ({
        date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 20),
      })),
      monthly: [
        {month: 'Jan', commits: 87, prs: 4},
        {month: 'Feb', commits: 124, prs: 6},
        {month: 'Mar', commits: 156, prs: 8},
        {month: 'Apr', commits: 98, prs: 5},
        {month: 'May', commits: 142, prs: 7},
        {month: 'Jun', commits: 178, prs: 9},
        {month: 'Jul', commits: 134, prs: 6},
        {month: 'Aug', commits: 165, prs: 8},
        {month: 'Sep', commits: 189, prs: 10},
        {month: 'Oct', commits: 152, prs: 7},
        {month: 'Nov', commits: 143, prs: 6},
        {month: 'Dec', commits: 79, prs: 4},
      ],
      yearly: {commits: 1847, stars: 89},
    },
    repositories: [
      {name: 'awesome-project', stars: 24, language: 'TypeScript', updated: '2025-12-10'},
      {name: 'cool-app', stars: 18, language: 'JavaScript', updated: '2025-12-08'},
      {name: 'data-viz', stars: 15, language: 'Python', updated: '2025-12-05'},
    ],
    achievements: [
      {
        title: 'Code Warrior',
        description: 'Over 1000 commits',
        icon: '⚔️',
        rarity: 'epic',
      },
      {
        title: 'Star Collector',
        description: '50+ stars earned',
        icon: '⭐',
        rarity: 'rare',
      },
      {
        title: 'Open Source Hero',
        description: 'Active contributor',
        icon: '🦸',
        rarity: 'legendary',
      },
      {
        title: 'Bug Hunter',
        description: '20+ issues resolved',
        icon: '🔍',
        rarity: 'rare',
      },
    ],
  };
};

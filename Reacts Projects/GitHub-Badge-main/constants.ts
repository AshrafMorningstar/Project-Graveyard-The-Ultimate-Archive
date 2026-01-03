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

import { Badge, BadgeType, AchievementGuide } from './types';

export const BADGES: Badge[] = [
  // Earnable
  {
    id: 'starstruck',
    icon: '⭐',
    name: 'Starstruck',
    description: 'Create a repository that captures the community\'s attention.',
    howToEarn: 'Have a repository that receives stars.',
    type: BadgeType.EARNABLE,
    rarity: 'Common',
    category: 'Community',
    tiers: ['Base (16)', 'Bronze (128)', 'Silver (512)', 'Gold (4096)'],
    tips: ['Share your projects on social media.', 'Write a great README.', 'Solve a real problem.']
  },
  {
    id: 'quickdraw',
    icon: '⚡',
    name: 'Quickdraw',
    description: 'Fastest fingers in the west.',
    howToEarn: 'Close an issue or PR within 5 minutes of opening it.',
    type: BadgeType.EARNABLE,
    rarity: 'Rare',
    category: 'Contribution',
    tiers: ['One-time achievement'],
    tips: ['Open an issue on your own repo and close it immediately.', 'Be ready with a fix before opening a PR.']
  },
  {
    id: 'pair-extraordinaire',
    icon: '👯',
    name: 'Pair Extraordinaire',
    description: 'Collaboration is key.',
    howToEarn: 'Co-author a commit in a pull request that gets merged.',
    type: BadgeType.EARNABLE,
    rarity: 'Uncommon',
    category: 'Collaboration',
    tiers: ['Base (10)', 'Bronze (24)', 'Silver (48)', 'Gold (??)'],
    tips: ['Use "Co-authored-by:" in your commit messages.']
  },
  {
    id: 'pull-shark',
    icon: '🦈',
    name: 'Pull Shark',
    description: 'The backbone of open source.',
    howToEarn: 'Have pull requests merged into repositories.',
    type: BadgeType.EARNABLE,
    rarity: 'Common',
    category: 'Contribution',
    tiers: ['Base (2)', 'Bronze (16)', 'Silver (128)', 'Gold (1024)'],
    tips: ['Contribute to open source.', 'Fix typos in documentation.', 'Small bug fixes count!']
  },
  {
    id: 'galaxy-brain',
    icon: '🧠',
    name: 'Galaxy Brain',
    description: 'Sharing wisdom.',
    howToEarn: 'Have your answer accepted in a GitHub Discussion.',
    type: BadgeType.EARNABLE,
    rarity: 'Uncommon',
    category: 'Community',
    tiers: ['Base (2)', 'Bronze (8)', 'Silver (16)', 'Gold (32)'],
    tips: ['Look for "Unanswered" discussions.', 'Provide clear, code-backed answers.']
  },
  {
    id: 'yolo',
    icon: '🚀',
    name: 'YOLO',
    description: 'Living dangerously.',
    howToEarn: 'Merge a pull request without code review.',
    type: BadgeType.EARNABLE,
    rarity: 'Epic',
    category: 'Special',
    tiers: ['One-time achievement'],
    tips: ['Enable "Allow merging without review" in settings.', 'Merge your own PR immediately.']
  },
  {
    id: 'public-sponsor',
    icon: '💖',
    name: 'Public Sponsor',
    description: 'Supporting the ecosystem.',
    howToEarn: 'Sponsor an open source project via GitHub Sponsors.',
    type: BadgeType.EARNABLE,
    rarity: 'Common',
    category: 'Community',
    tiers: ['One-time achievement']
  },

  // Highlights
  {
    id: 'pro',
    icon: '💼',
    name: 'GitHub Pro',
    description: 'Professional status.',
    howToEarn: 'Subscribe to GitHub Pro.',
    type: BadgeType.HIGHLIGHT,
    rarity: 'Common',
    category: 'Special'
  },
  {
    id: 'dev-program',
    icon: '🛠️',
    name: 'Developer Program Member',
    description: 'Building the future.',
    howToEarn: 'Register for the GitHub Developer Program.',
    type: BadgeType.HIGHLIGHT,
    rarity: 'Uncommon',
    category: 'Community'
  },
  {
    id: 'security-bounty',
    icon: '🐛',
    name: 'Security Bug Bounty Hunter',
    description: 'Keeping GitHub safe.',
    howToEarn: 'Report a valid security vulnerability to GitHub.',
    type: BadgeType.HIGHLIGHT,
    rarity: 'Legendary',
    category: 'Contribution'
  },

  // Retired
  {
    id: 'arctic-code-vault',
    icon: '❄️',
    name: 'Arctic Code Vault Contributor',
    description: 'Preserved for eternity.',
    howToEarn: 'Contributed code to a repository included in the 2020 Snapshot.',
    type: BadgeType.RETIRED,
    rarity: 'Epic',
    category: 'Special'
  },
  {
    id: 'mars-2020',
    icon: '🚁',
    name: 'Mars 2020 Helicopter Contributor',
    description: 'Code on another planet.',
    howToEarn: 'Contributed to a library used by Ingenuity.',
    type: BadgeType.RETIRED,
    rarity: 'Legendary',
    category: 'Special'
  }
];

export const GUIDES: AchievementGuide[] = [
  {
    id: 'guide-quickdraw',
    title: 'How to get Quickdraw ⚡',
    steps: [
      'Create a new issue in one of your own repositories.',
      'Immediately click the "Close issue" button.',
      'Ideally, do this within seconds. The limit is 5 minutes.',
      'Wait up to 24 hours for the badge to appear.'
    ]
  },
  {
    id: 'guide-yolo',
    title: 'How to get YOLO 🚀',
    steps: [
      'Go to a repository you own.',
      'Create a new branch and make a small change (e.g., update README).',
      'Open a Pull Request for this change.',
      'Immediately merge the Pull Request yourself without waiting for a review.',
      'Note: This usually requires branch protection rules to be off or configured to allow admin bypass.'
    ]
  }
];

export const FAQS = [
  {
    q: "Can I hide achievements from my profile?",
    a: "Yes. Click on the achievement in your profile sidebar to open the details view, then toggle the visibility setting."
  },
  {
    q: "Why hasn't my achievement appeared yet?",
    a: "Achievements are not real-time. It can take up to 24-48 hours for the job to run and update your profile."
  },
  {
    q: "Do private contributions count?",
    a: "Generally, no. Most achievements require activity in public repositories. However, highlights like GitHub Pro are account-based."
  }
];
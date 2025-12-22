/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

export interface Project {
  id: string
  name: string
  description: string
  language: string
  url: string
  github: string
  stars: number
  featured: boolean
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'studious-happiness',
    description: 'Full-stack web application with modern tech stack and responsive design',
    language: 'JavaScript',
    url: 'https://github.com/AshrafMorningstar/studious-happiness',
    github: 'AshrafMorningstar',
    stars: 45,
    featured: true,
  },
  {
    id: '2',
    name: 'github-stats-cinematic',
    description: 'Premium GitHub Statistics Generator with cinematic visual effects',
    language: 'TypeScript',
    url: 'https://github.com/AshrafMorningstar/github-stats-cinematic',
    github: 'AshrafMorningstar',
    stars: 320,
    featured: true,
  },
  {
    id: '3',
    name: 'quantum-github-visualizer',
    description: 'Revolutionary Multi-Theme GitHub Stats Visualizer with advanced animations',
    language: 'TypeScript',
    url: 'https://github.com/AshrafMorningstar/quantum-github-visualizer',
    github: 'AshrafMorningstar',
    stars: 280,
    featured: true,
  },
  {
    id: '4',
    name: 'devmetrics-pro-ai',
    description: 'Premium Developer Analytics Platform with AI-powered insights',
    language: 'TypeScript',
    url: 'https://github.com/AshrafMorningstar/devmetrics-pro-ai',
    github: 'AshrafMorningstar',
    stars: 150,
    featured: true,
  },
  {
    id: '5',
    name: 'cyber-github-stats',
    description: 'Cyberpunk-themed GitHub Stats Dashboard with neon aesthetics',
    language: 'TypeScript',
    url: 'https://github.com/AshrafMorningstar/cyber-github-stats',
    github: 'AshrafMorningstar',
    stars: 190,
    featured: true,
  },
  {
    id: '6',
    name: 'QUANTUM-FLUX-VISUALIZER',
    description: '8 Dynamic Themes | 3D WebGL | Particle Networks for GitHub visualization',
    language: 'TypeScript',
    url: 'https://github.com/AshrafMorningstar/QUANTUM-FLUX-VISUALIZER',
    github: 'AshrafMorningstar',
    stars: 410,
    featured: true,
  },
  {
    id: '7',
    name: 'Website-Crash-Tool-Mstar',
    description: 'Website stress testing tool - Tests robustness & performance',
    language: 'Python',
    url: 'https://github.com/AshrafMorningstar/Website-Crash-Tool-Mstar',
    github: 'AshrafMorningstar',
    stars: 85,
    featured: true,
  },
  {
    id: '8',
    name: 'Mstar-Youtube-Auto-Upload-Bot',
    description: 'YouTube automation with Selenium - Seamless video uploads',
    language: 'Python',
    url: 'https://github.com/AshrafMorningstar/Mstar-Youtube-Auto-Upload-Bot',
    github: 'AshrafMorningstar',
    stars: 120,
    featured: true,
  },
  {
    id: '9',
    name: 'New-Mstar-Ad-Blocker',
    description: 'YouTube ad blocker - Uninterrupted video content experience',
    language: 'JavaScript',
    url: 'https://github.com/AshrafMorningstar/New-Mstar-Ad-Blocker',
    github: 'AshrafMorningstar',
    stars: 210,
    featured: true,
  },
  {
    id: '10',
    name: 'My-Work-History',
    description: 'Comprehensive work history & project portfolio since 2009',
    language: 'Documentation',
    url: 'https://github.com/AshrafMorningstar/My-Work-History',
    github: 'AshrafMorningstar',
    stars: 30,
    featured: true,
  },
]

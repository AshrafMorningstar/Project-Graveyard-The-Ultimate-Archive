/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { User, Code, Briefcase, Music, FileText, Github, Mail, Terminal } from 'lucide-react';
import AboutApp from '../apps/AboutApp';
import ProjectsApp from '../apps/ProjectsApp';
import SkillsApp from '../apps/SkillsApp';
import ResumeApp from '../apps/ResumeApp';
// MusicPlayer is a special case, often separate or integrated. I'll include it as an app.
import MusicApp from '../apps/MusicApp';
import TerminalApp from '../apps/TerminalApp';

export const appsConfig = {
  about: { 
    id: 'about', 
    title: 'About Me', 
    icon: User, 
    color: 'bg-blue-500',
    component: AboutApp
  },
  projects: { 
    id: 'projects', 
    title: 'Projects', 
    icon: Code, 
    color: 'bg-purple-500',
    component: ProjectsApp
  },
  skills: { 
    id: 'skills', 
    title: 'Skills', 
    icon: Briefcase, 
    color: 'bg-green-500',
    component: SkillsApp
  },
  music: { 
    id: 'music', 
    title: 'Music', 
    icon: Music, 
    color: 'bg-pink-500',
    component: MusicApp
  },
  resume: { 
    id: 'resume', 
    title: 'Resume', 
    icon: FileText, 
    color: 'bg-yellow-500',
    component: ResumeApp
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: Terminal,
    color: 'bg-gray-900',
    component: TerminalApp
  },
  github: { 
    id: 'github', 
    title: 'GitHub', 
    icon: Github, 
    color: 'bg-gray-800', 
    isExternal: true, 
    url: 'https://github.com/AshrafMorningstar' 
  },
  mail: {
    id: 'mail',
    title: 'Contact',
    icon: Mail,
    color: 'bg-teal-500',
    isExternal: true,
    url: 'mailto:contact@example.com' // Placeholder
  }
};

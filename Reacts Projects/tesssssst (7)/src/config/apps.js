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

import Welcome from '../apps/Welcome';
import Projects from '../apps/Projects';
import Experience from '../apps/Experience';
import Resume from '../apps/Resume';
import Contact from '../apps/Contact';
import Skills from '../apps/Skills';
import Github from '../apps/Github';

export const apps = [
    {
        id: 'welcome',
        title: 'Welcome',
        icon: '👋',
        label: 'Welcome',
        component: Welcome,
        defaultSize: { width: 700, height: 500 }
    },
    {
        id: 'projects',
        title: 'Projects',
        icon: '📁',
        label: 'Projects',
        component: Projects,
        defaultSize: { width: 900, height: 600 }
    },
    {
        id: 'experience',
        title: 'Experience',
        icon: '💼',
        label: 'Experience',
        component: Experience,
        defaultSize: { width: 800, height: 600 }
    },
    {
        id: 'skills',
        title: 'Skills',
        icon: '⚡',
        label: 'Skills',
        component: Skills,
        defaultSize: { width: 800, height: 600 }
    },
    {
        id: 'resume',
        title: 'Resume',
        icon: '📄',
        label: 'Resume',
        component: Resume,
        defaultSize: { width: 800, height: 700 }
    },
    {
        id: 'github',
        title: 'GitHub',
        icon: '🔗', // Using an emoji for now, can replace with SVG later
        label: 'GitHub',
        component: Github,
        defaultSize: { width: 800, height: 600 }
    },
    {
        id: 'contact',
        title: 'Contact',
        icon: '💬',
        label: 'Contact',
        component: Contact,
        defaultSize: { width: 600, height: 500 }
    }
];

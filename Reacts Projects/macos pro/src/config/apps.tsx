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

import { Terminal as TerminalIcon, User, FolderOpen, Globe, Cpu, FolderGit2, Mail, Calculator as CalcIcon } from 'lucide-react';
import About from '../components/apps/About';
import Skills from '../components/apps/Skills';
import Projects from '../components/apps/Projects';
import Terminal from '../components/apps/Terminal';
import Safari from '../components/apps/Safari';
import Finder from '../components/apps/Finder';
import Calculator from '../components/apps/Calculator';
import { AppConfig } from '../types';

export const apps: AppConfig[] = [
    {
        id: 'finder',
        title: 'Finder',
        icon: FolderOpen,
        component: <Finder />,
        defaultWidth: 800,
        defaultHeight: 500,
    },
    {
        id: 'safari',
        title: 'Safari',
        icon: Globe,
        component: <Safari />,
        defaultWidth: 1024,
        defaultHeight: 700,
    },
    {
        id: 'about',
        title: 'About Me',
        icon: User,
        component: <About />,
        defaultWidth: 600,
        defaultHeight: 500,
    },
    {
        id: 'skills',
        title: 'Skills',
        icon: Cpu,
        component: <Skills />,
        defaultWidth: 700,
        defaultHeight: 500,
    },
    {
        id: 'projects',
        title: 'Projects',
        icon: FolderGit2,
        component: <Projects />,
        defaultWidth: 900,
        defaultHeight: 600,
    },
     {
        id: 'terminal',
        title: 'Terminal',
        icon: TerminalIcon,
        component: <Terminal />,
        defaultWidth: 600,
        defaultHeight: 400,
    },
    {
        id: 'calculator',
        title: 'Calculator',
        icon: CalcIcon,
        component: <Calculator />,
        defaultWidth: 260,
        defaultHeight: 380,
    },
    {
        id: 'email',
        title: 'Contact',
        icon: Mail,
        component: <div className="p-10 flex items-center justify-center h-full bg-white flex-col gap-4 text-center">
            <Mail size={48} className="text-blue-500" />
            <h2 className="text-2xl font-bold">Contact Me</h2>
            <p className="text-gray-500 mb-4">Feel free to reach out for collaborations or opportunities.</p>
            <a href="mailto:contact@ashrafmorningstar.com" className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
                Send Email
            </a>
            <div className="text-sm text-gray-400 mt-4">contact@ashrafmorningstar.com</div>
        </div>,
        defaultWidth: 400,
        defaultHeight: 400,
    }
];

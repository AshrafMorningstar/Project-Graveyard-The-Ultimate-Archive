/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { User, FolderGit2, Cpu, Mail, FileText } from 'lucide-react';
import DockItem from './DockItem';
import useWindowStore from '../../stores/windowStore';

// Import Applications
import AboutApp from '../Applications/AboutApp';
import ProjectsApp from '../Applications/ProjectsApp';
import SkillsApp from '../Applications/SkillsApp';
import ContactApp from '../Applications/ContactApp';
import ResumeApp from '../Applications/ResumeApp';

export const dockItems = [
  { id: 'about', label: 'About', icon: User, component: AboutApp },
  { id: 'projects', label: 'Projects', icon: FolderGit2, component: ProjectsApp },
  { id: 'skills', label: 'Skills', icon: Cpu, component: SkillsApp },
  { id: 'resume', label: 'Resume', icon: FileText, component: ResumeApp },
  { id: 'contact', label: 'Contact', icon: Mail, component: ContactApp },
];

const Dock = () => {
  const { windows, openWindow } = useWindowStore();

  const handleAppClick = (item) => {
      openWindow(item.id, item.component, { 
          title: item.label,
          icon: item.icon
      });
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-end h-[80px] px-4 pb-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300">
        {dockItems.map((item) => (
          <DockItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isOpen={!!windows[item.id]}
            onClick={() => handleAppClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dock;

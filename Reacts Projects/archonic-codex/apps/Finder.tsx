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

import React, { useState } from 'react';
import { Folder, FileText, Code, User, ChevronRight, HardDrive, Download, Music, Image as ImageIcon } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors ${
      active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={16} />
    <span>{label}</span>
  </div>
);

const FileItem = ({ icon: Icon, label, date, size, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-blue-500/20 cursor-pointer transition-colors border border-transparent hover:border-blue-500/30"
  >
    <Icon size={48} className="text-blue-400 drop-shadow-lg group-hover:scale-105 transition-transform" strokeWidth={1} />
    <span className="text-sm text-center text-gray-300 group-hover:text-white font-medium max-w-[100px] truncate">{label}</span>
    <span className="text-xs text-gray-500">{date}</span>
  </div>
);

const ContentBio = () => (
    <div className="p-8 space-y-6 text-gray-200 max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-white mb-4">Ashraf Morningstar</h1>
        <p className="text-lg leading-relaxed text-gray-300">
            I'm a passionate Full Stack Developer with a knack for building immersive, high-performance web applications. 
            My work blends technical precision with creative design, ensuring every project is not just functional, but an experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-blue-400 font-bold mb-2">Frontend</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                    <li>React / Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS / GSAP</li>
                    <li>Three.js / WebGL</li>
                </ul>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-purple-400 font-bold mb-2">Backend</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                    <li>Node.js / Express</li>
                    <li>PostgreSQL / MongoDB</li>
                    <li>Firebase / Supabase</li>
                    <li>Docker / AWS</li>
                </ul>
            </div>
        </div>
    </div>
);

const ContentExperience = () => (
    <div className="p-8 space-y-6 overflow-y-auto h-full">
         <h2 className="text-2xl font-display font-bold text-white mb-6">Experience</h2>
         
         <div className="relative border-l border-white/10 pl-8 space-y-12">
            {[
                {
                    role: "Senior Frontend Engineer",
                    company: "TechNova Corp",
                    period: "2022 - Present",
                    desc: "Leading the frontend team in rebuilding the core SaaS platform using Next.js 14 and Server Components. Improved performance by 40%."
                },
                {
                    role: "Full Stack Developer",
                    company: "Creative Studio X",
                    period: "2020 - 2022",
                    desc: "Developed interactive marketing campaigns for Fortune 500 clients. Specialized in WebGL animations and high-traffic landing pages."
                },
                {
                    role: "Freelance Developer",
                    company: "Self-Employed",
                    period: "2018 - 2020",
                    desc: "Delivered 20+ custom web solutions for global startups. Managed full lifecycle from design to deployment."
                }
            ].map((job, i) => (
                <div key={i} className="relative">
                    <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-[#0f0f12]"></span>
                    <h3 className="text-xl font-bold text-white">{job.role}</h3>
                    <p className="text-blue-400 font-medium mb-2">{job.company} • {job.period}</p>
                    <p className="text-gray-400 leading-relaxed">{job.desc}</p>
                </div>
            ))}
         </div>
    </div>
)

export const Finder: React.FC = () => {
  const [activeSection, setActiveSection] = useState('About');
  
  const renderContent = () => {
      switch(activeSection) {
          case 'About': return <ContentBio />;
          case 'Experience': return <ContentExperience />;
          case 'Skills': return (
              <div className="p-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'Rust'].map(skill => (
                      <div key={skill} className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                          <Code className="text-blue-400 mb-2" />
                          <span className="text-gray-200 font-medium">{skill}</span>
                      </div>
                  ))}
              </div>
          );
          default: return <div className="p-10 text-center text-gray-500">Folder empty</div>;
      }
  }

  return (
    <div className="flex h-full text-gray-300 font-sans">
      {/* Sidebar */}
      <div className="w-48 bg-[#1e1e24]/80 backdrop-blur-xl border-r border-white/5 flex flex-col pt-4 pb-4 overflow-y-auto">
        <div className="px-4 mb-4 flex items-center gap-2 opacity-50">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        <div className="mb-6">
          <h3 className="px-4 text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Favorites</h3>
          <div className="space-y-0.5 px-2">
            <SidebarItem icon={User} label="About Me" active={activeSection === 'About'} onClick={() => setActiveSection('About')} />
            <SidebarItem icon={FileText} label="Experience" active={activeSection === 'Experience'} onClick={() => setActiveSection('Experience')} />
            <SidebarItem icon={HardDrive} label="Skills" active={activeSection === 'Skills'} onClick={() => setActiveSection('Skills')} />
            <SidebarItem icon={Download} label="Downloads" />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="px-4 text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">iCloud</h3>
          <div className="space-y-0.5 px-2">
            <SidebarItem icon={ImageIcon} label="Photos" />
            <SidebarItem icon={Music} label="Music" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#0f0f12]/40">
        {/* Toolbar */}
        <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-white/5">
            <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-500 gap-2">
                    <ChevronRight className="rotate-180 cursor-pointer hover:text-white" size={20} />
                    <ChevronRight className="cursor-pointer hover:text-white" size={20} />
                </div>
                <span className="font-semibold text-white tracking-wide">{activeSection}</span>
            </div>
            <div className="flex items-center gap-2">
                 {/* Fake toolbar icons */}
                 <div className="p-1.5 rounded hover:bg-white/10 cursor-pointer"><SearchIcon /></div>
            </div>
        </div>

        {/* View Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {renderContent()}
        </div>
        
        {/* Status Bar */}
        <div className="h-6 border-t border-white/5 flex items-center px-4 text-xs text-gray-500 bg-[#1e1e24]/50">
            {activeSection === 'About' ? '1 item selected' : 'Items loaded'} • 1.2 GB available
        </div>
      </div>
    </div>
  );
};

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
)

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { Folder, FileText, Code, User, ChevronRight, HardDrive, Download, Music, Image as ImageIcon, Sparkles, Cpu, Globe, Database } from 'lucide-react';

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

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

const ContentBio = () => (
    <div className="p-8 space-y-6 text-gray-200 max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-white mb-4">Cosmic Manifest</h1>
        <p className="text-lg leading-relaxed text-gray-300">
            I'm a passionate Full Stack Developer exploring the digital frontier. 
            This portfolio, <span className="text-quantum-glow font-bold">Eigenfolio Quantum</span>, represents my dedication to crafting immersive user experiences.
        </p>
        
        <div className="p-5 bg-white/5 rounded-xl border border-white/10 mt-6">
            <h3 className="text-xl font-bold text-white mb-3">Project Tech Stack</h3>
            <p className="text-sm text-gray-400 mb-4">
                The core technologies powering this OS simulation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Code size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-200 text-sm">React 18 & TypeScript</h4>
                        <p className="text-xs text-gray-500">Component architecture with strict typing.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Database size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-200 text-sm">Zustand</h4>
                        <p className="text-xs text-gray-500">Global state management for window system.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400"><Sparkles size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-200 text-sm">Framer Motion & GSAP</h4>
                        <p className="text-xs text-gray-500">Advanced animations and physics interactions.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400"><Globe size={20} /></div>
                    <div>
                        <h4 className="font-bold text-gray-200 text-sm">Tailwind CSS</h4>
                        <p className="text-xs text-gray-500">Utility-first styling for rapid UI development.</p>
                    </div>
                 </div>
            </div>
        </div>

        <div className="mt-8 p-5 bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-xl border border-emerald-500/20">
            <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                <Sparkles size={16} /> Currently Learning
            </h3>
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center gap-2 bg-black/20 p-3 rounded-lg min-w-[80px]">
                    <Cpu size={24} className="text-orange-400" />
                    <span className="text-xs font-medium text-gray-300">Rust</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-black/20 p-3 rounded-lg min-w-[80px]">
                    <Globe size={24} className="text-blue-400" />
                    <span className="text-xs font-medium text-gray-300">WebAssembly</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-black/20 p-3 rounded-lg min-w-[80px]">
                    <Database size={24} className="text-purple-400" />
                    <span className="text-xs font-medium text-gray-300">Vector DBs</span>
                </div>
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
/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Spotify Clone",
    description: "A fully functional Spotify clone with music playback, playlists, and user authentication.",
    tags: ["React", "Spotify API", "Tailwind"],
    github: "https://github.com/AshrafMorningstar/spotify-clone",
    demo: "#"
  },
  {
    title: "E-Commerce Dashboard",
    description: "Comprehensive admin dashboard for managing products, orders, and analytics.",
    tags: ["Next.js", "TypeScript", "Prisma"],
    github: "https://github.com/AshrafMorningstar/dashboard",
    demo: "#"
  },
  {
    title: "AI Chat Interface",
    description: "Modern chat interface for interacting with LLMs, featuring streaming responses.",
    tags: ["React", "WebSockets", "OpenAI"],
    github: "https://github.com/AshrafMorningstar/ai-chat",
    demo: "#"
  },
  {
      title: "Task Management App",
      description: "Collaborative task manager with real-time updates and drag-and-drop boards.",
      tags: ["Vue", "Firebase", "Pinia"],
      github: "https://github.com/AshrafMorningstar/tasks",
      demo: "#"
  }
];

const ProjectsApp = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors group">
          <div className="flex justify-between items-start mb-3">
             <h3 className="text-lg font-bold text-white">{project.title}</h3>
             <div className="flex gap-2">
                 <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><Github size={18}/></a>
                 <a href={project.demo} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><ExternalLink size={18}/></a>
             </div>
          </div>
          <p className="text-gray-400 text-sm mb-4 h-16">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
                <span key={tag} className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {tag}
                </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsApp;

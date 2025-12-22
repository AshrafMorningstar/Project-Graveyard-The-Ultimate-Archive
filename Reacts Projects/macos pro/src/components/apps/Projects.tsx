/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { ExternalLink, Github, Folder, Code2, Rocket, Globe } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "MacOS Portfolio",
            description: "A replica of macOS Sonoma built with React, Tailwind and GSAP. Features functional dock, window management, and interactive apps.",
            tags: ["React", "TypeScript", "Tailwind", "Zustand"],
            link: "https://github.com/AshrafMorningstar",
            color: "from-blue-500 to-cyan-400",
            icon: Code2
        },
        {
            title: "E-Commerce Dashboard",
            description: "Full-stack admin dashboard with analytics, inventory management, and order processing capabilities.",
            tags: ["Next.js", "Prisma", "PostgreSQL"],
            link: "https://github.com/AshrafMorningstar",
            color: "from-purple-500 to-pink-500",
            icon: Rocket
        },
        {
            title: "Social Media App",
            description: "Real-time social platform with chat, notifications, and media sharing features.",
            tags: ["React Native", "Firebase", "Redux"],
            link: "https://github.com/AshrafMorningstar",
            color: "from-orange-400 to-red-500",
            icon: Globe
        },
        {
            title: "AI Image Generator",
            description: "Web application that uses Stable Diffusion API to generate images from text prompts.",
            tags: ["React", "OpenAI API", "Node.js"],
            link: "https://github.com/AshrafMorningstar",
            color: "from-green-400 to-emerald-600",
            icon: Code2
        }
    ];

    return (
        <div className="h-full bg-gray-50 dark:bg-[#121212] p-6 overflow-y-auto w-full transition-colors">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white sticky top-0 bg-gray-50 dark:bg-[#121212] pb-4 z-10 backdrop-blur-sm">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <div key={index} className="group bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
                        <div className={`h-40 rounded-xl bg-gradient-to-r ${project.color} mb-6 flex items-center justify-center text-white shadow-inner relative overflow-hidden`}>
                             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                             <project.icon size={56} className="opacity-90 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg" />
                        </div>
                        
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                             <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                            >
                                <Github size={20} />
                            </a>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                        >
                            <span>View Live Demo</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                ))}
            </div>
            <div className="h-10"></div>
        </div>
    );
};

export default Projects;

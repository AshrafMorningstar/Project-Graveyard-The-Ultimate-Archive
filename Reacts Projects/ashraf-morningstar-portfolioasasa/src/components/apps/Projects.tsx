/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client'

import { useState } from 'react'
import { PROJECTS } from '@/lib/projects'
import { Search, Github, ExternalLink, Star } from 'lucide-react'

export default function Projects() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filteredProjects = PROJECTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'All' || p.language === filter
    return matchesSearch && matchesFilter
  })

  const languages = ['All', ...Array.from(new Set(PROJECTS.map(p => p.language)))]

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-none space-y-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Project Nebula
          </h2>
          <p className="text-slate-400">Exploring the cosmos of code</p>
        </div>

        <div className="flex gap-4 items-center bg-slate-800/50 p-2 rounded-xl backdrop-blur-sm border border-white/5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[50%]">
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-all duration-300 ${
                  filter === lang 
                    ? 'bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group bg-slate-900/40 border border-white/5 rounded-xl p-5 hover:bg-slate-800/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:border-indigo-500/30 relative overflow-hidden"
            style={{
              animation: `fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              animationDelay: `${index * 100}ms`,
              opacity: 0,
              transform: 'translateY(20px)'
            }}
          >
            {/* Quantum Materialize Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />

            <div className="flex items-start justify-between mb-3 relative z-10">
              <div className="space-y-1">
                <h4 className="font-bold text-lg text-slate-200 group-hover:text-indigo-300 transition-colors">
                  {project.name}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    {project.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {project.stars}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={`https://github.com/${project.github}/${project.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 relative z-10 leading-relaxed">
              {project.description}
            </p>
          </div>
        ))}

        <style jsx>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
          }
        `}</style>
      </div>
    </div>
  )
}

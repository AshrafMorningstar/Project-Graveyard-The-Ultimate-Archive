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

'use client'

import { PROJECTS } from '@/lib/projects'

export default function Projects() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Featured Projects
        </h2>
        <p className="text-slate-400">Showcasing my best work in web development and animation</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-indigo-300 text-lg group-hover:text-indigo-200">
                {project.name}
              </h4>
              <span className="px-2 py-1 bg-pink-500/30 text-pink-300 text-xs rounded border border-pink-500/40">
                {project.language}
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-3">{project.description}</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
            >
              → View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

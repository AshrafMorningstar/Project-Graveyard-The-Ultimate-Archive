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

export default function About() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
          Ashraf Morningstar
        </h2>
        <p className="text-lg text-indigo-300">Full-Stack Developer | React Expert | Animation Specialist</p>
      </div>

      <div className="space-y-2">
        <p>📍 <strong>Location:</strong> India</p>
        <p>📧 <strong>Email:</strong> ashrafmorningstar@gmail.com</p>
        <p>💼 <strong>GitHub:</strong> <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noopener" className="text-indigo-400 hover:text-indigo-300">@AshrafMorningstar</a></p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-cyan-300 mb-2">Experience</h3>
        <p>6+ years of professional software development at Wipro Technologies. Specialized in creating cutting-edge web applications with modern technologies and smooth animations.</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-cyan-300 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Next.js', 'GSAP', 'Tailwind CSS', 'Node.js', 'JavaScript', 'Zustand', 'Three.js', 'Web Design'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-lg text-sm border border-indigo-500/50">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-pink-400">57</div>
          <div className="text-sm text-slate-400">Public Repos</div>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-pink-400">3</div>
          <div className="text-sm text-slate-400">Followers</div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <a href="https://github.com/AshrafMorningstar" target="_blank" className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 rounded-lg transition-colors">
          GitHub
        </a>
        <a href="https://twitter.com/AMS_Morningstar" target="_blank" className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 rounded-lg transition-colors">
          Twitter
        </a>
        <a href="mailto:ashrafmorningstar@gmail.com" className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 rounded-lg transition-colors">
          Email
        </a>
      </div>
    </div>
  )
}

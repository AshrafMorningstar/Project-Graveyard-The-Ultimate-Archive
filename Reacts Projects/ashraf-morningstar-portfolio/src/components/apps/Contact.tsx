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

export default function Contact() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Get in Touch
        </h2>
        <p className="text-slate-400">Always interested in new projects and opportunities</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-slate-500 mb-1">📧 Email</p>
          <a href="mailto:ashrafmorningstar@gmail.com" className="text-indigo-300 hover:text-indigo-200">
            ashrafmorningstar@gmail.com
          </a>
        </div>
        <div>
          <p className="text-sm text-slate-500 mb-1">📍 Location</p>
          <p>India 🇮🇳</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Services & Expertise</h3>
        <ul className="space-y-2 text-slate-400">
          <li>✓ Full-Stack Web Development</li>
          <li>✓ Interactive UI/UX Design</li>
          <li>✓ GSAP Animation & Motion Design</li>
          <li>✓ React Application Development</li>
          <li>✓ Data Visualization & Analytics</li>
          <li>✓ Performance Optimization</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Available For</h3>
        <ul className="space-y-2 text-slate-400">
          <li>✓ Freelance Projects</li>
          <li>✓ Full-Time Opportunities</li>
          <li>✓ Collaboration & Partnerships</li>
          <li>✓ Consulting & Code Review</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <a
          href="https://github.com/AshrafMorningstar"
          target="_blank"
          className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 rounded-lg transition-colors text-sm"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/AMS_Morningstar"
          target="_blank"
          className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 rounded-lg transition-colors text-sm"
        >
          Twitter
        </a>
      </div>
    </div>
  )
}

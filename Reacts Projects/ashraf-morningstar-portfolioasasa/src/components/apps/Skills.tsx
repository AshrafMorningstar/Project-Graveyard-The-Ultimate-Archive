/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client'

const SKILL_CATEGORIES = {
  'Frontend': ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Next.js'],
  'Animation & Design': ['GSAP', '3D WebGL', 'Canvas API', 'SVG Animation', 'UI/UX Design', 'Interactive Design'],
  'Backend & Tools': ['Node.js', 'Express', 'Git/GitHub', 'REST APIs', 'MongoDB', 'Firebase'],
}

export default function Skills() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Technical Skills
      </h2>

      {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-cyan-300 mb-3">🎯 {category}</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-2 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 rounded-lg text-sm hover:bg-indigo-500/30 hover:border-indigo-500/60 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div>
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">🏆 Specializations</h3>
        <ul className="space-y-2 text-slate-400">
          <li>• Advanced GSAP animations and timeline management</li>
          <li>• React patterns and Higher-Order Components</li>
          <li>• State management with Zustand</li>
          <li>• Responsive web design and mobile-first approach</li>
          <li>• Performance optimization and code splitting</li>
          <li>• Cross-browser compatibility</li>
        </ul>
      </div>
    </div>
  )
}

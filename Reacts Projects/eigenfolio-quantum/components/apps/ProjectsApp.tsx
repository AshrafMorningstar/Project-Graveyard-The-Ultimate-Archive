/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { ExternalLink, GitBranch, Star } from 'lucide-react';

const projects = [
  {
    title: "Chronos Engine",
    desc: "A time-dilation rendering engine for web interfaces.",
    tech: ["TypeScript", "WebGL", "Rust"],
    stars: 1240,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Neuro-Maze",
    desc: "AI-generated puzzle game using neural networks.",
    tech: ["React", "TensorFlow.js", "Gemini"],
    stars: 890,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Dark Energy Grid",
    desc: "Decentralized compute distribution protocol.",
    tech: ["Solidity", "Next.js", "IPFS"],
    stars: 2100,
    color: "from-indigo-500 to-purple-800"
  },
  {
    title: "Eigen-Verse",
    desc: "VR portfolio generator.",
    tech: ["Three.js", "WebXR"],
    stars: 560,
    color: "from-green-400 to-emerald-600"
  }
];

const ProjectsApp: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 text-white">
      <h2 className="text-3xl font-space-grotesk font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-neuro-cyan to-neuro-purple">
        Project Nebula
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((p, i) => (
          <div key={i} className="group bg-chronos-dark border border-white/5 rounded-2xl p-6 hover:border-quantum-glow/50 transition duration-300 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${p.color}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold font-space-grotesk">{p.title}</h3>
              <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/20 transition cursor-pointer">
                <ExternalLink size={16} />
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-6 h-12">{p.desc}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map(t => (
                <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-4">
              <span className="flex items-center gap-1 hover:text-yellow-400 transition"><Star size={14} /> {p.stars}</span>
              <span className="flex items-center gap-1"><GitBranch size={14} /> Main</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
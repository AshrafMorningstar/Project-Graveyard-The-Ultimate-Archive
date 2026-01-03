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

import React from 'react';
import { Github as GithubIcon, Star, GitBranch, Users } from 'lucide-react';

const Github = () => {
    // We can't easily iframe github.com due to X-Frame-Options. 
    // access-control-allow-origin issues.
    // Instead, we build a "Profile Viewer" using the user's data.
    
    return (
        <div className="flex h-full bg-[#0d1117] text-[#c9d1d9] font-sans">
            {/* Sidebar */}
            <div className="w-64 border-r border-[#30363d] p-4 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <GithubIcon className="text-black" size={24} />
                    </div>
                    <span className="font-bold text-white">GitHub</span>
                </div>

                <div className="w-full aspect-square rounded-full border border-[#30363d] overflow-hidden mb-2">
                    <img src="https://github.com/AshrafMorningstar.png" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Ashraf Morningstar</h2>
                    <p className="text-[#8b949e]">@AshrafMorningstar</p>
                </div>
                <button 
                    onClick={() => window.open('https://github.com/AshrafMorningstar', '_blank')}
                    className="w-full py-1.5 bg-[#238636] text-white rounded-md font-medium text-sm hover:bg-[#2ea043] transition-colors"
                >
                    View on GitHub.com
                </button>

                <div className="text-sm space-y-2 mt-2">
                    <div className="flex items-center gap-2"><Users size={16}/> 1.2k followers • 50 following</div>
                    <div className="flex items-center gap-2"><Star size={16}/> 542 stars</div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                <div className="border-b border-[#30363d] px-4">
                    <div className="flex gap-6 overflow-x-auto">
                        <div className="py-3 border-b-2 border-[#f78166] font-semibold text-white cursor-pointer flex items-center gap-2">
                             <span className="bg-[#f78166] w-2 h-2 rounded-full"></span>
                             Overview
                        </div>
                        <div className="py-3 text-[#c9d1d9] hover:text-white cursor-pointer flex items-center gap-2">
                             Repositories
                             <span className="bg-[#30363d] px-1.5 rounded-full text-xs">42</span>
                        </div>
                        <div className="py-3 text-[#c9d1d9] hover:text-white cursor-pointer">Projects</div>
                        <div className="py-3 text-[#c9d1d9] hover:text-white cursor-pointer">Packages</div>
                    </div>
                </div>

                <div className="p-6 overflow-auto bg-[#010409]">
                    <div className="text-sm text-[#8b949e] mb-4">Popular repositories</div>
                    <div className="grid grid-cols-2 gap-4">
                         {[
                             { name: "macos-portfolio", lang: "JavaScript", stars: 124, desc: "A realistic macOS simulated portfolio powered by React." },
                             { name: "quantum-os", lang: "TypeScript", stars: 89, desc: "Next-gen operating system conceptualization." },
                             { name: "neuro-ai", lang: "Python", stars: 256, desc: "Neural network visualization tool." },
                             { name: "matter-shaper", lang: "Rust", stars: 67, desc: "Generative art engine." },
                             { name: "chronos-cli", lang: "Go", stars: 45, desc: "Time tracking terminal utility." },
                             { name: "infinity-dock", lang: "Swift", stars: 230, desc: "Infinite scroll dock for macOS." }
                         ].map(repo => (
                             <div key={repo.name} className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col justify-between">
                                 <div>
                                     <div className="flex items-center justify-between mb-2">
                                         <span className="font-bold text-[#58a6ff] cursor-pointer hover:underline">{repo.name}</span>
                                         <span className="text-xs border border-[#30363d] px-2 py-0.5 rounded-full text-[#8b949e]">Public</span>
                                     </div>
                                     <p className="text-xs text-[#8b949e] mb-4 line-clamp-2">{repo.desc}</p>
                                 </div>
                                 <div className="flex items-center gap-4 text-xs text-[#8b949e]">
                                     <div className="flex items-center gap-1">
                                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                         {repo.lang}
                                     </div>
                                     <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                                         <Star size={14} /> {repo.stars}
                                     </div>
                                     <div className="flex items-center gap-1 hover:text-[#58a6ff] cursor-pointer">
                                         <GitBranch size={14} /> 12
                                     </div>
                                 </div>
                             </div>
                         ))}
                    </div>
                    
                    <div className="mt-8 border border-[#30363d] rounded-md p-4">
                        <div className="text-sm text-[#8b949e] mb-2">Contribution Activity</div>
                        <div className="flex gap-1">
                            {[...Array(52)].map((_, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    {[...Array(7)].map((_, j) => {
                                        const level = Math.random();
                                        const color = level > 0.8 ? '#39d353' : level > 0.6 ? '#26a641' : level > 0.4 ? '#006d32' : level > 0.2 ? '#0e4429' : '#161b22';
                                        return <div key={j} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Github;

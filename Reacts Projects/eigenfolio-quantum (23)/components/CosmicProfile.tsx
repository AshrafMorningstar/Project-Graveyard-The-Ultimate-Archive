/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef, useState, useEffect } from 'react';
import { Github, Twitter, Mail, MapPin, Award, Cpu, Orbit, Network, Layers, Sparkles, Globe, GitBranch, Star } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { useSystemStore } from '../store';

const CosmicProfile: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useSystemStore();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 3D Tilt Effect
  const [props, api] = useSpring(() => ({ 
      xys: [0, 0, 1], 
      config: { mass: 5, tension: 350, friction: 40 } 
  }));

  const calc = (x: number, y: number) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return [0,0,1];
      return [-(y - rect.top - rect.height / 2) / 20, (x - rect.left - rect.width / 2) / 20, 1.05];
  };

  const trans = (x: number, y: number, s: number) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  const fetchGithub = async () => {
      if (!user.githubUsername) return;
      setLoading(true);
      try {
          const res = await fetch(`https://api.github.com/users/${user.githubUsername}/repos?sort=updated&per_page=4`);
          const data = await res.json();
          if (Array.isArray(data)) setRepos(data);
      } catch (e) {
          console.error(e);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchGithub();
  }, [user.githubUsername]);

  return (
    <animated.div 
      ref={ref}
      onMouseMove={({ clientX: x, clientY: y }) => api.start({ xys: calc(x, y) })}
      onMouseLeave={() => api.start({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.to(trans) }}
      className="glass-panel p-8 rounded-3xl border border-neuro-purple/30 max-w-5xl mx-auto backdrop-blur-xl animate-float cursor-default overflow-y-auto h-full"
    >
      <div className="flex flex-col md:flex-row items-start gap-8">
        
        {/* Sidebar Info */}
        <div className="flex flex-col items-center text-center space-y-4 md:w-1/3">
            <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neuro-purple to-quantum-glow rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-chronos-dark">
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-chronos-dark animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-neuro-cyan text-sm">Full Stack Quantum Engineer</p>
            </div>
            
            <div className="flex gap-4">
                <a href={`https://github.com/${user.githubUsername}`} target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-colors"><Github size={20}/></a>
                <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-colors"><Twitter size={20}/></button>
                <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-green-400 transition-colors"><Mail size={20}/></button>
            </div>

            <div className="w-full pt-4 border-t border-white/10 text-left space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2"><MapPin size={14}/> Multiverse Sector 7G</div>
                <div className="flex items-center gap-2"><Globe size={14}/> eigenfolio.dev</div>
                <div className="flex items-center gap-2"><Award size={14}/> Level 99 Architect</div>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-4xl font-space font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-quantum-glow to-neuro-purple mb-4">
              Digital Experience
            </h1>
            <p className="text-white/70 leading-relaxed">
               I engineer high-performance web applications with a focus on neuromorphic design and AI integration. 
               My work bridges the gap between traditional software engineering and quantum aesthetics.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
              <h3 className="text-xs uppercase tracking-widest text-quantum-energy mb-3 font-bold flex items-center gap-2">
                 <Layers size={12} /> Technology Matrix
              </h3>
              <div className="flex flex-wrap gap-2">
                 {['React 19', 'TypeScript', 'Tailwind', 'Three.js', 'Node.js', 'PostgreSQL', 'GraphQL', 'Docker', 'AWS'].map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-quantum-glow hover:bg-white/10 transition-colors cursor-default">{t}</span>
                 ))}
              </div>
          </div>

          {/* GitHub Repos */}
          <div>
             <h3 className="text-xs uppercase tracking-widest text-neuro-purple mb-3 font-bold flex items-center gap-2">
                <Cpu size={12} /> Latest Transmissions
             </h3>
             <div className="grid grid-cols-1 gap-3">
                 {loading ? <div className="text-white/30 text-xs">Scanning GitHub frequencies...</div> : 
                    repos.map((repo: any) => (
                        <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="block p-4 bg-chronos-dark/40 border border-white/5 rounded-xl hover:border-quantum-glow/50 hover:bg-white/5 transition-all group">
                             <div className="flex justify-between items-start mb-2">
                                 <h4 className="font-bold text-white group-hover:text-quantum-glow transition-colors flex items-center gap-2">
                                     <GitBranch size={14}/> {repo.name}
                                 </h4>
                                 <div className="flex items-center gap-1 text-xs text-yellow-400">
                                     <Star size={12} fill="currentColor"/> {repo.stargazers_count}
                                 </div>
                             </div>
                             <p className="text-xs text-white/50 line-clamp-2">{repo.description || "No description provided."}</p>
                             <div className="mt-3 flex items-center gap-2 text-[10px] text-white/30">
                                 {repo.language && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"/> {repo.language}</span>}
                                 <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                             </div>
                        </a>
                    ))
                 }
                 <a href={`https://github.com/${user.githubUsername}?tab=repositories`} target="_blank" rel="noreferrer" className="text-xs text-center block w-full py-2 text-white/40 hover:text-white transition-colors">View All Repositories &rarr;</a>
             </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default CosmicProfile;

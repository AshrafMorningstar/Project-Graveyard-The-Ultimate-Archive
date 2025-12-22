/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useRef } from 'react';
import { Github, Twitter, Mail, MapPin, Award, Cpu, Orbit, Network, Box, Layers, Code, Sparkles, Zap, Globe } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

const CosmicProfile: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  
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

  return (
    <animated.div 
      ref={ref}
      onMouseMove={({ clientX: x, clientY: y }) => api.start({ xys: calc(x, y) })}
      onMouseLeave={() => api.start({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.to(trans) }}
      className="glass-panel p-8 rounded-3xl border border-neuro-purple/30 max-w-4xl mx-auto backdrop-blur-xl animate-float cursor-default"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        
        {/* Avatar Ring */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-neuro-purple to-quantum-glow rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-chronos-dark">
            <img src="https://picsum.photos/400/400" alt="Avatar" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-chronos-dark animate-pulse shadow-[0_0_10px_#22c55e]"></div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-space font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-quantum-glow to-neuro-purple">
              Ashraf Morningstar
            </h1>
            <p className="text-neuro-cyan font-mono mt-2 flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 bg-neuro-cyan rounded-full animate-pulse"></span>
              Quantum Architect & Neural Designer
            </p>
          </div>
          
          <p className="text-white/70 max-w-xl leading-relaxed">
            Building at the intersection of quantum computing and frontend engineering. 
            Creator of the Eigenfolio Quantum System. Specializing in neuromorphic UI/UX and 
            Post-Neural Design architectures.
          </p>

          {/* System Architecture Section */}
          <div className="border-t border-white/10 pt-3 mt-2">
            <h3 className="text-xs uppercase tracking-widest text-quantum-energy mb-3 font-bold flex items-center gap-2 justify-center md:justify-start">
               <Layers size={12} /> System Architecture
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
               {['React 19', 'TypeScript', 'Tailwind Quantum', 'Gemini 3 Pro', 'Zustand', 'React Spring'].map((tech, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-quantum-glow font-mono hover:bg-white/10 transition-colors">
                     {tech}
                  </span>
               ))}
            </div>
          </div>

          {/* Currently Learning Section */}
          <div className="pt-2">
             <h3 className="text-xs uppercase tracking-widest text-neuro-purple mb-3 font-bold flex items-center gap-2 justify-center md:justify-start">
                <Sparkles size={12} /> Active Research
             </h3>
             <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 bg-chronos-dark/60 px-3 py-2 rounded-lg border border-white/5 hover:border-quantum-glow/50 transition-colors cursor-default">
                    <Cpu size={14} className="text-quantum-glow" />
                    <span className="text-xs text-white/80">Quantum Algorithms</span>
                </div>
                <div className="flex items-center gap-2 bg-chronos-dark/60 px-3 py-2 rounded-lg border border-white/5 hover:border-neuro-pink/50 transition-colors cursor-default">
                    <Orbit size={14} className="text-neuro-pink" />
                    <span className="text-xs text-white/80">Spatial Computing</span>
                </div>
                <div className="flex items-center gap-2 bg-chronos-dark/60 px-3 py-2 rounded-lg border border-white/5 hover:border-neuro-cyan/50 transition-colors cursor-default">
                    <Network size={14} className="text-neuro-cyan" />
                    <span className="text-xs text-white/80">Neural Networks</span>
                </div>
             </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
             <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-sm text-white/80">
                <MapPin size={14} className="text-quantum-matter"/> Multiverse Sector 7G
             </div>
             <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-sm text-white/80">
                <Award size={14} className="text-yellow-400"/> Chronos Certified
             </div>
          </div>

          {/* Socials */}
          <div className="flex gap-4 justify-center md:justify-start pt-2">
            {[Github, Twitter, Mail, Globe].map((Icon, i) => (
              <button key={i} className="p-3 bg-chronos-dark/50 rounded-xl hover:bg-quantum-glow/20 hover:text-quantum-glow transition-all duration-300 border border-white/5 hover:scale-110 shadow-lg">
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default CosmicProfile;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-black/20 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-os-accent shadow-lg mb-4 relative group">
           <img 
            src="https://picsum.photos/seed/ashraf/400/400" 
            alt="Ashraf" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
           />
        </div>
        <h1 className="text-2xl font-bold font-display text-white text-center">Ashraf Morningstar</h1>
        <p className="text-os-accent font-medium mb-4">Full Stack Developer</p>
        
        <div className="flex gap-2">
            <a 
              href="https://github.com/AshrafMorningstar" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <img src="https://img.icons8.com/fluency/24/github.png" alt="Github" />
              GitHub
            </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-8">
            <section>
                <h2 className="text-xl font-bold text-white mb-2 border-b border-white/10 pb-2">About Me</h2>
                <p className="text-os-muted leading-relaxed">
                    I build premium, interactive web experiences that bridge the gap between utility and art. 
                    Specializing in React ecosystem, high-performance UI libraries, and AI integration.
                    My mission is to create software that feels "never seen before".
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-2 border-b border-white/10 pb-2">Experience</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-white font-medium">Senior Frontend Engineer</h3>
                        <p className="text-sm text-os-accent">Morningstar Tech • 2021 - Present</p>
                        <p className="text-sm text-os-muted mt-1">Leading development of next-gen SaaS platforms using Next.js and Tailwind.</p>
                    </div>
                    <div>
                        <h3 className="text-white font-medium">UI/UX Developer</h3>
                        <p className="text-sm text-os-accent">Freelance • 2018 - 2021</p>
                        <p className="text-sm text-os-muted mt-1">Delivered 50+ custom web solutions for high-ticket clients.</p>
                    </div>
                </div>
            </section>

             <section>
                <h2 className="text-xl font-bold text-white mb-2 border-b border-white/10 pb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'GSAP', 'Three.js', 'Python', 'Gemini AI', 'Supabase'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-xs text-os-muted border border-white/5">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;

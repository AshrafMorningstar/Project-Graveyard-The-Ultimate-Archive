/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const AboutApp = () => {
  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white/10 shadow-xl">
             <img src="https://github.com/AshrafMorningstar.png" alt="Ashraf" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">AshrafMorningstar</h1>
        <p className="text-blue-400 font-medium">Full Stack Developer</p>
      </div>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
            Hello! I'm a passionate developer specializing in building exceptional digital experiences. 
            Currently, I'm focused on accessible, human-centered products at Upstatement.
        </p>
        <p>
            I enjoy creating things that live on the internet. My interest in web development started back in 2012 
            when I decided to try editing custom Tumblr themes — turns out hacking together the HTML & CSS!
        </p>
        
        <h2 className="text-xl font-semibold text-white mt-8 mb-4">Philosophy</h2>
        <p>
            I believe in code that is clean, maintainable, and scalable. I strive to create interfaces that are 
            intuitive and delightful to use.
        </p>
      </div>
    </div>
  );
};

export default AboutApp;

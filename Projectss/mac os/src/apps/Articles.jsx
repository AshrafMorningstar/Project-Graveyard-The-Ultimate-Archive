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

const Articles = () => {
  return (
    <div className="p-6">
       <h1 className="text-3xl font-bold mb-8">Latest Articles</h1>
       <div className="space-y-8">
         {[1, 2, 3].map(i => (
           <article key={i} className="border-b border-white/10 pb-8 last:border-0">
             <h2 className="text-2xl font-bold mb-2">Building Scalable Web Apps {i}</h2>
             <div className="text-sm text-white/50 mb-4">Published on Dec {10+i}, 2024</div>
             <p className="text-white/80 leading-relaxed">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
             </p>
             <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium">Read More →</button>
           </article>
         ))}
       </div>
    </div>
  );
};

export default Articles;

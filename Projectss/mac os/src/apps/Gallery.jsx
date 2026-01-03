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

const Gallery = () => {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="aspect-square bg-white/5 rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer">
           <img 
             src={`https://picsum.photos/seed/${i*23}/400/400`} 
             alt="Gallery" 
             className="w-full h-full object-cover"
             loading="lazy"
           />
        </div>
      ))}
    </div>
  );
};

export default Gallery;

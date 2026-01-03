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

const AboutApp = () => {
  return (
    <div className="h-full w-full bg-gray-900 text-white p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Ashraf Morningstar</h1>
        <h2 className="text-xl text-gray-400 mb-6">Software Engineer & Frontend Developer</h2>
        
        <div className="space-y-4 text-gray-300">
          <p>
            Hello! I am a passionate developer focusing on building high-end, interactive web experiences.
            This portfolio mimics a real macOS environment to showcase my skills in React, GSAP, and complex UI architecture.
          </p>
          <p>
            I love creating pixel-perfect, smooth interfaces that delight users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;

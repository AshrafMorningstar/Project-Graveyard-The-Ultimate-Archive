/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const Contact = () => {
  return (
    <div className="p-8 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
        <p className="text-white/60">I'm currently available for freelance work.</p>
      </div>
      
      <form className="w-full space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 pl-1">Name</label>
          <input type="text" className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 pl-1">Email</label>
          <input type="email" className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 pl-1">Message</label>
          <textarea className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 h-32 focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Hello..." />
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;

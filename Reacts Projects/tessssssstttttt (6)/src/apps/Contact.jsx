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
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message! (Demo functionality)");
        e.target.reset();
    };

    return (
        <div className="p-8 text-dark-text h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Get in Touch
            </h1>
            <p className="text-gray-300 mb-6">Have a project in mind? Let's connect!</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input type="text" required placeholder="Your name" 
                        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input type="email" required placeholder="your@email.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                    <input type="text" placeholder="Project idea" 
                        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea required placeholder="Tell me about your project..." rows="4"
                        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"></textarea>
                </div>
                
                <button type="submit" className="w-full py-2 bg-gradient-to-r from-primary to-[#0088c0] text-white rounded-md font-medium hover:opacity-90 transition-opacity">
                    Send Message
                </button>
            </form>

            <div className="mt-8 border-t border-white/10 pt-6">
                <h2 className="text-lg font-semibold text-white mb-4">Connect With Me</h2>
                <div className="flex gap-4">
                     {[
                         { icon: '⭐', label: 'GitHub', href: 'https://github.com/AshrafMorningstar' },
                         { icon: 'in', label: 'LinkedIn', href: '#' },
                         { icon: '𝕏', label: 'Twitter', href: '#' },
                         { icon: '✉️', label: 'Email', href: '#' }
                     ].map((social, i) => (
                         <a key={i} href={social.href} target="_blank" rel="noreferrer" 
                            className="w-10 h-10 flex items-center justify-center bg-primary/20 border border-primary/40 rounded-lg text-primary hover:bg-primary/30 hover:-translate-y-1 transition-all">
                             {social.icon}
                         </a>
                     ))}
                </div>
                
                <div className="mt-6 text-sm text-gray-400 space-y-1">
                    <p>📧 Email: <strong className="text-gray-200">ashraf@morningstar.dev</strong></p>
                    <p>📍 Location: <strong className="text-gray-200">Mumbai, India</strong></p>
                    <p>💼 GitHub: <strong className="text-gray-200">@AshrafMorningstar</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Contact;

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

/**
 * Generative Templates
 * Pre-written templates that the mock engine selects from.
 */

export const primaryButton = `
import React from 'react';

export default function PrimaryButton({ label = "Click Me", onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label={label}
    >
      {label}
    </button>
  );
}
`;

export const dangerButton = `
import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function DangerButton({ label = "Delete", onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      aria-label={label}
    >
      <AlertCircle size={16} />
      {label}
    </button>
  );
}
`;

export const outlineButton = `
import React from 'react';

export default function GhostButton({ label = "Cancel", onClick }) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 border-2 border-slate-300 text-slate-700 bg-transparent rounded-lg hover:border-slate-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      aria-label={label}
    >
      {label}
    </button>
  );
}
`;

export const simpleCard = `
import React from 'react';

export default function SimpleCard({ title = "Card Title", children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 max-w-sm">
      <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
      <div className="text-slate-600">
        {children || "Content goes here..."}
      </div>
    </div>
  );
}
`;

export const imageCard = `
import React from 'react';

export default function ImageCard({ 
  title = "Beautiful Landscape",
  image = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80" 
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm border border-slate-100">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="font-bold text-xl text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 mb-4">This is a description of the card content. It can be quite long.</p>
        <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
          Learn More →
        </button>
      </div>
    </div>
  );
}
`;

export const navbar = `
import React from 'react';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm p-4 flex justify-between items-center rounded-lg border border-slate-100">
      <span className="font-bold text-slate-800 text-lg">Logo</span>
      <div className="flex gap-4">
        {['Home', 'About', 'Contact'].map(link => (
          <a 
            key={link} 
            href="#" 
            className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
`;

export const inputGroup = `
import React from 'react';

export default function InputGroup({ label = "Email Address", type = "email" }) {
  return (
    <div className="w-full max-w-sm">
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input 
        type={type} 
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
        placeholder="Enter value..."
        aria-label={label}
      />
      <p className="mt-1 text-sm text-slate-500">Helper text goes here.</p>
    </div>
  );
}
`;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file BooksApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - Books App
 */

import React, { useState } from 'react';
import { Book, Clock, CheckCircle, BarChart, Search } from 'lucide-react';

const BooksApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reading');

  const books = [
      { id: 1, title: 'The Quantum Age', author: 'Ashraf M.', cover: 'bg-gradient-to-br from-purple-500 to-indigo-600', progress: 45 },
      { id: 2, title: 'Clean Code', author: 'Robert C. Martin', cover: 'bg-gradient-to-br from-green-500 to-teal-600', progress: 80 },
      { id: 3, title: 'Design Patterns', author: 'Gang of Four', cover: 'bg-gradient-to-br from-blue-500 to-cyan-600', progress: 12 },
      { id: 4, title: 'Neuromancer', author: 'William Gibson', cover: 'bg-gradient-to-br from-red-500 to-pink-600', progress: 0 },
  ];

  return (
    <div className="h-full flex bg-[#f5f5f7] dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-56 border-r border-gray-200 dark:border-white/10 p-4 flex flex-col gap-1 bg-gray-50 dark:bg-black/20">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Library</h2>
          <button onClick={() => setActiveTab('reading')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${activeTab === 'reading' ? 'bg-gray-200 dark:bg-white/10 font-bold' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}>
              <Book size={16} className="text-gray-500 dark:text-gray-400" /> Reading Now
          </button>
          <button onClick={() => setActiveTab('finished')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${activeTab === 'finished' ? 'bg-gray-200 dark:bg-white/10 font-bold' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}>
              <CheckCircle size={16} className="text-gray-500 dark:text-gray-400" /> Finished
          </button>
          
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-2 px-2">Store</h2>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition">
              <BarChart size={16} className="text-gray-500 dark:text-gray-400" /> Top Charts
          </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-14 flex items-center justify-between px-8 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur">
              <h1 className="text-xl font-bold font-space-grotesk">{activeTab === 'reading' ? 'Reading Now' : 'Finished'}</h1>
              <div className="relative">
                  <Search size={16} className="absolute left-3 top-1.5 text-gray-500" />
                  <input type="text" placeholder="Search Library" className="bg-gray-200 dark:bg-white/10 pl-9 pr-4 py-1 rounded-full text-sm w-48 focus:w-64 transition-all outline-none" />
              </div>
          </div>

          {/* Grid */}
          <div className="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 overflow-y-auto">
              {books.map(book => (
                  <div key={book.id} className="group cursor-pointer">
                      {/* Scale Effect Wrapper */}
                      <div className="relative aspect-[2/3] rounded-lg shadow-xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/10">
                          <div className={`absolute inset-0 ${book.cover} p-4 flex flex-col justify-between`}>
                              <span className="text-white/80 font-mono text-xs uppercase tracking-widest">{book.author}</span>
                              <h3 className="text-white font-bold font-space-grotesk text-2xl leading-tight">{book.title}</h3>
                          </div>
                      </div>
                      
                      {/* Meta */}
                      <div className="flex justify-between items-center px-1">
                          <span className="text-sm font-medium">{book.progress}% read</span>
                          {activeTab === 'reading' && (
                            <div className="w-16 h-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-800 dark:bg-white" style={{ width: `${book.progress}%` }}></div>
                            </div>
                          )}
                      </div>
                  </div>
              ))}
              
              {/* Add New Placeholder */}
               <div className="group cursor-pointer border-2 border-dashed border-gray-300 dark:border-white/10 rounded-lg aspect-[2/3] flex flex-col items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition">
                   <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-2">
                       <span className="text-2xl">+</span>
                   </div>
                   <span className="text-sm">Browse Store</span>
               </div>
          </div>
      </div>
    </div>
  );
};

export default BooksApp;

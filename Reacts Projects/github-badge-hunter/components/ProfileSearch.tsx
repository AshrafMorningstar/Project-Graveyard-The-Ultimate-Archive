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

import React, { useState } from 'react';
import { Search, Github, Loader2, AlertCircle, X } from 'lucide-react';
import { fetchGitHubStats } from '../services/githubService';
import { UserStats } from '../types';

interface ProfileSearchProps {
  onUserFound: (stats: UserStats | null) => void;
}

const ProfileSearch: React.FC<ProfileSearchProps> = ({ onUserFound }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStats, setCurrentStats] = useState<UserStats | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    setError('');
    
    try {
      const stats = await fetchGitHubStats(username);
      setCurrentStats(stats);
      onUserFound(stats);
      if (!stats) {
          setError("User not found or API limit reached.");
      }
    } catch (err) {
      setError("Failed to fetch user data. Check spelling or try again later.");
      onUserFound(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setUsername('');
    setCurrentStats(null);
    onUserFound(null);
    setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 relative z-10">
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
        
        <div className="relative flex items-center bg-white dark:bg-[#161b22] border border-gh-border dark:border-gh-border-dark rounded-2xl shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 overflow-hidden">
             <div className="pl-5 pr-3 text-gh-muted dark:text-slate-500">
                <Github size={24} />
             </div>
             
             <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username..."
                className="flex-1 bg-transparent py-4 text-lg text-gh-text dark:text-white placeholder-gh-muted dark:placeholder-slate-500 focus:outline-none"
             />

             {username && (
                 <button type="button" onClick={clearSearch} className="p-2 text-gh-muted hover:text-red-500 transition-colors">
                     <X size={20} />
                 </button>
             )}

             <button
                type="submit"
                disabled={isLoading}
                className="m-1.5 px-6 py-3 bg-gh-text dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
             >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                <span className="hidden sm:inline">Track</span>
             </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 flex items-center justify-center gap-2 text-red-500 bg-red-500/10 py-2 px-4 rounded-lg border border-red-500/20 animate-fade-in-up">
          <AlertCircle size={16} />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {currentStats && (
        <div className="mt-6 bg-white/80 dark:bg-[#161b22]/90 backdrop-blur-md border border-gh-border dark:border-gh-border-dark rounded-2xl p-5 flex items-center gap-5 shadow-2xl animate-fade-in-up transform transition-all hover:scale-[1.02]">
          <div className="relative">
             <img 
                src={currentStats.avatarUrl} 
                alt={currentStats.username} 
                className="w-20 h-20 rounded-full border-4 border-white dark:border-[#0d1117] shadow-lg"
             />
             <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white dark:border-[#0d1117]"></div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-2xl text-gh-text dark:text-white mb-1">
              {currentStats.username}
            </h3>
            
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/20">
                    <span>⭐</span> {currentStats.totalStars} Stars
                </div>
                <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                    <span>🦈</span> {currentStats.mergedPRs} Merged PRs
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSearch;
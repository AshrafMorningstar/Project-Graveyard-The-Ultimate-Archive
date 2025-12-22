/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect, useMemo } from 'react';
import { BADGES, GUIDES, FAQS } from './constants';
import { BadgeType, UserStats, Badge, SortOption, BadgeCategory } from './types';
import BadgeCard from './components/BadgeCard';
import AiAssistant from './components/AiAssistant';
import ProfileSearch from './components/ProfileSearch';
import BadgeDetailView from './components/BadgeDetailView';
import { Trophy, HelpCircle, BookOpen, AlertCircle, Info, Menu, X, Github, Sun, Moon, Search as SearchIcon, Filter, ArrowUpDown, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'badges' | 'guides' | 'advisor' | 'faq'>('badges');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  
  // App State for Badges
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<BadgeType | 'All'>('All');
  const [filterCategory, setFilterCategory] = useState<BadgeCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('rarity');
  const [showOwnedOnly, setShowOwnedOnly] = useState(false);
  const [manualOwnedBadges, setManualOwnedBadges] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('manualBadges');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  // View State
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);

  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist Manual Badges
  useEffect(() => {
    localStorage.setItem('manualBadges', JSON.stringify([...manualOwnedBadges]));
  }, [manualOwnedBadges]);

  // Scroll Restoration Logic
  useEffect(() => {
    if (!selectedBadge && lastSelectedId) {
      // Small timeout to allow the grid to render
      const timer = setTimeout(() => {
        const element = document.getElementById(`badge-card-${lastSelectedId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setLastSelectedId(null);
      }, 100);
      return () => clearTimeout(timer);
    } else if (selectedBadge) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedBadge, lastSelectedId]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleToggleManual = (badgeId: string) => {
    setManualOwnedBadges(prev => {
      const next = new Set(prev);
      if (next.has(badgeId)) {
        next.delete(badgeId);
      } else {
        next.add(badgeId);
      }
      return next;
    });
  };

  const handleBadgeSelect = (badge: Badge) => {
    setLastSelectedId(badge.id);
    setSelectedBadge(badge);
  };

  // derived filtering logic
  const displayedBadges = useMemo(() => {
    let result = [...BADGES];

    // Filter by Type
    if (filterType !== 'All') {
      result = result.filter(b => b.type === filterType);
    }

    // Filter by Category
    if (filterCategory !== 'All') {
      result = result.filter(b => b.category === filterCategory);
    }

    // Filter by Search (Enhanced with tips)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.name.toLowerCase().includes(q) || 
        b.description.toLowerCase().includes(q) ||
        b.howToEarn.toLowerCase().includes(q) ||
        (b.tips && b.tips.some(tip => tip.toLowerCase().includes(q)))
      );
    }

    // Filter by Owned
    if (showOwnedOnly) {
      result = result.filter(b => {
        // Check manual
        if (manualOwnedBadges.has(b.id)) return true;
        // Check API stats
        if (!userStats) return false;
        if (b.id === 'starstruck' && userStats.totalStars >= 16) return true;
        if (b.id === 'pull-shark' && userStats.mergedPRs >= 2) return true;
        return false;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'type') {
        const order = { [BadgeType.EARNABLE]: 1, [BadgeType.HIGHLIGHT]: 2, [BadgeType.RETIRED]: 3 };
        const diff = order[a.type] - order[b.type];
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      } else if (sortBy === 'rarity') {
        const rarityOrder: Record<string, number> = { 
          'Common': 1, 'Uncommon': 2, 'Rare': 3, 'Epic': 4, 'Legendary': 5 
        };
        const diff = rarityOrder[b.rarity] - rarityOrder[a.rarity];
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    return result;
  }, [BADGES, filterType, filterCategory, searchQuery, showOwnedOnly, manualOwnedBadges, userStats, sortBy]);

  return (
    <div className="min-h-screen bg-gh-bg dark:bg-gh-bg-dark text-gh-text dark:text-gh-text-dark transition-colors duration-500 relative overflow-hidden bg-grid-pattern selection:bg-blue-500/20 flex flex-col">
      
      {/* Premium Animated Atmospheric Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen dark:mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-500/5 dark:bg-violet-500/5 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-emerald-400/5 dark:bg-emerald-500/5 rounded-full blur-[80px] animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="glass-panel rounded-2xl shadow-2xl shadow-black/5 border border-white/40 dark:border-white/5 backdrop-blur-xl transition-all duration-300">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-3 shrink-0 group" onClick={() => { setActiveTab('badges'); setSelectedBadge(null); }}>
              <div 
                className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/25 cursor-pointer group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 ease-out"
              >
                <Github size={24} />
              </div>
              <span 
                className="font-bold text-xl tracking-tight hidden md:block cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 group-hover:opacity-80 transition-opacity"
              >
                Badge Hunter
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-black/20 p-1.5 rounded-xl border border-black/5 dark:border-white/5 backdrop-blur-sm">
              {[
                { id: 'badges', icon: Trophy, label: 'Collection' },
                { id: 'guides', icon: BookOpen, label: 'Guides' },
                { id: 'advisor', icon: Sparkles, label: 'Advisor' },
                { id: 'faq', icon: HelpCircle, label: 'FAQ' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as any); setSelectedBadge(null); }}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-all duration-300 text-sm font-bold ${
                    activeTab === item.id 
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm scale-100' 
                      : 'text-gh-muted dark:text-slate-400 hover:text-gh-text dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5 scale-95 hover:scale-100'
                  }`}
                >
                  <item.icon size={16} strokeWidth={2.5} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
                 {/* Theme Toggle */}
                 <button 
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl text-gh-muted dark:text-slate-400 hover:bg-white/50 dark:hover:bg-white/10 hover:text-amber-500 dark:hover:text-amber-400 transition-all hover:scale-110 active:scale-95"
                    aria-label="Toggle Theme"
                 >
                    {theme === 'dark' ? <Sun size={20} fill="currentColor" className="opacity-80" /> : <Moon size={20} fill="currentColor" className="opacity-80" />}
                 </button>

                 {/* Mobile Menu Toggle */}
                 <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-gh-muted dark:text-slate-400 hover:text-gh-text dark:hover:text-white"
                 >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                 </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 bg-white dark:bg-[#1c2128] border border-gh-border dark:border-gh-border-dark rounded-2xl shadow-2xl p-4 animate-fade-in-up z-50 ring-1 ring-black/5">
            <div className="space-y-2">
               {['badges', 'guides', 'advisor', 'faq'].map((tab) => (
                 <button
                    key={tab}
                    onClick={() => {
                        setActiveTab(tab as any);
                        setSelectedBadge(null);
                        setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold capitalize flex items-center gap-3 transition-colors ${
                        activeTab === tab 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'text-gh-muted dark:text-slate-400 hover:bg-gh-subtle dark:hover:bg-white/5'
                    }`}
                 >
                    {tab === 'badges' && <Trophy size={18} />}
                    {tab === 'guides' && <BookOpen size={18} />}
                    {tab === 'advisor' && <Sparkles size={18} />}
                    {tab === 'faq' && <HelpCircle size={18} />}
                    {tab === 'advisor' ? 'Strategy Guide' : tab === 'badges' ? 'Collection' : tab}
                 </button>
               ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 w-full min-h-[80vh]">
        
        {/* Intro Hero */}
        {activeTab === 'badges' && !selectedBadge && (
          <div className="mb-12 text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20 shadow-sm backdrop-blur-sm">
                <Sparkles size={12} /> The Ultimate Collection
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-violet-800 dark:from-white dark:via-blue-300 dark:to-violet-300 mb-6 tracking-tight drop-shadow-sm">
              GitHub Badge Hunter
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Unlock the secrets of your GitHub profile. Track progress, discover hidden achievements, and level up your developer presence.
            </p>

            <ProfileSearch onUserFound={setUserStats} />
          </div>
        )}

        {/* Content Render */}
        {activeTab === 'badges' && (
          selectedBadge ? (
            <BadgeDetailView 
                badge={selectedBadge}
                userStats={userStats}
                isManuallyOwned={manualOwnedBadges.has(selectedBadge.id)}
                onToggleManual={() => handleToggleManual(selectedBadge.id)}
                onBack={() => setSelectedBadge(null)}
                relatedBadges={BADGES.filter(b => b.category === selectedBadge.category && b.id !== selectedBadge.id).slice(0, 3)}
            />
          ) : (
            <div className="space-y-8 animate-fade-in-up">
              {/* Controls Toolbar */}
              <div className="glass-panel p-2 rounded-2xl flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 transition-all hover:border-blue-500/20">
                
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-2 w-full xl:w-auto p-2">
                    {/* Type Filter */}
                    <div className="flex flex-wrap gap-1 bg-slate-100/50 dark:bg-black/20 p-1 rounded-xl">
                        {['All', BadgeType.EARNABLE, BadgeType.HIGHLIGHT, BadgeType.RETIRED].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type as any)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                            filterType === type 
                                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md transform scale-105' 
                                : 'text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                            }`}
                        >
                            {type}
                        </button>
                        ))}
                    </div>
                    
                    {/* Category Dropdown */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Filter size={14} />
                        </div>
                        <select 
                            value={filterCategory} 
                            onChange={(e) => setFilterCategory(e.target.value as any)}
                            className="h-full pl-9 pr-8 bg-slate-100/50 dark:bg-black/20 text-sm font-bold text-slate-700 dark:text-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer border-transparent hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
                        >
                            <option value="All">All Categories</option>
                            <option value="Contribution">Contribution</option>
                            <option value="Collaboration">Collaboration</option>
                            <option value="Community">Community</option>
                            <option value="Special">Special</option>
                        </select>
                    </div>
                </div>

                {/* Search & Sort */}
                <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto justify-between xl:justify-end px-4 pb-2 xl:pb-0">
                    {/* Compact Search */}
                    <div className="relative group flex-grow md:flex-grow-0">
                         <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                         <input 
                            type="text" 
                            placeholder="Quick Filter..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-48 pl-9 pr-3 py-2 bg-slate-100/50 dark:bg-black/20 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white placeholder-slate-400 transition-all hover:bg-slate-200/50 dark:hover:bg-white/10"
                         />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center gap-2 bg-slate-100/50 dark:bg-black/20 px-3 py-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors">
                            <ArrowUpDown size={14} className="text-slate-400" />
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="bg-transparent text-sm font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer appearance-none pr-4"
                            >
                                <option value="rarity">Sort: Rarity</option>
                                <option value="category">Sort: Category</option>
                                <option value="type">Sort: Type</option>
                                <option value="name">Sort: Name</option>
                            </select>
                        </div>

                        <button 
                             onClick={() => setShowOwnedOnly(!showOwnedOnly)}
                             className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-300 ${
                                 showOwnedOnly 
                                 ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                                 : 'bg-slate-100/50 dark:bg-black/20 border-transparent text-slate-500 hover:bg-slate-200/50 dark:hover:bg-white/10'
                             }`}
                        >
                            {showOwnedOnly ? 'Showing Owned' : 'All Badges'}
                        </button>
                    </div>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedBadges.map(badge => (
                  <BadgeCard 
                    key={badge.id} 
                    badge={badge} 
                    userStats={userStats} 
                    isManuallyOwned={manualOwnedBadges.has(badge.id)}
                    onClick={() => handleBadgeSelect(badge)}
                  />
                ))}
              </div>
              
              {displayedBadges.length === 0 && (
                  <div className="glass-panel p-12 rounded-3xl text-center text-slate-500 dark:text-slate-500 animate-fade-in-up">
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy size={32} className="opacity-50" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">No badges found</h3>
                      <p className="max-w-md mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                      {showOwnedOnly && !userStats && manualOwnedBadges.size === 0 && (
                          <button className="mt-6 text-blue-500 font-bold hover:underline" onClick={() => setShowOwnedOnly(false)}>
                            Show all badges
                          </button>
                      )}
                  </div>
              )}
            </div>
          )
        )}

        {activeTab === 'guides' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
             <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 flex gap-5 backdrop-blur-sm shadow-sm">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl h-fit text-blue-600 dark:text-blue-400 shadow-inner">
                    <Info size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">Troubleshooting Missing Badges</h3>
                    <ul className="list-disc list-inside text-blue-900 dark:text-slate-300 space-y-2 text-base leading-relaxed">
                        <li><strong>Wait 24-48 hours:</strong> GitHub jobs run asynchronously.</li>
                        <li><strong>Public vs Private:</strong> Most require public repositories.</li>
                        <li><strong>Default Branch:</strong> Commits must usually be on the main/master branch.</li>
                        <li><strong>Email Config:</strong> Ensure your local git config email matches your GitHub account.</li>
                    </ul>
                </div>
             </div>

            {GUIDES.map(guide => (
              <div key={guide.id} className="glass-panel p-8 rounded-2xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                        <BookOpen size={20} />
                    </div>
                    {guide.title}
                </h2>
                <div className="space-y-4">
                  {guide.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 pt-1 text-lg leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'advisor' && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
             <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Badge Strategy Guide</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                    Not sure how to interpret a badge description? Want a strategy to get "Galaxy Brain"? 
                    Ask our strategy assistant.
                </p>
             </div>
            <AiAssistant />
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
             <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white text-center mb-10">Frequently Asked Questions</h2>
            {FAQS.map((faq, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-start gap-3">
                    <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400 mt-1">
                        <HelpCircle size={18} />
                    </div>
                    {faq.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-10 text-lg">
                  {faq.a}
                </p>
              </div>
            ))}

             <div className="glass-panel p-8 rounded-2xl mt-12 text-center shadow-lg">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 dark:text-amber-500">
                    <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Found an error?</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                    This guide is maintained by the community. If you see something wrong, please check the official discussions.
                </p>
                <a href="https://github.com/orgs/community/discussions" target="_blank" rel="noreferrer" className="inline-block px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-lg">
                    Visit GitHub Community
                </a>
             </div>
          </div>
        )}
      </main>

      {/* Attribution Footer */}
      <footer className="w-full py-8 text-center text-slate-500 dark:text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm z-10">
        <p className="font-medium">
          Created by <span className="font-bold text-slate-700 dark:text-slate-300 hover:text-blue-500 transition-colors cursor-default">Ashraf Morningstar</span>
        </p>
      </footer>
    </div>
  );
};

export default App;
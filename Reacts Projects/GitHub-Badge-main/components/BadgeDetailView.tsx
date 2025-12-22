/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { Badge, BadgeType, UserStats, BadgeRarity } from '../types';
import { ArrowLeft, CheckCircle2, Lock, Star, Trophy, AlertTriangle, Tag, Copy, Check } from 'lucide-react';

interface BadgeDetailViewProps {
  badge: Badge;
  userStats: UserStats | null;
  isManuallyOwned: boolean;
  onToggleManual: () => void;
  onBack: () => void;
  relatedBadges?: Badge[];
}

const getRarityColor = (rarity: BadgeRarity) => {
    switch (rarity) {
        case 'Common': return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
        case 'Uncommon': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
        case 'Rare': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
        case 'Epic': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
        case 'Legendary': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
        default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
}

const BadgeDetailView: React.FC<BadgeDetailViewProps> = ({ 
  badge, 
  userStats, 
  isManuallyOwned, 
  onToggleManual, 
  onBack,
  relatedBadges = []
}) => {
  const [copiedId, setCopiedId] = useState(false);

  // Determine if unlocked via API stats
  let isApiUnlocked = false;
  let progressLabel = '';
  let progressPercent = 0;

  if (userStats) {
    if (badge.id === 'starstruck') {
      const current = userStats.totalStars;
      isApiUnlocked = current >= 16;
      progressLabel = `${current} Stars`;
      progressPercent = Math.min(100, (current / 4096) * 100); 
    } else if (badge.id === 'pull-shark') {
      const current = userStats.mergedPRs;
      isApiUnlocked = current >= 2;
      progressLabel = `${current} PRs`;
      progressPercent = Math.min(100, (current / 1024) * 100); 
    }
  }

  const isOwned = isApiUnlocked || isManuallyOwned;

  const handleCopyId = () => {
    navigator.clipboard.writeText(badge.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto animate-scale-in pb-10">
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-all font-bold text-sm px-4 py-2 rounded-xl bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </button>

      <div className="bg-white dark:bg-[#161b22] border border-gh-border dark:border-gh-border-dark rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Immersive Header */}
        <div className="relative p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gh-subtle to-white dark:from-[#0d1117] dark:to-[#161b22] opacity-90 z-0"></div>
          {/* Decorative blurred blob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

          <div className="relative z-10">
            <div className="inline-block p-6 rounded-3xl bg-white dark:bg-[#21262d] shadow-xl mb-6 animate-float border border-gh-border dark:border-gh-border-dark/50 ring-4 ring-white/10">
                <div className="text-8xl filter drop-shadow-lg">
                    {badge.icon}
                </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-gh-text dark:text-white mb-4 tracking-tight">
                {badge.name}
            </h1>
            
            <div className="flex justify-center flex-wrap gap-3 mb-8">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-widest ${getRarityColor(badge.rarity)}`}>
                {badge.rarity}
                </span>
                <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={12} /> {badge.category}
                </span>
                {isOwned ? (
                <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 uppercase tracking-widest">
                    <CheckCircle2 size={12} /> Owned
                </span>
                ) : (
                <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-slate-700 flex items-center gap-2 uppercase tracking-widest">
                    <Lock size={12} /> Locked
                </span>
                )}
            </div>

            <p className="text-xl text-gh-muted dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {badge.description}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gh-border dark:divide-gh-border-dark bg-gh-subtle/30 dark:bg-[#0d1117]/30">
          
          {/* Main Content */}
          <div className="lg:col-span-2 p-8 md:p-12 space-y-10">
            
            <section>
              <h3 className="text-lg font-bold text-gh-text dark:text-white mb-5 flex items-center gap-2 uppercase tracking-wider">
                <Trophy className="text-yellow-500" size={20} />
                How to Earn
              </h3>
              <div className="glass-panel p-8 rounded-2xl shadow-sm border border-gh-border dark:border-gh-border-dark bg-white/50 dark:bg-[#161b22]/50">
                 <p className="text-gh-text dark:text-slate-200 text-lg leading-relaxed font-medium mb-6">
                    {badge.howToEarn}
                 </p>
                 
                 {badge.tips && (
                   <div className="space-y-4">
                     <p className="text-xs font-bold text-gh-muted dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Star size={12} className="text-blue-500" /> Pro Tips & Strategy
                     </p>
                     <ul className="grid gap-3">
                       {badge.tips.map((tip, i) => (
                           <li key={i} className="flex gap-4 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-gh-border dark:border-gh-border-dark/50 text-gh-text dark:text-slate-300">
                               <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                                   {i + 1}
                               </span>
                               {tip}
                           </li>
                        ))}
                     </ul>
                   </div>
                 )}
              </div>
            </section>

            {badge.tiers && (
              <section>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-gh-text dark:text-white flex items-center gap-2 uppercase tracking-wider">
                    <Star className="text-purple-500" size={20} />
                    Tier Breakdown
                    </h3>
                    
                    {isOwned && (
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                            Status: {isApiUnlocked ? 'Progressing' : 'Completed'}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                  {badge.tiers.map((tierStr, idx) => {
                    const match = tierStr.match(/^(.+?)\s\((.+?)\)$/);
                    const name = match ? match[1] : tierStr;
                    const value = match ? match[2] : '';
                    
                    // Simple logic to guess if this specific tier is met based on 'isOwned'
                    // For a real app, we'd need granular tier thresholds in the data model.
                    // For now, if the badge is owned, we fill the bars green to show completion/engagement.
                    const isTierMet = isOwned; 
                    
                    return (
                      <div key={idx} className="group relative p-4 rounded-xl border border-gh-border dark:border-gh-border-dark bg-white dark:bg-[#161b22] hover:border-blue-500/30 transition-all shadow-sm">
                        <div className="flex items-center justify-between mb-2 z-10 relative">
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-lg ${isTierMet ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                    <Star size={14} fill={isTierMet ? "currentColor" : "none"} />
                                </div>
                                <span className={`font-bold ${isTierMet ? 'text-gh-text dark:text-white' : 'text-gh-muted dark:text-slate-500'}`}>
                                    {name}
                                </span>
                            </div>
                            <span className="font-mono text-xs font-bold text-gh-muted dark:text-slate-400 bg-gh-subtle dark:bg-black/20 px-2 py-1 rounded">
                                {value}
                            </span>
                        </div>
                        
                        {/* Progress Bar within Card */}
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${isTierMet ? 'bg-emerald-500 w-full' : 'bg-transparent w-0'}`}
                            />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
            
            {/* Related Badges */}
            {relatedBadges.length > 0 && (
                <section>
                    <h3 className="text-lg font-bold text-gh-text dark:text-white mb-5 flex items-center gap-2 uppercase tracking-wider">
                        <Tag className="text-emerald-500" size={20} />
                        Related Achievements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedBadges.map(rb => (
                            <div key={rb.id} className="p-4 rounded-xl bg-white dark:bg-[#161b22] border border-gh-border dark:border-gh-border-dark flex items-center gap-4 hover:border-blue-500/50 transition-colors cursor-default opacity-80 hover:opacity-100">
                                <div className="text-3xl bg-gh-subtle dark:bg-black/20 p-2 rounded-lg">{rb.icon}</div>
                                <div>
                                    <div className="font-bold text-sm text-gh-text dark:text-white">{rb.name}</div>
                                    <div className="text-xs text-gh-muted dark:text-slate-500 line-clamp-1">{rb.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

          </div>

          {/* Sidebar / Actions */}
          <div className="p-8 md:p-12 bg-white/50 dark:bg-[#161b22]/50 backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-8 sticky top-24">
              
              {userStats && (badge.id === 'starstruck' || badge.id === 'pull-shark') && (
                 <div className="p-6 bg-white dark:bg-[#0d1117] rounded-2xl border border-gh-border dark:border-gh-border-dark shadow-lg">
                    <h4 className="font-bold text-gh-text dark:text-white mb-4 text-xs uppercase tracking-wider flex items-center justify-between">
                        Your Progress
                        <span className="text-blue-500">{progressPercent.toFixed(0)}%</span>
                    </h4>
                    
                    <div className="h-4 w-full bg-slate-100 dark:bg-[#161b22] rounded-full overflow-hidden border border-gh-border dark:border-gh-border-dark mb-3">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-shine"
                        style={{ width: `${progressPercent}%`, backgroundSize: '200% auto' }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gh-muted dark:text-slate-400 font-medium">Current: <span className="text-gh-text dark:text-white font-mono">{progressLabel}</span></span>
                    </div>

                    {isApiUnlocked && (
                        <div className="mt-4 py-2 px-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2 font-bold">
                            <CheckCircle2 size={14}/> Verified by GitHub
                        </div>
                    )}
                 </div>
              )}

              <div className="p-6 bg-white dark:bg-[#0d1117] rounded-2xl border border-gh-border dark:border-gh-border-dark shadow-lg">
                <h4 className="font-bold text-gh-text dark:text-white mb-4 text-xs uppercase tracking-wider">Collection Status</h4>
                
                <button
                  onClick={onToggleManual}
                  disabled={isApiUnlocked}
                  className={`w-full py-4 px-6 rounded-xl font-bold border transition-all flex items-center justify-center gap-3 text-sm shadow-sm group
                    ${isApiUnlocked 
                      ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 cursor-default'
                      : isManuallyOwned
                        ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/20'
                        : 'bg-white dark:bg-[#21262d] text-gh-text dark:text-slate-300 border-gh-border dark:border-slate-600 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400'
                    }
                  `}
                >
                  {isOwned ? (
                    <div className="flex items-center gap-2">
                        <div className="p-1 bg-current rounded-full text-white dark:text-black">
                            <CheckCircle2 size={12} /> 
                        </div>
                        <span>{isApiUnlocked ? 'Verified Owned' : 'Manually Claimed'}</span>
                    </div>
                  ) : (
                    <>
                        <div className="w-5 h-5 rounded-full border-2 border-current opacity-30 group-hover:opacity-100 transition-opacity" />
                        Mark as Owned
                    </>
                  )}
                </button>
                
                {!isApiUnlocked && (
                    <p className="mt-4 text-xs text-gh-muted dark:text-slate-500 leading-relaxed text-center">
                        Toggle this if you have earned the badge but it's not showing up automatically.
                    </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 flex gap-3">
                 <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0" size={18} />
                 <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
                    Manual claims are saved locally to your browser and do not modify your actual GitHub profile.
                 </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-8 border-t border-gh-border dark:border-gh-border-dark flex items-center justify-between text-xs text-gh-muted dark:text-slate-500">
               <span>ID: <span className="font-mono">{badge.id}</span></span>
               <button 
                onClick={handleCopyId}
                className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
                title="Copy ID"
               >
                   {copiedId ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                   {copiedId ? 'Copied' : 'Copy'}
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDetailView;
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
import { Badge, BadgeType, UserStats, BadgeRarity } from '../types';
import { Lock, CheckCircle2, Tag, ChevronRight, Info, Microscope, Loader2 } from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
  userStats?: UserStats | null;
  isManuallyOwned?: boolean;
  onClick: () => void;
}

const getRarityStyles = (rarity: BadgeRarity) => {
    switch (rarity) {
        case 'Common': return 'from-slate-500/20 to-slate-600/20 text-slate-400 border-slate-500/30';
        case 'Uncommon': return 'from-green-500/20 to-emerald-600/20 text-green-400 border-green-500/30';
        case 'Rare': return 'from-blue-500/20 to-cyan-600/20 text-blue-400 border-blue-500/30';
        case 'Epic': return 'from-purple-500/20 to-fuchsia-600/20 text-purple-400 border-purple-500/30';
        case 'Legendary': return 'from-amber-500/20 to-orange-600/20 text-amber-400 border-amber-500/30';
        default: return 'from-slate-500/20 to-slate-600/20 text-slate-400';
    }
}

const getRarityGlow = (rarity: BadgeRarity) => {
    switch (rarity) {
        case 'Common': return 'shadow-slate-500/10';
        case 'Uncommon': return 'shadow-green-500/20';
        case 'Rare': return 'shadow-blue-500/20';
        case 'Epic': return 'shadow-purple-500/20';
        case 'Legendary': return 'shadow-amber-500/20';
        default: return 'shadow-none';
    }
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, userStats, isManuallyOwned, onClick }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const isRetired = badge.type === BadgeType.RETIRED;

  // Progress Logic
  let progress: { current: number; next: number; label: string; tierName: string } | null = null;
  let isApiUnlocked = false;

  if (userStats) {
    if (badge.id === 'starstruck') {
      const tiers = [16, 128, 512, 4096];
      const tierNames = ['Base', 'Bronze', 'Silver', 'Gold'];
      const val = userStats.totalStars;
      
      let nextTierIdx = tiers.findIndex(t => val < t);
      if (nextTierIdx === -1) nextTierIdx = 3; 
      
      const isMax = val >= tiers[3];
      const nextVal = isMax ? tiers[3] : tiers[nextTierIdx];
      const tierName = isMax ? 'Gold' : (nextTierIdx === 0 ? 'None' : tierNames[nextTierIdx - 1]);

      isApiUnlocked = val >= 16;
      progress = {
        current: val,
        next: nextVal,
        label: `${val} / ${nextVal}`,
        tierName
      };
    } else if (badge.id === 'pull-shark') {
      const tiers = [2, 16, 128, 1024];
      const tierNames = ['Base', 'Bronze', 'Silver', 'Gold'];
      const val = userStats.mergedPRs;
      
      let nextTierIdx = tiers.findIndex(t => val < t);
      if (nextTierIdx === -1) nextTierIdx = 3;
      
      const isMax = val >= tiers[3];
      const nextVal = isMax ? tiers[3] : tiers[nextTierIdx];
      const tierName = isMax ? 'Gold' : (nextTierIdx === 0 ? 'None' : tierNames[nextTierIdx - 1]);
      
      isApiUnlocked = val >= 2;
      progress = {
        current: val,
        next: nextVal,
        label: `${val} / ${nextVal}`,
        tierName
      };
    }
  }

  const isUnlocked = isApiUnlocked || isManuallyOwned;
  const percent = progress 
    ? Math.min(100, Math.max(0, (progress.current / progress.next) * 100)) 
    : (isUnlocked ? 100 : 0);

  const rarityClass = getRarityStyles(badge.rarity);
  const glowClass = getRarityGlow(badge.rarity);

  const handleAnalyzeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnalyzing(true);
    // Simulate analysis delay before opening details
    setTimeout(() => {
        setIsAnalyzing(false);
        onClick();
    }, 800);
  };

  return (
    <div 
      id={`badge-card-${badge.id}`}
      onClick={onClick}
      className={`
        group relative p-6 rounded-2xl border transition-all duration-300 ease-out flex flex-col h-full cursor-pointer
        backdrop-blur-sm transform
        ${isRetired 
          ? 'bg-slate-100/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60 grayscale' 
          : 'bg-white/80 dark:bg-[#161b22]/80 border-gh-border dark:border-gh-border-dark hover:scale-[1.03] hover:-translate-y-1 hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/10'}
      `}
    >
      {/* Premium Gradient Background Blur */}
      {!isRetired && (
         <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${rarityClass} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
      )}

      {/* Interactive Tooltip Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
         <div className="bg-slate-900/95 dark:bg-black/90 text-slate-200 text-sm font-medium p-5 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 max-w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center leading-relaxed">
            <div className="flex items-center justify-center gap-2 text-blue-400 font-bold mb-2 uppercase tracking-wider text-[11px]">
                <Info size={14} /> How to Earn
            </div>
            {badge.howToEarn}
         </div>
      </div>

      <div className="relative z-10 flex flex-col h-full group-hover:blur-[2px] transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
            <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner
                bg-gradient-to-br from-white to-slate-100 dark:from-[#21262d] dark:to-[#0d1117]
                border border-gh-border dark:border-gh-border-dark
                group-hover:scale-110 group-hover:rotate-6 transition-all duration-500
                ${glowClass} shadow-lg
            `}>
                {badge.icon}
            </div>
            
            <div className="flex flex-col items-end gap-2">
                 <span className={`
                    px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border
                    bg-gradient-to-r ${rarityClass}
                    ${isUnlocked ? 'animate-pulse scale-110 shadow-[0_0_10px_currentColor] border-current' : ''}
                 `}>
                    {badge.rarity}
                 </span>
                 
                 {isUnlocked ? (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <CheckCircle2 size={12} /> 
                        <span>Owned</span>
                    </div>
                 ) : (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-slate-500/10 px-2 py-0.5 rounded-full border border-slate-500/20">
                        <Lock size={12} /> 
                        <span>Locked</span>
                    </div>
                 )}
            </div>
        </div>
        
        {/* Body */}
        <div className="mb-auto">
            <h3 className="text-lg font-bold text-gh-text dark:text-white mb-1 group-hover:text-blue-500 transition-colors flex items-center gap-2">
                {badge.name}
            </h3>
            
            <div className="flex items-center gap-2 mb-3 text-[11px] font-medium text-gh-muted dark:text-slate-500 uppercase tracking-wider opacity-80">
                <Tag size={12} />
                {badge.category}
            </div>
            
            <p className="text-sm text-gh-muted dark:text-slate-400 leading-relaxed line-clamp-2">
                {badge.description}
            </p>
        </div>

        {/* Progress / Status */}
        <div className="mt-6 pt-4 border-t border-gh-border dark:border-gh-border-dark/50 flex items-center justify-between gap-4">
            <div className="flex-1">
                {progress ? (
                    <div className="space-y-2">
                        <div className="flex justify-between text-[11px] font-medium">
                            <span className="text-gh-muted dark:text-slate-500">Progress</span>
                            <span className="text-gh-text dark:text-white font-mono">{progress.label}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between text-xs text-gh-muted dark:text-slate-500">
                        <span>Status</span>
                        <span className={`font-medium ${isUnlocked ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {isUnlocked ? 'Completed' : 'Not Started'}
                        </span>
                    </div>
                )}
            </div>
            
            <button
                onClick={handleAnalyzeClick}
                disabled={isAnalyzing}
                className="shrink-0 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                title="Analyze Strategy"
            >
                {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Microscope size={16} />}
            </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
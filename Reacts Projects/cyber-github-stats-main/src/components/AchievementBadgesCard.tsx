/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {cyberTheme} from '../theme/cyber-theme';

export const AchievementBadgesCard: React.FC<{
  achievements: string[];
}> = ({achievements}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardOpacity = spring({
    frame: frame - fps * 4,
    fps,
    config: {damping: 80, stiffness: 100}
  });

  const badges = achievements.slice(0, 3).map((achievement, i) => ({
    title: achievement,
    icon: ['🏆', '⚡', '🎯'][i] || '✨',
    color: [cyberTheme.colors.primary, cyberTheme.colors.secondary, cyberTheme.colors.accent][i]
  }));

  return (
    <div
      style={{
        opacity: cardOpacity,
        background: cyberTheme.colors.cardBg,
        borderRadius: cyberTheme.radius.xl,
        border: `1px solid ${cyberTheme.colors.border}`,
        boxShadow: cyberTheme.shadows.softGlow,
        padding: 24,
        backdropFilter: 'blur(18px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: cyberTheme.colors.primary,
            boxShadow: cyberTheme.shadows.softGlow
          }}
        />
        Achievements
      </div>

      <div style={{display: 'flex', gap: 12, flex: 1}}>
        {badges.map((badge, index) => {
          const badgeDelay = index * 10;
          const badgeProgress = spring({
            frame: frame - fps * 4 - badgeDelay,
            fps,
            config: {damping: 100, stiffness: 150}
          });

          const pulse = interpolate(
            Math.sin((frame + index * 30) / 20),
            [-1, 1],
            [0.9, 1.05]
          );

          return (
            <div
              key={badge.title}
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: cyberTheme.radius.md,
                border: `1px solid ${badge.color}50`,
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transform: `scale(${badgeProgress}) scale(${pulse})`,
                opacity: badgeProgress,
                boxShadow: `0 0 16px ${badge.color}40`
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  filter: `drop-shadow(0 0 8px ${badge.color})`
                }}
              >
                {badge.icon}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: badge.color,
                  textAlign: 'center',
                  lineHeight: 1.3
                }}
              >
                {badge.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
import {interpolate, useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {cyberTheme} from '../theme/cyber-theme';

export const OverviewStatsCard: React.FC<{
  overview?: {
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: string;
  };
}> = ({overview}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardOpacity = spring({
    frame: frame - fps * 1,
    fps,
    config: {damping: 80, stiffness: 100}
  });

  const stats = [
    {label: 'Repositories', value: overview?.publicRepos ?? 46, icon: '📦', color: cyberTheme.colors.primary},
    {label: 'Followers', value: overview?.followers ?? 3, icon: '👥', color: cyberTheme.colors.secondary},
    {label: 'Following', value: overview?.following ?? 3, icon: '🤝', color: cyberTheme.colors.accent},
    {label: 'Years Active', value: 5, icon: '⏱️', color: cyberTheme.colors.success}
  ];

  return (
    <div
      style={{
        opacity: cardOpacity,
        background: cyberTheme.colors.cardBg,
        borderRadius: cyberTheme.radius.xl,
        border: `1px solid ${cyberTheme.colors.border}`,
        boxShadow: cyberTheme.shadows.purpleGlow,
        padding: 24,
        backdropFilter: 'blur(18px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 20,
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
            background: cyberTheme.colors.secondary,
            boxShadow: cyberTheme.shadows.purpleGlow
          }}
        />
        Overview Stats
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16
        }}
      >
        {stats.map((stat, index) => {
          const itemDelay = index * 8;
          const itemProgress = spring({
            frame: frame - fps * 1 - itemDelay,
            fps,
            config: {damping: 100, stiffness: 150}
          });

          const pulse = interpolate(
            Math.sin((frame + index * 20) / 15),
            [-1, 1],
            [0.85, 1]
          );

          return (
            <div
              key={stat.label}
              style={{
                transform: `scale(${itemProgress})`,
                opacity: itemProgress,
                background: 'rgba(15, 23, 42, 0.5)',
                borderRadius: cyberTheme.radius.md,
                border: `1px solid ${stat.color}40`,
                padding: 16,
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  marginBottom: 8,
                  transform: `scale(${pulse})`,
                  filter: `drop-shadow(0 0 8px ${stat.color})`
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}`,
                  marginBottom: 4
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: cyberTheme.colors.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

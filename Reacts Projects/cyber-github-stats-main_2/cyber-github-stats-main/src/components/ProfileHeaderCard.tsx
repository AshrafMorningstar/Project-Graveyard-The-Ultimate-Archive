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

export const ProfileHeaderCard: React.FC<{
  data: any;
}> = ({data}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardOpacity = spring({
    frame: frame - fps * 0.5,
    fps,
    config: {damping: 80, stiffness: 100}
  });

  const name = data?.profile?.name || 'Ashraf Morningstar';
  const login = data?.profile?.login || 'AshrafMorningstar';
  const location = data?.profile?.location || 'India';
  const bio = data?.profile?.bio || 'Full-stack developer crafting cyber-clean experiences';
  const company = data?.profile?.company || 'MORNINGSTARCONSTRUCTION';

  const avatarPulse = interpolate(
    Math.sin(frame / 30),
    [-1, 1],
    [0.95, 1.05]
  );

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
        gap: 24,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Gradient Accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${cyberTheme.colors.primary}, ${cyberTheme.colors.secondary}, ${cyberTheme.colors.accent})`,
          opacity: 0.8
        }}
      />

      {/* Avatar */}
      <div
        style={{
          position: 'relative',
          transform: `scale(${avatarPulse})`
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: cyberTheme.radius.lg,
            background: `linear-gradient(135deg, ${cyberTheme.colors.primary}, ${cyberTheme.colors.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a',
            fontWeight: 900,
            fontSize: 36,
            boxShadow: `0 0 24px ${cyberTheme.colors.primary}60`,
            border: `2px solid ${cyberTheme.colors.primary}`
          }}
        >
          {name.charAt(0)}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: cyberTheme.colors.success,
            border: `3px solid ${cyberTheme.colors.cardBg}`,
            boxShadow: `0 0 12px ${cyberTheme.colors.success}`
          }}
        />
      </div>

      {/* Info */}
      <div style={{flex: 1}}>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8}}>
          <div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                background: `linear-gradient(90deg, ${cyberTheme.colors.textPrimary}, ${cyberTheme.colors.primary})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: 14,
                color: cyberTheme.colors.textMuted,
                marginTop: 2
              }}
            >
              @{login}
            </div>
          </div>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: `1px solid ${cyberTheme.colors.primary}`,
              color: cyberTheme.colors.primary,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              boxShadow: `0 0 12px ${cyberTheme.colors.primary}40`
            }}
          >
            Active
          </div>
        </div>

        <div
          style={{
            fontSize: 13,
            color: cyberTheme.colors.textPrimary,
            marginBottom: 10,
            lineHeight: 1.5
          }}
        >
          {bio}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            fontSize: 12,
            color: cyberTheme.colors.textMuted
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <span>📍</span>
            {location}
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <span>🏢</span>
            {company}
          </div>
        </div>
      </div>
    </div>
  );
};

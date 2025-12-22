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

export const FooterBrandingCard: React.FC<{
  username: string;
}> = ({username}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardOpacity = spring({
    frame: frame - fps * 5,
    fps,
    config: {damping: 80, stiffness: 100}
  });

  const glowIntensity = interpolate(
    Math.sin(frame / 25),
    [-1, 1],
    [0.5, 1]
  );

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
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(90deg, ${cyberTheme.colors.primary}15, ${cyberTheme.colors.secondary}15)`,
          opacity: glowIntensity * 0.5
        }}
      />

      <div style={{position: 'relative', zIndex: 1}}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            background: `linear-gradient(90deg, ${cyberTheme.colors.primary}, ${cyberTheme.colors.secondary})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 4
          }}
        >
          Cyber Stats Dashboard
        </div>
        <div
          style={{
            fontSize: 11,
            color: cyberTheme.colors.textMuted,
            letterSpacing: 0.5
          }}
        >
          Generated for @{username}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        {['⭐', '🔖', '🚀'].map((icon, i) => {
          const iconDelay = i * 8;
          const iconProgress = spring({
            frame: frame - fps * 5 - iconDelay,
            fps,
            config: {damping: 100, stiffness: 150}
          });

          return (
            <div
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.8)',
                border: `1px solid ${cyberTheme.colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                transform: `scale(${iconProgress})`,
                opacity: iconProgress
              }}
            >
              {icon}
            </div>
          );
        })}
      </div>
    </div>
  );
};

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

export const LanguageRingChartCard: React.FC<{
  languages: {name: string; percentage: number}[];
}> = ({languages}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardOpacity = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 80, stiffness: 100}
  });

  const centerX = 120;
  const centerY = 120;
  const radius = 80;
  const strokeWidth = 24;

  const colors = ['#22d3ee', '#a855f7', '#f97316', '#22c55e', '#eab308'];

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
        flexDirection: 'column'
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
        Language Distribution
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
          flex: 1
        }}
      >
        {/* Ring Chart */}
        <div style={{position: 'relative'}}>
          <svg width={240} height={240} style={{transform: 'rotate(-90deg)'}}>
            {languages.map((lang, index) => {
              const startPercentage = languages
                .slice(0, index)
                .reduce((sum, l) => sum + l.percentage, 0);
              const circumference = 2 * Math.PI * radius;
              const offset = (startPercentage / 100) * circumference;
              const length = (lang.percentage / 100) * circumference;

              const segmentDelay = index * 12;
              const segmentProgress = spring({
                frame: frame - fps * 3 - segmentDelay,
                fps,
                config: {damping: 80, stiffness: 100}
              });

              const animatedLength = length * segmentProgress;
              const color = colors[index % colors.length];

              return (
                <circle
                  key={lang.name}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${animatedLength} ${circumference}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 8px ${color})`
                  }}
                />
              );
            })}
          </svg>

          {/* Center Label */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: cyberTheme.colors.primary,
                textShadow: `0 0 15px ${cyberTheme.colors.primary}`
              }}
            >
              {languages.length}
            </div>
            <div
              style={{
                fontSize: 11,
                color: cyberTheme.colors.textMuted,
                textTransform: 'uppercase',
                letterSpacing: 1
              }}
            >
              Languages
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 12}}>
          {languages.map((lang, index) => {
            const itemDelay = 30 + index * 8;
            const itemProgress = spring({
              frame: frame - fps * 3 - itemDelay,
              fps,
              config: {damping: 100, stiffness: 150}
            });

            const color = colors[index % colors.length];

            return (
              <div
                key={lang.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  opacity: itemProgress,
                  transform: `translateX(${interpolate(itemProgress, [0, 1], [20, 0])}px)`
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: color,
                    boxShadow: `0 0 8px ${color}`
                  }}
                />
                <div style={{flex: 1}}>
                  <div style={{fontSize: 13, fontWeight: 600}}>{lang.name}</div>
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: color
                  }}
                >
                  {lang.percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

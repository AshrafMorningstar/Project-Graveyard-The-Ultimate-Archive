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

export const ActivityTimelineCard: React.FC<{
  activity: {month: string; commits: number}[];
}> = ({activity}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardOpacity = spring({
    frame: frame - fps * 2,
    fps,
    config: {damping: 80, stiffness: 100}
  });

  const maxCommits = Math.max(...activity.map(a => a.commits), 1);

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
            background: cyberTheme.colors.primary,
            boxShadow: cyberTheme.shadows.softGlow
          }}
        />
        Activity Timeline
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 8,
          flex: 1,
          paddingBottom: 16
        }}
      >
        {activity.map((item, index) => {
          const barDelay = index * 6;
          const barProgress = spring({
            frame: frame - fps * 2 - barDelay,
            fps,
            config: {damping: 80, stiffness: 120}
          });

          const barHeight = (item.commits / maxCommits) * 100;
          const animatedHeight = barHeight * barProgress;

          const hue = interpolate(index, [0, activity.length - 1], [180, 280]);
          const barColor = `hsl(${hue}, 70%, 60%)`;

          return (
            <div
              key={item.month}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: animatedHeight,
                  background: `linear-gradient(180deg, ${barColor}, ${barColor}60)`,
                  borderRadius: `${cyberTheme.radius.md}px ${cyberTheme.radius.md}px 0 0`,
                  border: `1px solid ${barColor}`,
                  boxShadow: `0 0 12px ${barColor}60`,
                  position: 'relative',
                  minHeight: 4
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -24,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 10,
                    fontWeight: 700,
                    color: barColor,
                    opacity: interpolate(barProgress, [0.7, 1], [0, 1])
                  }}
                >
                  {item.commits}
                </div>
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: cyberTheme.colors.textMuted,
                  fontWeight: 600
                }}
              >
                {item.month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

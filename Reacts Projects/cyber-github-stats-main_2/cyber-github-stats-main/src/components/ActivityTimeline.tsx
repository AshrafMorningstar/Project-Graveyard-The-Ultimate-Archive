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
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const ActivityTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const months = [
    { name: 'JAN', commits: 87, prs: 12, issues: 5 },
    { name: 'FEB', commits: 124, prs: 18, issues: 8 },
    { name: 'MAR', commits: 156, prs: 22, issues: 11 },
    { name: 'APR', commits: 98, prs: 15, issues: 6 },
    { name: 'MAY', commits: 142, prs: 20, issues: 9 },
    { name: 'JUN', commits: 178, prs: 25, issues: 13 },
    { name: 'JUL', commits: 134, prs: 19, issues: 7 },
    { name: 'AUG', commits: 165, prs: 23, issues: 10 },
    { name: 'SEP', commits: 189, prs: 27, issues: 14 },
    { name: 'OCT', commits: 152, prs: 21, issues: 9 },
    { name: 'NOV', commits: 143, prs: 20, issues: 8 },
    { name: 'DEC', commits: 79, prs: 11, issues: 4 },
  ];

  const maxCommits = Math.max(...months.map((m) => m.commits));

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #0a0e27 0%, #050812 50%, #1a0a3f 100%)',
        fontFamily: 'Orbitron, monospace',
      }}
    >
      {/* Holographic Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px',
          transform: `perspective(500px) rotateX(${interpolate(frame, [0, 260], [0, 360])}deg)`,
          opacity: 0.4,
        }}
      />

      <div style={{ padding: 60, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Title */}
        <div style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: '#00ffff',
              textShadow: `
                0 0 25px rgba(0, 255, 255, 1),
                0 0 50px rgba(255, 0, 255, 0.5)
              `,
              letterSpacing: 6,
              marginBottom: 15,
            }}
          >
            ACTIVITY TIMELINE
          </h1>
          <div
            style={{
              fontSize: 18,
              color: '#ff00ff',
              textShadow: '0 0 15px #ff00ff',
              letterSpacing: 3,
            }}
          >
            2025 CONTRIBUTION OVERVIEW
          </div>
        </div>

        {/* Stats Summary */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginBottom: 50,
            justifyContent: 'center',
          }}
        >
          {[
            { label: 'COMMITS', value: months.reduce((sum, m) => sum + m.commits, 0), color: '#00ffff' },
            { label: 'PULL REQUESTS', value: months.reduce((sum, m) => sum + m.prs, 0), color: '#ff00ff' },
            { label: 'ISSUES', value: months.reduce((sum, m) => sum + m.issues, 0), color: '#00ff88' },
          ].map((stat, index) => {
            const delay = index * 10;
            const progress = spring({ frame: frame - delay, fps, config: { damping: 100 } });

            return (
              <div
                key={stat.label}
                style={{
                  textAlign: 'center',
                  transform: `scale(${progress})`,
                  opacity: progress,
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    color: stat.color,
                    textShadow: `0 0 20px ${stat.color}`,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: '#ffffff',
                    opacity: 0.7,
                    letterSpacing: 2,
                    marginTop: 5,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bar Chart */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: 300,
            gap: 15,
            padding: '0 20px',
          }}
        >
          {months.map((month, index) => {
            const barHeight = (month.commits / maxCommits) * 250;
            const delay = index * 8;
            const progress = spring({
              frame: frame - delay,
              fps,
              config: { damping: 80, stiffness: 100 },
            });

            const animatedHeight = barHeight * progress;

            const hue = (index / months.length) * 360;
            const barColor = `hsl(${hue}, 100%, 60%)`;

            return (
              <div
                key={month.name}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                {/* Bar */}
                <div
                  style={{
                    width: '100%',
                    height: animatedHeight,
                    background: `linear-gradient(180deg, ${barColor}, ${barColor}88)`,
                    borderRadius: '8px 8px 0 0',
                    border: `2px solid ${barColor}`,
                    boxShadow: `
                      0 0 20px ${barColor}80,
                      inset 0 0 20px ${barColor}40
                    `,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Scanning Line */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: 3,
                      background: 'rgba(255, 255, 255, 0.8)',
                      top: `${((frame * 2 + index * 10) % 100)}%`,
                      boxShadow: '0 0 10px #ffffff',
                    }}
                  />

                  {/* Value Label */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -30,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 16,
                      fontWeight: 900,
                      color: barColor,
                      textShadow: `0 0 10px ${barColor}`,
                      opacity: interpolate(progress, [0.8, 1], [0, 1]),
                    }}
                  >
                    {month.commits}
                  </div>
                </div>

                {/* Month Label */}
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#ffffff',
                    opacity: 0.9,
                    letterSpacing: 1,
                  }}
                >
                  {month.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

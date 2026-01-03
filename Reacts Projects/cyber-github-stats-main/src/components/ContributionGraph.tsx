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
import statsData from '../data/stats.json';

export const ContributionGraph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const animationProgress = spring({ frame, fps, config: { damping: 80, stiffness: 100 } });

  // Generate contribution data (52 weeks x 7 days)
  const weeks = 52;
  const days = 7;
  const contributions = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => {
      const intensity = Math.random();
      return { intensity, count: Math.floor(intensity * 20) };
    })
  );

  const cellSize = 12;
  const gap = 3;

  return (
    <AbsoluteFill style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a0a3f 50%, #0a0e27 100%)' }}>
      {/* Animated Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03) 0px, rgba(0, 255, 255, 0.03) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, rgba(255, 0, 255, 0.03) 0px, rgba(255, 0, 255, 0.03) 1px, transparent 1px, transparent 40px)
          `,
          opacity: interpolate(Math.sin(frame / 30), [-1, 1], [0.5, 1]),
        }}
      />

      {/* Holographic Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${50 + Math.sin(frame / 60) * 30}% ${50 + Math.cos(frame / 60) * 30}%, rgba(0, 255, 255, 0.1), transparent 50%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ padding: 60, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Title with Glitch Effect */}
        <div style={{ marginBottom: 40, position: 'relative' }}>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: '#00ffff',
              textShadow: `
                0 0 20px rgba(0, 255, 255, 1),
                ${interpolate(Math.sin(frame / 5), [-1, 1], [-3, 3])}px 0 15px rgba(255, 0, 255, 0.8),
                ${interpolate(Math.cos(frame / 7), [-1, 1], [-3, 3])}px 0 15px rgba(0, 255, 136, 0.8)
              `,
              fontFamily: 'Orbitron, monospace',
              letterSpacing: 6,
              transform: `translateY(${interpolate(animationProgress, [0, 1], [-50, 0])}px)`,
              opacity: animationProgress,
            }}
          >
            CONTRIBUTION MATRIX
          </h1>
          <div
            style={{
              fontSize: 18,
              color: '#ff00ff',
              textShadow: '0 0 15px #ff00ff',
              letterSpacing: 3,
              marginTop: 10,
              opacity: animationProgress * 0.9,
            }}
          >
            {statsData.total_commits || 1247} TOTAL COMMITS THIS YEAR
          </div>
        </div>

        {/* Contribution Grid */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <div style={{ display: 'flex', gap }}>
            {contributions.map((week, weekIndex) => {
              const weekDelay = weekIndex * 2;
              const weekProgress = spring({
                frame: frame - weekDelay,
                fps,
                config: { damping: 100, stiffness: 200 },
              });

              return (
                <div key={weekIndex} style={{ display: 'flex', flexDirection: 'column', gap }}>
                  {week.map((day, dayIndex) => {
                    const cellDelay = weekDelay + dayIndex;
                    const cellProgress = spring({
                      frame: frame - cellDelay,
                      fps,
                      config: { damping: 80, stiffness: 150 },
                    });

                    const colors = [
                      'rgba(0, 255, 255, 0.1)',
                      'rgba(0, 255, 255, 0.3)',
                      'rgba(0, 255, 255, 0.6)',
                      'rgba(0, 255, 255, 0.8)',
                      'rgba(0, 255, 255, 1)',
                    ];

                    const colorIndex = Math.floor(day.intensity * colors.length);
                    const color = colors[Math.min(colorIndex, colors.length - 1)];

                    const glowIntensity = interpolate(
                      Math.sin((frame + weekIndex * 10 + dayIndex * 5) / 20),
                      [-1, 1],
                      [0.5, 1]
                    );

                    return (
                      <div
                        key={dayIndex}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          background: color,
                          borderRadius: 2,
                          border: `1px solid ${day.intensity > 0.5 ? '#00ffff' : 'rgba(0, 255, 255, 0.2)'}`,
                          boxShadow:
                            day.intensity > 0.5
                              ? `0 0 ${10 * glowIntensity}px rgba(0, 255, 255, ${0.8 * glowIntensity})`
                              : 'none',
                          transform: `scale(${cellProgress})`,
                          opacity: cellProgress,
                          transition: 'all 0.3s ease',
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            marginTop: 40,
            opacity: interpolate(animationProgress, [0.7, 1], [0, 1]),
          }}
        >
          <span style={{ fontSize: 14, color: '#ffffff', opacity: 0.7, letterSpacing: 2 }}>LESS</span>
          {[0.2, 0.4, 0.6, 0.8, 1].map((intensity, i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                background: `rgba(0, 255, 255, ${intensity})`,
                border: '1px solid rgba(0, 255, 255, 0.5)',
                borderRadius: 2,
              }}
            />
          ))}
          <span style={{ fontSize: 14, color: '#ffffff', opacity: 0.7, letterSpacing: 2 }}>MORE</span>
        </div>
      </div>

      {/* Corner Accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 100, height: 100, borderTop: '4px solid #00ffff', borderLeft: '4px solid #00ffff', opacity: 0.6 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 100, height: 100, borderBottom: '4px solid #ff00ff', borderRight: '4px solid #ff00ff', opacity: 0.6 }} />
    </AbsoluteFill>
  );
};

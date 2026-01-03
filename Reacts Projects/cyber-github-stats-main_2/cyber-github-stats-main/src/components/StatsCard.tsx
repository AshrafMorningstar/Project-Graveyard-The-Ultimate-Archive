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
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import statsData from '../data/stats.json';

export const StatsCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const animationProgress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const stats = [
    { label: 'Total Repos', value: statsData.public_repos, icon: '📁', color: '#00ffff' },
    { label: 'Total Stars', value: statsData.total_stars, icon: '⭐', color: '#ff00ff' },
    { label: 'Total Commits', value: statsData.total_commits, icon: '💥', color: '#00ff88' },
    { label: 'Followers', value: statsData.followers, icon: '👥', color: '#0080ff' },
  ];

  const glowOpacity = interpolate(
    Math.sin(frame / 10),
    [-1, 1],
    [0.5, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0e27 0%, #050812 100%)',
        fontFamily: 'Orbitron, monospace',
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          opacity: 0.3,
        }}
      />

      {/* Scanline Effect */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '3px',
          background: 'linear-gradient(transparent, rgba(0, 255, 255, 0.8), transparent)',
          transform: `translateY(${(frame * 2) % 400}px)`,
          opacity: 0.5,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: '40px',
          transform: `scale(${animationProgress})`,
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 900,
            color: '#00ffff',
            textShadow: `
              0 0 10px rgba(0, 255, 255, ${glowOpacity}),
              0 0 20px rgba(0, 255, 255, ${glowOpacity * 0.7}),
              0 0 30px rgba(0, 255, 255, ${glowOpacity * 0.5})
            `,
            marginBottom: '50px',
            letterSpacing: '4px',
          }}
        >
          GITHUB STATS
        </h1>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            width: '100%',
            maxWidth: '700px',
          }}
        >
          {stats.map((stat, index) => {
            const delay = index * 10;
            const itemProgress = spring({
              frame: frame - delay,
              fps,
              config: {
                damping: 100,
                stiffness: 200,
              },
            });

            return (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  border: `2px solid ${stat.color}`,
                  borderRadius: '15px',
                  padding: '30px',
                  textAlign: 'center',
                  boxShadow: `0 0 20px ${stat.color}40`,
                  transform: `translateY(${interpolate(
                    itemProgress,
                    [0, 1],
                    [50, 0]
                  )}px)`,
                  opacity: itemProgress,
                }}
              >
                <div
                  style={{
                    fontSize: '40px',
                    marginBottom: '10px',
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: '42px',
                    fontWeight: 'bold',
                    color: stat.color,
                    textShadow: `0 0 15px ${stat.color}`,
                    marginBottom: '5px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#ffffff',
                    opacity: 0.8,
                    letterSpacing: '2px',
                  }}
                >
                  {stat.label.toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Username */}
        <div
          style={{
            marginTop: '40px',
            fontSize: '20px',
            color: '#ff00ff',
            textShadow: '0 0 10px #ff00ff',
            letterSpacing: '3px',
          }}
        >
          @{statsData.username}
        </div>
      </div>
    </AbsoluteFill>
  );
};

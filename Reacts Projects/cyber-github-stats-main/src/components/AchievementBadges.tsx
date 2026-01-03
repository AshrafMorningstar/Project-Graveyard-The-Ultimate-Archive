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

export const AchievementBadges: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const achievements = [
    {
      title: 'Code Warrior',
      description: `${statsData.total_commits || 1247} Total Commits`,
      icon: '⚔️',
      color: '#00ffff',
      unlocked: true,
    },
    {
      title: 'Repository Master',
      description: `${statsData.public_repos || 46} Public Repos`,
      icon: '📁',
      color: '#ff00ff',
      unlocked: true,
    },
    {
      title: 'Star Collector',
      description: `${statsData.total_stars || 89} Stars Earned`,
      icon: '⭐',
      color: '#00ff88',
      unlocked: true,
    },
    {
      title: 'Community Builder',
      description: `${statsData.followers || 3} Followers`,
      icon: '👥',
      color: '#0080ff',
      unlocked: true,
    },
    {
      title: 'Open Source Hero',
      description: 'Active Contributor',
      icon: '🦸',
      color: '#8000ff',
      unlocked: true,
    },
    {
      title: 'Code Architect',
      description: 'Full-Stack Developer',
      icon: '🏛️',
      color: '#ff0080',
      unlocked: true,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #050812 0%, #0a0e27 25%, #1a0a3f 50%, #0a0e27 75%, #050812 100%)',
        fontFamily: 'Orbitron, monospace',
      }}
    >
      {/* Animated Particle Background */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (i * 37) % 100;
        const y = (i * 57) % 100;
        const delay = i * 3;
        const size = 2 + (i % 4);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00ff' : '#00ff88',
              opacity: interpolate(Math.sin((frame + delay) / 30), [-1, 1], [0.2, 0.8]),
              boxShadow: `0 0 ${size * 3}px currentColor`,
            }}
          />
        );
      })}

      <div style={{ padding: 60, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Glowing Title */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 900,
              background: 'linear-gradient(90deg, #00ffff 0%, #ff00ff 50%, #00ff88 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 8,
              textShadow: '0 0 40px rgba(0, 255, 255, 0.6)',
              filter: `brightness(${interpolate(Math.sin(frame / 20), [-1, 1], [1, 1.3])})`,
            }}
          >
            ACHIEVEMENTS
          </h1>
          <div
            style={{
              fontSize: 16,
              color: '#ffffff',
              opacity: 0.7,
              letterSpacing: 4,
              marginTop: 10,
            }}
          >
            UNLOCKED: {achievements.filter((a) => a.unlocked).length} / {achievements.length}
          </div>
        </div>

        {/* Achievement Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 30,
            flex: 1,
          }}
        >
          {achievements.map((achievement, index) => {
            const delay = index * 15;
            const progress = spring({
              frame: frame - delay,
              fps,
              config: { damping: 80, stiffness: 120 },
            });

            const rotateY = interpolate(progress, [0, 1], [90, 0]);
            const scale = interpolate(progress, [0, 0.5, 1], [0.8, 1.1, 1]);

            const glowIntensity = interpolate(
              Math.sin((frame + index * 20) / 25),
              [-1, 1],
              [0.4, 1]
            );

            return (
              <div
                key={achievement.title}
                style={{
                  transform: `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: progress,
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))`,
                    border: `3px solid ${achievement.color}`,
                    borderRadius: 20,
                    padding: 25,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: `
                      0 0 30px ${achievement.color}${Math.floor(glowIntensity * 100).toString(16).padStart(2, '0')},
                      inset 0 0 30px ${achievement.color}20
                    `,
                  }}
                >
                  {/* Shine Effect */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -50,
                      left: -50,
                      width: 100,
                      height: 200,
                      background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      transform: `translateX(${interpolate(progress, [0, 1], [-100, 300])}px) rotate(45deg)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    style={{
                      fontSize: 64,
                      marginBottom: 15,
                      filter: `drop-shadow(0 0 15px ${achievement.color})`,
                      transform: `scale(${interpolate(Math.sin((frame + index * 15) / 30), [-1, 1], [0.95, 1.05])})`,
                    }}
                  >
                    {achievement.icon}
                  </div>

                  {/* Title */}
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 900,
                      color: achievement.color,
                      textShadow: `0 0 15px ${achievement.color}`,
                      marginBottom: 8,
                      letterSpacing: 2,
                    }}
                  >
                    {achievement.title}
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      fontSize: 13,
                      color: '#ffffff',
                      opacity: 0.8,
                      letterSpacing: 1,
                    }}
                  >
                    {achievement.description}
                  </div>

                  {/* Unlocked Badge */}
                  {achievement.unlocked && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: achievement.color,
                        color: '#000000',
                        fontSize: 10,
                        fontWeight: 900,
                        padding: '4px 8px',
                        borderRadius: 5,
                        letterSpacing: 1,
                      }}
                    >
                      UNLOCKED
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

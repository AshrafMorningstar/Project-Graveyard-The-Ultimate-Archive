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

export const LanguageChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const languages = [
    { name: 'JavaScript', percentage: 45, color: '#f7df1e', icon: '⚡' },
    { name: 'TypeScript', percentage: 25, color: '#3178c6', icon: '🔷' },
    { name: 'Python', percentage: 15, color: '#3776ab', icon: '🐍' },
    { name: 'HTML/CSS', percentage: 10, color: '#e34c26', icon: '🎨' },
    { name: 'Others', percentage: 5, color: '#00ff88', icon: '✨' },
  ];

  const animationProgress = spring({ frame, fps, config: { damping: 100, stiffness: 150 } });

  const centerX = 300;
  const centerY = 200;
  const radius = 120;

  return (
    <AbsoluteFill style={{ background: 'linear-gradient(225deg, #050812 0%, #0a0e27 50%, #1a0a3f 100%)' }}>
      {/* Dynamic Background Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, transparent 40%, rgba(0, 255, 255, 0.05) 100%)`,
        }}
      />

      <div style={{ padding: 50, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Title */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            background: 'linear-gradient(90deg, #00ffff, #ff00ff, #00ff88)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
            fontFamily: 'Orbitron, monospace',
            letterSpacing: 4,
            marginBottom: 50,
            transform: `translateY(${interpolate(animationProgress, [0, 1], [-30, 0])}px)`,
            opacity: animationProgress,
          }}
        >
          LANGUAGE DISTRIBUTION
        </h1>

        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
          {/* Circular Chart */}
          <div style={{ position: 'relative', width: radius * 2 + 100, height: radius * 2 + 100 }}>
            <svg width={radius * 2 + 100} height={radius * 2 + 100} style={{ transform: 'rotate(-90deg)' }}>
              {/* Glow Circle */}
              <circle
                cx={centerX}
                cy={centerY}
                r={radius + 10}
                fill="none"
                stroke="rgba(0, 255, 255, 0.2)"
                strokeWidth="20"
                filter="blur(8px)"
              />

              {languages.map((lang, index) => {
                const startPercentage = languages.slice(0, index).reduce((sum, l) => sum + l.percentage, 0);
                const circumference = 2 * Math.PI * radius;
                const offset = (startPercentage / 100) * circumference;
                const length = (lang.percentage / 100) * circumference;

                const segmentDelay = index * 15;
                const segmentProgress = spring({
                  frame: frame - segmentDelay,
                  fps,
                  config: { damping: 80, stiffness: 100 },
                });

                const animatedLength = length * segmentProgress;

                return (
                  <g key={lang.name}>
                    <circle
                      cx={centerX}
                      cy={centerY}
                      r={radius}
                      fill="none"
                      stroke={lang.color}
                      strokeWidth="25"
                      strokeDasharray={`${animatedLength} ${circumference}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="round"
                      style={{
                        filter: `drop-shadow(0 0 10px ${lang.color})`,
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Center Text */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#00ffff',
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                  fontFamily: 'Orbitron, monospace',
                }}
              >
                {languages.length}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: '#ffffff',
                  opacity: 0.8,
                  letterSpacing: 2,
                  marginTop: 5,
                }}
              >
                LANGUAGES
              </div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {languages.map((lang, index) => {
              const itemDelay = 30 + index * 10;
              const itemProgress = spring({
                frame: frame - itemDelay,
                fps,
                config: { damping: 100, stiffness: 200 },
              });

              return (
                <div
                  key={lang.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    transform: `translateX(${interpolate(itemProgress, [0, 1], [50, 0])}px)`,
                    opacity: itemProgress,
                  }}
                >
                  <div style={{ fontSize: 32 }}>{lang.icon}</div>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: lang.color,
                      boxShadow: `0 0 15px ${lang.color}`,
                      border: '2px solid #ffffff',
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#ffffff',
                        fontFamily: 'Orbitron, monospace',
                      }}
                    >
                      {lang.name}
                    </div>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 900,
                        color: lang.color,
                        textShadow: `0 0 10px ${lang.color}`,
                      }}
                    >
                      {lang.percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

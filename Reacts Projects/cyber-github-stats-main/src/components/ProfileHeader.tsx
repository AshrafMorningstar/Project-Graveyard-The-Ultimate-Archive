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

export const ProfileHeader: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: {
      damping: 80,
    },
  });

  const glitchOffset = interpolate(
    Math.sin(frame / 5),
    [-1, 1],
    [-2, 2]
  );

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(90deg, #0a0e27 0%, #1a0e3f 100%)',
        fontFamily: 'Orbitron, monospace',
      }}
    >
      {/* Cyber Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 0, 255, 0.1) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.1) 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.3,
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '40px 60px',
          height: '100%',
          transform: `translateX(${interpolate(slideIn, [0, 1], [-100, 0])}px)`,
        }}
      >
        {/* Avatar Section */}
        <div
          style={{
            position: 'relative',
            marginRight: '50px',
          }}
        >
          {/* Avatar Border Glow */}
          <div
            style={{
              position: 'absolute',
              inset: -5,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #00ffff, #ff00ff, #00ff88)',
              opacity: interpolate(Math.sin(frame / 10), [-1, 1], [0.3, 0.8]),
              filter: 'blur(10px)',
            }}
          />

          {/* Avatar */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '3px solid #00ffff',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)',
              overflow: 'hidden',
              position: 'relative',
              background: '#1a1a2e',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '60px',
              }}
            >
              👨‍💻
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div style={{ flex: 1 }}>
          {/* Name with Glitch Effect */}
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 900,
              color: '#00ffff',
              textShadow: `
                0 0 20px rgba(0, 255, 255, 0.8),
                ${glitchOffset}px 0 10px rgba(255, 0, 255, 0.5),
                ${-glitchOffset}px 0 10px rgba(0, 255, 136, 0.5)
              `,
              marginBottom: '15px',
              letterSpacing: '3px',
            }}
          >
            {statsData.name || 'ASHRAF MORNINGSTAR'}
          </h1>

          {/* Username */}
          <div
            style={{
              fontSize: '24px',
              color: '#ff00ff',
              textShadow: '0 0 10px #ff00ff',
              marginBottom: '20px',
              letterSpacing: '2px',
            }}
          >
            @{statsData.username}
          </div>

          {/* Status Bar */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              fontSize: '16px',
            }}
          >
            <div
              style={{
                color: '#00ff88',
                textShadow: '0 0 10px #00ff88',
              }}
            >
              ● ONLINE
            </div>
            <div
              style={{
                color: '#ffffff',
                opacity: 0.8,
              }}
            >
              {statsData.location || 'INDIA'}
            </div>
            <div
              style={{
                color: '#ffffff',
                opacity: 0.8,
              }}
            >
              {statsData.public_repos} REPOS
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: '50px',
            height: '50px',
            border: '3px solid #00ffff',
            borderLeft: 'none',
            borderBottom: 'none',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            width: '50px',
            height: '50px',
            border: '3px solid #ff00ff',
            borderRight: 'none',
            borderTop: 'none',
            opacity: 0.7,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

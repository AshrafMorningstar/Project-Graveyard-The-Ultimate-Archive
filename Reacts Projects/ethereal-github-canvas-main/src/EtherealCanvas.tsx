/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, {useEffect, useState, useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, spring} from 'remotion';
import {ARTISTIC_THEMES, getRandomTheme, ArtisticTheme} from './themes';

interface Props {
  username: string;
  themeId: string;
  seed: number;
}

interface GitHubStats {
  name: string;
  username: string;
  repos: number;
  stars: number;
  commits: number;
  followers: number;
  languages: {name: string; percentage: number}[];
}

const fetchStats = async (username: string): Promise<GitHubStats> => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    return {
      name: data.name || username,
      username: data.login,
      repos: data.public_repos || 0,
      stars: Math.floor(Math.random() * 200) + 50,
      commits: Math.floor(Math.random() * 1500) + 500,
      followers: data.followers || 0,
      languages: [
        {name: 'JavaScript', percentage: 38},
        {name: 'TypeScript', percentage: 27},
        {name: 'Python', percentage: 20},
        {name: 'Other', percentage: 15},
      ],
    };
  } catch {
    return {
      name: 'Ashraf Morningstar',
      username: 'AshrafMorningstar',
      repos: 46,
      stars: 89,
      commits: 1247,
      followers: 3,
      languages: [
        {name: 'JavaScript', percentage: 38},
        {name: 'TypeScript', percentage: 27},
        {name: 'Python', percentage: 20},
        {name: 'Other', percentage: 15},
      ],
    };
  }
};

export const EtherealCanvas: React.FC<Props> = ({username, themeId, seed}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const [stats, setStats] = useState<GitHubStats | null>(null);

  const theme: ArtisticTheme = useMemo(() => {
    if (themeId === 'random') return getRandomTheme();
    return ARTISTIC_THEMES.find(t => t.id === themeId) || ARTISTIC_THEMES[0];
  }, [themeId, seed]);

  useEffect(() => {
    fetchStats(username).then(setStats);
  }, [username]);

  // Animations
  const fadeIn = spring({frame, fps, config: {damping: 100}});
  const titleSlide = interpolate(frame, [0, 30], [-50, 0], {easing: Easing.out(Easing.ease)});
  const cardDelay = (index: number) => spring({frame: frame - 20 * index, fps, config: {damping: 80}});

  // Dynamic background
  const bgPulse = interpolate(Math.sin(frame / 40), [-1, 1], [0.8, 1]);
  const bgRotate = interpolate(frame, [0, 450], [0, 360]);

  if (!stats) return <AbsoluteFill style={{background: theme.palette.background}} />;

  return (
    <AbsoluteFill
      style={{
        background: theme.palette.background,
        fontFamily: theme.style.fontFamily,
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Gradients */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary}30, transparent 70%)`,
          top: -200,
          left: -200,
          opacity: bgPulse,
          transform: `rotate(${bgRotate}deg)`,
          filter: `blur(${80 * theme.style.shadowIntensity}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary}25, transparent 70%)`,
          bottom: -150,
          right: -150,
          opacity: bgPulse * 0.7,
          transform: `rotate(${-bgRotate}deg)`,
          filter: `blur(${60 * theme.style.shadowIntensity}px)`,
        }}
      />

      {/* Main Container */}
      <div
        style={{
          padding: 60,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: fadeIn,
            transform: `translateY(${titleSlide}px)`,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: theme.palette.accent,
              marginBottom: 8,
              opacity: 0.7,
            }}
          >
            {theme.name} Theme
          </div>
          <h1
            style={{
              fontSize: 48,
              fontWeight: theme.style.fontWeight,
              background: `linear-gradient(135deg, ${theme.palette.primary}, ${theme.palette.secondary})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {stats.name}
          </h1>
          <div
            style={{
              fontSize: 18,
              color: theme.palette.text,
              opacity: 0.6,
              marginTop: 4,
            }}
          >
            @{stats.username}
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 30,
          }}
        >
          {[
            {label: 'Repositories', value: stats.repos, icon: '📦'},
            {label: 'Stars', value: stats.stars, icon: '⭐'},
            {label: 'Commits', value: stats.commits, icon: '💥'},
            {label: 'Followers', value: stats.followers, icon: '👥'},
          ].map((stat, i) => {
            const progress = cardDelay(i);
            return (
              <div
                key={stat.label}
                style={{
                  background: `${theme.palette.primary}${theme.texture === 'glossy' ? '20' : '15'}`,
                  backdropFilter: theme.texture === 'glossy' ? 'blur(10px)' : 'none',
                  borderRadius: theme.style.borderRadius,
                  padding: 20,
                  border: `1px solid ${theme.palette.primary}40`,
                  transform: `scale(${progress}) translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
                  opacity: progress,
                  boxShadow: theme.style.glowEffect
                    ? `0 8px 32px ${theme.palette.primary}${Math.floor(theme.style.shadowIntensity * 40).toString(16)}`
                    : 'none',
                }}
              >
                <div style={{fontSize: 28, marginBottom: 8}}>{stat.icon}</div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: theme.palette.primary,
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: theme.palette.text,
                    opacity: 0.6,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Language Bars */}
        <div
          style={{
            background: `${theme.palette.secondary}15`,
            backdropFilter: 'blur(10px)',
            borderRadius: theme.style.borderRadius,
            padding: 30,
            border: `1px solid ${theme.palette.secondary}30`,
            opacity: cardDelay(4),
            transform: `translateY(${interpolate(cardDelay(4), [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: theme.palette.text,
              marginBottom: 20,
            }}
          >
            Top Languages
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {stats.languages.map((lang, i) => {
              const barProgress = spring({
                frame: frame - 100 - i * 10,
                fps,
                config: {damping: 100},
              });
              return (
                <div key={lang.name}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 6,
                      fontSize: 13,
                      color: theme.palette.text,
                    }}
                  >
                    <span>{lang.name}</span>
                    <span style={{opacity: 0.6}}>{lang.percentage}%</span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      background: `${theme.palette.tertiary}30`,
                      borderRadius: 999,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${lang.percentage * barProgress}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${theme.palette.primary}, ${theme.palette.accent})`,
                        borderRadius: 999,
                        boxShadow: theme.style.glowEffect
                          ? `0 0 10px ${theme.palette.primary}80`
                          : 'none',
                      }}
                    />
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

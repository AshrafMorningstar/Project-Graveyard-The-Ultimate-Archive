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

import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {CyberBackground} from './CyberBackground';
import {ProfileHeaderCard} from './components/ProfileHeaderCard';
import {OverviewStatsCard} from './components/OverviewStatsCard';
import {ActivityTimelineCard} from './components/ActivityTimelineCard';
import {LanguageRingChartCard} from './components/LanguageRingChartCard';
import {AchievementBadgesCard} from './components/AchievementBadgesCard';
import {FooterBrandingCard} from './components/FooterBrandingCard';
import {cyberTheme} from './theme/cyber-theme';

type GithubStats = {
  profile: any;
  overview: {
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: string;
  };
  activity: {month: string; commits: number}[];
  languages: {name: string; percentage: number}[];
  achievements: string[];
};

const fetchGithubData = async (username: string): Promise<GithubStats> => {
  try {
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    const profile = await profileRes.json();

    const overview = {
      publicRepos: profile.public_repos ?? 46,
      followers: profile.followers ?? 3,
      following: profile.following ?? 3,
      createdAt: profile.created_at ?? '2020-12-23T11:59:27Z',
    };

    // Sample activity data - can be replaced with real GitHub API calls
    const activity = [
      {month: 'Jan', commits: 87},
      {month: 'Feb', commits: 124},
      {month: 'Mar', commits: 156},
      {month: 'Apr', commits: 98},
      {month: 'May', commits: 142},
      {month: 'Jun', commits: 178},
    ];

    const languages = [
      {name: 'JavaScript', percentage: 40},
      {name: 'TypeScript', percentage: 25},
      {name: 'Python', percentage: 15},
      {name: 'HTML', percentage: 12},
      {name: 'CSS', percentage: 8},
    ];

    const achievements = [
      'Open Source Explorer',
      'Persistent Committer',
      'Full-Stack Developer',
    ];

    return {profile, overview, activity, languages, achievements};
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    // Return fallback data
    return {
      profile: {
        name: 'Ashraf Morningstar',
        login: 'AshrafMorningstar',
        location: 'India',
        bio: 'Full-stack developer crafting cyber-clean experiences',
        company: 'MORNINGSTARCONSTRUCTION',
      },
      overview: {
        publicRepos: 46,
        followers: 3,
        following: 3,
        createdAt: '2020-12-23T11:59:27Z',
      },
      activity: [
        {month: 'Jan', commits: 87},
        {month: 'Feb', commits: 124},
        {month: 'Mar', commits: 156},
        {month: 'Apr', commits: 98},
        {month: 'May', commits: 142},
        {month: 'Jun', commits: 178},
      ],
      languages: [
        {name: 'JavaScript', percentage: 40},
        {name: 'TypeScript', percentage: 25},
        {name: 'Python', percentage: 15},
        {name: 'HTML', percentage: 12},
        {name: 'CSS', percentage: 8},
      ],
      achievements: [
        'Open Source Explorer',
        'Persistent Committer',
        'Full-Stack Developer',
      ],
    };
  }
};

export const CyberGithubStats: React.FC<{
  githubUsername: string;
  theme: 'cyber';
}> = ({githubUsername}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [data, setData] = useState<GithubStats | null>(null);

  useEffect(() => {
    fetchGithubData(githubUsername).then(setData);
  }, [githubUsername]);

  const introOpacity = interpolate(frame, [0, fps * 1.2], [0, 1], {
    easing: Easing.out(Easing.ease),
  });

  const titleSlide = interpolate(frame, [0, fps], [20, 0], {
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: cyberTheme.colors.textPrimary,
      }}
    >
      {/* Background */}
      <CyberBackground />

      {/* Main Content Container */}
      <AbsoluteFill style={{padding: '48px 80px'}}>
        {/* Header Title */}
        <div
          style={{
            opacity: introOpacity,
            transform: `translateY(${titleSlide}px)`,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              letterSpacing: 4,
              fontSize: 14,
              textTransform: 'uppercase',
              color: cyberTheme.colors.textMuted,
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '999px',
                background: cyberTheme.colors.primary,
                boxShadow: cyberTheme.shadows.softGlow,
              }}
            />
            Cyber Static Dashboard
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'baseline',
              gap: 12,
            }}
          >
            <span>GitHub Stats</span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: cyberTheme.colors.primary,
                textShadow: `0 0 20px ${cyberTheme.colors.primary}`,
              }}
            >
              // {githubUsername}
            </span>
          </div>
        </div>

        {/* Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: 24,
            height: 'calc(100% - 120px)',
          }}
        >
          {/* Left Column */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: '0.9fr 1.1fr 0.6fr',
              gap: 24,
            }}
          >
            <Sequence from={fps * 0.5}>
              <ProfileHeaderCard data={data} />
            </Sequence>
            <Sequence from={fps * 2}>
              <ActivityTimelineCard activity={data?.activity ?? []} />
            </Sequence>
            <Sequence from={fps * 4}>
              <AchievementBadgesCard achievements={data?.achievements ?? []} />
            </Sequence>
          </div>

          {/* Right Column */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: '0.9fr 1.1fr 0.6fr',
              gap: 24,
            }}
          >
            <Sequence from={fps * 1}>
              <OverviewStatsCard overview={data?.overview} />
            </Sequence>
            <Sequence from={fps * 3}>
              <LanguageRingChartCard languages={data?.languages ?? []} />
            </Sequence>
            <Sequence from={fps * 5}>
              <FooterBrandingCard username={githubUsername} />
            </Sequence>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

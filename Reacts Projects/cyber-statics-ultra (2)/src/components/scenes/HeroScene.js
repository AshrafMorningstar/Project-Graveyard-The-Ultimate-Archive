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

import React, { useEffect, useState } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { NeonBadge } from '../ui/NeonBadge';
import ParallaxLayer from '../ui/ParallaxLayer';
import fetchGithub from '../../lib/githubUltra';

/**
 * HeroScene:
 * - Large profile hero with animated neon rings and subtle parallax depth.
 * - Cinematic typography and a floating hologram-style repo summary.
 */

const HeroScene = (props) => {
  const username = process.env.GITHUB_USERNAME || props.username || 'AshrafMorningstar';
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchGithub(username).then((d) => {
      if (alive) setProfile(d);
    }).catch(() => {});
    return () => (alive = false);
  }, [username]);

  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <div className="container layer" style={{ perspective: 1200 }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <ParallaxLayer depth={30}>
            <div style={{
              width: 260, height: 260, borderRadius: 20,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
              border: '1px solid rgba(0,240,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
            }}>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="avatar" style={{ width: 220, height: 220, borderRadius: 16, objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 220, height: 220, borderRadius: 16, background: 'rgba(255,255,255,0.02)' }} />
              )}
            </div>
          </ParallaxLayer>

          <ParallaxLayer depth={10}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 40, fontWeight: 800 }} className="logo">{profile?.name || username}</div>
              <div style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 820 }}>{profile?.bio ?? 'A creative developer building beautiful experiences.'}</div>
              <div style={{ marginTop: 14, display: 'flex', gap: 12 }}>
                <NeonBadge>Followers: {profile?.followers ?? '—'}</NeonBadge>
                <NeonBadge>Repos: {profile?.public_repos ?? '—'}</NeonBadge>
                <NeonBadge>Stars: {profile?.total_stars ?? '—'}</NeonBadge>
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default HeroScene;
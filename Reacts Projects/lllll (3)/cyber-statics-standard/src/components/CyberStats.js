/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

Replace the entire file with the updated version below:

/src/components/CyberStats.js (FINAL STANDARD VERSION)
import React, { useEffect, useState } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import fetchGithub from '../lib/github';

import ProfileBlock from './ProfileBlock';
import StatCard from './StatCard';
import RepoList from './RepoList';
import LanguageHeatmap from './LanguageHeatmap';
import Sparkline from './Sparkline';

import '../styles.css';

const CyberStats = (props) => {
  const username =
    process.env.GITHUB_USERNAME || props.username || 'AshrafMorningstar';

  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetchGithub(username)
      .then((res) => {
        if (mounted) setData(res);
      })
      .catch((err) => console.error('GitHub fetch error', err));

    return () => (mounted = false);
  }, [username]);

  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 40], [0, 1]);

  return (
    <AbsoluteFill className="bg">
      <div className="container" style={{ opacity }}>
        <header className="header">
          <div className="logo">Cyber Statics</div>
          <div className="sub">GitHub stats for {username}</div>
        </header>

        <main className="grid">
          <div className="left">
            <ProfileBlock profile={data} />

            <div className="widgets">
              <StatCard title="Followers" value={data?.followers} />
              <StatCard title="Following" value={data?.following} />
              <StatCard title="Public Repos" value={data?.public_repos} />
              <StatCard title="Commit Activity" value="Last 12 months" />
            </div>

            <div className="card" style={{ padding: 20, marginTop: 10 }}>
              <h3 style={{ marginBottom: 10 }}>Activity Sparkline</h3>
              <Sparkline data={data?.commits_monthly ?? []} />
            </div>
          </div>

          <div className="right">
            <RepoList repos={data?.top_repos} />

            <div style={{ marginTop: 20 }}>
              <LanguageHeatmap languages={data?.languages ?? {}} />
            </div>
          </div>
        </main>

        <footer className="footer">
          Generated for AshrafMorningstar • Standard Cyber Edition
        </footer>
      </div>
    </AbsoluteFill>
  );
};

export default CyberStats;
2. Create PR Body
Create:
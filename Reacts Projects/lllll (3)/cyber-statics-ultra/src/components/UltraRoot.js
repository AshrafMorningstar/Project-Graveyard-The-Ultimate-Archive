/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

Replace or update the earlier UltraRoot.js with the version below so it fetches data once and passes into scenes:

import React, { useEffect, useState } from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import HeroScene from './scenes/HeroScene';
import TimelineScene from './scenes/TimelineScene';
import SpotlightScene from './scenes/SpotlightScene';
import fetchGithubUltra from '../lib/githubUltra';
import '../global.css';

/**
 * UltraRoot (wired): fetches data once and supplies to child scenes.
 * This minimizes duplicated API calls and keeps rendering deterministic.
 */

const UltraRoot = (props) => {
  const username = process.env.GITHUB_USERNAME || props.username || 'AshrafMorningstar';
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchGithubUltra(username, { heavyCommits: false });
      if (mounted) setPayload(data);
    })();
    return () => (mounted = false);
  }, [username]);

  // Provide safe defaults to scenes to avoid crashes during render
  const safe = payload || {
    profile: { login: username, name: username },
    top_repos: [],
    languages: {},
    star_distribution: { buckets: {}, total: 0 },
    commits_monthly: [],
    total_stars: 0,
  };

  return (
    <AbsoluteFill className="bg">
      <Sequence from={0} durationInFrames={120}>
        <HeroScene {...safe} />
      </Sequence>

      <Sequence from={120} durationInFrames={120}>
        <TimelineScene {...safe} />
      </Sequence>

      <Sequence from={240} durationInFrames={120}>
        <SpotlightScene {...safe} />
      </Sequence>
    </AbsoluteFill>
  );
};

export default UltraRoot;
2) Scene updates — small prop consumptions
A few scenes expect props named differently. Ensure HeroScene, TimelineScene, and SpotlightScene use profile, top_repos, languages, commits_monthly, and star_distribution from props. (I already made them read profile and top_repos in earlier parts; if you used different names, rename consistently or re-open the files and replace props.xyz with props.profile, etc.)
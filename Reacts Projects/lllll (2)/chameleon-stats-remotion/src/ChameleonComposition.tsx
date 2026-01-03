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

import React, { useEffect, useState } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import MainCard from "./components/MainCard";
import LanguagesCard from "./components/LanguagesCard";
import HeatmapCard from "./components/HeatmapCard";
import TopReposCard from "./components/TopReposCard";
import TimelineCard from "./components/TimelineCard";
import Banner from "./components/Banner";
import "./styles.css";

const THEMES: any = {
  cyber: {
    bg: "#0b1020",
    accent: "#00ffd5",
    accent2: "#7a00ff",
    name: "Cyber Neon",
  },
  aurora: {
    bg: "#071326",
    accent: "#7af",
    accent2: "#0ff",
    name: "Aurora Glow",
  },
  glass: {
    bg: "#f6fbff",
    accent: "#3b82f6",
    accent2: "#06b6d4",
    name: "Glass Frost",
  },
  marble: {
    bg: "#faf9f7",
    accent: "#c084fc",
    accent2: "#f97316",
    name: "Marble Luxe",
  },
  nebula: {
    bg: "#020114",
    accent: "#8b5cf6",
    accent2: "#06b6d4",
    name: "Nebula Dream",
  },
  retro: {
    bg: "#1f1b2e",
    accent: "#ff7ab6",
    accent2: "#ffd166",
    name: "Retro Pop",
  },
};

const rand = (seed: number, i = 0) => {
  // simple xor-shift PRNG deterministic per seed
  let x = (seed ^ 0x9e3779b97f4a7c15) + i * 0x9e3779b97f4a7c15;
  x = (x ^ (x >> 12)) * 0x2545f4914f6cdd1d;
  x = x ^ (x >> 27);
  return Math.abs(Number(x % 1000)) / 1000;
};

const chooseTheme = (seed: number, forced?: string) => {
  if (forced && THEMES[forced]) return THEMES[forced];
  const keys = Object.keys(THEMES);
  const idx = Math.floor(rand(seed, 1) * keys.length);
  return THEMES[keys[idx]];
};

const ChameleonComposition = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const frame = useCurrentFrame();
  const seed = Number(process.env.CHAMELEON_SEED || Date.now() % 1e9);
  const theme = chooseTheme(seed, process.env.FORCE_THEME || undefined);

  useEffect(() => {
    const username = process.env.USERNAME || "AshrafMorningstar";
    const token = process.env.GITHUB_TOKEN;
    const headers: any = {};
    if (token) headers.Authorization = `token ${token}`;

    fetch(`https://api.github.com/users/${username}`, { headers })
      .then((r) => r.json())
      .then((u) => {
        fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
          headers,
        })
          .then((r) => r.json())
          .then((repos) => {
            setStats({ user: u, repos });
            setLoading(false);
          })
          .catch(() => setLoading(false));
      })
      .catch(() => setLoading(false));
  }, []);

  const pulse = interpolate(frame, [0, 30], [0, 1]);
  const layoutVariant = Math.floor(rand(seed, 2) * 3);

  return (
    <AbsoluteFill style={{ background: theme.bg, padding: 24 }}>
      <div className="chameleon-root" data-theme={theme.name}>
        <Banner theme={theme} seed={seed} />
        {loading ? (
          <div className="loader">Loading — Chameleon Stats</div>
        ) : (
          <div className={`grid layout-${layoutVariant}`}>
            <MainCard data={stats} theme={theme} seed={seed} />
            <LanguagesCard repos={stats.repos} theme={theme} seed={seed} />
            <TopReposCard repos={stats.repos} theme={theme} seed={seed} />
            <HeatmapCard repos={stats.repos} theme={theme} seed={seed} />
            <TimelineCard repos={stats.repos} theme={theme} seed={seed} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export default ChameleonComposition;

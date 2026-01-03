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
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import MainStatsCard from "./components/MainStatsCard";
import LanguagesCard from "./components/LanguagesCard";
import HeatmapCard from "./components/HeatmapCard";
import TopReposCard from "./components/TopReposCard";
import StreakCard from "./components/StreakCard";
import "./styles/globals.css";

const fetchStats = async (username: string, token?: string) => {
  const headers: any = {};
  if (token) headers.Authorization = `token ${token}`;

  const userRes = await fetch(`https://api.github.com/users/${username}`, {
    headers,
  });
  const user = await userRes.json();

  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers }
  );
  const repos = await reposRes.json();

  return { user, repos };
};

const CyberComposition: React.FC = () => {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  useEffect(() => {
    const username = process.env["USERNAME"] || "AshrafMorningstar";
    const token = process.env["GITHUB_TOKEN"];
    fetchStats(username, token)
      .then((s) => {
        setStats(s as any);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <AbsoluteFill
      style={{ background: "linear-gradient(180deg,#020617, #071023)" }}
    >
      <div className="cyber-grid-premium">
        {loading ? (
          <div className="loader">LOADING • CYBER STATS</div>
        ) : (
          <>
            <MainStatsCard data={stats} />
            <LanguagesCard repos={stats?.repos || []} />
            <TopReposCard repos={stats?.repos || []} />
            <HeatmapCard />
            <StreakCard />
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};

export default CyberComposition;

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

/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React from "react";
import { Composition } from "remotion";
import { BasicStats } from "../scenes/BasicStats";
import { SkillsRadar } from "../scenes/SkillsRadar";
import { TimeLapse } from "../scenes/TimeLapse";
import { SkillsUniverse3D } from "../scenes/SkillsUniverse3D";
import { RPGHeroStats } from "../scenes/RPGHeroStats";
import { CodeDNA } from "../scenes/CodeDNA";
import { ProjectShowcase } from "../scenes/ProjectShowcase";
import { StrategicInsights } from "../scenes/StrategicInsights";
import { MainSequence } from "../scenes/MainSequence";
import "../app/globals.css";
import { mockData } from "./mockData";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GitHubStats"
        component={BasicStats}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          username: "AshrafMorningstar",
        }}
      />
      <Composition
        id="SkillsRadar"
        component={SkillsRadar}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TimeLapse"
        component={TimeLapse}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SkillsUniverse3D"
        component={SkillsUniverse3D}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: mockData,
        }}
      />
      <Composition
        id="RPGHeroStats"
        component={RPGHeroStats}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: mockData,
        }}
      />
      <Composition
        id="CodeDNA"
        component={CodeDNA}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: mockData,
        }}
      />
      <Composition
        id="ProjectShowcase"
        component={ProjectShowcase}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: mockData,
        }}
      />
      <Composition
        id="StrategicInsights"
        component={StrategicInsights}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: mockData,
        }}
      />
      <Composition
        id="MainSequence"
        component={MainSequence as React.FC<any>}
        durationInFrames={1950} // 6 scenes * 300 + 150 outro
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          data: mockData,
          theme: "cyberpunk" as const,
        }}
      />
    </>
  );
};

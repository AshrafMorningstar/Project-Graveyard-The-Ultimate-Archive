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

import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { CyberGridBackground } from "./animations/CyberGridBackground";
import { IntroCard } from "./cards/IntroCard";
import { ContributionMatrix } from "./cards/Contribution3D";
import { LanguageRadar } from "./cards/LanguageRadar";
import { RepoNetwork } from "./cards/RepoNetwork";
import { AchievementBadges } from "./cards/AchievementBadges";
import { ActivityStream } from "./cards/ActivityStream";
import { Outro } from "./cards/Outro";

export const CyberStats: React.FC<{ username: string }> = ({ username }) => {
  const { fps } = useVideoConfig();

  // 5 seconds per slide (approx 150 frames)
  const slideDuration = 150;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <CyberGridBackground />

      <Sequence from={0} durationInFrames={slideDuration}>
        <IntroCard username={username} />
      </Sequence>

      <Sequence from={slideDuration} durationInFrames={slideDuration}>
        <ActivityStream />
      </Sequence>

      <Sequence from={slideDuration * 2} durationInFrames={slideDuration}>
        <ContributionMatrix />
      </Sequence>

      <Sequence from={slideDuration * 3} durationInFrames={slideDuration}>
        <LanguageRadar />
      </Sequence>

      <Sequence from={slideDuration * 4} durationInFrames={slideDuration}>
        <AchievementBadges />
      </Sequence>

      <Sequence from={slideDuration * 5} durationInFrames={slideDuration}>
        <RepoNetwork />
      </Sequence>

      <Sequence from={slideDuration * 6} durationInFrames={slideDuration}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

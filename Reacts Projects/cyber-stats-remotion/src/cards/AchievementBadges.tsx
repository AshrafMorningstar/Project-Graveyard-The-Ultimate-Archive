/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
import {
  AbsoluteFill,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
} from "remotion";
import styled from "styled-components";
import { Trophy, Star, Zap, Code, GitMerge, Coffee } from "lucide-react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 40px;
  margin-bottom: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
`;

const Badge = styled.div<{ unlocked: boolean; delay: number; scale: number }>`
  width: 150px;
  height: 150px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background: ${(props) =>
    props.unlocked ? "rgba(0, 243, 255, 0.1)" : "rgba(255, 255, 255, 0.05)"};
  border: 2px solid
    ${(props) => (props.unlocked ? "var(--primary-color)" : "#333")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: scale(${(props) => props.scale});
  box-shadow: ${(props) =>
    props.unlocked ? "0 0 20px var(--primary-color)" : "none"};
  transition: all 0.3s;
`;

const BadgeName = styled.span`
  margin-top: 10px;
  font-size: 14px;
  color: #fff;
  text-align: center;
`;

export const AchievementBadges: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badges = [
    { icon: <Trophy size={40} />, name: "Top 1%", unlocked: true },
    { icon: <GitMerge size={40} />, name: "Pull Shark", unlocked: true },
    { icon: <Zap size={40} />, name: "Quick Fix", unlocked: true },
    { icon: <Code size={40} />, name: "1000 Commits", unlocked: true },
    { icon: <Coffee size={40} />, name: "Night Owl", unlocked: false },
    { icon: <Star size={40} />, name: "Star Hunter", unlocked: true },
  ];

  return (
    <Container>
      <Title>ACHIEVEMENTS_UNLOCKED</Title>
      <Grid>
        {badges.map((b, i) => {
          const progress = interpolate(frame - i * 10, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <Badge key={i} unlocked={b.unlocked} delay={i} scale={progress}>
              <div
                style={{
                  color: b.unlocked ? "var(--secondary-color)" : "#555",
                }}
              >
                {b.icon}
              </div>
              <BadgeName>{b.name}</BadgeName>
            </Badge>
          );
        })}
      </Grid>
    </Container>
  );
};

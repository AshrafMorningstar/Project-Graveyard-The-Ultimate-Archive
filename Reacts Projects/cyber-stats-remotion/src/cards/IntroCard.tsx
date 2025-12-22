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
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
} from "remotion";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CardFrame = styled.div`
  width: 600px;
  height: 350px;
  border: 2px solid var(--primary-color);
  background: rgba(10, 10, 20, 0.8);
  position: relative;
  display: flex;
  align-items: center;
  padding: 40px;
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
  clip-path: polygon(
    20px 0,
    100% 0,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    0 100%,
    0 20px
  );
`;

const AvatarFrame = styled.div`
  width: 200px;
  height: 200px;
  border: 3px solid var(--secondary-color);
  margin-right: 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      transparent,
      var(--secondary-color),
      transparent 30%
    );
    animation: rotate 4s linear infinite;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h1`
  font-size: 48px;
  margin: 0;
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--primary-color);
  margin-bottom: 10px;
`;

const Role = styled.div`
  font-size: 24px;
  color: var(--text-dim);
  font-family: "JetBrains Mono", monospace;
  display: flex;
  align-items: center;

  &::before {
    content: "> ";
    color: var(--secondary-color);
    margin-right: 10px;
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: #fff;
`;

const StatLabel = styled.span`
  font-size: 14px;
  color: var(--text-dim);
  text-transform: uppercase;
`;

export const IntroCard: React.FC<{ username: string }> = ({ username }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 10,
    },
  });

  const textReveal = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });

  return (
    <Container>
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
        }}
      >
        <CardFrame>
          {/* Decor elements */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "var(--primary-color)",
              fontSize: 10,
            }}
          >
            ID: 8492-AX
          </div>

          <AvatarFrame>
            <Img
              src={`https://github.com/${username}.png`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "relative",
                zIndex: 1,
                padding: 4,
                background: "black",
              }}
            />
          </AvatarFrame>

          <Info
            style={{
              opacity: textReveal,
              transform: `translateX(${(1 - textReveal) * 50}px)`,
            }}
          >
            <Username className="glitch" data-text={username}>
              {username}
            </Username>
            <Role>Full Stack Developer</Role>

            <StatsRow>
              <Stat>
                <StatValue>2.5k</StatValue>
                <StatLabel>Commits</StatLabel>
              </Stat>
              <Stat>
                <StatValue>42</StatValue>
                <StatLabel>Repos</StatLabel>
              </Stat>
              <Stat>
                <StatValue>A++</StatValue>
                <StatLabel>Rank</StatLabel>
              </Stat>
            </StatsRow>
          </Info>
        </CardFrame>
      </AbsoluteFill>
    </Container>
  );
};

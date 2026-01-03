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

import React from "react";
import {
  AbsoluteFill,
  useVideoConfig,
  useCurrentFrame,
  spring,
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

const Text = styled.h1`
  font-size: 80px;
  color: #fff;
  text-transform: uppercase;
  margin: 0;

  span {
    color: var(--primary-color);
  }
`;

const SubText = styled.h3`
  color: var(--text-dim);
  font-family: "JetBrains Mono", monospace;
  margin-top: 20px;
`;

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const scale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });

  return (
    <Container style={{ opacity }}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
        }}
      >
        <Text>
          Cyber<span>Stats</span>
        </Text>
        <SubText>github.com/AshrafMorningstar</SubText>
      </AbsoluteFill>
    </Container>
  );
};

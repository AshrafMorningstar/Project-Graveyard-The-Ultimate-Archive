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
import { useCurrentFrame } from "remotion";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: cyan;
  font-family: 'Courier New', Courier, monospace;
`;

const Title = styled.h1`
  font-size: 80px;
  text-shadow: 0 0 10px cyan;
`;

export const StatsComposition: React.FC<{ username: string }> = ({ username }) => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  
  return (
    <Container>
      <Title style={{ opacity }}>
        Cyber-Stats: {username}
      </Title>
    </Container>
  );
};

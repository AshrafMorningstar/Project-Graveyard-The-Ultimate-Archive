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
  interpolate,
} from "remotion";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 100px;
`;

const Title = styled.h2`
  color: var(--primary-color);
  font-size: 40px;
  margin-bottom: 30px;
`;

const Terminal = styled.div`
  width: 800px;
  height: 600px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #333;
  border-top: 20px solid #333;
  border-radius: 5px;
  padding: 20px;
  font-family: "JetBrains Mono", monospace;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

  &::before {
    content: "bash - activity_log.sh";
    position: absolute;
    top: -20px;
    left: 10px;
    color: #aaa;
    font-size: 12px;
    line-height: 20px;
  }
`;

const Line = styled.div`
  color: #0f0;
  margin-bottom: 5px;
  white-space: nowrap;
`;

const Time = styled.span`
  color: #888;
  margin-right: 15px;
`;

const Action = styled.span`
  color: var(--secondary-color);
  font-weight: bold;
`;

export const ActivityStream: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig(); // durationInFrames is optional here if not passed, but useVideoConfig has it.

  const activities = Array.from({ length: 30 }).map((_, i) => ({
    time: `[23:${10 + i}:${15 + i}]`,
    action: i % 3 === 0 ? "PUSH" : i % 3 === 1 ? "MERGE" : "DEPLOY",
    desc: `Commit hash #${Math.random().toString(16).substr(2, 7)} to main`,
  }));

  // Scroll up
  // Total height approx 30 lines * 25px = 750px
  // Terminal height 600px.
  // Scroll from 0 to -400px?

  const scroll = interpolate(frame, [0, 150], [0, -600]);

  return (
    <Container>
      <Title>ACTIVITY STREAM</Title>
      <Terminal>
        <div style={{ transform: `translateY(${scroll}px)` }}>
          {activities.map((a, i) => (
            <Line key={i}>
              <Time>{a.time}</Time>
              <Action>{a.action}</Action> {a.desc}
            </Line>
          ))}
          <Line style={{ animation: "blink 1s infinite" }}>_</Line>
        </div>
      </Terminal>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </Container>
  );
};

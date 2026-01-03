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

import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useVideoConfig,
  useCurrentFrame,
  random,
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

const Title = styled.h2`
  color: #fff;
  font-size: 40px;
  margin-top: 50px;
  z-index: 10;
`;

export const RepoNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const nodeCount = 30;
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map((_, i) => ({
      id: i,
      x: random(i) * width, // initial random, will override
      y: random(i + 100) * height,
      r: 5 + random(i + 200) * 15,
      color:
        random(i) > 0.5 ? "var(--primary-color)" : "var(--secondary-color)",
      name: `Repo-${i}`,
    }));
  }, [width, height]);

  // Simple circular layout + noise
  const currentNodes = nodes.map((node, i) => {
    const angle = (i / nodeCount) * Math.PI * 2 + frame * 0.005;
    const radius = 300 + Math.sin(frame * 0.02 + i) * 50;
    const cx = width / 2;
    const cy = height / 2;

    return {
      ...node,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    };
  });

  const edges = useMemo(() => {
    const e = [];
    for (let i = 0; i < nodeCount; i++) {
      // Connect to nearest 2 neighbors (simplified: i+1, i+2)
      e.push([i, (i + 1) % nodeCount]);
      e.push([i, (i + 2) % nodeCount]);
      if (i % 5 === 0) e.push([i, (i + 15) % nodeCount]); // cross connections
    }
    return e;
  }, []);

  return (
    <Container>
      <Title>REPOSITORY NETWORK</Title>
      <AbsoluteFill>
        <svg width={width} height={height}>
          {edges.map(([a, b], i) => {
            const na = currentNodes[a];
            const nb = currentNodes[b];
            return (
              <line
                key={i}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            );
          })}

          {currentNodes.map((node, i) => (
            <g
              key={i}
              style={{
                transformOrigin: `${node.x}px ${node.y}px`,
                transition: "all 0.1s",
              }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={node.color}
                filter="url(#glow-repo)"
                opacity={0.8}
              >
                <animate
                  attributeName="r"
                  values={`${node.r};${node.r * 1.2};${node.r}`}
                  dur={`${2 + random(i)}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x={node.x}
                y={node.y + node.r + 20}
                textAnchor="middle"
                fill="#fff"
                fontSize="12px"
                fontFamily="monospace"
              >
                {node.name}
              </text>
            </g>
          ))}

          <defs>
            <filter id="glow-repo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </AbsoluteFill>
    </Container>
  );
};

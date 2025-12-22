/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
import { AbsoluteFill } from "remotion";
import "../index.css";

export const CyberGridBackground: React.FC = () => {
  // Generate some random binary particles
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 5,
    value: Math.random() > 0.5 ? "1" : "0",
  }));

  return (
    <AbsoluteFill>
      <div className="cyber-grid-bg" />

      {/* Binary Rain / Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            color: "rgba(0, 243, 255, 0.3)",
            fontSize: "14px",
            fontFamily: "monospace",
            animation: `float-up ${p.duration}s linear infinite`,
            animationDelay: `-${p.delay}s`,
            opacity: 0.6,
          }}
        >
          {p.value}
        </div>
      ))}

      <style>
        {`
                @keyframes float-up {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { transform: translateY(-100px); opacity: 0; }
                }
                `}
      </style>
    </AbsoluteFill>
  );
};

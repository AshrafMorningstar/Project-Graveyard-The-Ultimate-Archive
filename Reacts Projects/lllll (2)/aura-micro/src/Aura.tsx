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
import { useCurrentFrame, interpolate, spring } from "remotion";

const PALETTES = [
  ["#0b1020", "#00ffd5"], // Cyber
  ["#faf9f7", "#f97316"], // Marble
  ["#071326", "#7af"], // Aurora
  ["#1a1a1a", "#ff0055"], // Dark Red
  ["#ffffff", "#000000"], // Mono
];

const rand = (s: number) => {
  let x = Math.sin(s) * 10000;
  return x - Math.floor(x);
};

export default function Aura({ seed = 0 }: { seed?: number }) {
  const frame = useCurrentFrame();

  const { bg, fg, variant } = useMemo(() => {
    const s = seed || Math.random() * 1000;
    const pIdx = Math.floor(rand(s) * PALETTES.length);
    const v = Math.floor(rand(s + 1) * 3);
    return { bg: PALETTES[pIdx][0], fg: PALETTES[pIdx][1], variant: v };
  }, [seed]);

  const scale = spring({ frame, fps: 30, config: { damping: 10 } });
  const rot = interpolate(frame, [0, 120], [0, 360]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        color: fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          border: `4px solid ${fg}`,
          borderRadius: variant === 0 ? "50%" : variant === 1 ? "12px" : "0",
          transform: `scale(${scale}) rotate(${rot}deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: "bold" }}>M</div>
      </div>
      <h1
        style={{ marginTop: 40, opacity: interpolate(frame, [0, 30], [0, 1]) }}
      >
        AURA MICRO
      </h1>
    </div>
  );
}

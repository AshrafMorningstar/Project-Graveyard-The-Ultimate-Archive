/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Created by AshrafMorningstar - https://github.com/AshrafMorningstar */
import React from "react";
import { useCurrentFrame } from "remotion";

export const TypeWriter: React.FC<{
  text: string;
  speed?: number;
  delay?: number;
  style?: React.CSSProperties;
  cursor?: boolean;
}> = ({ text, speed = 2, delay = 0, style, cursor = true }) => {
  const frame = useCurrentFrame();
  const startFrame = delay;

  // Calculate how many characters to show based on current frame
  const progress = Math.max(0, frame - startFrame) / speed;
  const charsToShow = Math.floor(progress);
  const visibleText = text.slice(0, charsToShow);

  // Cursor blinking effect
  const showCursor = cursor && frame - startFrame >= 0 && frame % 30 < 15;

  return (
    <span style={{ ...style, display: "inline-block" }}>
      {visibleText}
      {showCursor && (
        <span style={{ color: style?.color || "inherit", opacity: 0.8 }}>
          |
        </span>
      )}
    </span>
  );
};

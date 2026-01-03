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

const StreakCard: React.FC<{ stats?: any }> = ({ stats }) => {
  // Placeholder: display a mock streak and sparkline using unicode blocks.
  const streak = Math.floor(Math.random() * 120);
  const sparks = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 8)
  );
  return (
    <div className="card streak-card">
      <h3 className="card-title">Commit Streak</h3>
      <div className="streak-value">{streak} days</div>
      <div className="sparkline" aria-hidden>
        {sparks.map((s, i) => (
          <span key={i} className="spark">
            ▇
          </span>
        ))}
      </div>
    </div>
  );
};

export default StreakCard;

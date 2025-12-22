/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const StatCard = ({ title, value }) => {
  return (
    <div className="card">
      <div className="card-title" style={{ fontSize: 12, opacity: 0.7 }}>
        {title}
      </div>
      <div className="card-value" style={{ fontSize: 22, fontWeight: 700 }}>
        {value ?? '—'}
      </div>
    </div>
  );
};

export default StatCard;

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

/**
 * Simple radial language "heatmap" replacement.
 * This component receives an object like { JavaScript: 45, Python: 25, CSS: 20, ... }
 * and renders a compact list with proportional bars suitable for video rendering.
 *
 * It's intentionally lightweight (no heavy d3 dependency) to keep Remotion renders stable.
 */

const LanguageHeatmap = ({ languages = {} }) => {
  const entries = Object.entries(languages);
  const total = entries.reduce((s, [, v]) => s + (v || 0), 0) || 1;

  return (
    <div className="card" style={{ padding: 16 }}>
      <h3 style={{ marginBottom: 12 }}>Languages</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {entries.length === 0 && <div style={{ opacity: 0.6 }}>No language data</div>}
        {entries.map(([lang, pct], i) => {
          const width = Math.max(4, Math.round((pct / total) * 100));
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 110, fontSize: 13 }}>{lang}</div>
              <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{
                  width: `${width}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg,#7cf2ff,#8a2be2)',
                  boxShadow: '0 0 8px rgba(138,43,226,0.12)'
                }} />
              </div>
              <div style={{ width: 46, textAlign: 'right', fontSize: 13, opacity: 0.9 }}>
                {Math.round((pct/total)*100)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageHeatmap;
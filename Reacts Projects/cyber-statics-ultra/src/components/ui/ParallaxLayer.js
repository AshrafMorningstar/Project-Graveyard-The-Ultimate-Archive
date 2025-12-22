/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const ParallaxLayer = ({ depth = 10, children, style = {} }) => {
  const transform = `translateZ(${depth}px)`;
  return (
    <div style={{ transform, willChange: 'transform', ...style }}>
      {children}
    </div>
  );
};

export default ParallaxLayer;

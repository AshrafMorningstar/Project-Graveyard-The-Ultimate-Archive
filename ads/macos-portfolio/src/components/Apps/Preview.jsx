/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const Preview = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#333' }}>
      <div style={{ padding: '10px', background: '#2c2c2c', color: '#ccc', textAlign: 'center', fontSize: '12px' }}>
        Resume.pdf (Preview)
      </div>
      <div style={{ flex: 1, background: 'white', padding: '40px', overflow: 'auto', color: 'black' }}>
        <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Ashraf Morningstar</h1>
        <p><strong>Full Stack Developer</strong></p>
        <p>Email: ashraf@example.com | GitHub: github.com/AshrafMorningstar</p>
        
        <br />
        
        <h3>Objective</h3>
        <p>To leverage my expertise in React, Node.js, and modern web technologies to build scalable and innovative applications.</p>
        
        <h3>Experience</h3>
        <ul>
          <li><strong>Senior Developer</strong> - Tech Corp (2023 - Present) <br/> Leading frontend architecture and team mentoring.</li>
          <li><strong>Web Developer</strong> - Freelance (2020 - 2023) <br/> Delivered 50+ websites for diverse clients.</li>
        </ul>

        <h3>Skills</h3>
        <p>JavaScript, React, Node.js, Python, SQL, Docker, AWS</p>
      </div>
    </div>
  );
};

export default Preview;

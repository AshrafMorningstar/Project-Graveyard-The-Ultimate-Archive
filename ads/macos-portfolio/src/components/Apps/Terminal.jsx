/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const Terminal = () => {
  return (
    <div style={{ background: '#1e1e1e', height: '100%', color: '#d4d4d4', fontFamily: 'monospace', padding: '10px', fontSize: '14px' }}>
      <p><span style={{ color: '#4ec9b0' }}>➜</span> <span style={{ color: '#ce9178' }}>~</span> <span style={{ color: '#9cdcfe' }}>neofetch</span></p>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ color: '#007aff' }}>
          <pre>
{`                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  'XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.`}
          </pre>
        </div>
        <div>
          <p><span style={{ color: '#dcdcaa' }}>OS</span>: macOS Portfolio</p>
          <p><span style={{ color: '#dcdcaa' }}>Host</span>: Ashraf Morningstar</p>
          <p><span style={{ color: '#dcdcaa' }}>Uptime</span>: 100%</p>
          <p><span style={{ color: '#dcdcaa' }}>Packages</span>: React, Vite, Lucide</p>
          <p><span style={{ color: '#dcdcaa' }}>Shell</span>: zsh 5.8</p>
          <br/>
          <p><span style={{ color: '#dcdcaa' }}>Skills</span>:</p>
          <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
            <li>- JavaScript (ES6+)</li>
            <li>- React.js / Next.js</li>
            <li>- Node.js / Express</li>
            <li>- HTML5 / CSS3</li>
            <li>- Git / GitHub</li>
          </ul>
        </div>
      </div>
      
      <p style={{ marginTop: '20px' }}>
        <span style={{ color: '#4ec9b0' }}>➜</span> <span style={{ color: '#ce9178' }}>~</span> <span className="cursor">_</span>
      </p>

      <style>{`
        .cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Terminal;

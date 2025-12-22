/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { Folder, FileText, Code } from 'lucide-react';

const projects = [
  { id: 1, name: "E-Commerce App", type: "folder", desc: "React, Node, MongoDB" },
  { id: 2, name: "AI Resume Builder", type: "folder", desc: "OpenAI, Next.js" },
  { id: 3, name: "Crypto Dashboard", type: "folder", desc: "Real-time API, ChartJS" },
  { id: 4, name: "Social Media Clone", type: "folder", desc: "MERN Stack" },
];

const Finder = () => {
  const [section, setSection] = useState('projects');

  const renderContent = () => {
    if (section === 'about') {
      return (
        <div style={{ color: '#333' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ width: '100px', height: '100px', background: '#ccc', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>👨‍💻</div>
            <h2>Ashraf Morningstar</h2>
            <p>Full Stack Developer | UI/UX Enthusiast</p>
          </div>
          <p>
            Hello! I'm Ashraf, a passionate developer building premium web applications.
            I specialize in React, Next.js, and modern UI libraries.
            Check out my projects to see what I can do!
          </p>
          <p>
            Github: <a href="https://github.com/AshrafMorningstar" target="_blank">@AshrafMorningstar</a>
          </p>
        </div>
      );
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '20px' }}>
        {projects.map(p => (
          <div 
            key={p.id} 
            onClick={() => window.open(p.link || 'https://github.com/AshrafMorningstar', '_blank')}
            className="finder-item"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', textAlign: 'center', padding: '10px', borderRadius: '5px', transition: 'background 0.2s' }}
          >
            <Folder size={60} fill="#5dade2" color="#2e86c1" />
            <span style={{ marginTop: '5px', fontSize: '13px', fontWeight: '500' }}>{p.name}</span>
            <span style={{ fontSize: '10px', color: '#666' }}>{p.desc}</span>
          </div>
        ))}
        <style>{`
          .finder-item:hover {
            background: rgba(0, 0, 0, 0.05);
          }
          .finder-item:active {
            background: rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div style={{ width: '150px', background: 'rgba(0,0,0,0.05)', borderRight: '1px solid rgba(0,0,0,0.1)', padding: '10px' }}>
        <div style={{ fontSize: '11px', color: '#888', marginBottom: '5px', fontWeight: 'bold' }}>Favorites</div>
        <div onClick={() => setSection('about')} style={{ padding: '8px', borderRadius: '5px', cursor: 'pointer', background: section === 'about' ? 'rgba(0,0,0,0.1)' : 'transparent', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
           <FileText size={16} /> About Me
        </div>
        <div onClick={() => setSection('projects')} style={{ padding: '8px', borderRadius: '5px', cursor: 'pointer', background: section === 'projects' ? 'rgba(0,0,0,0.1)' : 'transparent', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
           <Code size={16} /> Projects
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', background: 'white' }}>
        <h2 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          {section === 'about' ? 'About Me' : 'Projects'}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default Finder;

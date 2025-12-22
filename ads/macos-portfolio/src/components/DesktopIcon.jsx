/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const DesktopIcon = ({ icon: Icon, label, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        width: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '5px',
        transition: 'background 0.2s',
        color: 'white',
        textShadow: '0 1px 3px rgba(0,0,0,0.8)'
      }}
      className="desktop-icon"
    >
      <div style={{
        width: '50px',
        height: '50px',
        background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
         <Icon size={30} color="white" />
      </div>
      <span style={{ fontSize: '13px', textAlign: 'center', fontWeight: '500' }}>{label}</span>
      
      <style>{`
        .desktop-icon:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default DesktopIcon;

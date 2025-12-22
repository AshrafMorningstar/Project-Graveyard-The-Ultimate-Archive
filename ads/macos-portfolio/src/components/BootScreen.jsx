/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useEffect, useState } from 'react';
import { Apple } from 'lucide-react';

const BootScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Wait a bit before unmounting
          return 100;
        }
        return prev + (Math.random() * 10); // Random chunks like real loading
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      color: 'white'
    }}>
      <Apple size={80} fill="white" />
      
      <div style={{
        marginTop: '40px',
        width: '200px',
        height: '6px',
        background: '#333',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'white',
          borderRadius: '3px',
          transition: 'width 0.2s ease-out'
        }}></div>
      </div>
    </div>
  );
};

export default BootScreen;

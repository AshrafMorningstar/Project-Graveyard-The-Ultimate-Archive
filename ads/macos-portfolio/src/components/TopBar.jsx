/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { Apple, Wifi, Search, Battery } from 'lucide-react';
import { format } from 'date-fns';

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      height: '30px',
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
      fontSize: '13px',
      zIndex: 10000
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Apple size={16} fill="white" />
        <span style={{ fontWeight: '600' }}>Ashraf Morningstar</span>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Window</span>
        <span>Help</span>
      </div>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Battery size={18} />
        <Wifi size={16} />
        <Search size={16} />
        <span>{format(time, 'EEE MMM d HH:mm')}</span>
      </div>
    </div>
  );
};

export default TopBar;

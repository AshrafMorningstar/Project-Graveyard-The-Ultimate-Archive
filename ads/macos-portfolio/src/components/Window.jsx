/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Maximize2 } from 'lucide-react';

const Window = ({ id, title, children, onClose, onMinimize, isFocused, onFocus, initialPos, zIndex }) => {
  return (
    <Draggable handle=".window-header" defaultPosition={initialPos} onMouseDown={onFocus}>
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '400px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '12px',
        boxShadow: isFocused ? '0 20px 50px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: zIndex,
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        animation: 'popIn 0.2s ease-out'
      }}>
        {/* Title Bar */}
        <div className="window-header" style={{
          height: '38px',
          background: 'linear-gradient(to bottom, #eaeaea, #dcdcdc)',
          borderBottom: '1px solid #c8c8c8',
          display: 'flex',
          alignItems: 'center',
          padding: '0 15px',
          cursor: 'grab'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div onClick={onClose} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', border: '1px solid #e0443e', cursor: 'pointer' }}></div>
            <div onClick={onMinimize} style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', border: '1px solid #dea123', cursor: 'pointer' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', border: '1px solid #1aab29', cursor: 'pointer' }}></div>
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#555', fontSize: '13px' }}>{title}</div>
          <div style={{ width: '52px' }}></div> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;

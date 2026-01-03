/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import TopBar from './TopBar';
import Dock from './Dock';
import Window from './Window';
import useStore from '../store/useStore';

const Desktop = () => {
  const { windows } = useStore();
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    const handleClick = () => {
        if (contextMenu.visible) setContextMenu({ ...contextMenu, visible: false });
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [contextMenu]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  return (
    <div 
        id="desktop-container" 
        className="w-full h-screen relative overflow-hidden text-white selection:bg-blue-500/30"
        onContextMenu={handleContextMenu}
    >
      <TopBar />
      
      {/* Window Area */}
      <div className="absolute inset-0 z-0">
         {Object.values(windows).map((win) => (
             <Window key={win.id} windowState={win} />
         ))}
      </div>

      <Dock />
      
      {contextMenu.visible && (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu({ ...contextMenu, visible: false })} />
      )}
    </div>
  );
};

export default Desktop;

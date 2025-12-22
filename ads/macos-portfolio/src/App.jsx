/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import Window from './components/Window';
import Finder from './components/Apps/Finder';
import Terminal from './components/Apps/Terminal';
import Contact from './components/Apps/Contact';
import Preview from './components/Apps/Preview';
import DesktopIcon from './components/DesktopIcon';
import BootScreen from './components/BootScreen';
import { FileText, Folder } from 'lucide-react';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [windows, setWindows] = useState([
    { id: 'finder', title: 'Finder', component: 'finder', isOpen: true, zIndex: 1, pos: {x: 100, y: 50} }
  ]);
  const [zIndexHighlight, setZIndexHighlight] = useState(2);

  const getComponent = (type) => {
    switch (type) {
      case 'finder': return <Finder />;
      case 'terminal': return <Terminal />;
      case 'contact': return <Contact />;
      case 'preview': return <Preview />;
      case 'browser': return <Contact />; 
      default: return null;
    }
  };

  const openApp = (appId) => {
    const existing = windows.find(w => w.id === appId);
    if (existing) {
      bringToFront(appId);
      return;
    }

    const newWindow = {
      id: appId,
      title: appId.charAt(0).toUpperCase() + appId.slice(1),
      component: appId,
      isOpen: true,
      zIndex: zIndexHighlight,
      pos: { x: 100 + (windows.length * 30), y: 50 + (windows.length * 30) }
    };
    
    setWindows([...windows, newWindow]);
    setZIndexHighlight(zIndexHighlight + 1);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const bringToFront = (id) => {
    setWindows(windows.map(w => {
      if (w.id === id) {
        return { ...w, zIndex: zIndexHighlight };
      }
      return w;
    }));
    setZIndexHighlight(zIndexHighlight + 1);
  };

  if (loading) {
    return <BootScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="desktop">
      <TopBar />
      
      <div style={{ position: 'relative', flex: 1, width: '100%', overflow: 'hidden', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
        <DesktopIcon icon={Folder} label="Projects" onClick={() => openApp('finder')} />
        <DesktopIcon icon={FileText} label="Resume.pdf" onClick={() => openApp('preview')} />

        {windows.map(w => (
          <Window 
            key={w.id}
            id={w.id}
            title={w.title}
            onClose={() => closeWindow(w.id)}
            onFocus={() => bringToFront(w.id)}
            isFocused={w.zIndex === zIndexHighlight - 1}
            initialPos={w.pos}
            zIndex={w.zIndex}
          >
            {getComponent(w.component)}
          </Window>
        ))}
      </div>

      <Dock onAppClick={openApp} />
    </div>
  );
};

export default App;

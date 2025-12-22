/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop/Desktop';
import MenuBar from './components/MenuBar/MenuBar';
import Dock from './components/Dock/Dock';
import WindowManager from './components/Window/WindowManager';
import { useThemeStore } from './store/themeStore';

function App() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [bootSequence, setBootSequence] = useState(true);

  // Simulate boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setBootSequence(false);
    }, 2000); // 2 seconds boot
    return () => clearTimeout(timer);
  }, []);

  if (bootSequence) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="text-white flex flex-col items-center">
            {/* Simple Apple-like Loading Spinner */}
            <div className="w-16 h-16 mb-8 relative">
               <svg className="animate-spin" viewBox="0 0 24 24">
                   {/* Simplified spinner for now */}
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
            </div>
            {/* Optional Apple Logo here */}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-screen h-screen overflow-hidden relative selection:bg-mac-accent-light selection:text-white ${isDarkMode ? 'dark' : ''}`}>
      {/* Background Image is handled in Desktop or here globally */}
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" 
           style={{ backgroundImage: 'url(https://4kwallpapers.com/images/walls/thumbs_3t/8324.jpg)' }}>
        {/* Overlay for Dark Mode */}
        {isDarkMode && <div className="absolute inset-0 bg-black/30 pointer-events-none" />}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
         <MenuBar />
         <div className="flex-1 relative">
            <Desktop />
            <WindowManager />
         </div>
         <Dock />
      </div>
    </div>
  );
}

export default App;

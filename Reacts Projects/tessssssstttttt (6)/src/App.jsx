/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { Suspense } from 'react';
import Desktop from './components/Layout/Desktop';

function App() {
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-[#1a1a2e] flex items-center justify-center text-white">Loading OS...</div>}>
      <Desktop />
    </Suspense>
  )
}

export default App;

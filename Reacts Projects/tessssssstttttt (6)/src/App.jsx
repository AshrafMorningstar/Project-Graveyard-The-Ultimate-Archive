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

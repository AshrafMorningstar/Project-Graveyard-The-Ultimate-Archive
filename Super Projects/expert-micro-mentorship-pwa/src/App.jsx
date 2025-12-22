/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import CallRoom from './components/CallRoom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/call/:id" element={<CallRoom />} />
    </Routes>
  )
}

export default App

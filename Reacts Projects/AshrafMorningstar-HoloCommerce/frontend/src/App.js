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
import { Canvas } from '@react-three/fiber';

export default function App() {
  return (
    <div style={{ height: '100vh', backgroundColor: '#000' }}>
      <h2 style={{ color: '#0ff', textAlign: 'center', padding: '1rem' }}>
        🛍️ HoloCommerce by AshrafMorningstar
      </h2>
      <Canvas>
        <ambientLight />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#0ff" />
        </mesh>
      </Canvas>
    </div>
  );
}

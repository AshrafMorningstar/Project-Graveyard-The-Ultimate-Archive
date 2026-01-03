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

/**
 * WebGL Data Globe - Main Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import * as THREE from 'three'

// --- UTILS ---
// Convert Lat/Lon to 3D Vector on Sphere
const calcPosFromLatLonRad = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = (radius * Math.sin(phi) * Math.sin(theta))
  const y = (radius * Math.cos(phi))
  
  return new THREE.Vector3(x, y, z)
}

// Cubic Bezier Curve for Arcs
const getCurve = (p1, p2) => {
  const v1 = new THREE.Vector3(p1.x, p1.y, p1.z)
  const v2 = new THREE.Vector3(p2.x, p2.y, p2.z)
  const points = []
  
  for (let i = 0; i <= 20; i++) {
    const p = new THREE.Vector3().lerpVectors(v1, v2, i / 20)
    p.normalize().multiplyScalar(1.5 + 0.2 * Math.sin(Math.PI * i / 20))
    points.push(p)
  }
  
  return new THREE.CatmullRomCurve3(points)
}

// --- DATA ---
const CITIES = [
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
]

// --- COMPONENTS ---

// 1. The Globe Mesh
function Globe() {
  // Use simple texture loader for demo (would ideally use a real earth map)
  // For this self-contained demo, we simulate with a color/bump map
  return (
    <mesh>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshPhongMaterial 
        color="#1f2937" 
        emissive="#000000"
        specular="#111111"
        shininess={10}
        transparent={true}
        opacity={0.9}
        wireframe={false}
      />
      
      {/* City Markers */}
      {CITIES.map((city, i) => {
        const pos = calcPosFromLatLonRad(city.lat, city.lon, 1.5)
        return (
          <mesh position={pos} key={i}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
            <Html distanceFactor={10}>
              <div style={{ color: 'white', fontSize: '8px', fontFamily: 'sans-serif', whiteSpace: 'nowrap', pointerEvents: 'none', marginLeft: '5px' }}>
                {city.name}
              </div>
            </Html>
          </mesh>
        )
      })}
    </mesh>
  )
}

// 2. Data Arcs
function DataArcs() {
  const curves = useMemo(() => {
    const c = []
    // Connect every city to every other city (for demo visual density)
    for (let i = 0; i < CITIES.length; i++) {
        for (let j = i + 1; j < CITIES.length; j++) {
            const p1 = calcPosFromLatLonRad(CITIES[i].lat, CITIES[i].lon, 1.5)
            const p2 = calcPosFromLatLonRad(CITIES[j].lat, CITIES[j].lon, 1.5)
            c.push(getCurve(p1, p2))
        }
    }
    return c
  }, [])

  return (
    <group>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 20, 0.003, 8, false]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  )
}

// 3. Atmosphere Glow
function Atmosphere() {
  return (
    <mesh scale={[1.1, 1.1, 1.1]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshBasicMaterial 
        color="#38bdf8"
        transparent
        opacity={0.05}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function App() {
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <>
        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1, color: 'white', fontFamily: 'sans-serif' }}>
            <h1 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '1.5rem' }}>Global Data Flow</h1>
            <p style={{ margin: 0, opacity: 0.5, fontSize: '0.8rem' }}>Live Network Visualizer</p>
            <button 
                onClick={() => setAutoRotate(!autoRotate)}
                style={{ 
                    marginTop: '20px', 
                    background: 'transparent', 
                    border: '1px solid #38bdf8', 
                    color: '#38bdf8', 
                    padding: '8px 16px', 
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontSize: '0.7rem'
                }}
            >
                {autoRotate ? 'Stop Rotation' : 'Start Rotation'}
            </button>
        </div>

        <Canvas camera={{ position: [0, 0, 4] }}>
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            <group rotation={[0, 0, 23.5 * Math.PI / 180]}> {/* Earth Tilt */}
                <Globe />
                <DataArcs />
                <Atmosphere />
            </group>
            
            <OrbitControls 
                enablePan={false} 
                enableZoom={true} 
                autoRotate={autoRotate} 
                autoRotateSpeed={0.5} 
                minDistance={2}
                maxDistance={6}
            />
        </Canvas>
    </>
  )
}

export default App

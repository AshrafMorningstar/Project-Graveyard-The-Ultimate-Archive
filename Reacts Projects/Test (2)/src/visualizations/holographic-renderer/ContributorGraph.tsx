/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

function DataPoint({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function HolographicScene() {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      const color = Math.random() > 0.5 ? "#00f0ff" : "#bd00ff";
      p.push({ position: [x, y, z] as [number, number, number], color });
    }
    return p;
  }, []);

  useFrame((state) => {
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <group>
        {points.map((pt, i) => (
          <DataPoint key={i} position={pt.position} color={pt.color} />
        ))}
        {/* Central Core */}
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#0066ff"
            wireframe
            emissive="#0066ff"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
    </>
  );
}

export default function ContributorGraph({ data }: { data: any }) {
  return (
    <div className="w-full h-full min-h-[500px] relative rounded-xl overflow-hidden">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-white text-lg font-bold">
          QUANTUM STATE VISUALIZER
        </h3>
        <p className="text-xs text-cyan-400 font-mono">
          LIVE_REPRESENTATION // 60FPS
        </p>
      </div>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <HolographicScene />
      </Canvas>
    </div>
  );
}

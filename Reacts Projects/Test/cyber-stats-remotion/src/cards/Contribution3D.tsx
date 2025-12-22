/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useMemo, useRef } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig, useCurrentFrame, interpolate } from "remotion";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ContributionCity: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const { data } = useMemo(() => {
    const temp = [];
    // 52 weeks, 7 days
    for (let i = 0; i < 52; i++) {
      for (let j = 0; j < 7; j++) {
        const count = Math.floor(Math.random() * 10); // 0-10 contributions
        temp.push({ x: i - 26, z: j - 3.5, height: count });
      }
    }
    return { data: temp };
  }, []);

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  useFrame(() => {
    if (!meshRef.current) return;

    // Rotate the whole city
    meshRef.current.rotation.y = interpolate(
      frame,
      [0, durationInFrames],
      [0, Math.PI * 2]
    );

    let idx = 0;
    for (let i = 0; i < data.length; i++) {
      const { x, z, height } = data[i];

      // Animate height growth
      const growth = interpolate(frame, [0, 60], [0, 1], {
        extrapolateRight: "clamp",
      });
      const currentHeight = Math.max(0.1, height * growth);

      dummy.position.set(x * 1.2, currentHeight / 2, z * 1.2);
      dummy.scale.set(1, currentHeight, 1);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(idx, dummy.matrix);

      // Color based on height
      if (height === 0) color.setHex(0x1a1a2e);
      else if (height < 3)
        color.setHex(0x0f3460); // Dark Blue
      else if (height < 7)
        color.setHex(0xe94560); // Pink/Red
      else color.setHex(0x00f3ff); // Cyan

      meshRef.current.setColorAt(idx, color);
      idx++;
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, data.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial metalness={0.8} roughness={0.2} />
      </instancedMesh>

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 20, 10]} intensity={2} color="#00f3ff" />
      <pointLight position={[-10, 10, -10]} intensity={2} color="#ff00ff" />
    </group>
  );
};

export const ContributionMatrix: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <div style={{ width, height, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          width: "100%",
          textAlign: "center",
          color: "var(--primary-color)",
          fontSize: 40,
          fontFamily: "Orbitron",
          zIndex: 10,
        }}
      >
        CONTRIBUTION MATRIX 3D
      </div>

      <ThreeCanvas
        width={width}
        height={height}
        style={{ backgroundColor: "transparent" }}
        camera={{ position: [20, 30, 40], fov: 45 }}
      >
        <ContributionCity />
      </ThreeCanvas>
    </div>
  );
};

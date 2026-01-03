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

import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, Stars } from '@react-three/drei';
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { DataAlchemist, MOCK_DATA } from './DataAlchemy';
import { EssenceCard } from './components/EssenceCard';
import { LanguageGalaxy } from './components/LanguageGalaxy';
import { TemporalFlow } from './components/TemporalFlow';

const CameraRig = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();
    
    // Cinematic camera movement
    const cameraZ = interpolate(frame, [0, durationInFrames], [20, 15], { extrapolateRight: 'clamp' });
    const cameraY = interpolate(frame, [0, durationInFrames], [0, 2], { extrapolateRight: 'clamp' });
    
    useFrame((state) => {
        state.camera.position.z = cameraZ;
        state.camera.position.y = cameraY;
        state.camera.lookAt(0, 0, 0);
    });
    
    return null;
};

export const Scene: React.FC = () => {
    const alchemist = useMemo(() => new DataAlchemist(), []);
    const data = useMemo(() => alchemist.transform(MOCK_DATA), [alchemist]);
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill className="bg-aether-deep">
             <Canvas
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                shadows
                dpr={[1, 2]}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={50} />
                <CameraRig />
                
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#18ffff" />

                <Environment preset="city" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <group position={[0, 0, 0]}>
                     <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                        <EssenceCard stats={data.essence} />
                     </Float>
                </group>

                 <group position={[8, 0, -5]}>
                    <LanguageGalaxy text={data.story} languages={data.beauty.planetSizes} />
                 </group>

                 <group position={[-8, -2, -2]}>
                    <TemporalFlow />
                 </group>

            </Canvas>
            
            {/* Overlay UI for "Holographic Interface" look */}
            <AbsoluteFill className="pointer-events-none flex items-end justify-between p-12 text-aether-frost font-mono text-xl tracking-widest opacity-80 mix-blend-screen">
                <div>SYSTEM: AETHER-VIZ v1.0</div>
                <div>USER: {MOCK_DATA.username.toUpperCase()}</div>
                <div>STATUS: OPTIMAL</div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

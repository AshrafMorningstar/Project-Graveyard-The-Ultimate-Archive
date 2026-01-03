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

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Text } from '@react-three/drei';
import * as THREE from 'three';

const Planet = ({ size, color, radius, speed, name }: { size: number, color: string, radius: number, speed: number, name: string }) => {
    const ref = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * speed;
        }
    });

    return (
        <group ref={ref}>
            <group position={[radius, 0, 0]}>
                <Sphere args={[size, 32, 32]}>
                    <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
                </Sphere>
                 <Text position={[0, size + 0.5, 0]} fontSize={0.5} color="white" anchorY="bottom">
                    {name}
                </Text>
            </group>
            {/* Orbit path */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
                <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.3} />
            </mesh>
        </group>
    );
};

export const LanguageGalaxy = ({ languages }: { languages: any[], text: string }) => {
    // Colors mapped to languages
    const colors = ["#3178c6", "#dea584", "#3572A5", "#00ADD8"];

    return (
        <group rotation={[0.5, 0.5, 0]}>
            {/* Central Star (Total Code) */}
            <Sphere args={[1.5, 32, 32]}>
                <meshBasicMaterial color="#ffffff" />
                <pointLight intensity={2} distance={20} color="#ffffff" />
            </Sphere>

            {languages.map((lang, i) => (
                <Planet 
                    key={lang.name}
                    name={lang.name}
                    size={Math.max(0.3, lang.size * 5)} 
                    color={colors[i % colors.length]}
                    radius={4 + i * 2.5}
                    speed={0.2 + (1 / (i + 1)) * 0.1}
                />
            ))}
        </group>
    );
};

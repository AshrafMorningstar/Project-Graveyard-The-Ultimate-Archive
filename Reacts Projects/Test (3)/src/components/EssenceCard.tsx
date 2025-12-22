/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { Text, RoundedBox } from '@react-three/drei';
import { useCurrentFrame, interpolate } from 'remotion';

const StatBar = ({ label, value, index, color }: { label: string, value: number, index: number, color: string }) => {
    const frame = useCurrentFrame();
    // Staggered animation
    const progress = interpolate(frame, [10 + index * 5, 40 + index * 5], [0, value / 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => t * (2 - t) }); // EaseOutQuad

    return (
        <group position={[0, 1.5 - index, 0]}>
            <Text
                position={[-3.5, 0, 0.1]}
                fontSize={0.4}
                color="#e3f2fd"
                anchorX="left"
                font="https://fonts.gstatic.com/s/ibmplexmono/v19/-F63f_kmnyXVU6g3jZauag.woff" // Use online font or generic if fails
            >
                {label.toUpperCase()}
            </Text>
            
            {/* Background Bar */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[6, 0.3, 0.1]} />
                <meshStandardMaterial color="#37474f" transparent opacity={0.5} />
            </mesh>

            {/* Foreground Bar */}
            <mesh position={[-3 + (progress * 6) / 2, 0, 0.15]}>
                <boxGeometry args={[progress * 6, 0.3, 0.1]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
            </mesh>
            
            <Text
                 position={[3.5, 0, 0.1]}
                 fontSize={0.4}
                 color="#ffffff"
                 anchorX="right"
            >
                {Math.round(progress * 100)}%
            </Text>
        </group>
    );
};

export const EssenceCard = ({ stats }: { stats: any }) => {
    return (
        <group>
             {/* Glass Container */}
            <RoundedBox args={[9, 6, 1]} radius={0.2} smoothness={4}>
                 <meshPhysicalMaterial 
                    color="#ffffff"
                    transmission={0.6}
                    roughness={0.1}
                    metalness={0.1}
                    thickness={2}
                    clearcoat={1}
                    transparent
                 />
            </RoundedBox>
            
            {/* Content Plane */}
            <group position={[0, 0, 0.6]}>
                 <Text position={[0, 2.2, 0]} fontSize={0.6} color="#ffffff" font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff">
                    ESSENCE
                 </Text>
                 
                 <StatBar label="Impact" value={stats.impact} index={0} color="#18ffff" />
                 <StatBar label="Quality" value={stats.quality} index={1} color="#f50057" />
                 <StatBar label="Activity" value={stats.activity} index={2} color="#ffd600" />
                 <StatBar label="Growth" value={stats.growth} index={3} color="#bbdefb" />
            </group>
        </group>
    );
};

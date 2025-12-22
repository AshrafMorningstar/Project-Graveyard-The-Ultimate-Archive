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
import * as THREE from 'three';
// Shader code defined below

const WaveShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#18ffff") }
    },
    vertexShader: `
      varying vec2 vUv;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin(pos.x * 2.0 + uTime) * 0.5;
        pos.y += cos(pos.y * 2.0 + uTime) * 0.2;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uColor;
      void main() {
        float intensity = 0.5 + 0.5 * sin(vUv.x * 10.0);
        gl_FragColor = vec4(uColor * intensity + vec3(0.1), 0.8);
      }
    `
};

export const TemporalFlow = () => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh>
                <planeGeometry args={[10, 10, 32, 32]} />
                <shaderMaterial 
                    ref={materialRef}
                    uniforms={WaveShaderMaterial.uniforms}
                    vertexShader={WaveShaderMaterial.vertexShader}
                    fragmentShader={WaveShaderMaterial.fragmentShader}
                    transparent
                    side={THREE.DoubleSide}
                />
            </mesh>
            <gridHelper args={[10, 10, 0xffffff, 0x555555]} rotation={[-Math.PI/2, 0, 0]} position={[0, -0.1, 0]} />
        </group>
    );
};

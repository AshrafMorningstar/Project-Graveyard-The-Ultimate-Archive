/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Code Architecture Visualizer
   Level: Intermediate
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

import React, { useState, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Data Simulation ---
const MOCK_FILE_SYSTEM = {
    name: "root",
    type: "folder",
    children: [
        {
            name: "src",
            type: "folder",
            children: [
                { name: "App.js", type: "file", lines: 120, complexity: 5 },
                { name: "index.js", type: "file", lines: 40, complexity: 1 },
                {
                    name: "components",
                    type: "folder",
                    children: [
                        { name: "Button.js", type: "file", lines: 80, complexity: 2 },
                        { name: "Header.js", type: "file", lines: 60, complexity: 3 },
                        { name: "Sidebar.js", type: "file", lines: 150, complexity: 6 }
                    ]
                },
                {
                    name: "utils",
                    type: "folder",
                    children: [
                        { name: "helpers.js", type: "file", lines: 200, complexity: 8 },
                        { name: "api.js", type: "file", lines: 90, complexity: 4 }
                    ]
                }
            ]
        },
        {
            name: "package.json",
            type: "file",
            lines: 50,
            complexity: 1
        },
        {
            name: "README.md",
            type: "file",
            lines: 100,
            complexity: 1
        }
    ]
};

// --- 3D Components ---

function Building({ position, height, color, name, complexity }) {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);
    
    useFrame((state) => {
        if (hovered) {
            mesh.current.rotation.y += 0.02;
        } else {
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, 0, 0.1);
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={mesh}
                position={[0, height / 2, 0]}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <boxGeometry args={[1, height, 1]} />
                <meshStandardMaterial 
                    color={hovered ? '#ffffff' : color} 
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[1.2, 1.2]} />
                <meshBasicMaterial color="#333" transparent opacity={0.5} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

function CityLayout({ data }) {
    // Recursively flatten tree to list of buildings with positions
    const buildings = useMemo(() => {
        const list = [];
        let x = 0;
        let z = 0;
        
        function traverse(node, depth = 0) {
            if (node.type === 'file') {
                // Height based on lines of code
                const h = Math.max(1, node.lines / 20); 
                // Color based on complexity (Green -> Red)
                const hue = 120 - (node.complexity * 12); 
                const color = `hsl(${hue}, 100%, 50%)`;
                
                list.push({
                    id: node.name,
                    position: [x, 0, z],
                    height: h,
                    color: color,
                    ...node
                });
                
                // Spiral layout algorithm simplified
                x += 2.5;
                if (x > 5) {
                    x = 0;
                    z += 2.5;
                }
            } else if (node.children) {
                node.children.forEach(child => traverse(child, depth + 1));
            }
        }
        
        traverse(data);
        return list;
    }, [data]);

    return (
        <group position={[-2, -2, 0]} rotation={[0, Math.PI / 4, 0]}>
            {buildings.map((b, i) => (
                <Building 
                    key={i}
                    position={b.position}
                    height={b.height}
                    color={b.color}
                    name={b.name}
                    complexity={b.complexity}
                />
            ))}
        </group>
    );
}

function App() {
    const [layout, setLayout] = useState('city');

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div className="ui-panel">
                <h1><span role="img">🏗️</span> Code City</h1>
                <div className="controls">
                    <p>Visualizing <strong>MOCK_FILE_SYSTEM</strong></p>
                    <p>Each building represents a file.</p>
                    <div className="legend">
                        <div className="legend-item"><div className="color-box" style={{background:'#00ff00'}}></div> Low Complexity</div>
                        <div className="legend-item"><div className="color-box" style={{background:'#ff0000'}}></div> High Complexity</div>
                        <div className="legend-item">Height = Lines of Code</div>
                    </div>
                </div>
            </div>
            
            <div className="canvas-container">
                <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <CityLayout data={MOCK_FILE_SYSTEM} />
                    <gridHelper args={[20, 20, 0x444444, 0x222222]} />
                </Canvas>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

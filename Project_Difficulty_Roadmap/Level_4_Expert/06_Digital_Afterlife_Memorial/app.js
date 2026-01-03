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

/* 
   Project: Digital Afterlife Memorial
   Level: Expert
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

import * as THREE from 'three';

// --- Scene Setup ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.001);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Particle System ---
const geometry = new THREE.BufferGeometry();
const particleCount = 5000;
const positions = [];
const colors = [];

const colorObj = new THREE.Color();

for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 4000;
    const y = (Math.random() - 0.5) * 4000;
    const z = (Math.random() - 0.5) * 4000;
    positions.push(x, y, z);

    // Ethereal colors (Blues/Purples)
    colorObj.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.5);
    colors.push(colorObj.r, colorObj.g, colorObj.b);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 4,
    vertexColors: true,
    opacity: 0.8,
    transparent: true,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// --- Animation Loop ---

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 5;
    mouseY = (e.clientY - window.innerHeight / 2) * 5;
});

const memInput = document.getElementById('memory-input');
const uploadBtn = document.getElementById('upload-btn');

uploadBtn.addEventListener('click', () => {
    if(memInput.value) {
        // "Explode" effect simulation by changing color momentarily
        material.size = 8;
        setTimeout(() => material.size = 4, 200);
        memInput.value = '';
    }
});

function animate() {
    requestAnimationFrame(animate);

    // Subtle Rotation
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;

    // Mouse Interaction
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

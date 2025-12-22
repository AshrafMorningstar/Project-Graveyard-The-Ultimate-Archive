/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: AI-Generated Codebase Explorer
   Level: Advanced
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- Scene Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050510);
scene.fog = new THREE.FogExp2(0x050510, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;
camera.position.y = 20;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2, 100);
scene.add(pointLight);

// --- Procedural Generation Logic ---

const seedInput = document.getElementById('seed-input');
const generateBtn = document.getElementById('generate-btn');

 // Pseudo-random based on string seed
function seededRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
}

let universes = [];

function generateUniverse(seed) {
    // Clear old
    universes.forEach(u => scene.remove(u));
    universes = [];

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    universes.push(rootGroup);

    // "Central Star" (Main Repo)
    const starGeo = new THREE.SphereGeometry(5, 32, 32);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffdd00 });
    const star = new THREE.Mesh(starGeo, starMat);
    rootGroup.add(star);
    
    // Light from star
    const starLight = new THREE.PointLight(0xffaa00, 3, 200);
    star.add(starLight);

    // Generate "Planets" (Modules)
    let rng = seededRandom(seed); 
    const planetCount = Math.floor(seededRandom(seed + "count") * 10) + 5; // 5-15 planets

    for(let i=0; i<planetCount; i++) {
        const radius = (seededRandom(seed + i) * 2) + 1;
        const color = new THREE.Color().setHSL(seededRandom(seed + i + "col"), 0.8, 0.5);
        const distance = (i * 8) + 15;
        const speed = (seededRandom(seed + i + "spd") * 0.02) + 0.005;

        const planetGeo = new THREE.IcosahedronGeometry(radius, 1);
        const planetMat = new THREE.MeshStandardMaterial({ 
            color: color, 
            flatShading: true,
            roughness: 0.8 
        });
        
        const planet = new THREE.Mesh(planetGeo, planetMat);
        
        // Pivot group to handle orbit
        const pivot = new THREE.Group();
        pivot.userData = { speed: speed, axis: new THREE.Vector3(0, 1, 0) };
        pivot.add(planet);
        planet.position.x = distance;
        
        // Generation Data for UI
        planet.userData = { 
            name: `Module_${i.toString(16).toUpperCase()}`,
            mass: Math.round(radius * 100),
            components: Math.floor(radius * 5)
        };
        
        rootGroup.add(pivot);

        // Moons (Sub-components)
        if (radius > 2) {
            const moonGeo = new THREE.SphereGeometry(0.5, 8, 8);
            const moonMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
            const moon = new THREE.Mesh(moonGeo, moonMat);
            moon.position.x = radius + 2;
            planet.add(moon);
        }
    }

    // Starfield Background
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const posArray = new Float32Array(starCount * 3);
    for(let i=0; i<starCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 400;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMat = new THREE.PointsMaterial({ size: 0.2, color: 0xffffff });
    const starField = new THREE.Points(starsGeo, starsMat);
    rootGroup.add(starField);
}

// Hover Interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function checkIntersection() {
    raycaster.setFromCamera(mouse, camera);
    // Find planets (meshes inside groups inside root)
    // Simplify: just intersect all object in scene
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData.name) {
            document.getElementById('system-name').innerText = obj.userData.name;
            document.getElementById('system-mass').innerText = obj.userData.mass + " LOC";
            document.getElementById('system-planets').innerText = obj.userData.components;
            document.body.style.cursor = 'pointer';
        }
    } else {
        document.body.style.cursor = 'default';
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate Planets
    if(universes.length > 0) {
        universes[0].children.forEach(child => {
            if (child.userData.speed) {
                child.rotation.y += child.userData.speed;
            }
        });
    }

    controls.update();
    checkIntersection();
    renderer.render(scene, camera);
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

generateBtn.addEventListener('click', () => {
    generateUniverse(seedInput.value);
});

// Init
generateUniverse(seedInput.value);
animate();

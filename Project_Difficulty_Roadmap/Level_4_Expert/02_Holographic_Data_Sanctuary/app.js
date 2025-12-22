/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Holographic Data Sanctuary
   Level: Expert
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

// --- Scene Setup ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.y = 0;

// CSS3D Renderer (DOM elements)
const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Controls
const controls = new PointerLockControls(camera, document.body);

const blocker = document.getElementById('blocker');
const instructions = document.getElementById('instructions');

instructions.addEventListener('click', () => controls.lock());

controls.addEventListener('lock', () => {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
});

controls.addEventListener('unlock', () => {
    blocker.style.display = 'block';
    instructions.style.display = 'flex';
});

scene.add(controls.getObject());


// --- Content Generation ---

const MOVEMENT_SPEED = 100.0;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

// 1. Create Floating Panels
function createPanel(content, x, y, z, ry) {
    const div = document.createElement('div');
    div.className = 'holo-card';
    div.innerHTML = content;

    const object = new CSS3DObject(div);
    object.position.set(x, y, z);
    object.rotation.y = ry;
    
    scene.add(object);
}

// Data Population
const cards = [
    {
        title: "Subject: 001",
        body: "<p>Identity: Ashraf</p><p>Status: Online</p><p>Clearance: Level 5</p>",
        pos: [0, 0, -400],
        rot: 0
    },
    {
        title: "Project Alpha",
        body: "<img src='https://via.placeholder.com/300x150/003333/00ffff?text=Schematic' ><p>Blueprint for neural bridge.</p>",
        pos: [-400, 0, -200],
        rot: Math.PI / 4
    },
    {
        title: "Secure Comm",
        body: "<button class='btn' onclick='alert(\"Encrypted Channel Open\")'>Connect</button>",
        pos: [400, 0, -200],
        rot: -Math.PI / 4
    },
    {
        title: "Archive A",
        body: "<p>Log 2024.12.16</p><p>System stability at 99%. Anomaly detected in sector 7.</p>",
        pos: [-300, 250, -400],
        rot: 0
    }
];

cards.forEach(card => {
    const html = `<h3>${card.title}</h3>${card.body}`;
    createPanel(html, ...card.pos, card.rot);
});

// Floor Reference (Grid) - CSS3D can't render Lines easily, can add a DIV floor or mix with WebGLRenderer. 
// For simplicity in this specialized demo, we stick to pure CSS3D for content floating in "void".
const floor = document.createElement('div');
floor.style.width = '2000px';
floor.style.height = '2000px';
floor.style.background = 'repeating-linear-gradient(rgba(0,255,255,0.1) 0 1px, transparent 1px 100px), repeating-linear-gradient(90deg, rgba(0,255,255,0.1) 0 1px, transparent 1px 100px)';
floor.style.transform = 'rotateX(90deg)';
const floorObj = new CSS3DObject(floor);
floorObj.rotation.x = -Math.PI / 2;
floorObj.position.y = -300;
scene.add(floorObj);


// --- Movement Logic ---
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'ArrowUp': case 'KeyW': moveForward = true; break;
        case 'ArrowLeft': case 'KeyA': moveLeft = true; break;
        case 'ArrowDown': case 'KeyS': moveBackward = true; break;
        case 'ArrowRight': case 'KeyD': moveRight = true; break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'ArrowUp': case 'KeyW': moveForward = false; break;
        case 'ArrowLeft': case 'KeyA': moveLeft = false; break;
        case 'ArrowDown': case 'KeyS': moveBackward = false; break;
        case 'ArrowRight': case 'KeyD': moveRight = false; break;
    }
});


let prevTime = performance.now();

function animate() {
    requestAnimationFrame(animate);

    const time = performance.now();
    const delta = (time - prevTime) / 1000;

    if (controls.isLocked === true) {
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();

        if (moveForward || moveBackward) velocity.z -= direction.z * MOVEMENT_SPEED * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * MOVEMENT_SPEED * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
    }

    prevTime = time;
    renderer.render(scene, camera);
}

animate();

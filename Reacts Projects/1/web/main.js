/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// Basic Three.js scene to visualize a conveyor belt and motor. Timeline playback simulated.
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f5);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 8, 12);
camera.lookAt(0, 0, 0);

// lights
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
hemi.position.set(0, 20, 0);
scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(5, 10, 7);
scene.add(dir);

// ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: 0xeaeaf0 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// conveyor belt: base + moving rollers (simulate by changing color/position)
const beltBase = new THREE.Mesh(
  new THREE.BoxGeometry(10, 0.4, 2),
  new THREE.MeshStandardMaterial({ color: 0x2b2f36 })
);
beltBase.position.set(0, 0.2, 0);
scene.add(beltBase);

// motor
const motor = new THREE.Mesh(
  new THREE.CylinderGeometry(0.6, 0.6, 1.2, 32),
  new THREE.MeshStandardMaterial({ color: 0x156289 })
);
motor.rotation.z = Math.PI / 2;
motor.position.set(-5.8, 0.8, 0);
scene.add(motor);

// a few boxes representing items on the belt
const items = [];
const itemGeom = new THREE.BoxGeometry(0.8, 0.6, 0.8);
for (let i = 0; i < 6; i++) {
  const m = new THREE.Mesh(
    itemGeom,
    new THREE.MeshStandardMaterial({ color: 0x8ad28a })
  );
  m.position.set(-3 + i * 1.1, 0.8, 0);
  scene.add(m);
  items.push(m);
}

// simple labels using HTML overlay could be added; for brevity we change colors
let playing = false;
const scrub = document.getElementById("scrub");
let time = 0; // 0..100
const maxTime = 100;
function step(dt) {
  // move items along belt (cyclic)
  const speed = 0.02; // units per tick scaled by dt
  items.forEach((it, idx) => {
    // base pos
    const base = -3 + idx * 1.1;
    const offset = ((time / maxTime) * 10) % 10;
    const x = base + offset;
    // wrap
    const wrapped = ((x + 6) % 6) - 3;
    it.position.x = wrapped;
    // color change near motor (simulate stress)
    const distToMotor = Math.abs(it.position.x - motor.position.x);
    if (distToMotor < 1.0) {
      it.material.color.setHex(0xffa500); // orange near motor
    } else {
      it.material.color.setHex(0x8ad28a);
    }
  });

  // motor color indicates temp state simulated by time
  const temp = 60 + 20 * Math.sin(time / 10.0);
  // map temp to color: normal (blue) to hot (red)
  const tNorm = Math.max(0, Math.min(1, (temp - 60) / 30));
  const color = new THREE.Color().lerpColors(
    new THREE.Color(0x156289),
    new THREE.Color(0xff2222),
    tNorm
  );
  motor.material.color.copy(color);
}

function animate() {
  requestAnimationFrame(animate);
  // simulate dt
  if (playing) {
    time = (time + 0.5) % maxTime;
    scrub.value = Math.floor(time);
  } else {
    // if scrub moved by user, set time
    time = Number(scrub.value);
  }
  step(1);
  renderer.render(scene, camera);
}
animate();

// UI controls
document.getElementById("play").onclick = () => {
  playing = true;
};
document.getElementById("pause").onclick = () => {
  playing = false;
};
document.getElementById("step").onclick = () => {
  playing = false;
  time = (time + 1) % maxTime;
  scrub.value = Math.floor(time);
};

// resize handler
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

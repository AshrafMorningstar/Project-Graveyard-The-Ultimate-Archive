/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const cursor = document.getElementById("cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // Linear interpolation for smooth follow
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;

  cursorX += dx * 0.1;
  cursorY += dy * 0.1;

  cursor.style.transform = `translate(${cursorX - 150}px, ${cursorY - 150}px)`;
  // -150 because width/2 is 150 (css width is 300) to keep centered
  // Wait, CSS transform translate(-50%, -50%) handles centering on the element's origin.
  // So we just need to set left/top or translate.
  // Let's use left/top for position and transform for centering.

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  requestAnimationFrame(animate);
}

animate();

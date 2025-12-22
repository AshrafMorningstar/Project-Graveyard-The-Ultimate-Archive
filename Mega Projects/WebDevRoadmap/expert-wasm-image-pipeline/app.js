/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * WASM Image Pipeline - Logic (Canvas-based simulation)
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

let canvas, ctx, originalImageData;
let currentFilter = null;

document.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('fileInput');
  
  uploadZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleFileUpload);
  
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.style.borderColor = '#8b5cf6';
  });
  
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      loadImage(file);
    }
  });
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      applyFilter();
    });
  });
  
  document.getElementById('intensity').addEventListener('input', (e) => {
    document.getElementById('intensityValue').textContent = e.target.value + '%';
    applyFilter();
  });
  
  document.getElementById('resetBtn').addEventListener('click', resetImage);
  document.getElementById('exportBtn').addEventListener('click', exportImage);
});

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) loadImage(file);
}

function loadImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      document.getElementById('uploadZone').style.display = 'none';
      canvas.style.display = 'block';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function applyFilter() {
  if (!originalImageData || !currentFilter) return;
  
  ctx.putImageData(originalImageData, 0, 0);
  const intensity = document.getElementById('intensity').value / 100;
  
  switch(currentFilter) {
    case 'grayscale':
      ctx.filter = `grayscale(${intensity})`;
      break;
    case 'sepia':
      ctx.filter = `sepia(${intensity})`;
      break;
    case 'invert':
      ctx.filter = `invert(${intensity})`;
      break;
    case 'blur':
      ctx.filter = `blur(${intensity * 10}px)`;
      break;
    case 'brightness':
      ctx.filter = `brightness(${0.5 + intensity * 1.5})`;
      break;
  }
  
  ctx.drawImage(canvas, 0, 0);
  ctx.filter = 'none';
}

function resetImage() {
  if (originalImageData) {
    ctx.putImageData(originalImageData, 0, 0);
    currentFilter = null;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  }
}

function exportImage() {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL();
  link.click();
}

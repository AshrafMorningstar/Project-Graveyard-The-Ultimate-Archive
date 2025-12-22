/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// Created by Ashraf Morningstar - https://github.com/AshrafMorningstar

const passwordInput = document.getElementById('password');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Update length value display
lengthSlider.addEventListener('input', (e) => {
  lengthValue.textContent = e.target.value;
});

// Generate password
generateBtn.addEventListener('click', generatePassword);

function generatePassword() {
  const length = parseInt(lengthSlider.value);
  let charset = '';
  let password = '';

  if (uppercaseCheck.checked) charset += uppercase;
  if (lowercaseCheck.checked) charset += lowercase;
  if (numbersCheck.checked) charset += numbers;
  if (symbolsCheck.checked) charset += symbols;

  if (charset === '') {
    alert('Please select at least one character type!');
    return;
  }

  // Generate password
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  passwordInput.value = password;
  updateStrength(password);
  
  // Add generation animation
  passwordInput.style.transform = 'scale(1.05)';
  setTimeout(() => {
    passwordInput.style.transform = 'scale(1)';
  }, 200);
}

// Copy to clipboard
copyBtn.addEventListener('click', () => {
  if (passwordInput.value === '') {
    alert('Generate a password first!');
    return;
  }

  passwordInput.select();
  document.execCommand('copy');
  
  // Visual feedback
  copyBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `;
  
  setTimeout(() => {
    copyBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `;
  }, 2000);
});

// Update strength meter
function updateStrength(password) {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (password.length >= 16) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  strengthBar.className = 'strength-bar';
  
  if (strength <= 2) {
    strengthBar.classList.add('weak');
    strengthText.innerHTML = 'Strength: <span style="color: #ff0000;">Weak</span>';
  } else if (strength <= 4) {
    strengthBar.classList.add('medium');
    strengthText.innerHTML = 'Strength: <span style="color: #ffff00;">Medium</span>';
  } else {
    strengthBar.classList.add('strong');
    strengthText.innerHTML = 'Strength: <span style="color: #00ff00;">Strong</span>';
  }
}

// Generate password on page load
window.addEventListener('load', generatePassword);

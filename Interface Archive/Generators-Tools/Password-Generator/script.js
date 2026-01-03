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

/**
 * SecureGen - Password Generator
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Event Listeners
lengthSlider.addEventListener('input', updateLength);
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

// Generate on load
window.addEventListener('load', generatePassword);

function updateLength() {
    lengthValue.textContent = lengthSlider.value;
}

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let charset = '';
    let password = '';

    if (uppercaseCheck.checked) charset += uppercase;
    if (lowercaseCheck.checked) charset += lowercase;
    if (numbersCheck.checked) charset += numbers;
    if (symbolsCheck.checked) charset += symbols;

    if (charset === '') {
        alert('Please select at least one character type');
        return;
    }

    // Ensure at least one character from each selected type
    if (uppercaseCheck.checked) password += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (lowercaseCheck.checked) password += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (numbersCheck.checked) password += numbers[Math.floor(Math.random() * numbers.length)];
    if (symbolsCheck.checked) password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    passwordOutput.value = password;
    updateStrength(password);
}

function updateStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    if (password.length >= 16) strength += 10;
    if (/[a-z]/.test(password)) strength += 10;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 15;

    strengthBar.style.width = strength + '%';

    let strengthLevel = '';
    let color = '';

    if (strength < 40) {
        strengthLevel = 'Weak';
        color = '#ef4444';
    } else if (strength < 70) {
        strengthLevel = 'Medium';
        color = '#f59e0b';
    } else {
        strengthLevel = 'Strong';
        color = '#10b981';
    }

    strengthBar.style.background = `linear-gradient(90deg, ${color}, ${color})`;
    strengthText.textContent = `Password Strength: ${strengthLevel}`;
    strengthText.style.color = color;
}

function copyPassword() {
    passwordOutput.select();
    passwordOutput.setSelectionRange(0, 99999); // For mobile

    navigator.clipboard.writeText(passwordOutput.value).then(() => {
        // Visual feedback
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy password');
    });
}
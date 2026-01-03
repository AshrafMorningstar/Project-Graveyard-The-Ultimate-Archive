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
Created & Maintained by Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
*/

document.addEventListener('DOMContentLoaded', () => {
    const passwordOutput = document.getElementById('password-output');
    const lengthSlider = document.getElementById('length');
    const lengthVal = document.getElementById('length-val');
    const uppercaseCb = document.getElementById('uppercase');
    const lowercaseCb = document.getElementById('lowercase');
    const numbersCb = document.getElementById('numbers');
    const symbolsCb = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const strengthText = document.getElementById('strength-text');
    const strengthBarContainer = document.getElementById('strength-bar');
    const toast = document.getElementById('toast');

    const chars = {
        upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lower: 'abcdefghijklmnopqrstuvwxyz',
        number: '0123456789',
        symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    // Initialize strength bars
    for(let i=0; i<4; i++) {
        const div = document.createElement('div');
        div.className = 'bar-segment';
        strengthBarContainer.appendChild(div);
    }

    // Update slider value
    lengthSlider.addEventListener('input', (e) => {
        lengthVal.innerText = e.target.value;
    });

    generateBtn.addEventListener('click', generatePassword);
    
    copyBtn.addEventListener('click', () => {
        if(!passwordOutput.value) return;
        navigator.clipboard.writeText(passwordOutput.value);
        showToast();
    });

    function generatePassword() {
        let length = +lengthSlider.value;
        let hasUpper = uppercaseCb.checked;
        let hasLower = lowercaseCb.checked;
        let hasNumber = numbersCb.checked;
        let hasSymbol = symbolsCb.checked;

        if(!hasUpper && !hasLower && !hasNumber && !hasSymbol) {
            alert('Please select at least one character type.');
            return;
        }

        let availableChars = '';
        if(hasUpper) availableChars += chars.upper;
        if(hasLower) availableChars += chars.lower;
        if(hasNumber) availableChars += chars.number;
        if(hasSymbol) availableChars += chars.symbol;

        let password = '';
        for(let i=0; i<length; i++) {
            password += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
        }

        passwordOutput.value = password;
        calculateStrength(password);
    }

    function calculateStrength(password) {
        let strength = 0;
        if(password.length >= 8) strength++;
        if(password.length >= 12) strength++;
        if(/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
        if(/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength++;

        // Clamp 1-4
        if(strength < 1) strength = 1;
        if(strength > 4) strength = 4;

        updateStrengthMeter(strength);
    }

    function updateStrengthMeter(level) {
        strengthBarContainer.className = 'strength-bar strength-' + level;
        
        const labels = ['Too Weak', 'Weak', 'Medium', 'Strong'];
        strengthText.innerText = labels[level - 1];
    }

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // Generate on load
    generatePassword();
});

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * QR Atelier - Minimalist QR Code Generator
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const textInput = document.getElementById('text-input');
const sizeSelect = document.getElementById('size-select');
const colorPicker = document.getElementById('color-picker');
const generateBtn = document.getElementById('generate-btn');
const qrDisplay = document.getElementById('qr-display');
const qrCodeDiv = document.getElementById('qr-code');
const downloadBtn = document.getElementById('download-btn');
const placeholder = document.querySelector('.placeholder');

let qrCode = null;

generateBtn.addEventListener('click', generateQRCode);
downloadBtn.addEventListener('click', downloadQRCode);

function generateQRCode() {
    const text = textInput.value.trim();
    
    if (!text) {
        alert('Please enter some text or URL');
        return;
    }

    const size = parseInt(sizeSelect.value);
    const color = colorPicker.value;

    // Clear previous QR code
    qrCodeDiv.innerHTML = '';
    
    // Hide placeholder, show QR code
    placeholder.classList.add('hidden');
    qrCodeDiv.classList.remove('hidden');
    downloadBtn.classList.remove('hidden');

    // Generate new QR code
    qrCode = new QRCode(qrCodeDiv, {
        text: text,
        width: size,
        height: size,
        colorDark: color,
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
}

function downloadQRCode() {
    const canvas = qrCodeDiv.querySelector('canvas');
    
    if (!canvas) {
        alert('Please generate a QR code first');
        return;
    }

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

// Generate on Enter key
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateQRCode();
    }
});
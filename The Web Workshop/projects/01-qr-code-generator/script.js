/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

document.addEventListener('DOMContentLoaded', () => {
    const qrText = document.getElementById('qr-text');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const canvas = document.getElementById('qr-code');
    
    // Initialize QRious
    const qr = new QRious({
        element: canvas,
        size: 200,
        value: 'https://github.com/AshrafMorningstar' // Default value
    });

    function generateQR() {
        const text = qrText.value.trim();
        if (!text) {
            alert('Please enter some text or URL!');
            return;
        }
        qr.value = text;
        downloadBtn.style.display = 'inline-block';
    }

    generateBtn.addEventListener('click', generateQR);
    
    // Enable enter key
    qrText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generateQR();
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});

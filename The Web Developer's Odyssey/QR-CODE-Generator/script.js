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
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

function generateQRCode() {
    const inputText = document.getElementById('input-text').value;
    const qrCodeImage = document.getElementById('qrcode');
    const toast = document.getElementById('toast');

    if (inputText.trim() === "") {
        alert("Please enter some text to generate a QR code.");
        return;
    }

   
    const qrCodeUrl = https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(inputText)}&size=200x200;
    qrCodeImage.src = qrCodeUrl;
    qrCodeImage.style.display = 'block'; 

   
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000); 
}

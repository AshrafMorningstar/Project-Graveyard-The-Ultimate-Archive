/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Verifiable Content Platform - Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('publishBtn').addEventListener('click', publishContent);
  document.getElementById('verifyBtn').addEventListener('click', verifyContent);
});

async function publishContent() {
  const title = document.getElementById('contentTitle').value;
  const body = document.getElementById('contentBody').value;
  
  if (!title || !body) {
    alert('Please fill in both title and content');
    return;
  }
  
  const content = `${title}\n\n${body}`;
  const hash = await generateHash(content);
  
  document.getElementById('contentHash').textContent = hash;
  document.getElementById('publishResult').style.display = 'block';
  
  // Store for demo purposes
  localStorage.setItem('lastPublishedContent', content);
  localStorage.setItem('lastPublishedHash', hash);
}

async function verifyContent() {
  const content = document.getElementById('verifyContent').value;
  const expectedHash = document.getElementById('expectedHash').value;
  
  if (!content || !expectedHash) {
    alert('Please provide both content and expected hash');
    return;
  }
  
  const actualHash = await generateHash(content);
  const resultBox = document.getElementById('verifyResult');
  const statusEl = document.getElementById('verifyStatus');
  const messageEl = document.getElementById('verifyMessage');
  
  if (actualHash === expectedHash) {
    statusEl.textContent = '✅ Verification Successful';
    statusEl.className = 'success';
    messageEl.textContent = 'The content matches the provided hash. It has not been tampered with.';
    messageEl.className = 'success';
  } else {
    statusEl.textContent = '❌ Verification Failed';
    statusEl.className = 'error';
    messageEl.textContent = 'The content does NOT match the provided hash. It may have been modified.';
    messageEl.className = 'error';
  }
  
  resultBox.style.display = 'block';
}

async function generateHash(content) {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

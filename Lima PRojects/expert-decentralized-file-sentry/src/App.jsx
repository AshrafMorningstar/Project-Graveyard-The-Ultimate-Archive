/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Decentralized File Sentry - Main Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useState, useCallback, useEffect } from 'react'
import { Shield, Lock, Upload, File as FileIcon,  ExternalLink, Copy, Check, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'

// --- CRYPTO UTILS ---
async function generateKey() {
  return await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

async function encryptFile(file, key) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const fileData = await file.arrayBuffer();
  
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    fileData
  );

  // Export IV and Content together
  const blob = new Blob([iv, encrypted], { type: 'application/encrypted' });
  
  // Export Key for sharing
  const exportedKey = await window.crypto.subtle.exportKey("jwk", key);
  
  return { blob, exportedKey, iv };
}

// --- MOCK IPFS ---
// Simulates uploading to IPFS by storing in memory and returning a fake CID
const mockIpfsUpload = async (blob) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a deterministic mock CID based on size for demo consistency
      resolve(`QmX${Math.random().toString(36).substring(7)}Crypto${blob.size}Hash`);
    }, 2000);
  });
};

// --- APP COMPONENT ---
function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, encrypting, uploading, done
  const [result, setResult] = useState(null); // { cid, key }
  const [isCopied, setIsCopied] = useState(false);

  // Drag & Drop
  const onDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const onFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    
    try {
      setStatus('encrypting');
      const key = await generateKey();
      const { blob, exportedKey } = await encryptFile(file, key);
      
      setStatus('uploading');
      const cid = await mockIpfsUpload(blob);
      
      // Encode key to base64 for URL
      const keyString = btoa(JSON.stringify(exportedKey));
      
      setResult({ cid, key: keyString });
      setStatus('done');
    } catch (err) {
      console.error(err);
      alert('Encryption failed. See console.');
      setStatus('idle');
    }
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setResult(null);
    setIsCopied(false);
  };

  const shareUrl = result ? `${window.location.origin}/#cid=${result.cid}&key=${result.key}` : '';

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black">
      <div className="scan-line"></div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <header className="z-10 mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield size={48} className="text-cyan-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase text-glow mb-2">
          File Sentry
        </h1>
        <p className="text-cyan-500/80 tracking-widest text-xs md:text-sm">
          Decentralized • Encrypted • Zero-Knowledge
        </p>
      </header>

      <main className="w-full max-w-lg z-10">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-black/80 border border-cyan-500/30 backdrop-blur-md p-8 rounded-lg border-glow"
              onDragOver={e => e.preventDefault()}
              onDrop={onDrop}
            >
              <div className="border-2 border-dashed border-cyan-500/30 rounded-lg h-64 flex flex-col items-center justify-center transition-colors hover:border-cyan-400/60 hover:bg-cyan-900/10">
                {file ? (
                  <div className="text-center">
                    <FileIcon size={48} className="text-cyan-400 mx-auto mb-4" />
                    <p className="text-white font-mono break-all px-4">{file.name}</p>
                    <p className="text-cyan-500 text-xs mt-2">{(file.size / 1024).toFixed(1)} KB</p>
                    <button onClick={() => setFile(null)} className="text-red-400 text-xs mt-4 underline hover:text-red-300">Remove</button>
                  </div>
                ) : (
                  <div className="text-center pointer-events-none">
                    <Upload size={32} className="text-cyan-500/50 mx-auto mb-4" />
                    <p className="text-cyan-500/80">Drag encrypted payload here</p>
                    <p className="text-cyan-500/40 text-xs mt-2">or</p>
                  </div>
                )}
                {!file && (
                   <label className="mt-4 cursor-pointer">
                      <span className="bg-cyan-900/30 hover:bg-cyan-800/50 text-cyan-400 px-4 py-2 rounded text-sm border border-cyan-500/30 transition-all">Select File</span>
                      <input type="file" className="hidden" onChange={onFileSelect} />
                   </label>
                )}
              </div>

              <div className="mt-6">
                <button 
                  onClick={handleProcess}
                  disabled={!file}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Lock size={18} /> Encrypt & Deploy
                </button>
              </div>
            </motion.div>
          )}

          {(status === 'encrypting' || status === 'uploading') && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                 <div className="absolute inset-0 border-4 border-cyan-900/50 rounded-full"></div>
                 <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin"></div>
                 <Lock size={32} className="absolute inset-0 m-auto text-cyan-400" />
              </div>
              <h2 className="text-xl text-white font-mono animate-pulse">
                {status === 'encrypting' ? 'GENERATING SECURE KEYS...' : 'UPLOADING TO IPFS NODE...'}
              </h2>
              <p className="text-cyan-500/60 text-sm mt-2">AES-GCM-256</p>
            </motion.div>
          )}

          {status === 'done' && (
            <motion.div 
               key="result"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-black/90 border border-green-500/30 p-8 rounded-lg max-w-xl w-full"
            >
               <div className="flex items-center gap-3 mb-6 text-green-400">
                  <Check className="border-2 border-green-500 rounded-full p-1" size={32} />
                  <h2 className="text-xl font-bold">DEPLOYMENT COMPLETE</h2>
               </div>

               <div className="space-y-4 mb-8">
                  <div>
                    <label className="text-xs text-green-500/60 uppercase">IPFS Content ID (CID)</label>
                    <div className="font-mono text-green-400 text-sm truncate bg-green-900/20 p-2 rounded border border-green-500/20">{result.cid}</div>
                  </div>
                  <div>
                    <label className="text-xs text-green-500/60 uppercase">Decryption Key (Never sent to server)</label>
                     <div className="flex gap-2">
                        <input 
                           readOnly 
                           value={shareUrl} 
                           className="bg-green-900/10 border border-green-500/20 text-green-400 text-xs p-2 rounded flex-1 outline-none" 
                        />
                        <button onClick={copyLink} className="p-2 border border-green-500/30 rounded hover:bg-green-900/30 text-green-400 transition-colors">
                           {isCopied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                     </div>
                  </div>
               </div>

               <div className="flex gap-4">
                  <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="flex-1 border border-green-500 text-green-500 py-3 rounded text-center font-bold hover:bg-green-900/20 transition-all flex items-center justify-center gap-2">
                     <ExternalLink size={18} /> Open Secure Link
                  </a>
                  <button onClick={reset} className="px-6 bg-green-600 text-black font-bold rounded hover:bg-green-500 transition-colors flex items-center gap-2">
                     <RefreshCw size={18} /> New
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="absolute bottom-4 text-cyan-900 text-xs font-mono">
        ID: {Math.random().toString(36).substring(2, 8).toUpperCase()} // NODE_ACTIVE
      </footer>
    </div>
  )
}

export default App

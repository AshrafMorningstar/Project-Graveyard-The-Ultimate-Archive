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

import React, { useState } from 'react';
import { Fingerprint, Lock, Scan } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleAuth = () => {
    setIsScanning(true);
    setTimeout(() => {
        onUnlock();
    }, 1500);
  };

  return (
    <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(58,12,163,0.5)_0%,transparent_70%)] animate-pulse"></div>

      <div className="z-10 flex flex-col items-center gap-8 animate-in zoom-in-95 duration-700">
        <div className="text-center">
            <h1 className="text-4xl font-space-grotesk font-bold mb-2">Eigenfolio Quantum</h1>
            <p className="text-gray-400 font-mono tracking-widest text-sm">SECURE TERMINAL ACCESS</p>
        </div>

        <button 
            onClick={handleAuth}
            className={`relative w-24 h-24 rounded-full border-2 border-neuro-cyan/50 flex items-center justify-center transition-all duration-500
                ${isScanning ? 'scale-110 border-neuro-cyan shadow-[0_0_50px_#00F5FF]' : 'hover:border-neuro-cyan hover:bg-neuro-cyan/10'}
            `}
        >
            {isScanning ? (
                <Scan size={40} className="text-neuro-cyan animate-spin-slow" />
            ) : (
                <Fingerprint size={40} className="text-neuro-cyan/80" />
            )}
            
            {/* Scan Ring */}
            {isScanning && (
                <div className="absolute inset-0 border-t-2 border-neuro-cyan rounded-full animate-spin"></div>
            )}
        </button>

        <div className="h-6">
            {isScanning && (
                <p className="text-neuro-cyan font-mono text-xs animate-pulse">VERIFYING BIOMETRICS...</p>
            )}
            {!isScanning && (
                <p className="text-gray-500 font-mono text-xs">TOUCH TO AUTHENTICATE</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
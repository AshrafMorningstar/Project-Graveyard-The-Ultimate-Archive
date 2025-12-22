/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { soundService } from '../../utils/sound';

const BootSequence: React.FC = () => {
  const { setBooting } = useStore();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING CHRONOS CORE...");

  useEffect(() => {
    const steps = [
      { pct: 20, msg: "LOADING QUANTUM STATE..." },
      { pct: 40, msg: "CALIBRATING NEURAL INTERFACE..." },
      { pct: 60, msg: "ESTABLISHING SECURE CONNECTION..." },
      { pct: 80, msg: "RENDERING COSMIC MANIFEST..." },
      { pct: 100, msg: "SYSTEM READY." },
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
            setBooting(false);
            soundService.playOpen();
        }, 800);
        return;
      }

      const step = steps[currentStep];
      setProgress(step.pct);
      setStatus(step.msg);
      currentStep++;
    }, 600);

    return () => clearInterval(interval);
  }, [setBooting]);

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-neuro-cyan font-mono select-none">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-neuro-purple/30 animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-0 w-24 h-24 rounded-full border-t-4 border-quantum-glow animate-[spin_2s_linear_infinite_reverse]" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          
        </div>
      </div>
      
      <div className="w-64 h-1 bg-neuro-purple/20 rounded-full overflow-hidden mb-4">
        <div 
            className="h-full bg-quantum-glow shadow-[0_0_10px_#4CC9F0] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-xs tracking-widest opacity-80 animate-pulse">
        {status}
      </div>
    </div>
  );
};

export default BootSequence;

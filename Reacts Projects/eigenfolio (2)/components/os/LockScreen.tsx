/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Lock, ArrowRight } from 'lucide-react';

const LockScreen: React.FC = () => {
    const { setLocked, settings } = useStore();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        // Default password is empty or 'admin' or just press enter
        if (password === '' || password === 'admin' || password === '1234') {
            setLocked(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
            setPassword('');
        }
    };

    return (
        <div className="fixed inset-0 z-[10000] bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: `url(${settings.wallpaper})` }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            
            <div className="z-10 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="mb-12 text-center">
                    <h1 className="text-8xl font-display font-bold tracking-tighter mb-2">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </h1>
                    <p className="text-xl font-light opacity-80">
                        {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="bg-black/20 p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col items-center w-80">
                    <div className="w-24 h-24 rounded-full p-1 border-2 border-white/20 mb-4 overflow-hidden relative group">
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
                            className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                    </div>
                    <h2 className="text-xl font-bold mb-6">Ashraf Morningstar</h2>
                    
                    <form onSubmit={handleUnlock} className="w-full relative">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            autoFocus
                            className={`w-full bg-white/10 border ${error ? 'border-red-500 animate-shake' : 'border-white/10'} rounded-full py-2 px-4 text-center text-white placeholder-white/40 focus:outline-none focus:bg-white/20 transition-all`}
                        />
                        <button 
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            {password ? <ArrowRight size={16} /> : <Lock size={14} />}
                        </button>
                    </form>
                    
                    <p className="mt-4 text-[10px] text-gray-400">Hint: Press Enter</p>
                </div>
            </div>
        </div>
    );
};

export default LockScreen;
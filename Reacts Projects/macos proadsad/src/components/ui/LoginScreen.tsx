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

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="absolute inset-0 z-[10000] flex flex-col items-center justify-center text-white pb-20">
            {/* Background is handled by parent to ensure seamless transition, but we add a blur overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md -z-10" />

            <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl flex items-center justify-center text-4xl font-bold border-4 border-white/20">
                    AM
                </div>
                
                <div className="text-center">
                    <h2 className="text-2xl font-semibold shadow-black/50 drop-shadow-md">Ashraf Morningstar</h2>
                </div>

                <form onSubmit={handleSubmit} className="relative flex items-center group">
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-full py-1.5 px-4 pr-10 text-sm text-white placeholder-white/50 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all w-48 text-center shadow-lg"
                        autoFocus
                    />
                    <button 
                        type="submit"
                        className={`absolute right-1 p-1 rounded-full bg-white/20 hover:bg-white/40 transition-opacity duration-200 ${password ? 'opacity-100 cursor-pointer' : 'opacity-0 cursor-default'}`}
                    >
                        <ArrowRight size={14} />
                    </button>
                    
                    {/* Hint */}
                    <div className="absolute top-12 left-0 right-0 text-center text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        Press Enter to login
                    </div>
                </form>
            </div>

            <div className="absolute bottom-10 flex flex-col items-center gap-2 text-white/80">
                <p className="text-sm font-medium">Sleep</p>
                <p className="text-xs opacity-60">Click on avatar to switch user</p>
            </div>
        </div>
    );
};

export default LoginScreen;

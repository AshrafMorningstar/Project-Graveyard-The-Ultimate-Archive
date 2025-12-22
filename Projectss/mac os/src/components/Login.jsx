/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const Login = () => {
    const { login } = useStore();
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            login();
        }, 1000);
    };

    return (
        <div className="absolute inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/746/208/875/apple-mac-osx-os-x-mavericks-wallpaper-preview.jpg')" }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
            
            <div className="z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-4xl overflow-hidden border-4 border-white/20">
                     <span className="text-gray-600">👤</span>
                </div>
                <h2 className="text-xl font-semibold mb-6">User</h2>
                
                {isLoading ? (
                    <div className="h-8 flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-sm">Logging in...</span>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="flex flex-col items-center gap-4">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="bg-white/20 border border-white/10 rounded-lg px-4 py-1.5 backdrop-blur-md text-white placeholder-white/50 focus:outline-none focus:bg-white/30 transition-colors w-48 text-center"
                        />
                        <button className="text-sm opacity-50 hover:opacity-100 transition-opacity">
                            Click to Enter
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;

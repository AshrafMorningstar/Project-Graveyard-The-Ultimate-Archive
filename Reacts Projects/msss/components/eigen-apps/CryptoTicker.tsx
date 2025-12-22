/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React from 'react';
import { TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';

const COINS = [
    { symbol: "BTC", name: "Bitcoin", price: 98420.50, change: 2.4, down: false },
    { symbol: "ETH", name: "Ethereum", price: 5240.12, change: -1.2, down: true },
    { symbol: "SOL", name: "Solana", price: 340.80, change: 5.7, down: false },
    { symbol: "QNT", name: "Quant", price: 1250.00, change: 12.4, down: false },
    { symbol: "XRP", name: "Ripple", price: 1.20, change: -0.4, down: true },
];

export const CryptoTicker: React.FC = () => {
    return (
        <div className="h-full bg-[#0d1117] text-white flex flex-col">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                   <h2 className="font-bold">Market Watch</h2>
                   <p className="text-xs text-gray-400">Live prices (Simulated)</p>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                    <RefreshCcw className="w-4 h-4" />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                <div className="divide-y divide-white/5">
                    {COINS.map(coin => (
                        <div key={coin.symbol} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                             <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-white/50 group-hover:bg-quantum-glow group-hover:text-black transition-colors">
                                     {coin.symbol}
                                 </div>
                                 <div>
                                     <div className="font-bold text-sm text-gray-200">{coin.name}</div>
                                     <div className="text-xs text-gray-500">{coin.symbol}/USD</div>
                                 </div>
                             </div>
                             
                             <div className="text-right">
                                 <div className="font-mono font-medium">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                 <div className={`text-xs flex items-center justify-end gap-1 ${coin.down ? 'text-red-500' : 'text-green-500'}`}>
                                     {coin.down ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                     {Math.abs(coin.change)}%
                                 </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="p-4 bg-white/5 border-t border-white/10">
                <div className="w-full h-16 bg-black/20 rounded flex items-end justify-between px-2 pb-2 gap-1 relative overflow-hidden">
                     {/* Mock Chart */}
                     <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent" />
                     {Array.from({length: 20}).map((_, i) => (
                         <div 
                            key={i} 
                            style={{ height: `${Math.random() * 80 + 20}%` }} 
                            className="w-full bg-green-500/30 rounded-t-sm"
                         />
                     ))}
                </div>
            </div>
        </div>
    );
};

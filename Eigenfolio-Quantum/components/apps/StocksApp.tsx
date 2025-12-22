/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file StocksApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Stocks Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';

const StocksApp: React.FC = () => {
    const [selectedStock, setSelectedStock] = useState('AAPL');

    const stocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: '185.92', change: '+1.24%', up: true },
        { symbol: 'TSLA', name: 'Tesla, Inc.', price: '248.48', change: '-2.15%', up: false },
        { symbol: 'NVDA', name: 'NVIDIA Corp', price: '462.41', change: '+3.10%', up: true },
        { symbol: 'MSFT', name: 'Microsoft', price: '374.58', change: '+0.45%', up: true },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '138.22', change: '-0.12%', up: false },
    ];

    return (
        <div className="h-full flex bg-[#1e1e1e] text-white">
             {/* Sidebar List */}
             <div className="w-1/3 border-r border-white/10 flex flex-col">
                  <div className="p-4 border-b border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider">Watchlist</div>
                  <div className="flex-1 overflow-y-auto">
                      {stocks.map(stock => (
                          <div 
                            key={stock.symbol}
                            onClick={() => setSelectedStock(stock.symbol)}
                            className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedStock === stock.symbol ? 'bg-white/10' : ''}`}
                          >
                              <div className="flex justify-between items-start mb-1">
                                  <span className="font-bold">{stock.symbol}</span>
                                  <span>{stock.price}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                  <span className="text-gray-400 truncate max-w-[100px]">{stock.name}</span>
                                  <span className={`px-2 py-0.5 rounded ${stock.up ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                      {stock.change}
                                  </span>
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="p-3 text-center text-xs text-gray-500 border-t border-white/10">
                      Market Open
                  </div>
             </div>

             {/* Chart View (Simulated) */}
             <div className="flex-1 flex flex-col bg-[#121212]">
                 <div className="p-8 border-b border-white/5">
                     <h1 className="text-4xl font-light mb-1">{selectedStock}</h1>
                     <div className="text-gray-400 text-sm mb-4">
                         {stocks.find(s => s.symbol === selectedStock)?.name}
                     </div>
                     <div className="text-3xl font-mono">
                         {stocks.find(s => s.symbol === selectedStock)?.price}
                     </div>
                     <div className={`text-sm mt-1 px-2 py-1 inline-block rounded ${stocks.find(s => s.symbol === selectedStock)?.up ? 'text-green-500 bg-green-900/20' : 'text-red-500 bg-red-900/20'}`}>
                         {stocks.find(s => s.symbol === selectedStock)?.change} Today
                     </div>
                 </div>

                 {/* Simulated Graph */}
                 <div className="flex-1 p-8 relative flex items-end overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-20 pointer-events-none"></div>
                     <svg className="w-full h-full text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]" viewBox="0 0 100 50" preserveAspectRatio="none">
                         <path 
                            d="M0,50 L0,40 Q10,35 20,42 T40,30 T60,25 T80,10 L100,5 L100,50 Z" 
                            fill="url(#gradient)" 
                            opacity="0.2"
                         />
                         <path 
                            d="M0,40 Q10,35 20,42 T40,30 T60,25 T80,10 L100,5" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="0.5"
                         />
                         <defs>
                            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                            </linearGradient>
                         </defs>
                     </svg>
                 </div>
                 
                 <div className="flex justify-between px-8 py-4 text-xs text-gray-500 border-t border-white/5">
                     <span>1D</span>
                     <span>1W</span>
                     <span className="text-white font-bold bg-white/10 px-2 rounded">1M</span>
                     <span>3M</span>
                     <span>1Y</span>
                     <span>ALL</span>
                 </div>
             </div>
        </div>
    );
};

export default StocksApp;

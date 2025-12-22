/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

const Stocks = () => {
    const stocks = [
        { symbol: "AAPL", name: "Apple Inc.", price: "182.63", change: "+1.25%", up: true, chart: [40, 45, 42, 50, 48, 60] },
        { symbol: "TSLA", name: "Tesla, Inc.", price: "245.50", change: "-2.10%", up: false, chart: [60, 55, 58, 50, 45, 40] },
        { symbol: "GOOGL", name: "Alphabet Inc.", price: "140.20", change: "+0.50%", up: true, chart: [30, 32, 35, 34, 38, 40] },
        { symbol: "NVDA", name: "NVIDIA Corp", price: "485.10", change: "+3.40%", up: true, chart: [20, 30, 45, 60, 70, 80] },
        { symbol: "MSFT", name: "Microsoft", price: "375.25", change: "+0.85%", up: true, chart: [40, 42, 43, 45, 46, 48] },
        { symbol: "AMZN", name: "Amazon.com", price: "155.30", change: "-0.40%", up: false, chart: [50, 48, 49, 47, 46, 45] },
    ];

    return (
        <div className="flex h-full bg-[#1e1e1e] text-white">
            {/* Sidebar List */}
            <div className="w-80 border-r border-white/10 flex flex-col bg-[#1c1c1e]">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Stocks</h1>
                    <RefreshCw size={16} className="text-blue-500" />
                </div>
                <div className="flex-1 overflow-auto">
                    {stocks.map(stock => (
                        <div key={stock.symbol} className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer flex justify-between items-center">
                            <div>
                                <div className="font-bold">{stock.symbol}</div>
                                <div className="text-xs text-gray-400">{stock.name}</div>
                            </div>
                            <div className="text-right">
                                <div>{stock.price}</div>
                                <div className={`text-xs px-2 py-0.5 rounded ${stock.up ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{stock.change}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail View */}
            <div className="flex-1 p-8 flex flex-col">
                 <div className="mb-8">
                     <div className="text-4xl font-bold">AAPL</div>
                     <div className="text-gray-400">Apple Inc.</div>
                     <div className="text-5xl font-light mt-4">182.63</div>
                     <div className="text-green-500 flex items-center gap-1 font-medium mt-1">
                         <ArrowUpRight size={20} /> +1.25 (0.68%)
                     </div>
                 </div>
                 
                 {/* Fake Chart */}
                 <div className="flex-1 bg-gradient-to-b from-green-500/10 to-transparent rounded-xl border border-green-500/20 relative p-4 grid place-items-center">
                     <div className="absolute inset-x-0 bottom-0 h-px bg-white/10"></div>
                     <div className="text-green-500/50 text-xl font-mono">CHART DATA SIMULATION</div>
                     <svg viewBox="0 0 100 50" className="w-full h-full opacity-50" preserveAspectRatio="none">
                         <polyline 
                            fill="none" 
                            stroke="#22c55e" 
                            strokeWidth="2" 
                            points="0,40 20,35 40,38 60,20 80,25 100,10" 
                         />
                     </svg>
                 </div>
            </div>
        </div>
    );
};

export default Stocks;

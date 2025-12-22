/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Privacy Analytics - Main Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Upload, FileBarChart, Filter, Download, ShieldCheck } from 'lucide-react';
import Papa from 'papaparse';
import { format, subDays } from 'date-fns';

// --- MOCK DATA GENERATOR (For demo when no file is uploaded) ---
const generateMockData = () => {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    data.push({
      date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
      visits: Math.floor(Math.random() * 5000) + 1000,
      unique: Math.floor(Math.random() * 3000) + 500,
      bounceRate: Math.floor(Math.random() * 40) + 30
    });
  }
  return data;
};

// --- APP ---
function App() {
  const [data, setData] = useState(generateMockData());
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('demo_data.csv');

  // File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // In a real app, we would process raw logs here.
        // For this demo, we'll assume the format or just regenerate mock data 
        // to simulate "successful processing" of any CSV for visual feedback.
        setTimeout(() => {
          setData(generateMockData()); // Refresh with new random seed to show change
          setLoading(false);
        }, 800);
      }
    });
  };

  const metrics = useMemo(() => {
    const totalVisits = data.reduce((acc, curr) => acc + curr.visits, 0);
    const avgBounce = Math.round(data.reduce((acc, curr) => acc + curr.bounceRate, 0) / data.length);
    const totalUnique = data.reduce((acc, curr) => acc + curr.unique, 0);
    return { totalVisits, avgBounce, totalUnique };
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Sidebar (Simplified) */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-10 hidden md:block">
        <div className="p-6 flex items-center gap-2 mb-8">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <FileBarChart size={24} />
          </div>
          <h1 className="font-bold text-xl tracking-tight">PrivaStat</h1>
        </div>

        <nav className="px-4 space-y-1">
          <a href="#" className="block px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg">Dashboard</a>
          <a href="#" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition-colors">Real-time</a>
          <a href="#" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 font-medium rounded-lg transition-colors">Settings</a>
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-6">
           <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 font-bold text-sm mb-1">
                 <ShieldCheck size={16} /> Privacy Active
              </div>
              <p className="text-xs text-green-600">Data is processed locally. No logs leave your browser.</p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
             <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
             <p className="text-slate-500 text-sm">Last updated: Just now</p>
          </div>
          
          <div className="flex gap-3">
             <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                <Upload size={16} className="text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Import CSV</span>
                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
             </label>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium">
                <Download size={16} /> Export Report
             </button>
          </div>
        </header>

        {/* Global Loading Overlay */}
        {loading && (
           <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
           </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <MetricCard title="Total Visits" value={metrics.totalVisits.toLocaleString()} change="+12.5%" />
           <MetricCard title="Unique Visitors" value={metrics.totalUnique.toLocaleString()} change="+8.2%" />
           <MetricCard title="Bounce Rate" value={`${metrics.avgBounce}%`} change="-2.1%" isNegativeGood />
        </div>

        {/* Main Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-800">Traffic Trends</h3>
              <div className="flex gap-2">
                 <button className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">7D</button>
                 <button className="px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-md">30D</button>
                 <button className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">90D</button>
              </div>
           </div>
           
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} minTickGap={30} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                 <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Area type="monotone" dataKey="visits" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Secondary Charts Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-lg text-slate-800 mb-4">Device Breakdown</h3>
               <div className="h-[200px] w-full flex items-center justify-center text-slate-400">
                   {/* Placeholder for Pie Chart */}
                   <span className="italic">Chart Visualization Area</span>
               </div>
           </div>
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-lg text-slate-800 mb-4">Top Referrers</h3>
               <div className="space-y-4">
                  <ReferrerRow name="google.com" count="12,405" percent={45} />
                  <ReferrerRow name="twitter.com" count="8,200" percent={30} />
                  <ReferrerRow name="github.com" count="4,105" percent={15} />
                  <ReferrerRow name="Direct" count="2,750" percent={10} />
               </div>
           </div>
        </div>

      </main>
    </div>
  );
}

function MetricCard({ title, value, change, isNegativeGood }) {
  const isPositive = change.startsWith('+');
  // Logic inverse for things like bounce rate where negative is good
  const isGood = isNegativeGood ? !isPositive : isPositive;
  const colorClass = isGood ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
       <p className="text-slate-500 text-sm font-medium mb-2">{title}</p>
       <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${colorClass}`}>
             {change}
          </span>
       </div>
    </div>
  );
}

function ReferrerRow({ name, count, percent }) {
  return (
    <div>
       <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-slate-700">{name}</span>
          <span className="text-slate-500">{count}</span>
       </div>
       <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
       </div>
    </div>
  )
}

export default App;

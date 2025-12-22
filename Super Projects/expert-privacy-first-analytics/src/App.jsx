/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts'
import { Activity, Users, Eye, Clock, ArrowUpRight, Shield, Globe } from 'lucide-react'
import { generateData } from './data'

const data = generateData()

function StatCard({ title, value, change, icon: Icon }) {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-accent/10 rounded-lg">
           <Icon size={20} className="text-accent" />
        </div>
        <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded-full">
           <ArrowUpRight size={12} /> {change}%
        </span>
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}

function App() {
  const [timeRange, setTimeRange] = useState('30d')

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-10">
       <div className="max-w-7xl mx-auto space-y-8">
         
         {/* Header */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                 <Activity className="text-accent" /> OpenMetric
               </h1>
               <p className="text-slate-400 text-sm mt-1">Privacy-first analytics for your web projects.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-card p-1 rounded-lg border border-white/5">
               {['24h', '7d', '30d', '90d'].map(range => (
                 <button
                   key={range}
                   onClick={() => setTimeRange(range)}
                   className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${timeRange === range ? 'bg-accent text-bg shadow-sm' : 'text-slate-400 hover:text-white'}`}
                 >
                   {range}
                 </button>
               ))}
            </div>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Unique Visitors" value="12,543" change={12} icon={Users} />
            <StatCard title="Total Pageviews" value="45,210" change={8} icon={Eye} />
            <StatCard title="Avg. Visit Time" value="2m 14s" change={5} icon={Clock} />
            <StatCard title="Bounce Rate" value="42.3%" change={-2} icon={Globe} />
         </div>

         {/* Main Chart */}
         <div className="card h-[400px]">
           <h2 className="text-lg font-semibold text-white mb-6">Visitor Trends</h2>
           <ResponsiveContainer width="100%" height="85%">
             <AreaChart data={data.visitors}>
               <defs>
                 <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                   <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
               <XAxis 
                 dataKey="date" 
                 stroke="#94a3b8" 
                 fontSize={12} 
                 tickLine={false} 
                 axisLine={false}
               />
               <YAxis 
                 stroke="#94a3b8" 
                 fontSize={12} 
                 tickLine={false} 
                 axisLine={false}
                 tickFormatter={val => `${val/1000}k`}
               />
               <Tooltip 
                 contentStyle={{ backgroundColor: '#1E293B', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                 itemStyle={{ color: '#fff' }}
               />
               <Area 
                 type="monotone" 
                 dataKey="visitors" 
                 stroke="#10B981" 
                 strokeWidth={2}
                 fillOpacity={1} 
                 fill="url(#colorVisitors)" 
               />
             </AreaChart>
           </ResponsiveContainer>
         </div>

         {/* Bottom Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Top Pages */}
            <div className="card">
               <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
               <div className="space-y-4">
                 {data.topPages.map((page, i) => (
                   <div key={page.path} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 font-mono text-sm w-4">#{i+1}</span>
                        <div className="flex flex-col">
                           <span className="text-slate-200 text-sm font-medium">{page.path}</span>
                           <div className="w-full bg-slate-700 h-1 rounded-full mt-1.5 w-32">
                              <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${(page.views / 5000) * 100}%` }}></div>
                           </div>
                        </div>
                      </div>
                      <span className="text-slate-400 text-sm">{page.views.toLocaleString()}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* Referrers */}
            <div className="card">
               <h3 className="text-lg font-semibold text-white mb-4">Top Sources</h3>
               <ResponsiveContainer width="100%" height={250}>
                 <BarChart data={data.referrers} layout="vertical" margin={{ left: -20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="source" type="category" stroke="#94a3b8" width={100} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1E293B', borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20}>
                      {data.referrers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][index]} />
                      ))}
                    </Bar>
                 </BarChart>
               </ResponsiveContainer>
            </div>

            {/* Device Breakdown */}
            <div className="card">
               <h3 className="text-lg font-semibold text-white mb-4">Devices</h3>
               <div className="h-[200px] flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.devices}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.devices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B'][index]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderColor: 'rgba(255,255,255,0.1)' }} />
                    </PieChart>
                 </ResponsiveContainer>
               </div>
               <div className="flex justify-center gap-6 mt-4">
                  {data.devices.map((device, i) => (
                    <div key={device.name} className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'][i] }} />
                       <span className="text-slate-400 text-sm">{device.name}</span>
                    </div>
                  ))}
               </div>
            </div>

         </div>

         {/* Embed Script Snippet */}
         <div className="card bg-gradient-to-r from-slate-900 to-slate-800 border-l-4 border-l-accent">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-lg">
                     <Shield className="text-slate-300" size={24} />
                  </div>
                  <div>
                     <h3 className="text-white font-medium">Privacy Focused</h3>
                     <p className="text-slate-400 text-sm mt-1 max-w-xl">
                        OpenMetric does not use cookies and does not collect any personal data (PII). 
                        It is fully compliant with GDPR, CCPA, and PECR out of the box.
                     </p>
                  </div>
               </div>
               <button className="whitespace-nowrap bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Get Embed Code
               </button>
            </div>
         </div>

       </div>
    </div>
  )
}

export default App

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useEffect } from 'react'
import { Cloud, CloudRain, Sun, Wind, MapPin, Droplets, Thermometer, CloudLightning, CloudSnow, SunDim, CloudFog } from 'lucide-react'

// Mock Data
const MOCK_WEATHER = {
  temp: 24,
  condition: 'Partly Cloudy',
  humidity: 65,
  wind: 12,
  uv: 5, 
  feelsLike: 26,
  hourly: [
    { time: 'Now', temp: 24, icon: Sun },
    { time: '1PM', temp: 25, icon: Sun },
    { time: '2PM', temp: 26, icon: SunDim },
    { time: '3PM', temp: 25, icon: Cloud },
    { time: '4PM', temp: 24, icon: CloudRain },
    { time: '5PM', temp: 23, icon: CloudLightning },
  ],
  daily: [
    { day: 'Today', high: 26, low: 18, icon: Sun },
    { day: 'Tue', high: 25, low: 19, icon: Cloud },
    { day: 'Wed', high: 22, low: 17, icon: CloudRain },
    { day: 'Thu', high: 20, low: 16, icon: CloudLightning },
    { day: 'Fri', high: 23, low: 16, icon: SunDim },
    { day: 'Sat', high: 18, low: 12, icon: CloudSnow },
    { day: 'Sun', high: 21, low: 14, icon: Sun },
  ]
}

export default function Weather() {
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState('New York, NY')

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => setLoading(false), 1500)
  }, [])

  if (loading) {
    return (
      <div className="h-full bg-gradient-to-b from-[#1c6aa8] to-[#0b2c4a] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <Sun className="w-12 h-12 animate-spin-slow opacity-80" />
          <span className="text-sm font-medium animate-pulse">Loading Forecast...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-b from-[#3b9ad9] to-[#1d4f7a] text-white overflow-y-auto overflow-x-hidden no-scrollbar">
      <div className="p-8 flex flex-col items-center relative min-h-full">
        {/* Background decor */}
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[20%] right-[-50px] w-48 h-48 bg-yellow-300/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

        {/* Header */}
        <div className="flex flex-col items-center mb-12 z-10 w-full">
          <h2 className="text-3xl font-normal drop-shadow-md">{location}</h2>
          <span className="text-xl font-thin opacity-90 mb-4">{MOCK_WEATHER.condition}</span>
          
          <div className="relative">
            <h1 className="text-9xl font-thin tracking-tighter drop-shadow-lg">{MOCK_WEATHER.temp}°</h1>
          </div>
          
          <div className="flex gap-4 text-lg font-medium">
             <span className="drop-shadow-sm">H:{MOCK_WEATHER.daily[0].high}°</span>
             <span className="drop-shadow-sm">L:{MOCK_WEATHER.daily[0].low}°</span>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="w-full bg-black/20 backdrop-blur-md rounded-3xl p-4 mb-4 border border-white/10">
           <div className="text-xs uppercase font-medium border-b border-white/20 pb-2 mb-3 flex items-center gap-1 opacity-70">
             <ClockIcon size={12} /> Hourly Forecast
           </div>
           <div className="flex justify-between overflow-x-auto no-scrollbar gap-4">
              {MOCK_WEATHER.hourly.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2 min-w-[50px]">
                  <span className="text-sm font-medium">{h.time}</span>
                  <h.icon size={24} className="my-1" />
                  <span className="text-lg font-semibold">{h.temp}°</span>
                </div>
              ))}
           </div>
        </div>

        {/* 10-Day Forecast */}
        <div className="w-full bg-black/20 backdrop-blur-md rounded-3xl p-4 mb-4 border border-white/10">
           <div className="text-xs uppercase font-medium border-b border-white/20 pb-2 mb-3 flex items-center gap-1 opacity-70">
             <CalendarIcon size={12} /> 7-Day Forecast
           </div>
           <div className="flex flex-col gap-1">
              {MOCK_WEATHER.daily.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="w-12 font-medium text-lg">{d.day}</span>
                  <div className="flex-1 flex justify-center">
                    <d.icon size={24} />
                  </div>
                  <div className="flex gap-4 w-24 justify-end">
                    <span className="opacity-60 font-medium">{d.low}°</span>
                    <span className="w-24 h-1.5 bg-black/20 rounded-full my-auto mx-2 relative overflow-hidden hidden sm:block">
                        <div className="absolute inset-y-0 left-1 right-1 bg-gradient-to-r from-cyan-300 to-yellow-300 rounded-full" />
                    </span>
                    <span className="font-bold">{d.high}°</span>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
           <StatCard icon={Wind} label="Wind" value={`${MOCK_WEATHER.wind} km/h`} sub="Direction: NW" />
           <StatCard icon={Droplets} label="Humidity" value={`${MOCK_WEATHER.humidity}%`} sub="Dew Point: 18°" />
           <StatCard icon={Sun} label="UV Index" value={`${MOCK_WEATHER.uv}`} sub="Moderate" />
           <StatCard icon={Thermometer} label="Feels Like" value={`${MOCK_WEATHER.feelsLike}°`} sub="Humidity makes it hotter" />
        </div>
        
        <div className="text-center text-xs opacity-50 pb-4">
          Weather data provided by MockWeather API
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
  return (
    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col justify-between aspect-square">
       <div className="flex items-center gap-1 text-sm font-medium opacity-70 mb-2">
         <Icon size={14} /> {label.toUpperCase()}
       </div>
       <div>
         <div className="text-3xl font-medium">{value}</div>
         <div className="text-xs font-medium opacity-70 mt-1">{sub}</div>
       </div>
    </div>
  )
}

function ClockIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}

function CalendarIcon(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
}

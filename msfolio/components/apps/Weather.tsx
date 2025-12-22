/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file Weather.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, MapPin, Calendar } from 'lucide-react';

const Weather: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState<any>(null);

    useEffect(() => {
        // Simulate API fetch
        const timer = setTimeout(() => {
            setWeatherData({
                temp: 72,
                condition: 'Partly Cloudy',
                humidity: 45,
                wind: 12,
                uv: 4,
                forecast: [
                    { day: 'Mon', temp: 72, icon: 'sun' },
                    { day: 'Tue', temp: 68, icon: 'cloud' },
                    { day: 'Wed', temp: 65, icon: 'rain' },
                    { day: 'Thu', temp: 70, icon: 'sun' },
                    { day: 'Fri', temp: 74, icon: 'sun' },
                ]
            });
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const getIcon = (type: string, size = 24) => {
        switch(type) {
            case 'sun': return <Sun size={size} className="text-yellow-400 animate-spin-slow" />;
            case 'cloud': return <Cloud size={size} className="text-gray-200" />;
            case 'rain': return <CloudRain size={size} className="text-blue-400" />;
            default: return <Sun size={size} className="text-yellow-400" />;
        }
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm font-medium tracking-widest">CONNECTING SATELLITE...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col p-6 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-start mb-8 z-10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1 opacity-80">
                        <MapPin size={16} />
                        <span className="text-sm font-medium">San Francisco, CA</span>
                    </div>
                    <div className="text-6xl font-light tracking-tighter flex items-start">
                        {weatherData.temp}
                        <span className="text-3xl mt-2">°</span>
                    </div>
                    <span className="text-lg font-medium text-blue-100">{weatherData.condition}</span>
                </div>
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md shadow-lg border border-white/10">
                    {getIcon('sun', 48)}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-8 z-10">
                <div className="bg-black/10 rounded-xl p-3 flex flex-col items-center gap-1 backdrop-blur-sm">
                    <Wind size={20} className="opacity-70" />
                    <span className="text-sm font-bold">{weatherData.wind} mph</span>
                    <span className="text-[10px] opacity-60 uppercase">Wind</span>
                </div>
                <div className="bg-black/10 rounded-xl p-3 flex flex-col items-center gap-1 backdrop-blur-sm">
                    <Droplets size={20} className="opacity-70" />
                    <span className="text-sm font-bold">{weatherData.humidity}%</span>
                    <span className="text-[10px] opacity-60 uppercase">Humidity</span>
                </div>
                <div className="bg-black/10 rounded-xl p-3 flex flex-col items-center gap-1 backdrop-blur-sm">
                    <Sun size={20} className="opacity-70" />
                    <span className="text-sm font-bold">{weatherData.uv} High</span>
                    <span className="text-[10px] opacity-60 uppercase">UV Index</span>
                </div>
            </div>

            {/* Forecast */}
            <div className="flex-1 bg-black/20 rounded-3xl p-4 backdrop-blur-md border border-white/5 z-10 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider opacity-60">
                    <Calendar size={14} /> 5-Day Forecast
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    {weatherData.forecast.map((day: any, i: number) => (
                        <div key={i} className="flex items-center justify-between hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <span className="font-medium w-12">{day.day}</span>
                            <div className="flex-1 flex justify-center">
                                {getIcon(day.icon, 20)}
                            </div>
                            <span className="font-bold opacity-90">{day.temp}°</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Weather;
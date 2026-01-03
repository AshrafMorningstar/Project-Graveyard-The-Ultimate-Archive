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

'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin, Search } from 'lucide-react';

// Mock weather data
const WEATHER_DATA: Record<string, any> = {
  'san francisco': { temp: 72, condition: 'Partly Cloudy', humidity: 45, wind: 8, icon: Cloud },
  'new york': { temp: 65, condition: 'Rainy', humidity: 80, wind: 12, icon: CloudRain },
  'london': { temp: 58, condition: 'Cloudy', humidity: 75, wind: 15, icon: Cloud },
  'tokyo': { temp: 78, condition: 'Sunny', humidity: 60, wind: 5, icon: Sun },
};

export const WeatherWarp: React.FC = () => {
    const [city, setCity] = useState('San Francisco');
    const [search, setSearch] = useState('');
    const [data, setData] = useState(WEATHER_DATA['san francisco']);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API
        setTimeout(() => {
            const foundKey = Object.keys(WEATHER_DATA).find(k => k === search.toLowerCase());
            if (foundKey) {
                setCity(search);
                setData(WEATHER_DATA[foundKey]);
            } else {
                // Fallback random generation for unknown cities
                setCity(search);
                setData({
                    temp: Math.floor(Math.random() * 40) + 50,
                    condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
                    humidity: Math.floor(Math.random() * 50) + 30,
                    wind: Math.floor(Math.random() * 20) + 1,
                    icon: Sun // fallback
                });
            }
            setLoading(false);
            setSearch('');
        }, 800);
    };

    const Icon = data.icon || Sun;
    const isRain = data.condition === 'Rainy';
    const isSunny = data.condition === 'Sunny';

    return (
        <div className={`h-full text-white p-8 relative overflow-hidden transition-all duration-1000
            ${isRain ? 'bg-gradient-to-br from-slate-700 to-slate-900' : isSunny ? 'bg-gradient-to-br from-blue-400 to-yellow-300' : 'bg-gradient-to-br from-blue-500 to-purple-600'}
        `}>
            {/* Background effects */}
            {isRain && (
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]" />
            )}
            {isSunny && (
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-yellow-400/30 blur-[100px] rounded-full animate-pulse" />
            )}

            <div className="relative z-10 h-full flex flex-col">
                {/* Search */}
                <form onSubmit={handleSearch} className="relative mb-8">
                    <input 
                        className="w-full bg-white/20 backdrop-blur-md border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-white/60 focus:outline-none focus:bg-white/30 transition-colors"
                        placeholder="Search city..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                </form>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl font-bold mb-1 flex items-center gap-2">
                                    <MapPin className="w-6 h-6" /> {city}
                                </h1>
                                <p className="text-white/80 text-lg">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <Icon className="w-20 h-20 animate-bounce" />
                        </div>

                        <div className="mt-8">
                            <div className="text-9xl font-bold tracking-tighter mb-4">{data.temp}°</div>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-lg font-medium">
                                {data.condition}
                            </div>
                        </div>

                        <div className="mt-auto grid grid-cols-3 gap-4">
                             <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                <div className="flex items-center gap-2 text-white/60 text-xs mb-2 uppercase font-bold">
                                    <Wind className="w-3 h-3" /> Wind
                                </div>
                                <div className="text-xl font-semibold">{data.wind} mph</div>
                            </div>
                            <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                <div className="flex items-center gap-2 text-white/60 text-xs mb-2 uppercase font-bold">
                                    <Droplets className="w-3 h-3" /> Humidity
                                </div>
                                <div className="text-xl font-semibold">{data.humidity}%</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

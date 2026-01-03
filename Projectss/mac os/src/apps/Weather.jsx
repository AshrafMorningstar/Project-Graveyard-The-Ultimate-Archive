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

import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning, Wind, MapPin, Search } from 'lucide-react';

const Weather = () => {
    const [city, setCity] = useState("Cupertino");
    const [weather, setWeather] = useState({ temp: 72, condition: "Sunny", high: 78, low: 62 });
    
    // Animated background gradients based on weather
    const bg = weather.condition === "Sunny" ? "bg-gradient-to-b from-blue-400 to-blue-300" 
             : weather.condition === "Rainy" ? "bg-gradient-to-b from-gray-700 to-gray-500"
             : "bg-gradient-to-b from-indigo-900 to-purple-800";

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            // Mock data fetch
            setCity(e.target.value);
            setWeather({
                temp: Math.floor(Math.random() * 40) + 40,
                condition: Math.random() > 0.5 ? "Sunny" : "Rainy",
                high: 80, low: 50
            });
        }
    };

    return (
        <div className={`h-full ${bg} text-white flex flex-col relative overflow-hidden transition-colors duration-1000`}>
            {/* Search Overlay */}
            <div className="absolute top-4 right-4 z-10 w-48">
                 <input 
                    className="w-full bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-sm placeholder-white/70 focus:outline-none" 
                    placeholder="Search City"
                    onKeyDown={handleSearch}
                 />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center pt-10">
                <h1 className="text-3xl font-medium drop-shadow-md">{city}</h1>
                <div className="text-8xl font-thin mt-2 drop-shadow-lg">{weather.temp}°</div>
                <div className="text-xl font-medium opacity-90">{weather.condition}</div>
                <div className="text-sm mt-1 opacity-80">H:{weather.high}° L:{weather.low}°</div>
            </div>

            {/* Animations */}
            {weather.condition === "Sunny" && (
                <div className="absolute top-10 right-10 animate-spin-slow opacity-20 pointer-events-none">
                     <Sun size={120} />
                </div>
            )}
            {weather.condition === "Rainy" && (
                <div className="absolute inset-0 pointer-events-none flex justify-around">
                     <div className="w-0.5 h-20 bg-white/30 animate-rain delay-100 top-0 absolute"></div>
                     <div className="w-0.5 h-20 bg-white/30 animate-rain delay-300 top-0 absolute left-1/4"></div>
                     <div className="w-0.5 h-20 bg-white/30 animate-rain delay-500 top-0 absolute left-2/4"></div>
                     <div className="w-0.5 h-20 bg-white/30 animate-rain delay-700 top-0 absolute left-3/4"></div>
                </div>
            )}

            {/* Forecast */}
            <div className="h-40 bg-white/10 backdrop-blur-md rounded-t-3xl p-6">
                 <div className="text-xs font-semibold mb-4 opacity-70 border-b border-white/20 pb-2">HOURLY FORECAST</div>
                 <div className="flex justify-between">
                     {["Now", "1PM", "2PM", "3PM", "4PM", "5PM"].map((t, i) => (
                         <div key={i} className="flex flex-col items-center gap-2">
                             <span className="text-sm font-medium">{t}</span>
                             {weather.condition === "Sunny" ? <Sun size={20} className="text-yellow-300" /> : <CloudRain size={20} />}
                             <span className="text-lg font-bold">{weather.temp + i}°</span>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};

export default Weather;

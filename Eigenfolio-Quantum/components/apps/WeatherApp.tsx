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

﻿/**
 * @file WeatherApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin, RefreshCw, Search, CloudLightning, CloudSnow, CloudFog } from 'lucide-react';
import { WeatherData } from '../../types';

interface CityObject {
    lat: number;
    lon: number;
    name: string;
}

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentCity, setCurrentCity] = useState<CityObject>({ lat: 37.7749, lon: -122.4194, name: "San Francisco, CA" });

  const getWeatherCondition = (code: number): string => {
      if (code === 0) return 'Clear';
      if ([1,2,3].includes(code)) return 'Cloudy';
      if ([45,48].includes(code)) return 'Fog';
      if ([51,53,55,56,57].includes(code)) return 'Drizzle';
      if ([61,63,65,66,67].includes(code)) return 'Rain';
      if ([71,73,75,77].includes(code)) return 'Snow';
      if ([80,81,82].includes(code)) return 'Showers';
      if ([95,96,99].includes(code)) return 'Thunderstorm';
      return 'Unknown';
  };

  const fetchWeather = useCallback(async (cityObj: CityObject = currentCity) => {
    setLoading(true);
    setError('');
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${cityObj.lat}&longitude=${cityObj.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit`
        );
        if (!response.ok) throw new Error("API Error");
        
        const data = await response.json();
        
        if (data.current) {
            const condition = getWeatherCondition(data.current.weather_code);
            setWeather({
                temp: data.current.temperature_2m,
                humidity: data.current.relative_humidity_2m,
                windSpeed: data.current.wind_speed_10m,
                condition: condition,
                city: cityObj.name
            });
            setCurrentCity(cityObj);
        }
    } catch (e) {
        setError('Failed to establish atmospheric link.');
    } finally {
        setLoading(false);
    }
  }, [currentCity]);

  const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!citySearch.trim()) return;
      
      setIsSearching(true);
      try {
          const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(citySearch)}&count=1&language=en&format=json`);
          const data = await res.json();
          if(data.results && data.results.length > 0) {
              const place = data.results[0];
              await fetchWeather({ lat: place.latitude, lon: place.longitude, name: `${place.name}, ${place.country_code}` });
              setIsSearching(false);
              setCitySearch('');
          } else {
              setError("Location coordinates not found in planetary database.");
              setIsSearching(false);
          }
      } catch(e) {
          setError("Geocoding uplink failed.");
          setIsSearching(false);
      }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getIcon = (condition: string) => {
      switch(condition) {
          case 'Rain': 
          case 'Drizzle':
          case 'Showers':
                return <CloudRain className="w-24 h-24 text-blue-400 animate-bounce" />;
          case 'Cloudy': return <Cloud className="w-24 h-24 text-gray-400 animate-pulse" />;
          case 'Fog': return <CloudFog className="w-24 h-24 text-gray-300" />;
          case 'Snow': return <CloudSnow className="w-24 h-24 text-white animate-pulse" />;
          case 'Thunderstorm': return <CloudLightning className="w-24 h-24 text-yellow-500 animate-pulse" />;
          default: return <Sun className="w-24 h-24 text-yellow-400 animate-spin-slow" />;
      }
  };

  const getGradient = (condition: string) => {
      switch(condition) {
          case 'Rain': 
          case 'Drizzle':
          case 'Showers':
          case 'Thunderstorm':
                return 'from-gray-800 to-blue-900';
          case 'Cloudy': 
          case 'Fog':
                return 'from-gray-700 to-gray-900';
          case 'Snow': return 'from-slate-800 to-slate-600';
          default: return 'from-blue-400 to-orange-400';
      }
  }

  return (
    <div className={`h-full flex flex-col text-white p-6 bg-gradient-to-br ${weather ? getGradient(weather.condition) : 'from-gray-800 to-black'}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2 text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-md">
            <MapPin size={14} /> {weather?.city || 'Locating...'}
        </div>
        <div className="flex gap-2">
            <button onClick={() => setIsSearching(!isSearching)} className="p-2 hover:bg-white/20 rounded-full transition"><Search size={16}/></button>
            <button onClick={() => fetchWeather()} className="p-2 hover:bg-white/20 rounded-full transition"><RefreshCw size={16} className={loading ? 'animate-spin' : ''} /></button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearching && (
          <form onSubmit={handleSearch} className="mb-4 animate-in slide-in-from-top-2">
              <input 
                type="text" 
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Enter city name..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm outline-none focus:bg-white/20 transition placeholder-white/50"
                autoFocus
              />
          </form>
      )}

      {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              <p className="mt-4 text-xs tracking-widest font-mono">SCANNING ATMOSPHERE...</p>
          </div>
      ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
              <p className="text-red-300 font-bold mb-2">Signal Lost</p>
              <p className="text-xs opacity-70 max-w-[200px]">{error}</p>
              <button onClick={() => fetchWeather()} className="mt-4 px-4 py-2 bg-white/10 rounded-lg text-xs hover:bg-white/20">Retry</button>
          </div>
      ) : weather ? (
          <>
            <div className="flex-1 flex flex-col items-center justify-center">
                {getIcon(weather.condition)}
                <h1 className="text-7xl font-bold mt-4 font-space-grotesk">{Math.round(weather.temp)}°</h1>
                <p className="text-xl font-medium tracking-wide opacity-90">{weather.condition}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <Droplets className="text-blue-300" />
                    <div>
                        <p className="text-xs opacity-70">Humidity</p>
                        <p className="font-bold">{weather.humidity}%</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Wind className="text-gray-300" />
                    <div>
                        <p className="text-xs opacity-70">Wind</p>
                        <p className="font-bold">{weather.windSpeed} mph</p>
                    </div>
                </div>
            </div>
          </>
      ) : null}
    </div>
  );
};

export default WeatherApp;

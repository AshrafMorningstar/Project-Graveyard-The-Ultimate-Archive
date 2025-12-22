/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin, RefreshCw, Search } from 'lucide-react';
import { WeatherData } from '../../types';

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Default to SF, but ideally use geolocation
  const fetchWeather = async (lat = 37.7749, lng = -122.4194, cityName = "San Francisco, CA") => {
    setLoading(true);
    setError('');
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit`);
        const data = await res.json();
        
        if (data.current) {
            let condition = 'Clear';
            const code = data.current.weather_code;
            if (code > 0 && code < 3) condition = 'Cloudy';
            if (code >= 3 && code < 50) condition = 'Overcast';
            if (code >= 50 && code < 80) condition = 'Rain';
            if (code >= 80) condition = 'Storm';

            setWeather({
                temp: data.current.temperature_2m,
                humidity: data.current.relative_humidity_2m,
                windSpeed: data.current.wind_speed_10m,
                condition: condition,
                city: cityName
            });
        }
    } catch (e) {
        setError('Failed to establish atmospheric link.');
    } finally {
        setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!citySearch.trim()) return;
      
      setIsSearching(true);
      try {
          const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(citySearch)}&count=1&language=en&format=json`);
          const data = await res.json();
          if(data.results && data.results.length > 0) {
              const place = data.results[0];
              await fetchWeather(place.latitude, place.longitude, `${place.name}, ${place.country_code}`);
              setIsSearching(false); // Only close search if successful
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
          case 'Rain': return <CloudRain className="w-24 h-24 text-blue-400 animate-bounce" />;
          case 'Cloudy': return <Cloud className="w-24 h-24 text-gray-400 animate-pulse" />;
          case 'Overcast': return <Cloud className="w-24 h-24 text-gray-500" />;
          default: return <Sun className="w-24 h-24 text-yellow-400 animate-spin-slow" />;
      }
  };

  const getGradient = (condition: string) => {
      switch(condition) {
          case 'Rain': return 'from-gray-800 to-blue-900';
          case 'Cloudy': return 'from-gray-700 to-gray-900';
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
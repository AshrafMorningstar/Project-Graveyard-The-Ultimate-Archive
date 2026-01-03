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

/*
Created & Maintained by Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
*/

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherData = document.getElementById('weather-data');
    const errorMsg = document.getElementById('error-msg');
    const loader = document.getElementById('loader');
    const bg = document.querySelector('.video-bg');

    // Display Elements
    const cityNameEl = document.getElementById('city-name');
    const dateEl = document.getElementById('date');
    const tempEl = document.getElementById('temperature');
    const descEl = document.getElementById('description');
    const windEl = document.getElementById('wind-speed');
    const humidityEl = document.getElementById('humidity');
    const pressureEl = document.getElementById('pressure');
    const iconEl = document.getElementById('weather-icon');

    // Date
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);

    searchBtn.addEventListener('click', () => {
        const city = input.value.trim();
        if (city) fetchWeather(city);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = input.value.trim();
            if (city) fetchWeather(city);
        }
    });

    async function fetchWeather(city) {
        showLoader();
        try {
            // 1. Geocoding
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
            const geoData = await geoRes.json();

            if (!geoData.results) {
                throw new Error("City not found");
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // 2. Weather Data
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,surface_pressure&timezone=auto`);
            const data = await weatherRes.json();

            updateUI(data, name, country);
        } catch (error) {
            showError();
        }
    }

    function updateUI(data, city, country) {
        const current = data.current_weather;
        
        // Hide loader/error
        loader.classList.add('hidden');
        errorMsg.classList.add('hidden');
        weatherData.classList.remove('hidden');

        // Update Text
        cityNameEl.textContent = `${city}, ${country}`;
        tempEl.textContent = `${Math.round(current.temperature)}°`;
        windEl.textContent = `${current.windspeed} km/h`;
        
        // Mocking humidity/pressure since they are in hourly array, simplified for MVP
        // In a real Open-Meteo deep integration we would match timestamp. 
        // For simplicity/robustness we pick a likely index or random realistic for demo if valid index missing.
        // Actually, we can just grab index 0 of hourly for "now-ish"
        humidityEl.textContent = "N/A"; 
        pressureEl.textContent = "N/A";

        // Logic to interpret WMO codes
        const code = current.weathercode;
        const condition = getCondition(code);
        descEl.textContent = condition.desc;
        
        // Update Icon (Using Cloudflare's free wmo icons or similar, or local assets. 
        // For now, using a reliable public CDN for weather icons based on code)
        // Fallback to simple logic:
        let iconUrl = `https://openweathermap.org/img/wn/02d@2x.png`; // default
        if(code === 0) iconUrl = `https://openweathermap.org/img/wn/01d@2x.png`; // Clear
        else if(code <= 3) iconUrl = `https://openweathermap.org/img/wn/03d@2x.png`; // Cloudy
        else if(code <= 67) iconUrl = `https://openweathermap.org/img/wn/10d@2x.png`; // Rain
        else if(code <= 77) iconUrl = `https://openweathermap.org/img/wn/13d@2x.png`; // Snow
        else iconUrl = `https://openweathermap.org/img/wn/11d@2x.png`; // Thunder
        
        iconEl.src = iconUrl;

        // Update Background
        bg.className = 'video-bg'; // reset
        if(code <= 1) bg.classList.add('sunny');
        else if(code <= 48) bg.classList.add('cloudy');
        else bg.classList.add('rainy');
    }

    function getCondition(code) {
        // WMO Code interpretation
        if (code === 0) return { desc: 'Clear Sky' };
        if (code === 1) return { desc: 'Mainly Clear' };
        if (code === 2) return { desc: 'Partly Cloudy' };
        if (code === 3) return { desc: 'Overcast' };
        if (code <= 48) return { desc: 'Foggy' };
        if (code <= 55) return { desc: 'Drizzle' };
        if (code <= 67) return { desc: 'Rain' };
        if (code <= 77) return { desc: 'Snow' };
        return { desc: 'Thunderstorm' };
    }

    function showLoader() {
        weatherData.classList.add('hidden');
        errorMsg.classList.add('hidden');
        loader.classList.remove('hidden');
    }

    function showError() {
        loader.classList.add('hidden');
        weatherData.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }
    
    // Default load
    fetchWeather("London");
});

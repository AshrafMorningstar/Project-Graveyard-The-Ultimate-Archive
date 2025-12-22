/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * HoloWeather - Holographic Weather Application
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const API_KEY = '8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c'; // Replace with your OpenWeatherMap API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const loading = document.getElementById('loading');
const weatherData = document.getElementById('weather-data');

// Elements
const cityName = document.getElementById('city-name');
const country = document.getElementById('country');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');
const feelsLike = document.getElementById('feels-like');

// Event Listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});

// Load default city on page load
window.addEventListener('load', () => {
    getWeatherByCoords();
});

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
        hideLoading();
    }
}

async function getWeatherByCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                    const response = await fetch(
                        `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                    );
                    const data = await response.json();
                    displayWeather(data);
                } catch (error) {
                    // Fallback to default city
                    cityInput.value = 'London';
                    getWeather();
                }
            },
            () => {
                // Geolocation denied, use default
                cityInput.value = 'London';
                getWeather();
            }
        );
    } else {
        cityInput.value = 'London';
        getWeather();
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    country.textContent = data.sys.country;
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°`;

    // Set weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.textContent = getWeatherEmoji(iconCode);

    hideLoading();
}

function getWeatherEmoji(iconCode) {
    const iconMap = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌡️';
}

function showLoading() {
    loading.classList.remove('hidden');
    weatherData.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
    weatherData.classList.remove('hidden');
}

// Note: To use this app with real data, get a free API key from:
// https://openweathermap.org/api
// Replace the API_KEY constant above with your key
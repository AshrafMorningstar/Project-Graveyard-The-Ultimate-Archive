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

// Created by Ashraf Morningstar - https://github.com/AshrafMorningstar

const API_KEY = '3265874a2c77ae4a04bb96236a642d2f'; // OpenWeatherMap API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// Elements
const cityName = document.getElementById('city-name');
const dateTime = document.getElementById('date-time');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weather-icon');
const description = document.getElementById('description');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feels-like');
const visibility = document.getElementById('visibility');

// Event listeners
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});

// Fetch weather data
async function getWeather(city) {
  showLoading();
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    showError();
  }
}

// Display weather data
function displayWeather(data) {
  hideLoading();
  hideError();
  
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  dateTime.textContent = getCurrentDateTime();
  temperature.textContent = Math.round(data.main.temp);
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  description.textContent = data.weather[0].description;
  windSpeed.textContent = `${data.wind.speed} m/s`;
  humidity.textContent = `${data.main.humidity}%`;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
  
  weatherInfo.style.display = 'block';
  
  // Add entrance animation
  weatherInfo.style.opacity = '0';
  weatherInfo.style.transform = 'translateY(20px)';
  setTimeout(() => {
    weatherInfo.style.transition = 'all 0.5s ease';
    weatherInfo.style.opacity = '1';
    weatherInfo.style.transform = 'translateY(0)';
  }, 100);
}

// Get current date and time
function getCurrentDateTime() {
  const now = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return now.toLocaleDateString('en-US', options);
}

// Show loading
function showLoading() {
  weatherInfo.style.display = 'none';
  error.style.display = 'none';
  loading.style.display = 'block';
}

// Hide loading
function hideLoading() {
  loading.style.display = 'none';
}

// Show error
function showError() {
  hideLoading();
  weatherInfo.style.display = 'none';
  error.style.display = 'block';
  
  setTimeout(() => {
    error.style.display = 'none';
  }, 3000);
}

// Hide error
function hideError() {
  error.style.display = 'none';
}

// Load default city on page load
window.addEventListener('load', () => {
  getWeather('Tokyo');
});

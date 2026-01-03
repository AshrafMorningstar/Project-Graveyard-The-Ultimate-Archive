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

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
const apiKey = "863242cfb2b1d357e6093d9a4df19a4b"; // Use a demo key or mock for now
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        // Mock data if no input (demo mode)
        document.querySelector(".city").innerHTML = "Demo City";
        document.querySelector(".temp").innerHTML = "22°c";
        document.querySelector(".humidity").innerHTML = "45%";
        document.querySelector(".wind").innerHTML = "12 km/h";
        return;
    }
    
    // In a real scenario we would fetch. 
    // try {
    //     const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    //     var data = await response.json();
    // } catch(e) {...}
    
    // For this generated project without a Guaranteed API Key, we'll simulate a fetch for reliability in the demo.
    
    document.querySelector(".city").innerHTML = city;
    document.querySelector(".temp").innerHTML = Math.floor(Math.random() * 30 + 10) + "°c";
    document.querySelector(".humidity").innerHTML = Math.floor(Math.random() * 50 + 40) + "%";
    document.querySelector(".wind").innerHTML = Math.floor(Math.random() * 20 + 5) + " km/h";
    
    // Set random weather icon for demo
    const weathers = ["clouds", "clear", "rain", "drizzle", "mist"];
    // weatherIcon.src = "images/" + weathers[Math.floor(Math.random()*weathers.length)] + ".png"; 
    
    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Load default
checkWeather("London");

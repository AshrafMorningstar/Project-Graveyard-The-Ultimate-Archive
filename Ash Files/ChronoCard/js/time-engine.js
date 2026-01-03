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

/**
 * ChronoCard Time Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class TimeEngine {
  constructor() {
    this.timeDisplay = document.getElementById("timeDisplay");
    this.dateDisplay = document.getElementById("dateDisplay");
    this.greeting = document.getElementById("greeting");
    this.body = document.body;
    this.card = document.querySelector(".chrono-card");

    // Weekday accent colors
    this.weekdayColors = {
      0: "#e74c3c", // Sunday - Red
      1: "#3498db", // Monday - Blue
      2: "#2ecc71", // Tuesday - Green
      3: "#f39c12", // Wednesday - Orange
      4: "#9b59b6", // Thursday - Purple
      5: "#1abc9c", // Friday - Turquoise
      6: "#e67e22", // Saturday - Carrot
    };

    this.init();
  }

  init() {
    this.updateTime();
    // Update every second
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    const now = new Date();

    // Update time display
    this.updateTimeDisplay(now);

    // Update date display
    this.updateDateDisplay(now);

    // Update theme based on time of day
    this.updateTheme(now);

    // Update greeting
    this.updateGreeting(now);

    // Update accent color based on weekday
    this.updateAccentColor(now);

    // Apply subtle motion based on seconds
    this.applySubtleMotion(now);
  }

  updateTimeDisplay(date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    this.timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateDateDisplay(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNum = date.getDate();

    this.dateDisplay.textContent = `${dayName}, ${monthName} ${dayNum}`;
  }

  updateTheme(date) {
    const hour = date.getHours();

    // Remove all theme classes
    this.body.classList.remove(
      "theme-morning",
      "theme-afternoon",
      "theme-evening",
      "theme-night"
    );

    // Apply theme based on time
    if (hour >= 5 && hour < 12) {
      this.body.classList.add("theme-morning");
    } else if (hour >= 12 && hour < 17) {
      this.body.classList.add("theme-afternoon");
    } else if (hour >= 17 && hour < 21) {
      this.body.classList.add("theme-evening");
    } else {
      this.body.classList.add("theme-night");
    }

    // Update font weight based on AM/PM
    const fontWeight = hour < 12 ? "400" : "600";
    document.documentElement.style.setProperty(
      "--font-weight-base",
      fontWeight
    );
  }

  updateGreeting(date) {
    const hour = date.getHours();
    let greetingText = "";

    if (hour >= 5 && hour < 12) {
      greetingText = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      greetingText = "Good Evening";
    } else {
      greetingText = "Good Night";
    }

    if (this.greeting.textContent !== greetingText) {
      this.greeting.style.opacity = "0";
      setTimeout(() => {
        this.greeting.textContent = greetingText;
        this.greeting.style.opacity = "1";
      }, 300);
    }
  }

  updateAccentColor(date) {
    const dayOfWeek = date.getDay();
    const accentColor = this.weekdayColors[dayOfWeek];

    document.documentElement.style.setProperty("--accent-color", accentColor);
  }

  applySubtleMotion(date) {
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    // Calculate subtle scale (0.98 to 1.02)
    const totalMs = seconds * 1000 + milliseconds;
    const cycle = (Math.sin((totalMs / 10000) * Math.PI * 2) + 1) / 2; // 0 to 1
    const scale = 0.98 + cycle * 0.04;

    // Calculate subtle opacity (0.95 to 1)
    const opacity = 0.95 + cycle * 0.05;

    document.documentElement.style.setProperty("--card-scale", scale);
    document.documentElement.style.setProperty("--card-opacity", opacity);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new TimeEngine());
} else {
  new TimeEngine();
}

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
 * Cyber GitHub Stats - JavaScript
 * Created by: AshrafMorningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const GITHUB_USERNAME = "AshrafMorningstar";
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

// Fetch GitHub stats
async function fetchGitHubStats() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayStats(data);
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    displayError();
  }
}

// Display stats in the UI
function displayStats(data) {
  document.getElementById("username").textContent = data.name || data.login;
  document.getElementById("repos").textContent = data.public_repos;
  document.getElementById("followers").textContent = data.followers;
  document.getElementById("following").textContent = data.following;

  updateTimestamp();
}

// Display error message
function displayError() {
  const statValues = document.querySelectorAll(".stat-value");
  statValues.forEach((el) => {
    if (el.id !== "username") {
      el.textContent = "Error";
    } else {
      el.textContent = GITHUB_USERNAME;
    }
  });
}

// Update timestamp
function updateTimestamp() {
  const now = new Date();
  const timestamp = now.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById(
    "timestamp"
  ).textContent = `Last updated: ${timestamp}`;
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchGitHubStats();

  // Refresh stats every 5 minutes
  setInterval(fetchGitHubStats, 5 * 60 * 1000);
});

// Add particle effect background
function createParticles() {
  const particleCount = 50;
  const container = document.body;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--neon-cyan);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
        `;
    container.appendChild(particle);
  }
}

// Add floating animation
const style = document.createElement("style");
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        50% {
            transform: translateY(-20px) translateX(10px);
        }
    }
`;
document.head.appendChild(style);

createParticles();

console.log(
  "%c Created by AshrafMorningstar ",
  "background: #00ffcc; color: #0a0a0f; font-size: 20px; padding: 10px;"
);
console.log(
  "%c https://github.com/AshrafMorningstar ",
  "background: #ff00ff; color: #fff; font-size: 16px; padding: 5px;"
);

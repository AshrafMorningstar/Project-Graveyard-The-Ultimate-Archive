/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// ========================================
// QUANTUM PORTFOLIO DASHBOARD - ULTRA ADVANCED JAVASCRIPT
// ========================================

// Configuration
const CONFIG = {
  username: "AshrafMorningstar",
  particleCount: 100,
  animationSpeed: 1,
  themeTransitionDuration: 800,
};

// State Management
const state = {
  currentTheme: "cyber",
  githubData: null,
  isLoading: true,
};

// ========================================
// PARTICLE SYSTEM
// ========================================
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.resize();
    this.init();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    for (let i = 0; i < CONFIG.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Get current theme color
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--particle-color")
      .trim();

    this.particles.forEach((particle, i) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle =
        color +
        Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0");
      this.ctx.fill();

      // Draw connections
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          const opacity = (1 - distance / 150) * 0.2;
          this.ctx.strokeStyle =
            color +
            Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0");
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// GITHUB API INTEGRATION
// ========================================
class GitHubAPI {
  constructor(username) {
    this.username = username;
    this.baseURL = "https://api.github.com";
  }

  async fetchUserData() {
    try {
      const response = await fetch(`${this.baseURL}/users/${this.username}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return this.getMockData();
    }
  }

  async fetchRepositories() {
    try {
      const response = await fetch(
        `${this.baseURL}/users/${this.username}/repos?per_page=100&sort=stars`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching repositories:", error);
      return [];
    }
  }

  async fetchAllData() {
    const [userData, repos] = await Promise.all([
      this.fetchUserData(),
      this.fetchRepositories(),
    ]);

    // Calculate total stars
    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    // Get language distribution
    const languages = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    return {
      user: userData,
      repos: repos.slice(0, 6), // Top 6 repos
      totalStars,
      languages,
      totalCommits: Math.floor(Math.random() * 5000) + 1000, // Mock data
      streak: Math.floor(Math.random() * 365) + 1,
      pullRequests: Math.floor(Math.random() * 200) + 50,
      issuesClosed: Math.floor(Math.random() * 150) + 30,
    };
  }

  getMockData() {
    return {
      user: {
        login: this.username,
        name: "Developer",
        avatar_url: `https://github.com/${this.username}.png`,
        bio: "Full-Stack Developer",
        followers: 100,
        public_repos: 50,
      },
      repos: [],
      totalStars: 0,
      languages: { JavaScript: 10, Python: 5, CSS: 3 },
      totalCommits: 1500,
      streak: 45,
      pullRequests: 75,
      issuesClosed: 50,
    };
  }
}

// ========================================
// UI RENDERING
// ========================================
class UIRenderer {
  static updateProfile(data) {
    const { user } = data;
    document.getElementById("profileAvatar").src =
      user.avatar_url || `https://github.com/${CONFIG.username}.png`;
    document.getElementById("profileName").textContent =
      user.name || user.login;
    document.getElementById("profileBio").textContent =
      user.bio || "GitHub Developer";

    this.animateNumber("followers", user.followers || 0);
    this.animateNumber("repos", user.public_repos || 0);
    this.animateNumber("stars", data.totalStars || 0);
  }

  static updateMetrics(data) {
    this.animateNumber("streak", data.streak);
    this.animateNumber("commits", data.totalCommits);
    this.animateNumber("prs", data.pullRequests);
    this.animateNumber("issues", data.issuesClosed);
  }

  static animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);

      element.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  static renderActivityHeatmap() {
    const container = document.getElementById("activityHeatmap");
    container.innerHTML = "";

    // Generate 365 days of activity
    for (let i = 0; i < 365; i++) {
      const cell = document.createElement("div");
      cell.className = "heatmap-cell";
      const intensity = Math.random();
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      cell.style.background = `${color}${Math.floor(intensity * 255)
        .toString(16)
        .padStart(2, "0")}`;
      cell.title = `Day ${i + 1}: ${Math.floor(intensity * 20)} contributions`;
      container.appendChild(cell);
    }
  }

  static renderLanguageChart(languages) {
    const canvas = document.getElementById("languageChart");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const entries = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const total = entries.reduce((sum, [, count]) => sum + count, 0);

    const colors = ["#00f3ff", "#ff00ff", "#ffff00", "#00ff88", "#ff006e"];
    let currentAngle = -Math.PI / 2;
    const centerX = canvas.width / 4;
    const centerY = canvas.height / 4;
    const radius = Math.min(centerX, centerY) - 20;

    entries.forEach(([lang, count], index) => {
      const sliceAngle = (count / total) * Math.PI * 2;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + sliceAngle
      );
      ctx.closePath();
      ctx.fillStyle = colors[index];
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      currentAngle += sliceAngle;
    });

    // Render language list
    const list = document.getElementById("languageList");
    list.innerHTML = entries
      .map(
        ([lang, count], index) => `
            <div class="language-item">
                <div class="language-color" style="background: ${
                  colors[index]
                }"></div>
                <div class="language-name">${lang}</div>
                <div class="language-percentage">${Math.round(
                  (count / total) * 100
                )}%</div>
            </div>
        `
      )
      .join("");
  }

  static renderContributionGraph() {
    const canvas = document.getElementById("contributionGraph");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const width = canvas.width / 2;
    const height = canvas.height / 2;
    const data = Array.from({ length: 52 }, () =>
      Math.floor(Math.random() * 100)
    );
    const max = Math.max(...data);
    const barWidth = width / data.length;
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();

    data.forEach((value, index) => {
      const barHeight = (value / max) * (height - 40);
      const x = index * barWidth;
      const y = height - barHeight - 20;

      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + "40");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 2, barHeight);
    });
  }

  static renderTopRepos(repos) {
    const container = document.getElementById("topRepos");
    container.innerHTML = repos
      .map(
        (repo) => `
            <div class="repo-item" onclick="window.open('${
              repo.html_url
            }', '_blank')">
                <div class="repo-name">${repo.name}</div>
                <div class="repo-description">${
                  repo.description || "No description available"
                }</div>
                <div class="repo-stats">
                    <div class="repo-stat">⭐ ${repo.stargazers_count}</div>
                    <div class="repo-stat">🍴 ${repo.forks_count}</div>
                    <div class="repo-stat">${repo.language || "Unknown"}</div>
                </div>
            </div>
        `
      )
      .join("");
  }

  static renderSkillsRadar() {
    const canvas = document.getElementById("skillsRadar");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const skills = [
      { name: "Frontend", value: 90 },
      { name: "Backend", value: 85 },
      { name: "DevOps", value: 75 },
      { name: "Database", value: 80 },
      { name: "Mobile", value: 70 },
      { name: "AI/ML", value: 65 },
    ];

    const centerX = canvas.width / 4;
    const centerY = canvas.height / 4;
    const maxRadius = Math.min(centerX, centerY) - 40;
    const angleStep = (Math.PI * 2) / skills.length;
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();

    // Draw grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      const radius = (maxRadius / 5) * i;
      for (let j = 0; j <= skills.length; j++) {
        const angle = angleStep * j - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw axes
    skills.forEach((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * maxRadius,
        centerY + Math.sin(angle) * maxRadius
      );
      ctx.stroke();
    });

    // Draw data
    ctx.beginPath();
    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const radius = (skill.value / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = color + "40";
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw labels
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px Space Grotesk";
    ctx.textAlign = "center";
    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (maxRadius + 20);
      const y = centerY + Math.sin(angle) * (maxRadius + 20);
      ctx.fillText(skill.name, x, y);
    });
  }

  static renderAchievements() {
    const achievements = [
      { icon: "🏆", name: "Top Contributor" },
      { icon: "🌟", name: "Star Collector" },
      { icon: "🔥", name: "Streak Master" },
      { icon: "💎", name: "Code Quality" },
      { icon: "🚀", name: "Early Adopter" },
      { icon: "🎯", name: "Goal Crusher" },
      { icon: "⚡", name: "Speed Demon" },
      { icon: "🧠", name: "Problem Solver" },
    ];

    const container = document.getElementById("achievements");
    container.innerHTML = achievements
      .map(
        (achievement) => `
            <div class="achievement-badge">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
            </div>
        `
      )
      .join("");
  }
}

// ========================================
// THEME MANAGEMENT
// ========================================
class ThemeManager {
  static init() {
    const buttons = document.querySelectorAll(".theme-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        this.setTheme(theme);

        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  static setTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    state.currentTheme = theme;

    // Re-render charts with new colors
    setTimeout(() => {
      UIRenderer.renderLanguageChart(state.githubData.languages);
      UIRenderer.renderContributionGraph();
      UIRenderer.renderSkillsRadar();
    }, CONFIG.themeTransitionDuration / 2);
  }
}

// ========================================
// 3D TILT EFFECT
// ========================================
class TiltEffect {
  static init() {
    const cards = document.querySelectorAll("[data-tilt]");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => this.handleMouseMove(e, card));
      card.addEventListener("mouseleave", () => this.handleMouseLeave(card));
    });
  }

  static handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  static handleMouseLeave(card) {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  }
}

// ========================================
// INITIALIZATION
// ========================================
async function init() {
  // Initialize particle system
  const canvas = document.getElementById("particleCanvas");
  const particleSystem = new ParticleSystem(canvas);
  particleSystem.animate();

  // Initialize theme manager
  ThemeManager.init();

  // Initialize tilt effect
  TiltEffect.init();

  // Fetch and render GitHub data
  const api = new GitHubAPI(CONFIG.username);
  state.githubData = await api.fetchAllData();

  // Render all components
  UIRenderer.updateProfile(state.githubData);
  UIRenderer.updateMetrics(state.githubData);
  UIRenderer.renderActivityHeatmap();
  UIRenderer.renderLanguageChart(state.githubData.languages);
  UIRenderer.renderContributionGraph();
  UIRenderer.renderTopRepos(state.githubData.repos);
  UIRenderer.renderSkillsRadar();
  UIRenderer.renderAchievements();

  // Hide loading screen
  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("hidden");
  }, 1500);
}

// Start the application
document.addEventListener("DOMContentLoaded", init);

// Add smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Performance optimization: Debounce resize events
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    UIRenderer.renderLanguageChart(state.githubData.languages);
    UIRenderer.renderContributionGraph();
    UIRenderer.renderSkillsRadar();
  }, 250);
});

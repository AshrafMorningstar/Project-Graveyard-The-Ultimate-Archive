/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * MoodScroll Scroll Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class ScrollEngine {
  constructor() {
    this.zones = document.querySelectorAll(".mood-zone");
    this.indicator = document.querySelector(".indicator-bar");
    this.root = document.documentElement;
    this.init();
  }

  init() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    this.handleScroll();
  }

  handleScroll() {
    const scrollProgress = this.getScrollProgress();
    this.updateIndicator(scrollProgress);
    this.updateZones(scrollProgress);
  }

  getScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = documentHeight - windowHeight;
    return Math.min(scrollTop / maxScroll, 1);
  }

  updateIndicator(progress) {
    this.indicator.style.width = `${progress * 100}%`;
    const hue = 260 - progress * 100;
    this.indicator.style.background = `linear-gradient(90deg, hsl(${hue}, 70%, 60%) 0%, hsl(${
      hue - 30
    }, 70%, 55%) 100%)`;
  }

  updateZones(progress) {
    this.zones.forEach((zone, index) => {
      const rect = zone.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const visibilityRatio = Math.max(0, visibleHeight / windowHeight);

      if (visibilityRatio > 0.5) {
        zone.classList.add("active");
      } else {
        zone.classList.remove("active");
      }

      this.applyZoneEffects(zone, visibilityRatio, index);
    });
  }

  applyZoneEffects(zone, visibility, index) {
    const title = zone.querySelector(".zone-title");
    const text = zone.querySelector(".zone-text");

    if (!title || !text) return;

    switch (index) {
      case 0:
        title.style.opacity = visibility;
        title.style.transform = `translateY(${(1 - visibility) * 30}px)`;
        text.style.opacity = visibility * 0.8;
        break;
      case 1:
        title.style.opacity = visibility;
        title.style.transform = `translateX(${
          (1 - visibility) * -20
        }px) rotate(${(1 - visibility) * -2}deg)`;
        text.style.opacity = visibility;
        break;
      case 2:
        title.style.opacity = visibility;
        title.style.transform = `scale(${0.8 + visibility * 0.2})`;
        text.style.opacity = visibility;
        break;
      case 3:
        title.style.opacity = visibility * 0.9;
        title.style.transform = `translateY(${(1 - visibility) * 50}px)`;
        text.style.opacity = visibility * 0.7;
        break;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ScrollEngine();
});

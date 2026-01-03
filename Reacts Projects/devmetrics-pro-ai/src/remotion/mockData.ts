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

import { DeveloperData } from "../types";

export const mockData: DeveloperData = {
  username: "AshrafMorningstar",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  contributions: {
    contributionCalendar: {
      totalContributions: 850,
      weeks: Array(52).fill({
        contributionDays: Array(7).fill({
          contributionCount: 3,
          date: "2024-01-01",
          color: "#ebedf0",
        }),
      }),
    },
  },
  repositories: [
    {
      name: "devmetrics-pro",
      languages: ["TypeScript", "React", "Node.js"],
      stargazersCount: 120,
      features: ["Analytics", "Visualization"],
    },
    {
      name: "ai-code-assistant",
      languages: ["Python", "TensorFlow", "FastAPI"],
      stargazersCount: 85,
      features: ["AI", "Machine Learning"],
    },
    {
      name: "ui-kit",
      languages: ["CSS", "HTML", "JavaScript"],
      stargazersCount: 45,
      features: ["UI", "Design System"],
    },
  ],
  skills: [
    { name: "TypeScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
  ],
  achievements: [],
  rpgStats: {
    level: 42,
    class: "Code Wizard",
    attributes: {
      strength: 75,
      dexterity: 82,
      constitution: 60,
      intelligence: 95,
      wisdom: 70,
      charisma: 65,
    },
    experience: {
      current: 4500,
      nextLevel: 5000,
      progress: 0.9,
    },
  },
};

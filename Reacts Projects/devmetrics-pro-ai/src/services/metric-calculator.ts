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

import { DeveloperData, RPGStats } from "../types";

export class MetricCalculator {
  /**
   * Calculates RPG-style statistics based on developer activity
   */
  public static calculateRPGStats(data: DeveloperData): RPGStats {
    const totalCommits =
      data.contributions.contributionCalendar.totalContributions;
    const repoCount = data.repositories.length;
    const languages = new Set(
      data.repositories.flatMap((r) => r.languages || [])
    );

    // Calculate Level (based on total contributions)
    // Formula: level = sqrt(total_commits) * 0.5
    const level = Math.floor(Math.sqrt(totalCommits) * 0.5) + 1;

    // Calculate XP
    const currentXP = totalCommits;
    const xpForNextLevel = Math.pow((level + 1) / 0.5, 2);
    const xpForCurrentLevel = Math.pow(level / 0.5, 2);
    const levelProgress =
      (currentXP - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel);

    // Calculate Attributes (0-100 scale)
    const attributes = {
      strength: this.calculateStrength(data),
      dexterity: this.calculateDexterity(data),
      constitution: this.calculateConstitution(data),
      intelligence: this.calculateIntelligence(data),
      wisdom: this.calculateWisdom(data),
      charisma: this.calculateCharisma(data),
    };

    return {
      level,
      class: this.determineClass(attributes),
      attributes,
      experience: {
        current: currentXP,
        nextLevel: Math.floor(xpForNextLevel),
        progress: Math.min(Math.max(levelProgress, 0), 1),
      },
    };
  }

  private static calculateStrength(data: DeveloperData): number {
    // Strength = Volume of work (commits + repos)
    const score =
      (data.contributions.contributionCalendar.totalContributions / 1000) * 100;
    return Math.min(Math.floor(score), 100);
  }

  private static calculateDexterity(data: DeveloperData): number {
    // Dexterity = Frequency/Speed (avg commits per active day)
    // Simplified: total contributions / 365
    const score =
      (data.contributions.contributionCalendar.totalContributions / 365) * 20;
    return Math.min(Math.floor(score), 100);
  }

  private static calculateConstitution(data: DeveloperData): number {
    // Constitution = Consistency (longest streak logic would go here)
    // For now, based on % of active weeks
    const weeks = data.contributions.contributionCalendar.weeks;
    const activeWeeks = weeks.filter((w) =>
      w.contributionDays.some((d) => d.contributionCount > 0)
    ).length;
    const score = (activeWeeks / weeks.length) * 100;
    return Math.min(Math.floor(score), 100);
  }

  private static calculateIntelligence(data: DeveloperData): number {
    // Intelligence = Complexity (number of languages, stars)
    const languages = new Set(
      data.repositories.flatMap((r) => r.languages || [])
    ); // Simplified mock access
    const score =
      languages.size * 10 +
      data.repositories.reduce((acc, r) => acc + r.stargazersCount, 0) / 10;
    return Math.min(Math.floor(score), 100);
  }

  private static calculateWisdom(data: DeveloperData): number {
    // Wisdom = Age of account, reviews (mock logic for now)
    return Math.min(50 + data.repositories.length * 2, 100);
  }

  private static calculateCharisma(data: DeveloperData): number {
    // Charisma = External interaction (forks, stars)
    const stars = data.repositories.reduce(
      (acc, r) => acc + r.stargazersCount,
      0
    );
    const score = stars * 2;
    return Math.min(Math.floor(score), 100);
  }

  private static determineClass(
    attrs: RPGStats["attributes"]
  ): RPGStats["class"] {
    const maxAttr = Math.max(...Object.values(attrs));

    if (attrs.intelligence === maxAttr) return "Code Wizard";
    if (attrs.dexterity === maxAttr) return "Speedster";
    if (attrs.strength === maxAttr) return "Bug Hunter";
    if (attrs.wisdom === maxAttr) return "Architect";
    if (attrs.constitution === maxAttr) return "Paladin";

    return "Code Wizard"; // Default
  }
}

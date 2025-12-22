/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

export interface GitHubData {
  username: string;
  stats: {
    impact: number;
    quality: number;
    activity: number;
    growth: number;
  };
  languages: { name: string; size: number; color: string }[];
  contributions: number[];
}

export class DataAlchemist {
  public transform(data: GitHubData) {
    return {
      essence: this.extractEssence(data),
      patterns: this.findHiddenPatterns(data),
      story: this.createNarrative(data),
      beauty: this.prepareForArt(data),
    };
  }

  private extractEssence(data: GitHubData) {
    return {
        ...data.stats,
        total: Object.values(data.stats).reduce((a, b) => a + b, 0) / 4
    };
  }

  private findHiddenPatterns(data: GitHubData) {
    // Simulate finding patterns in contribution graph
    return {
        bursts: data.contributions.filter(c => c > 10).length,
        consistency: "High",
        phase: "Full Moon" // as per description
    };
  }

  private createNarrative(data: GitHubData) {
    return `The data reveals a story of consistent ${data.stats.activity}% activity with a focus on ${data.languages[0]?.name || 'Code'}.`;
  }

  private prepareForArt(data: GitHubData) {
    // Normalize values for 3D scaling
    return {
        planetSizes: data.languages.map(l => ({ name: l.name, size: l.size / 100 })),
        flowVelocity: data.stats.activity / 10
    };
  }
}

export const MOCK_DATA: GitHubData = {
  username: "AshrafMorningstar",
  stats: {
    impact: 96,
    quality: 87,
    activity: 92,
    growth: 78
  },
  languages: [
    { name: "TypeScript", size: 8500, color: "#3178c6" },
    { name: "Rust", size: 4200, color: "#dea584" },
    { name: "Python", size: 3100, color: "#3572A5" },
    { name: "Go", size: 2800, color: "#00ADD8" },
  ],
  contributions: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20))
};

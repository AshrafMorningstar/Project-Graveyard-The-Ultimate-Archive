/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// Created by AshrafMorningstar
// GitHub: https://github.com/AshrafMorningstar

import { DeveloperData, Repository } from "../types";

export class AIInsightGenerator {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || "";
  }

  async generateDeveloperInsights(data: DeveloperData) {
    const insights = {
      productivityPatterns: this.analyzeProductivity(data),
      skillRecommendations: this.suggestSkills(data),
      growthOpportunities: this.identifyGrowthAreas(data),
      comparisonMetrics: this.compareWithPeers(data),
    };

    return insights;
  }

  private analyzeProductivity(data: DeveloperData) {
    return {
      bestHours: this.calculateOptimalHours(data),
      focusAreas: this.identifyFocusPatterns(data),
      burnoutRisk: this.assessBurnoutRisk(data),
    };
  }

  private suggestSkills(data: DeveloperData) {
    return [
      "Advanced TypeScript patterns",
      "System design",
      "Performance optimization",
    ];
  }

  private identifyGrowthAreas(data: DeveloperData) {
    return ["Open source contributions", "Technical writing", "Mentoring"];
  }

  private compareWithPeers(data: DeveloperData) {
    return {
      percentile: 85,
      strengths: ["Consistency", "Code quality"],
      improvements: ["Documentation"],
    };
  }

  private calculateOptimalHours(data: DeveloperData) {
    return "10am-2pm";
  }

  private identifyFocusPatterns(data: DeveloperData) {
    return "Deep work in morning hours";
  }

  private assessBurnoutRisk(data: DeveloperData) {
    return "Low";
  }
}

export const generateProjectDescription = async (
  repo: Repository,
  aiService: any
) => {
  return await aiService.generate(`
    Write an engaging project description for:
    Name: ${repo.name}
    Tech: ${repo.languages.join(", ")}
    Stars: ${repo.stargazersCount}
    Key features: ${repo.features.join(", ")}
    
    Style: Technical but engaging, highlight unique aspects
  `);
};

export const generateDeveloperInsights = async (
  data: DeveloperData,
  aiService: any
) => {
  const prompt = `
    Analyze this developer's GitHub activity and provide insights:
    - Contribution patterns: ${JSON.stringify(data.contributions)}
    - Repository focus: ${JSON.stringify(data.repositories)}
    - Skill progression: ${JSON.stringify(data.skills)}
    
    Provide:
    1. Productivity analysis
    2. Skill growth recommendations  
    3. Potential collaboration opportunities
    4. Suggested learning paths
  `;

  const insights = await aiService.generateCompletion(prompt);

  return {
    summary:
      insights.summary ||
      "Consistent contributor with strong focus on modern web technologies",
    recommendations: insights.recommendations || [
      "Explore system design",
      "Contribute to open source",
    ],
    comparison: "Above average activity compared to peers",
    personalizedTips: [
      "Focus deep work in morning hours",
      "Take regular breaks",
    ],
  };
};

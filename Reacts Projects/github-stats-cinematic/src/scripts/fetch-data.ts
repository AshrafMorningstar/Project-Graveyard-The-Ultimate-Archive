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

/* Created by AshrafMorningstar - https://github.com/AshrafMorningstar */
import { Octokit } from "octokit";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import "dotenv/config";

const token = process.env.GH_TOKEN;
const username = "AshrafMorningstar";

// --- Gamification Logic ---
function calculateLevel(contribs: number): number {
  return Math.floor(Math.sqrt(contribs) * 0.5) || 1;
}

function calculateRank(stars: number, followers: number): string {
  const score = stars * 2 + followers;
  if (score > 2000) return "S+";
  if (score > 1000) return "S";
  if (score > 500) return "A";
  if (score > 200) return "B";
  return "C";
}

function getTitle(language: string): string {
  const titles: Record<string, string> = {
    TypeScript: "Type Sorcerer",
    JavaScript: "JS Ninja",
    Python: "Pyromancer",
    Rust: "Ferrrous Titan",
    Go: "Gopher Lord",
    Java: "Bytecode Baron",
    "C++": "Memory Master",
    "C#": "Runtime Ranger",
  };
  return titles[language] || "Code Architect";
}

async function fetchStats() {
  // Mock data fallback if no token
  if (!token) {
    console.warn("GH_TOKEN is missing! Using enhanced mock data.");
    const mockContribs = 2500;
    const mockStars = 1500;
    const mockLang = "TypeScript";

    const mockStats = {
      username: "AshrafMorningstar",
      name: "Ashraf Morningstar",
      avatar: "https://github.com/AshrafMorningstar.png",
      totalCommits: 1234,
      totalPRs: 56,
      totalIssues: 22,
      totalContribs: mockContribs,
      repos: 42,
      stars: mockStars,
      followers: 50,
      streak: 15,
      topLanguage: mockLang,
      level: calculateLevel(mockContribs),
      rank: calculateRank(mockStars, 50),
      title: getTitle(mockLang),
      _credits:
        "Created by AshrafMorningstar - https://github.com/AshrafMorningstar",
    };

    await mkdir(join(process.cwd(), "src/data"), { recursive: true });
    await writeFile(
      join(process.cwd(), "src/data/stats.json"),
      JSON.stringify(mockStats, null, 2)
    );
    return;
  }

  const octokit = new Octokit({ auth: token });

  const query = `
    query($login: String!) {
      user(login: $login) {
        name
        login
        avatarUrl
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          restrictedContributionsCount
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            name
            stargazers {
              totalCount
            }
            primaryLanguage {
              name
            }
          }
        }
        followers {
          totalCount
        }
      }
    }
  `;

  console.log(`Fetching stats for ${username}...`);
  try {
    const result: any = await octokit.graphql(query, { login: username });
    const user = result.user;

    // Calculate stars
    const totalStars = user.repositories.nodes.reduce(
      (acc: number, repo: any) => acc + repo.stargazers.totalCount,
      0
    );

    // Calculate top language
    const languageCounts: Record<string, number> = {};
    user.repositories.nodes.forEach((repo: any) => {
      if (repo.primaryLanguage) {
        const lang = repo.primaryLanguage.name;
        languageCounts[lang] = (languageCounts[lang] || 0) + 1;
      }
    });
    const topLanguage =
      Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "N/A";

    const totalCommits = user.contributionsCollection.totalCommitContributions;
    const totalPRs = user.contributionsCollection.totalPullRequestContributions;
    const totalIssues = user.contributionsCollection.totalIssueContributions;
    const totalContribs =
      totalCommits +
      totalPRs +
      totalIssues +
      user.contributionsCollection.restrictedContributionsCount;

    // Calculate streak
    let streak = 0;
    let currentStreak = 0;
    const weeks = user.contributionsCollection.contributionCalendar.weeks;
    weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        if (day.contributionCount > 0) {
          currentStreak++;
          streak = Math.max(streak, currentStreak);
        } else {
          currentStreak = 0;
        }
      });
    });

    const stats = {
      username: user.login,
      name: user.name,
      avatar: user.avatarUrl,
      totalCommits,
      totalPRs,
      totalIssues,
      totalContributions: totalContribs, // Normalized key for CinematicGif
      totalContribs, // Keep old key for compatibility
      repos: user.repositories.totalCount,
      stars: totalStars,
      totalStars, // Normalized key
      followers: user.followers.totalCount,
      streak,
      topLanguage,
      level: calculateLevel(totalContribs),
      rank: calculateRank(totalStars, user.followers.totalCount),
      title: getTitle(topLanguage),
      _credits:
        "Created by AshrafMorningstar - https://github.com/AshrafMorningstar",
    };

    await mkdir(join(process.cwd(), "src/data"), { recursive: true });
    await writeFile(
      join(process.cwd(), "src/data/stats.json"),
      JSON.stringify(stats, null, 2)
    );
    console.log("Stats saved to src/data/stats.json");
  } catch (error) {
    console.error("Error fetching stats:", error);
    process.exit(1);
  }
}

fetchStats().catch((err) => {
  console.error(err);
  process.exit(1);
});

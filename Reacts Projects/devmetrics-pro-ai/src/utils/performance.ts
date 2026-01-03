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

// Created by AshrafMorningstar
// GitHub: https://github.com/AshrafMorningstar

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export class DataCache {
  private cache = new Map<string, { data: any; timestamp: number }>();

  async getWithCache(key: string, fetchFn: () => Promise<any>) {
    const cached = this.cache.get(key);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Cache hit for: ${key}`);
      return cached.data;
    }

    console.log(`Cache miss for: ${key}, fetching...`);
    const freshData = await fetchFn();
    this.cache.set(key, { data: freshData, timestamp: Date.now() });
    return freshData;
  }

  clear() {
    this.cache.clear();
  }

  delete(key: string) {
    return this.cache.delete(key);
  }
}

export async function fetchAllPlatformData(username: string, services: any) {
  const [githubData, gitlabData, stackoverflowData] = await Promise.all([
    services.github?.getUserData(username).catch(() => ({})),
    services.gitlab?.getUserData(username).catch(() => ({})),
    services.stackoverflow?.getUserData(username).catch(() => ({})),
  ]);

  return mergePlatformData([githubData, gitlabData, stackoverflowData]);
}

function mergePlatformData(dataArray: any[]) {
  return dataArray.reduce((acc, data) => {
    return { ...acc, ...data };
  }, {});
}

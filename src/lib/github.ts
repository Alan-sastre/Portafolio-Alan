export interface GitHubContribution {
  date: string;
  count: number;
}

export interface GitHubPR {
  title: string;
  html_url: string;
  state: string;
  merged: boolean | null;
  repo_name: string;
  created_at: string;
}

export async function fetchContributions(username: string): Promise<{ contributions: GitHubContribution[]; totals: { total: number; byYear: Record<string, number> } }> {
  const sources = [
    // Source 1: jogruber.de API (v4 format, reliable)
    async () => {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}`,
        { signal: AbortSignal.timeout(10000) }
      );
      if (!response.ok) throw new Error(`jogruber API: ${response.status}`);
      const data = await response.json();
      const apiContributions = data.contributions || [];
      const contributions: GitHubContribution[] = [];
      const byYear: Record<string, number> = {};

      for (const entry of apiContributions) {
        const dateStr = entry.date;
        const count = entry.count || 0;
        contributions.push({ date: dateStr, count });
        const year = dateStr.slice(0, 4);
        byYear[year] = (byYear[year] || 0) + count;
      }
      const total = Object.values(byYear).reduce((a, b) => a + b, 0);
      return { contributions, totals: { total, byYear } };
    },
    // Source 2: GitHub REST API - public events (last 90 days)
    async () => {
      const response = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=100`,
        {
          headers: { 'Accept': 'application/vnd.github.v3+json', 'If-None-Match': '' },
          signal: AbortSignal.timeout(10000),
        }
      );
      if (!response.ok) throw new Error(`GitHub REST API: ${response.status}`);
      const events = await response.json();
      const contributions: GitHubContribution[] = [];
      const byYear: Record<string, number> = {};

      events.forEach((event: any) => {
        const date = event.created_at.slice(0, 10);
        const existing = contributions.find((c: GitHubContribution) => c.date === date);
        if (existing) {
          existing.count += 1;
        } else {
          contributions.push({ date, count: 1 });
        }
        const year = date.slice(0, 4);
        byYear[year] = (byYear[year] || 0) + 1;
      });
      const total = Object.values(byYear).reduce((a, b) => a + b, 0);
      return { contributions, totals: { total, byYear } };
    },
    // Source 3: GitHub REST API - repos commits
    async () => {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
          signal: AbortSignal.timeout(10000),
        }
      );
      if (!reposResponse.ok) throw new Error(`GitHub repos API: ${reposResponse.status}`);
      const repos = await reposResponse.json();
      const contributions: GitHubContribution[] = [];
      const byYear: Record<string, number> = {};
      const contribMap = new Map<string, number>();

      // Fetch commits for each repo (limited to avoid rate limit)
      const commitPromises = repos.slice(0, 10).map(async (repo: any) => {
        try {
          const repoName = repo.name;
          const commitsResponse = await fetch(
            `https://api.github.com/repos/${username}/${repoName}/commits?per_page=30`,
            {
              headers: { 'Accept': 'application/vnd.github.v3+json' },
              signal: AbortSignal.timeout(8000),
            }
          );
          if (commitsResponse.ok) {
            const commits = await commitsResponse.json();
            commits.forEach((commit: any) => {
              const date = commit.commit.author?.date?.slice(0, 10);
              if (date) {
                const existing = contribMap.get(date) || 0;
                contribMap.set(date, existing + 1);
              }
            });
          }
        } catch {
          // Skip failed repos
        }
      });

      await Promise.allSettled(commitPromises);

      contribMap.forEach((count, date) => {
        contributions.push({ date, count });
        const year = date.slice(0, 4);
        byYear[year] = (byYear[year] || 0) + count;
      });

      const total = Object.values(byYear).reduce((a, b) => a + b, 0);
      return { contributions, totals: { total, byYear } };
    },
  ];

  // Try each source in order
  for (const source of sources) {
    try {
      const result = await source();
      if (result.contributions.length > 0) {
        return result;
      }
    } catch {
      // Try next source
    }
  }

  // If all sources fail, return empty with error info
  throw new Error("No se pudieron cargar las contribuciones. Las APIs de GitHub pueden estar limitadas. Intenta de nuevo más tarde.");
}

export async function fetchPRs(username: string): Promise<GitHubPR[]> {
  const response = await fetch(
    `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=10&sort=created&order=desc`,
    {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
    }
  );

  if (!response.ok) throw new Error('Failed to fetch PRs');

  const data = await response.json();

  return data.items.map((item: any) => ({
    title: item.title,
    html_url: item.html_url,
    state: item.state,
    merged: item.pull_request?.merged,
    repo_name: item.repository_url?.split('/').slice(-2).join('/') || '',
    created_at: item.created_at,
  }));
}

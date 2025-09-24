import { z } from 'zod';

export const githubStatsToolSchema = z.object({
  owner: z.string().describe('GitHub repository owner/organization'),
  repo: z.string().describe('GitHub repository name'),
});

export type GitHubStatsToolInput = z.infer<typeof githubStatsToolSchema>;

// Mock data for demonstration - replace with actual GitHub API calls
export const githubStatsTool = async (context: any) => {
  const { owner, repo } = context.context || context.args || context;
  try {
    // For the 3-hour challenge, using mock data
    // Replace with actual GitHub API call:
    // const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    // const data = await response.json();
    
    // Mock repository data
    const mockStats = {
      name: repo,
      fullName: `${owner}/${repo}`,
      description: `This is the ${repo} repository by ${owner}`,
      stars: Math.floor(Math.random() * 10000),
      forks: Math.floor(Math.random() * 1000),
      watchers: Math.floor(Math.random() * 500),
      issues: Math.floor(Math.random() * 50),
      language: ['TypeScript', 'JavaScript', 'Python', 'Go'][Math.floor(Math.random() * 4)],
      createdAt: '2023-01-15T10:30:00Z',
      updatedAt: new Date().toISOString(),
      size: Math.floor(Math.random() * 10000),
      defaultBranch: 'main'
    };
    
    return {
      repository: mockStats,
      summary: `${mockStats.fullName} is a ${mockStats.language} repository with ${mockStats.stars} stars, ${mockStats.forks} forks, and ${mockStats.issues} open issues.`,
      metrics: {
        popularity: mockStats.stars + mockStats.forks,
        activity: mockStats.watchers,
        health: mockStats.issues < 10 ? 'Good' : mockStats.issues < 25 ? 'Fair' : 'Needs attention'
      }
    };
  } catch (error) {
    return {
      error: `Failed to fetch stats for ${owner}/${repo}`,
      message: 'Repository might not exist or be private'
    };
  }
};
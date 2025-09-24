import { Agent } from '@mastra/core';
import { model } from '../../config';
import { githubStatsTool, githubStatsToolSchema } from './github-tool';

export const githubAgent = new Agent({
  name: 'github-agent',
  instructions: `You are a GitHub repository analysis assistant.
    You can fetch and analyze GitHub repository statistics including stars, forks, issues, and general health metrics.
    When users ask about GitHub repositories, use the GitHub stats tool to get the information.
    Always provide a clear summary of the repository's key metrics and health status.
    Format the owner/repo correctly (e.g., "facebook/react" or "microsoft/typescript").`,
  model,
  tools: {
    getGitHubStats: {
      id: 'getGitHubStats',
      description: 'Get statistics and information about a GitHub repository',
      inputSchema: githubStatsToolSchema,
      execute: githubStatsTool,
    },
  },
});
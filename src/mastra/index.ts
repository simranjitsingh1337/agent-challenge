import { Mastra } from '@mastra/core';
import { calculatorAgent } from './agents/calculator/calculator-agent';
import { cryptoAgent } from './agents/crypto/crypto-agent';
import { githubAgent } from './agents/github/github-agent';
import { weatherAgent } from './agents/weather-agent/weather-agent';
import { yourAgent } from './agents/your-agent/your-agent';

export const mastra = new Mastra({
  agents: {
    calculator: calculatorAgent,
    crypto: cryptoAgent,
    github: githubAgent,
    weather: weatherAgent,
    yourAgent: yourAgent,
  },
  server: {
    port: 8080,
    timeout: 10000,
  },
});

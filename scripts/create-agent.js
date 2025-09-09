#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const agentType = process.argv[2];

if (!agentType || !['calculator', 'crypto', 'github'].includes(agentType)) {
  console.error('Usage: node create-agent.js [calculator|crypto|github]');
  process.exit(1);
}

// Update the main index.ts to use the selected agent
const indexPath = path.join(__dirname, '../src/mastra/index.ts');
const agentIndexContent = `import { Mastra } from '@mastra/core';
import { config } from './config';
import { ${agentType}Agent } from './agents/${agentType}/${agentType}-agent';

export const mastra = new Mastra({
  config,
  agents: {
    ${agentType}: ${agentType}Agent,
  },
});
`;

fs.writeFileSync(indexPath, agentIndexContent);

console.log(`✅ ${agentType.charAt(0).toUpperCase() + agentType.slice(1)} agent configured!`);
console.log(`🚀 Run "pnpm run dev" to start development`);
console.log(`🌐 Open http://localhost:8080 to test your agent`);
console.log('');
console.log('Quick test prompts:');

switch(agentType) {
  case 'calculator':
    console.log('  - "Calculate 25 + 17"');
    console.log('  - "What\'s 100 divided by 4?"');
    console.log('  - "Multiply 12 by 8"');
    break;
  case 'crypto':
    console.log('  - "What\'s the current price of Bitcoin?"');
    console.log('  - "Show me SOL price"');
    console.log('  - "How much is Ethereum worth?"');
    break;
  case 'github':
    console.log('  - "Get stats for facebook/react"');
    console.log('  - "Show me microsoft/typescript repository"');
    console.log('  - "Analyze nosana-ai/nosana-cli stats"');
    break;
}
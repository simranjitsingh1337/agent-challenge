# 🚀 3-Hour Quick Start Guide

## Super Quick Setup (2 minutes)

```bash
# 1. Setup
git clone https://github.com/nosana-ai/agent-challenge
cd agent-challenge
pnpm install
cp .env.example .env

# 2. Choose your agent
pnpm run create:calculator  # OR create:crypto OR create:github

# 3. Test it
pnpm run dev
# Open http://localhost:8080
```

## Test Your Agent

### Calculator Agent

```
"Calculate 25 + 17"
"What's 100 divided by 4?"
"Multiply 12 by 8"
```

### Crypto Agent

```
"What's the current price of Bitcoin?"
"Show me SOL price"
"How much is Ethereum worth?"
```

### GitHub Agent

```
"Get stats for facebook/react"
"Show me microsoft/typescript repository"
"Analyze nosana-ai/nosana-cli stats"
```

## Deploy in 1 Command

```bash
# Replace 'yourusername' with your Docker Hub username
./scripts/deploy-helper.sh yourusername
```

This will:

1. Build Docker image
2. Push to Docker Hub
3. Update job definition
4. Show you the deploy command

## Submit

1. **Get test funds**: Join [Discord](https://nosana.com/discord), ask for NOS/SOL
2. **Deploy**: `nosana job post --file nos_job_def/nosana_mastra.json --market nvidia-3060 --timeout 30`
3. **Demo**: Record 1-minute video
4. **Tweet**: @nosana_ai #NosanaAgentChallenge
5. **Submit**: https://earn.superteam.fun/agent-challenge

**Done! 🎉**


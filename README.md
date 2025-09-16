# Nosana and AI Builders Presents: BUIDL DAY @ TOKEN2049 🚀

![Agent](https://nosana.com/img/logotype.svg)

## Topic

Vibe coding and Deploying Mastra Agents to Nosana

## Description

This first step will be in running a basic AI agent and giving it some basic functionality. Participants will add a tool, for the tool calling capabilities of the agent. These are TypeScript functions, that will, for example, make API calls, or perform calculations. At the end of the challenge, participants will have a working agent, that they can deploy to Nosana.

## [Mastra](https://github.com/mastra-ai/mastra)

For this challenge we will be using Mastra to build our tool.

> Mastra is an opinionated TypeScript framework that helps you build AI applications and features quickly. It gives you the set of primitives you need: workflows, agents, RAG, integrations, and evals. You can run Mastra on your local machine, or deploy to a serverless cloud.

### Required Reading

We recommend reading the following sections to get started with how to create an Agent and how to implement Tool Calling.

- <https://mastra.ai/en/docs/agents/overview>
- [Mastra Guide: Build an AI stock agent](https://mastra.ai/en/guides/guide/stock-agent)

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

## Credits

To deploy your agent, you will need credits.
You need to have registered via the [Luma Page](https://luma.com/nosana-buidlday-SG).
Registering via the [Luma Page](https://luma.com/nosana-buidlday-SG) is essential!

## Assignment

Read [README-3HOUR.md](./README-3HOUR.md) for details on the 3-Hour Challenge.

### Getting Started

1. **Fork the [Nosana Agent Challenge](https://github.com/nosana-ai/agent-challenge)** to your GitHub account
2. **Clone your fork** locally
3. **Install dependencies** with `pnpm install`
4. **Run the development server** with `pnpm run dev`
5. **Build your agent** using the Mastra framework

### How to build your Agent

Here we will describe the steps needed to build an agent.

#### Folder Structure

Provided in this repo, there is the `Weather Agent`.
This is a fully working agent that allows a user to chat with an LLM, and fetches real time weather data for the provided location.

There are two main folders we need to pay attention to:

- [src/mastra/agents/weather-agent/](./src/mastra/agents/weather-agent/)
- [src/mastra/agents/your-agents/](./src/mastra/agents/your-agent/)

In `src/mastra/agents/weather-agent/` you will find a complete example of a working agent. Complete with Agent definition, API calls, interface definition, basically everything needed to get a full fledged working agent up and running.
In `src/mastra/agents/your-agents/` you will find a bare bones example of the needed components, and imports to get started building your agent, we recommend you rename this folder, and it's files to get started.

Rename these files to represent the purpose of your agent and tools. You can use the [Weather Agent Example](#example:_weather_agent) as a guide until you are done with it, and then you can delete these files before submitting your final submission.

As a bonus, for the ambitious ones, we have also provided the [src/mastra/agents/weather-agent/weather-workflow.ts](./src/mastra/agents/weather-agent/weather-workflow.ts) file as an example. This file contains an example of how you can chain agents and tools to create a workflow, in this case, the user provides their location, and the agent retrieves the weather for the specified location, and suggests an itinerary.

### 3 Hour Challenge

For the 3 hour challenge, we have provided a tool to create a basic template to get you started quickly.

1. Calculator Agent
2. Crypto Price Agent
3. GitHub Stats Agent

Read more about it at [README-3HOUR.md](./README-3HOUR.md)

### LLM-Endpoint

Agents depend on an LLM to be able to do their work. Nosana will provide you with and enddpoint to use.

#### Nosana Endpoint

You can use the following endpoint for your agent:

```
MODEL_NAME_AT_ENDPOINT=qwen2.5:1.5b
API_BASE_URL= https://dashboard.nosana.com/jobs/GPVMUckqjKR6FwqnxDeDRqbn34BH7gAa5xWnWuNH1drf
```

## Choose Your Agent (10 minutes)

Pick ONE from these pre-built templates:

### Option A: Calculator Agent (Beginner)

```bash
pnpm run create:calculator
```

- Performs math operations
- Explains calculations step-by-step
- **Skills needed**: Basic TypeScript

### Option B: Crypto Price Agent (Intermediate)

```bash
pnpm run create:crypto
```

- Fetches live cryptocurrency prices
- Compares price changes
- **Skills needed**: API calls, JSON parsing

### Option C: GitHub Stats Agent (Advanced)

```bash
pnpm run create:github
```

- Fetches repository statistics
- Analyzes commit history
- **Skills needed**: GitHub API, data processing

## Implementation Timeline (3 hours)

### 1: Build Your Agent

1. **0:00-0:15** - Setup and choose template
2. **0:15-1:45** - Implement your tool function and test locally at http://localhost:8080

### 2: Package and Deploy

1. **1:45-2:00** - Build Docker container and push to Docker Hub

Make sure you have a Docker Hub account, replace `yourusername` below with your Docker Hub username, and that you are logged into the docker cli.

```bash
docker build -t yourusername/my-agent:latest .
docker run -p 8080:8080 yourusername/my-agent:latest
```

2. **2:00-2:00** - Push to Docker Hub

   ```bash
   docker login
   docker push yourusername/my-agent:latest
   ```

### 3: Deploy to Nosana

1. **2:00-2:30** - Deploy on Nosana, see [#Quick Nosana Deployment](#quick-nosana-deployment) for details.
2. **2:30-3:00** - Prepare your pitch

## Quick Implementation Guide

### Step 1: Edit Your Tool (30 mins)

Location: `src/mastra/agents/[your-agent]/[your-agent]-tool.ts`

```typescript
// Example: Simple calculator tool
export const calculatorTool = async ({
  operation,
  a,
  b,
}: {
  operation: string;
  a: number;
  b: number;
}) => {
  switch (operation) {
    case "add":
      return { result: a + b, explanation: `${a} + ${b} = ${a + b}` };
    case "subtract":
      return { result: a - b, explanation: `${a} - ${b} = ${a - b}` };
    case "multiply":
      return { result: a * b, explanation: `${a} × ${b} = ${a * b}` };
    case "divide":
      return { result: a / b, explanation: `${a} ÷ ${b} = ${a / b}` };
    default:
      throw new Error("Unknown operation");
  }
};
```

### Step 2: Configure Your Agent (15 mins)

Location: `src/mastra/agents/[your-agent]/[your-agent]-agent.ts`

```typescript
import { Agent } from "@mastra/core";
import { calculatorTool } from "./calculator-tool";

export const calculatorAgent = new Agent({
  name: "Calculator Agent",
  description: "Performs mathematical calculations",
  tools: {
    calculator: {
      description: "Perform math operations",
      parameters: {
        operation: { type: "string", required: true },
        a: { type: "number", required: true },
        b: { type: "number", required: true },
      },
      execute: calculatorTool,
    },
  },
});
```

### Step 3: Test Your Agent (15 mins)

1. **Start the development server** with `pnpm run dev` and navigate to `http://localhost:8080` in your browser
2. **Test your agent's conversation flow** by interacting with it through the chat interface
3. **Verify tool functionality** by triggering scenarios that call your custom tools
4. Try these prompts:

- "Calculate 25 + 17"
- "What's 100 divided by 4?"
- "Multiply 12 by 8"

5. **Check error handling** by providing invalid inputs or testing edge cases
6. **Monitor the console logs** to ensure there are no runtime errors or warnings

### Builder the container (15 mins)

You can read the [Mastra Documentation: Playground](https://mastra.ai/en/docs/local-dev/mastra-dev) to learn more on how to test your agent locally.
Before deploying your agent to Nosana, it's crucial to thoroughly test it locally to ensure everything works as expected. Follow these steps to validate your agent:

**Docker Testing:**
After building your Docker container, test it locally before pushing to the registry:

```bash
# Build your container
docker build -t yourusername/agent-challenge:latest .

# Run it locally with environment variables
docker run -p 8080:8080 --env-file .env yourusername/agent-challenge:latest

# Test the containerized agent at http://localhost:8080

# Login
docker login

# Push
docker push yourusername/agent-challenge:latest
```

Ensure your agent responds correctly and all tools function properly within the containerized environment. This step is critical as the Nosana deployment will use this exact container.

#### 3. Nosana Deployment

- Deploy your Docker container on Nosana using the [Nosana Dashboard](https://dashboard.nosana.com/deploy).
- Your agent must successfully run on the Nosana network
- Include the Nosana job ID or deployment link

##### Nosana Job Definition

We have included a Nosana job definition at <./nos_job_def/nosana_mastra.json>, that you can use to publish your agent to the Nosana network.

**Deploying using the [Nosana Dashboard](https://dashboard.nosana.com/deploy)**

- Make sure you registered via the [Luma Page](https://luma.com/nosana-buidlday-SG) to get credits
- Click the `Expand` button, on the [Nosana Dashboard](https://dashboard.nosana.com/deploy)
- Copy and Paste your edited Nosana Job Definition file into the Textarea
- Choose an appropriate GPU for the AI model that you are using
- Click `Deploy`

### Judging Criteria

Submissions will be evaluated based on:

1. **Innovation** (25%)
   - Originality of the agent concept
   - Creative use of AI capabilities

2. **Technical Implementation** (25%)
   - Code quality and organization
   - Proper use of the Mastra framework
   - Efficient tool implementation

3. **Nosana Integration** (25%)
   - Successful deployment on Nosana
   - Resource efficiency
   - Stability and performance

4. **Real-World Impact** (25%)
   - Practical use cases
   - Potential for adoption
   - Value proposition

### Prizes TBD

We’re awarding the **top 10 submissions**:

- 🥇 1st: $?? USDC
- 🥈 2nd: $?? USDC
- 🥉 3rd: $?? USDC

### Resources

- [Nosana Documentation](https://docs.nosana.io)
- [Mastra Documentation](https://mastra.ai/docs)
- [Mastra Guide: Build an AI stock agent](https://mastra.ai/en/guides/guide/stock-agent)
- [Nosana CLI](https://github.com/nosana-ci/nosana-cli)
- [Docker Documentation](https://docs.docker.com)

### Support

- Join [Nosana Discord](https://nosana.com/discord) for technical support where we have dedicated [Builders Challenge Dev chat](https://discord.com/channels/236263424676331521/1354391113028337664) channel.
- Follow [@nosana_ai](https://x.com/nosana_ai) for updates.

### Important Notes

- Ensure your agent doesn't expose sensitive data
- Keep your Docker images lightweight
- You can vibe code it if you want 😉

### Don’t Miss Nosana Builder Challenge Updates

Good luck, builders! We can't wait to see the innovative AI agents you create for the Nosana ecosystem.
**Happy Building!**

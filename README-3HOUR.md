# Nosana 3-Hour Agent Challenge 🚀

## Quick Start (5 minutes)

```bash
# 1. Clone and setup
git clone https://github.com/nosana-ai/agent-challenge
cd agent-challenge
pnpm install

# 2. Configure environment
cp .env.example .env
# Edit .env and add your API keys

# 3. Start development
pnpm run dev
# Open http://localhost:8080
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

1. Open http://localhost:8080
2. Try these prompts:
   - "Calculate 25 + 17"
   - "What's 100 divided by 4?"
   - "Multiply 12 by 8"

## Minimal Docker Setup

Already configured! Just run:

```bash
docker build -t yourusername/agent-challenge:latest .
docker push yourusername/agent-challenge:latest
```

## Quick Nosana Deployment

1. **Get test funds** (5 mins)

You should have credits in your Nosana account, for the email that you used to sign up. If not, get in touch with someone at the venue.

2. **Deploy** (10 mins)

- Edit the [nos_job_def/nosana_mastra.json](./nos_job_def/nosana_mastra.json) file to use your Docker image.
- Copy paste the contents of the file into the [Nosana Template Editor](https://dashboard.nosana.com/deploy)
-

## Submission Checklist (15 mins)

- [ ] Fork repository
- [ ] Choose and implement ONE agent type
- [ ] Test locally (http://localhost:8080)
- [ ] Build and push Docker container
- [ ] Deploy on Nosana
- [ ] Record 1-minute demo video
- [ ] Tweet with @nosana_ai #NosanaAgentChallenge
- [ ] Submit at https://earn.superteam.fun/agent-challenge

## Quick Tips

- **Use the weather agent as reference** - It's fully working!
- **Start simple** - Basic functionality is better than broken complexity
- **Test early and often** - Use the playground at http://localhost:8080
- **Ask for help** - Join [Discord](https://nosana.com/discord) #builders-challenge-dev

## Common Issues & Solutions

### LLM Not Working?

Use the provided Nosana endpoint:

```env
MODEL_NAME_AT_ENDPOINT=qwen2.5:1.5b
API_BASE_URL=https://dashboard.nosana.com/jobs/GPVMUckqjKR6FwqnxDeDRqbn34BH7gAa5xWnWuNH1drf
```

### Docker Build Fails?

```bash
# Clean build
docker system prune -a
docker build --no-cache -t yourusername/agent-challenge:latest .
```

### Nosana Deployment Issues?

- Ensure Docker image is public
- Check you have enough NOS/SOL
- Use nvidia-3060 market for best availability

## Prizes 🏆

**Top 10 submissions win:**

- 1st: $1,000 USDC
- 2nd: $750 USDC
- 3rd: $450 USDC
- 4th: $200 USDC
- 5th-10th: $100 USDC

## Resources

- [Quick Mastra Guide](https://mastra.ai/en/guides/guide/stock-agent)
- [Discord Support](https://nosana.com/discord)
- [Example Weather Agent](./src/mastra/agents/weather-agent/)

---

**Remember**: Done is better than perfect! Focus on a working agent that demonstrates one clear capability. Good luck! 🎯


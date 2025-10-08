import { CopilotRuntime, copilotRuntimeNextJSAppRouterEndpoint, ExperimentalEmptyAdapter } from "@copilotkit/runtime";
import { MastraClient } from "@mastra/client-js";

const MASTRA_AGENT_BASE_URL = process.env.MASTRA_AGENT_BASE_URL || "http://localhost:4112";

export async function POST(req: Request): Promise<Response> {
  // Clone the request before reading the body
  const clonedReq = req.clone();
  const body = await clonedReq.json()

  const resourceId = body.resourceId || "TEST"

  const mastra = new MastraClient({
    baseUrl: MASTRA_AGENT_BASE_URL,
  });

  const mastraAgents = await mastra.getAGUI({
    resourceId,
  })
  
  const runtime = new CopilotRuntime({
    agents: mastraAgents,
  });

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter: new ExperimentalEmptyAdapter(),
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
} 
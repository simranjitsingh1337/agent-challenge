import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  OpenAIAdapter,
} from "@copilotkit/runtime";
import { getAGUI } from "@mastra/agui";
import { mastra } from "@/mastra";

import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ['http://localhost:3000'];

const corsHeaders = (origin: string) => ({
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CopilotKit-Verbose, x-copilotkit-copilot-id, x-copilotkit-cloud-project-id, x-copilotkit-chat-id, x-copilotkit-parent-id, x-copilotkit-root-id, x-copilotkit-runtime-client-gql-version, x-copilotkit-sequence-id',
});

export async function OPTIONS(req: NextRequest) {
    const origin = req.headers.get('origin') ?? '';
    return NextResponse.json({}, { headers: corsHeaders(origin) });
}

export const POST = async (req: NextRequest) => {
  // Clone the request before reading the body
  const clonedReq = req.clone();
  const body = await clonedReq.json()
  const resourceId = body.resourceId || "TEST"


  const mastraAgents = getAGUI({
    mastra,
    resourceId,
  });

  const runtime = new CopilotRuntime({
    agents: mastraAgents,
  });

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter: new OpenAIAdapter(),
    endpoint: "/api/copilotkit",
  });

  const response = await handleRequest(req);
  const origin = req.headers.get('origin') ?? '';
  const headers = corsHeaders(origin);
  Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
  });
  return response;
};

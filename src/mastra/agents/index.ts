import "dotenv/config";
import { openai } from "@ai-sdk/openai";
import { createOllama } from "ollama-ai-provider-v2";
import { Agent } from "@mastra/core/agent";
import { weatherTool } from "@/mastra/tools";
import { LibSQLStore } from "@mastra/libsql";
import { z } from "zod";
import { Memory } from "@mastra/memory";

export const AgentState = z.object({
  proverbs: z.array(z.string()).default([]),
});

const ollama = createOllama({
  baseURL: process.env.NOS_OLLAMA_API_URL || process.env.OLLAMA_API_URL,
})

export const weatherAgent = new Agent({
  name: "Weather Agent",
  tools: { weatherTool },
  // model: openai("gpt-4o"), // uncomment this line to use openai
  model: ollama(process.env.NOS_MODEL_NAME_AT_ENDPOINT || process.env.MODEL_NAME_AT_ENDPOINT || "qwen3:8b"), // comment this line to use openai
  instructions: "You are a helpful assistant.",
  description: "An agent that can get the weather for a given location.",
  memory: new Memory({
    storage: new LibSQLStore({ url: "file::memory:" }),
    options: {
      workingMemory: {
        enabled: true,
        schema: AgentState,
      },
    },
  }),
})

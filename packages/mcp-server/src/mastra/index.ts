import { Mastra } from "@mastra/core/mastra";
import { notes } from "./mcp/server";
import { logger } from "./logger";
import { notesAgent } from "./agents";

export const mastra = new Mastra({
  agents: {
    notesAgent,
  },
  mcpServers: {
    notes: notes,
  },
  logger,
});

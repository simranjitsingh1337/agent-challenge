import { Mastra } from "@mastra/core/mastra";
import { notes } from "./mcp/server";
import { logger } from "./logger";
import { notesAgent } from "./agents/notes-agent"

export const mastra = new Mastra({
  agents: {
    notesAgent: notesAgent,
  },
  mcpServers: {
    notes: notes,
  },
  logger,
});

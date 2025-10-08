import { Mastra } from "@mastra/core/mastra";
import { notes } from "./mcp/server";
import { logger } from "./logger";

export const mastra = new Mastra({
  mcpServers: {
    notes: notes,
  },
  logger,
});

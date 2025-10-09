import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";

// Web package doesn't need agents directly - they're served by the MCP server
// This instance is used for client-side Mastra operations
export const mastra = new Mastra({
  logger: new PinoLogger({
    name: "mastra",
    level: "debug",
  }),
  server: {
    port: 4112
  }
});

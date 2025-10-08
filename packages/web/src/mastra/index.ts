import { Mastra } from "@mastra/core/mastra";
import { notesAgent } from "./agents";
import { PinoLogger } from "@mastra/loggers";

export const mastra = new Mastra({
  agents: {
    notesAgent,
  },
  logger: new PinoLogger({
    name: "mastra",
    level: "debug",
  }),
  server: {
    port: 4112
  }
});

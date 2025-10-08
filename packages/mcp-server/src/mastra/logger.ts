import { PinoLogger } from "@mastra/loggers";

export const logger = new PinoLogger({
    name: "notes",
    level: "debug",
});
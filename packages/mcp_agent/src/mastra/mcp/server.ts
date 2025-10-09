import { MCPServer } from "@mastra/mcp";
import { writeNote } from "../tools/write-note";
import { resourceHandlers } from "./resources";
import eventEmitter from "../../lib/events";
import { promptHandlers } from "./prompts";

export const notes = new MCPServer({
  name: "NotesMCP",
  version: "0.1.0",
  resources: resourceHandlers,
  tools: {
    writeNote
  },
  prompts: promptHandlers,
});

eventEmitter.on('tool-executed', (data: { type: string, payload: any }) => {
  if (data.type === 'write_note') {
    notes.resources.notifyUpdated({ uri: `notes://${data.payload.title}` });
    notes.resources.notifyListChanged();
  }
}); 

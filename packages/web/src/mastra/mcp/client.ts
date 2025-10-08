import { MCPClient } from "@mastra/mcp";
import eventEmitter from "@/lib/events";
import { PinoLogger } from "@mastra/loggers";

const MASTRA_MCP_BASE_URL = process.env.MASTRA_MCP_BASE_URL || "http://localhost:4111";

let mcpInstance: MCPClient | null = null;

// In a real world application, you would have a different id for each user so they have their own MCP client.
export const getMcpClient = () => {
  if (mcpInstance) {
    return mcpInstance;
  }
  else {
    mcpInstance = new MCPClient({
      id: "notes-frontend",
      servers: {
        notes: {
          url: new URL(`${MASTRA_MCP_BASE_URL}/api/mcp/notes/mcp`)
        }
      }
    });

    mcpInstance.__setLogger(new PinoLogger({
      level: 'debug',
      name: 'mcp-client',
    }))

    mcpInstance.resources.onListChanged('notes', () => {
      eventEmitter.emit('notes-changed', { type: 'list-changed' });
    });
    
    mcpInstance.resources.onUpdated('notes', (params) => {
      const title = params.uri.replace('notes://', '');
      eventEmitter.emit('notes-changed', { type: 'update', payload: { title } });
    });

    return mcpInstance;
  }
}
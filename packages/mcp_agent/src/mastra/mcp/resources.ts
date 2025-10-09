import fs from "fs/promises";
import path from "path";
import { MCPServerResources, Resource } from "@mastra/mcp";
import { NOTES_DIR } from "../constants";

const list = async (): Promise<Resource[]> => {
  try {
    await fs.mkdir(NOTES_DIR, { recursive: true });
    const files = await fs.readdir(NOTES_DIR);
    return files.filter(f => f.endsWith('.md')).map(file => {
      const title = file.replace(".md", "");
      return {
        uri: `notes://${title}`,
        name: title,
        description: `A note about ${title}`,
        mimeType: "text/markdown",
      };
    });
  } catch (error) {
    console.error("Error listing note resources:", error);
    return [];
  }
};

const read = async (uri: string): Promise<string | null> => {
  const title = uri.replace("notes://", "");
  const notePath = path.join(NOTES_DIR, `${title}.md`);
  try {
    return await fs.readFile(notePath, "utf-8");
  } catch (error) {
    console.error(`Error reading resource ${uri}:`, error);
    return null;
  }
};

export const resourceHandlers: MCPServerResources = {
  listResources: list,
  getResourceContent: async ({ uri }: { uri: string }) => {
    const content = await read(uri);
    return content ? { text: content } : { text: "" };
  },
}; 
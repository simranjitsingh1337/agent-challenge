import { NextResponse } from "next/server";
import { getMcpClient } from "@/mastra/mcp/client";
import { Resource } from "@mastra/mcp";

export async function GET() {
    try {
        const resourceLists = await getMcpClient().resources.list();
        const noteResources: Resource[] = resourceLists['notes'] || [];
        const noteTitles = noteResources.map(r => r.name);
        console.log(resourceLists)
        return NextResponse.json(noteTitles);
    } catch (error) {
        console.error("Error listing notes via MCP:", error);
        return NextResponse.json({ error: "Failed to list notes" }, { status: 500 });
    }
}


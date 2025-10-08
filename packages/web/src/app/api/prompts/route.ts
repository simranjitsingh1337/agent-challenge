import { NextRequest, NextResponse } from "next/server";
import { getMcpClient } from "@/mastra/mcp/client";

export async function GET(req: NextRequest) {
  try {
    const allPrompts = await getMcpClient().prompts.list();
    const notesPrompts = allPrompts["notes"] || [];
    return NextResponse.json(notesPrompts);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 });
  }
} 
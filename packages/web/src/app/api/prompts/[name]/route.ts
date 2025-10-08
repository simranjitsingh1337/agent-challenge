import { NextRequest, NextResponse } from "next/server";
import { getMcpClient } from "@/mastra/mcp/client";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name: promptName } = await params;
  if (!promptName) {
    return NextResponse.json({ error: "Prompt name is required" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { noteContent, uri } = body;

    const args: { noteContent?: string, uri?: string } = {};
    if (noteContent) {
      args.noteContent = noteContent;
    }
    if (uri) {
      args.uri = uri;
    }

    const promptData = await getMcpClient().prompts.get({
      serverName: "notes",
      name: promptName,
      args: args
    });

    const messages = promptData.messages;
    const firstUserMessage = messages.find(m => m.role === 'user');

    if (firstUserMessage) {
      const contentParts = Array.isArray(firstUserMessage.content) ? firstUserMessage.content : [firstUserMessage.content];
      const textPart = contentParts.find(p => p.type === 'text');
      if (textPart && textPart.text) {
        return NextResponse.json({ content: textPart.text });
      }
    }

    return NextResponse.json({ content: `/${promptName}` });

  } catch (error) {
    console.error(`Error fetching prompt "${promptName}":`, error);
    return NextResponse.json({ error: `Failed to fetch prompt content for ${promptName}` }, { status: 500 });
  }
} 
import { getMcpClient } from "@/mastra/mcp/client";
import matter from "gray-matter";

const subscriptions = new Set<string>();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  const uri = `notes://${decodedTitle}`;

  subscriptions.forEach(subUri => {
    if (subUri === uri) {
      getMcpClient().resources.unsubscribe("notes", subUri);
    }
  });

  if (!subscriptions.has(uri)) {
    console.log('subscribing to', uri)
    getMcpClient().resources.subscribe("notes", uri);
    subscriptions.add(uri);
  }

  try {
    const resource = await getMcpClient().resources.read("notes", uri);
    let markdownContent = "";
    if (resource.contents && resource.contents[0]) {
      const firstContent = resource.contents[0];
      if (firstContent.mimeType === "text/markdown" && typeof firstContent.text === 'string') {
        markdownContent = firstContent.text;
      }
    }

    const { data, content } = matter(markdownContent);

    const responsePayload = {
      frontmatter: data,
      content: content,
    };

    return new Response(JSON.stringify(responsePayload), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(`Note not found: ${decodedTitle}`, { status: 404 });
  }
} 
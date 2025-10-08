import { NextResponse } from 'next/server';
import eventEmitter from '@/lib/events';

export async function GET(request: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const listener = (data: { type: string, payload?: any }) => {
        console.log(`data`, data)
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      eventEmitter.on('notes-changed', listener);

      request.signal.addEventListener('abort', () => {
        eventEmitter.off('notes-changed', listener);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
} 
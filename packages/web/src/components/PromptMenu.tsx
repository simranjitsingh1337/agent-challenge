"use client";

import { useEffect, useState } from "react";

interface Prompt {
  name: string;
  description: string;
}

interface PromptMenuProps {
  onSelect: (content: string) => void;
  selectedNoteUri?: string;
  noteContent?: string;
}

export function PromptMenu({ onSelect, selectedNoteUri, noteContent }: PromptMenuProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const handleSelect = async (promptName: string) => {
    try {
      const url = `/api/prompts/${promptName}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteContent: noteContent, uri: selectedNoteUri }),
      });

      if (response.ok) {
        const data = await response.json();
        onSelect(data.content);
      } else {
        console.error("Failed to fetch prompt content, falling back to name.");
        onSelect(`/${promptName} `);
      }
    } catch (error) {
      console.error("Error fetching prompt content:", error);
      onSelect(`/${promptName} `);
    }
  };

  useEffect(() => {
    async function fetchPrompts() {
      try {
        const response = await fetch("/api/prompts");
        if (response.ok) {
          const data = await response.json();
          setPrompts(data);
        } else {
          console.error("Failed to fetch prompts");
        }
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    }

    fetchPrompts();
  }, []);

  if (prompts.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-full mb-2 w-full bg-black border border-gray-700 rounded-md shadow-lg z-10 text-white max-h-[50vh] overflow-y-auto">
      <div className="border-t border-gray-700 p-2">
        <p className="text-xs text-gray-400 uppercase mb-2">Prompts</p>
        <ul>
          {prompts.map((prompt) => (
            <li key={prompt.name} className="p-2 hover:bg-gray-700 cursor-pointer rounded-md" onClick={() => handleSelect(prompt.name)}>
              <p className="font-bold">{prompt.name}</p>
              <p className="text-sm text-gray-400">{prompt.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 
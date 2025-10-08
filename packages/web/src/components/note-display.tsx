"use client";

import { MDXProvider } from "@mdx-js/react";
import ReactMarkdown from 'react-markdown';
import { MDXComponents } from "./ui/mdx.components";

type NoteDisplayProps = {
    selectedNote: string | null;
    content: string;
    frontmatter: Record<string, any> | null;
};

function FrontmatterDisplay({ frontmatter }: { frontmatter: Record<string, any> }) {
    return (
        <div className="border-b mb-4 pb-4">
            {Object.entries(frontmatter).map(([key, value]) => (
                <div key={key} className="flex">
                    <strong className="w-24 capitalize">{key}:</strong>
                    <span>{Array.isArray(value) ? value.join(', ') : String(value)}</span>
                </div>
            ))}
        </div>
    );
}

export function NoteDisplay({ selectedNote, content, frontmatter }: NoteDisplayProps) {
    if (!selectedNote) {
        return <div className="w-1/2 p-8 text-gray-500">Select a note to view its content.</div>;
    }

    return (
        <div className="w-1/2 p-8 overflow-y-auto prose dark:prose-invert">
            {frontmatter && Object.keys(frontmatter).length > 0 && <FrontmatterDisplay frontmatter={frontmatter} />}
            <MDXProvider components={MDXComponents}>
                <div className="mdx-content">
                    {/* Render the markdown content with proper formatting */}
                    <ReactMarkdown components={MDXComponents}>
                        {content}
                    </ReactMarkdown>
                </div>
            </MDXProvider>
        </div>
    );
} 
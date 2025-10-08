"use client";
import { Agent } from "@/components/agent";
import { NoteDisplay } from "@/components/note-display";
import { NoteList } from "@/components/note-list";
import { useCopilotReadable } from "@copilotkit/react-core";
import { useState, useEffect, useCallback } from "react";

type NoteData = {
    content: string;
    frontmatter: Record<string, any>;
}

async function listNotes(): Promise<string[]> {
    const response = await fetch('/api/notes');
    if (!response.ok) {
        console.error("Failed to fetch notes");
        return [];
    }
    const notes = await response.json();
    return notes;
}

async function readNote(title: string): Promise<NoteData> {
    const response = await fetch(`/api/notes/${title}`);
    if (!response.ok) {
        console.error("Failed to fetch note content for:", title);
        return { content: `## Error: Could not load note: ${title}`, frontmatter: {} };
    }
    return response.json();
}

export default function NotesPage() {
    const [notes, setNotes] = useState<string[]>([]);
    const [selectedNote, setSelectedNote] = useState<string | null>(null);
    const [noteContent, setNoteContent] = useState<string>("");
    const [noteFrontmatter, setNoteFrontmatter] = useState<Record<string, any> | null>(null);

    const fetchNoteContent = useCallback((note: string | null) => {
        if (note) {
            readNote(note).then(data => {
                setNoteContent(data.content);
                setNoteFrontmatter(data.frontmatter);
            });
        } else {
            setNoteContent("");
            setNoteFrontmatter(null);
        }
    }, []);

    const refreshNotes = useCallback(() => {
        listNotes().then(newNotes => {
            setNotes(newNotes);
            if (newNotes.length > 0 && (!selectedNote || !newNotes.includes(selectedNote))) {
                setSelectedNote(newNotes[0]);
            } else if (newNotes.length === 0) {
                setSelectedNote(null);
            }
        });
    }, [selectedNote]);

    useEffect(() => {
        refreshNotes();
    }, [refreshNotes]);


    useEffect(() => {
        const eventSource = new EventSource("/api/events");
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(`selectedNote`, selectedNote)
            fetchNoteContent(selectedNote);
            refreshNotes();
        };

        return () => {
            eventSource.close();
        };
    }, [selectedNote, fetchNoteContent, refreshNotes]);

    useEffect(() => {
        fetchNoteContent(selectedNote);
    }, [selectedNote, fetchNoteContent]);

    useCopilotReadable({
        description: "The content and title of the note that the user currently has open.",
        value: {
            noteContent,
            frontmatter: noteFrontmatter,
            title: selectedNote,
        },
    });

    useCopilotReadable({
        description: "The user's notes, which can be read by the agent.",
        value: notes,
    });

    return (
        <div className="flex h-screen bg-white">
            <NoteList
                notes={notes}
                selectedNote={selectedNote}
                onSelectNote={setSelectedNote}
                onRefresh={refreshNotes}
            />
            <NoteDisplay 
                selectedNote={selectedNote} 
                content={noteContent}
                frontmatter={noteFrontmatter}
            />
            <Agent 
                selectedNoteUri={selectedNote ? `notes://${selectedNote}` : undefined} 
                noteContent={noteContent}
            />
        </div>
    );
} 
"use client";

import { InputProps } from "@copilotkit/react-ui";
import { useState, useRef, useEffect } from "react";
import { PromptMenu } from "./PromptMenu";

interface CustomInputProps extends InputProps {
    selectedNoteUri?: string;
    noteContent?: string;
}

export function CustomChatInput({ selectedNoteUri, noteContent, ...props }: CustomInputProps) {
    const [value, setValue] = useState("");
    const showPromptMenu = value.startsWith("/");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [value]);

    const handleSend = () => {
        if (value.trim()) {
            props.onSend(value);
            setValue("");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const handlePromptSelect = (prompt: string) => {
        setValue(prompt);
    }

    return (
        <div className="relative">
            {showPromptMenu && <PromptMenu onSelect={handlePromptSelect} selectedNoteUri={selectedNoteUri} noteContent={noteContent} />}
            <div className="flex items-center border-t border-gray-200 dark:border-gray-700 pt-2">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-grow p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-auto"
                    rows={1}
                    style={{ maxHeight: '200px' }}
                />
                <button 
                    onClick={handleSend}
                    disabled={props.inProgress || !value.trim()}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
                >
                    Send
                </button>
            </div>
        </div>
    );
} 
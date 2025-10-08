# Mastra MCP Server Workshop

This repository contains the completed code for the Mastra MCP Server workshop. It has been structured as a monorepo, with the MCP server and the frontend application separated into distinct packages. It demonstrates how to build a local MCP server to manage markdown notes, create custom tools and prompts, and build a reactive Next.js frontend with an AI agent to interact with the notes.

## Getting Started

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```

2.  **Run the MCP server**:
    ```bash
    pnpm dev:mcp
    ```
    This command starts the Mastra MCP server process.

3.  **Run the Mastra agent**:
    ```bash
    pnpm dev:agent
    ```
    This command starts the Mastra server with the agent.
    NOTE: The reason why these are not run together is that in a real world situation the MCP server will be published or hosted already, the agent needs access to the MCP server after it starts. It's good practice to have your MCP Servers separate.

4.  **Run the frontend**:
    ```bash
    pnpm dev:web
    ```
    This command starts the frontend application.

5.  Open your browser to [http://localhost:3000](http://localhost:3000).

## Project Structure

This project is a `pnpm` monorepo. The main packages are:

-   `packages/mcp-server`: The MCP server that manages and exposes the notes.
-   `packages/web`: The Next.js frontend application, which includes the Mastra agent.
-   `packages/notes`: Directory containing your local markdown notes.

### MCP Server (`packages/mcp-server`)

-   `src/server.ts`: The entry point for the MCP server, defining the `MCPServer` instance, including resource and prompt handlers.
-   `src/resources.ts`: Implements the resource handlers (`listResources`, `getResourceContent`) for reading notes from the `packages/notes/` directory.
-   `src/tools.ts`: Implements the `writeNote` tool, allowing the agent to create and edit notes.
-   `src/prompts.ts`: Implements the prompt handlers (`listPrompts`, `getPromptMessages`) that power the slash-command menu.

### Web Frontend (`packages/web`)

-   `src/app/`: The Next.js application.
    -   `notes/page.tsx`: The main UI, which includes the list of notes, the note display, and the agent panel.
-   `src/app/api/`: API endpoints for the frontend.
    -   `notes/`: API to list and read notes from the file system.
    -   `copilotkit/`: Handles the agent's backend requests.
    -   `prompts/`: API to fetch the list and content of available prompts for the slash-command menu.
    -   `events/`: A Server-Sent Events (SSE) endpoint for pushing real-time updates to the frontend.
-   `src/components/`: Reusable React components.
    -   `agent.tsx`: Contains the `CopilotChat` component and its configuration.
    -   `CustomChatInput.tsx`: A custom input component for the chat that implements the slash-command menu.
    -   `PromptMenu.tsx`: The UI for the slash-command prompt list.
    -   `note-display.tsx`: Component to render the content of a selected note.
    -   `note-list.tsx`: Component to display the list of available notes.
-   `src/lib/`: Utility functions and hooks.
    -   `events.ts`: Contains the `eventEmitter` for MCP listener event handling.
    -   `utils.ts`: General utility functions.

## Key Features

-   **Local Note Management**: An MCP server that exposes markdown files from a local directory (`packages/notes/`) as resources.
-   **Custom Agent Tools**: The agent is equipped with a `writeNote` tool to create and modify notes directly on the file system.
-   **Dynamic Prompts**: A slash-command menu in the chat interface that allows users to trigger pre-defined prompts like summarizing a note or brainstorming ideas.
-   **Reactive UI**: The frontend is built with Next.js and React, providing a seamless user experience for browsing and editing notes.
-   **Real-time MCP Updates**: The UI updates automatically when the agent modifies an MCP resource. The MCP Server sends a message to the client. The frontend sets up MCP listener handlers to relay the event to the frontend.

## How to Use It

1.  Launch the application with `pnpm dev`.
2.  Open your browser to `http://localhost:3000`.
3.  Interact with the agent on the right-hand panel.
    -   **Create a note**: Try asking the agent: "Create a note titled 'My First Note' with the content 'Hello, world!'". You should see the note appear in the list on the left.
    -   **Edit a note**: Click on the new note, then ask the agent: "Add a section called 'Next Steps' to this note". The content will update in real-time.
    -   **Use prompts**: In the agent chat, type `/` to open the prompt menu. Select a prompt like `brainstorm_ideas`. The agent will then execute the prompt, using the current note as context if needed.

import { Agent } from "@mastra/core";
import { model } from "../../config";
import { yourTool } from "../your-agent/your-tool";

// Define Agent Name
const name = "Your Agent";

// Define instructions for the agent
// TODO: Add link here for recommendations on how to properly define instructions for an agent.
// TODO: Remove comments (// ...) from `instructions`
const instructions = `
      // Define the character of the agent.
      You are a helpful assistant that provides accurate information.

      // Define how the agent should behave here.
      Your primary function is to help users get accurate details for specific topics. When responding:
      - If the location name isn’t in English, please translate it
      - Keep responses concise but informative

      // Define function that the agent needs to call
      Use the yourTool to fetch current weather data.
`;

export const yourAgent = new Agent({
	name,
	instructions,
	model,
	tools: { yourTool },
});

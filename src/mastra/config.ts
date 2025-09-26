import { createOllama } from "ollama-ai-provider";

// Load .env file only in development (when NODE_ENV is not production)
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
  } catch (error) {
    // dotenv not available, use environment variables only
  }
}

// Export all your environment variables
export const modelName = process.env.MODEL!;
const rawBaseURL = process.env.API_BASE_URL;

// Automatically append /api to the base URL if not already present
export const baseURL = rawBaseURL?.endsWith('/api') 
  ? rawBaseURL 
  : `${rawBaseURL}/api`;

// Create and export the model instance
export const model = createOllama({ baseURL }).chat(modelName, {
  simulateStreaming: false,
});

console.log(`ModelName: ${modelName}\nbaseURL: ${baseURL}`);

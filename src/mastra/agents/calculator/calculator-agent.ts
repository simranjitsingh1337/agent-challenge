import { Agent } from '@mastra/core';
import { calculatorTool, calculatorToolSchema } from './calculator-tool';

export const calculatorAgent = new Agent({
  name: 'calculator-agent',
  instructions: `You are a helpful calculator assistant. 
    When users ask you to perform calculations, use the calculator tool to compute the result.
    Always explain your calculations clearly.
    You can perform addition, subtraction, multiplication, and division.`,
  model: {
    provider: 'OPEN_AI',
    name: process.env.MODEL_NAME_AT_ENDPOINT || 'qwen2.5:1.5b',
    toolChoice: 'auto',
  },
  tools: {
    calculator: {
      description: 'Perform mathematical calculations (add, subtract, multiply, divide)',
      inputSchema: calculatorToolSchema,
      execute: calculatorTool,
    },
  },
});
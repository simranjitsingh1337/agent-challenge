import { z } from 'zod';

export const calculatorToolSchema = z.object({
  operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
  a: z.number(),
  b: z.number(),
});

export type CalculatorToolInput = z.infer<typeof calculatorToolSchema>;

export const calculatorTool = async ({ operation, a, b }: CalculatorToolInput) => {
  let result: number;
  let explanation: string;
  
  switch(operation) {
    case 'add':
      result = a + b;
      explanation = `Adding ${a} + ${b} = ${result}`;
      break;
    case 'subtract':
      result = a - b;
      explanation = `Subtracting ${a} - ${b} = ${result}`;
      break;
    case 'multiply':
      result = a * b;
      explanation = `Multiplying ${a} × ${b} = ${result}`;
      break;
    case 'divide':
      if (b === 0) {
        throw new Error('Cannot divide by zero');
      }
      result = a / b;
      explanation = `Dividing ${a} ÷ ${b} = ${result}`;
      break;
    default:
      throw new Error('Unknown operation');
  }
  
  return {
    result,
    explanation,
    formatted: `The answer is ${result}`
  };
};